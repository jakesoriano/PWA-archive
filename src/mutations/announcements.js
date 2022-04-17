import { store, updateStore } from '_unistore';
import { xhr, urlAnnouncements, urlLike, urlShare } from '_helpers';

// eslint-disable-next-line import/prefer-default-export
export function fetchAnnouncements(page, limit) {
  const { announcements } = store.getState();

  // fetching
  if (announcements.fetching) {
    return new Promise((resolve) => {
      resolve();
    });
  }

  // initial state
  updateStore({
    announcements: {
      ...announcements,
      fetching: true,
      result: false,
    },
  });

  return new Promise((resolve) => {
    xhr(urlAnnouncements, {
      method: 'GET',
      params: {
        p: page || 1, // page number
        s: limit || 6, // limit
      },
    })
      .then((res) => {
        updateStore({
          announcements: {
            data:
							page && page > 1
							  ? [...announcements.data, ...res.data.results]
							  : res.data.results,
            total: res.data.total,
            page: page || 1,
            fetching: false,
            result: true,
          },
        });
        console.log(`SPA >> fetchAnnouncements Success`, res.success);
        resolve(true);
      })
      .catch((err) => {
        updateStore({
          announcements: {
            ...announcements,
            fetching: false,
            result: false,
          },
        });
        console.log(`SPA >> fetchAnnouncements Error`, err);
        resolve(false);
      });
  });
}

export function likeShareAnnouncements(item, action) {
  let { announcements } = store.getState();
  const { authUser } = store.getState();
  const _url = action === 'liked' ? urlLike : urlShare;

  // fetching
  if (announcements.fetching) {
    return new Promise((resolve) => {
      resolve();
    });
  }

  // initial state
  announcements = {
    ...announcements,
    data: announcements.data.map((i) => {
      if (i.id === item.id) {
        i[action] = true;
      }
      return i;
    }),
    fetching: true,
  };
  updateStore({ announcements });

  return new Promise((resolve) => {
    xhr(_url, {
      method: 'POST',
      data: {
        userId: authUser.profile._id,
        itemId: item.id,
        itemType: 'A',
        parentId: 'X',
        parentType: 'X',
      },
    })
      .then((res) => {
        updateStore({
          announcements: {
            ...announcements,
            data: announcements.data.map((i) => {
              if (i.id === item.id) {
                action === 'liked' ? (i.likeCount += 1) : (i.shareCount += 1);
              }
              return i;
            }),
            fetching: false,
          },
        });
        console.log(`SPA >> likeAnnouncements Success`, res);
        resolve(true);
      })
      .catch((err) => {
        updateStore({
          announcements: {
            ...announcements,
            data: announcements.data.map((i) => {
              if (i.id === item.id) {
                i[action] = false;
              }
              return i;
            }),
            fetching: false,
          },
        });
        console.log(`SPA >> likeAnnouncements Error`, err);
        resolve(false);
      });
  });
}

export function removeLikeAnnouncements(item) {
  let { announcements } = store.getState();
  const { authUser } = store.getState();

  // fetching
  if (announcements.fetching) {
    return new Promise((resolve) => {
      resolve();
    });
  }

  // initial state
  announcements = {
    ...announcements,
    data: announcements.data.map((i) => {
      if (i.id === item.id) {
        i.liked = false;
      }
      return i;
    }),
    fetching: true,
  };
  updateStore({ announcements });

  return new Promise((resolve) => {
    xhr(urlLike, {
      method: 'DELETE',
      data: {
        userId: authUser.profile._id,
        itemId: item.id,
        itemType: 'A',
        parentId: 'X',
        parentType: 'X',
      },
    })
      .then((res) => {
        updateStore({
          announcements: {
            ...announcements,
            data: announcements.data.map((i) => {
              if (i.id === item.id) {
                i.likeCount -= 1;
              }
              return i;
            }),
            fetching: false,
          },
        });
        console.log(`SPA >> removeLikeAnnouncements Success`, res);
        resolve(true);
      })
      .catch((err) => {
        updateStore({
          announcements: {
            ...announcements,
            data: announcements.data.map((i) => {
              if (i.id === item.id) {
                i.liked = true;
              }
              return i;
            }),
            fetching: false,
          },
        });
        console.log(`SPA >> removeLikeAnnouncements Error`, err);
        resolve(false);
      });
  });
}
