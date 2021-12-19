import { updateStore, store } from '_unistore';
import {
	xhr,
	urlCommunity,
	urlCommunitySearch,
	urlCommunityGetById,
	urlUser
} from '_helpers';

// eslint-disable-next-line import/prefer-default-export
export function filterCommunityByName(name) {
  // curreny state
  const { communities } = store.getState();

  // fetching
  if(communities.fetching) {
    return;
  }

	if (name) {
		const url = urlCommunitySearch.replace(/{name}/gim, name);
		return new Promise((resolve) => {
			xhr(url)
			.then((res) => {
				if (res.success) {
					updateStore({
						communities: {
							data: res.data
						}
					});
				}
				resolve(true);
			})
			.catch((err) => {
				console.log(err);
        resolve(false);
			});
		});
	} else {
		fetchAllCommunities();
	}
}

export function fetchCommunityById(id) {
  // curreny state
  const { communities } = store.getState();

  // fetching
  if(communities.fetching) {
    return;
  }

  const url = urlCommunityGetById.replace(/{id}/gim, id);
	return new Promise((resolve) => {
		xhr(url)
		.then((res) => {
			if (res.success) {
				updateStore({
					communities: {
						data: res.data
					}
				});
        resolve(true);
			} else {
        resolve(false);
			}
		})
		.catch((err) => {
			console.log(err);
			return false;
		});
	});
}

export function fetchAllCommunities() {
  // curreny state
  const { communities } = store.getState();

  // fetching
  if(communities.fetching) {
    return;
  }

	return new Promise((resolve) => {
		xhr(urlCommunity)
		.then((res) => {
			updateStore({
				communities: {
					...res
				}
			});
			resolve(true);
		})
		.catch((err) => {
			console.log(err);
			resolve(false);
		});
	});
}

export function followCommunity (item) {
  // curreny state
  let { communities } = store.getState();
  const { authUser } = store.getState();

  // fetching
  if(communities.fetching) {
    return;
  }
  
  // initial state
  communities = {
    ...communities,
    data: communities.data.map(i => {
      if(i.id === item.id) {
        i.followed = true;
      }
      return i;
    }),
    fetching: true
  };
  updateStore({ communities });

  return new Promise((resolve) => {
    xhr(`${urlUser}/follow`, {
      method: 'POST',
      data: {
        userId: authUser.profile._id,
        itemId: item.id,
        itemType: 'C' 
      }
    })
    .then((res) => {
      updateStore({
        communities: {
          ...communities,
          fetching: false
        }
      });
      console.log(`SPA >> followCommunity Success`, res);
      resolve(true);
    })
    .catch((err) => {
      updateStore({
        communities: {
          ...communities,
          data: communities.data.map(i => {
            if(i.id === item.id) {
              i.followed = false;
            }
            return i;
          }),
          fetching: false
        }
      });
      console.log(`SPA >> followCommunity Error`, err);
      resolve(false);
    });
  });
}

export function unFollowCommunity (item) {
  // curreny state
  let { communities } = store.getState();
  const { authUser } = store.getState();

  // fetching
  if(communities.fetching) {
    return;
  }

  // initial state
  communities = {
    ...communities,
    data: communities.data.map(i => {
      if(i.id === item.id) {
        i.followed = false;
      }
      return i;
    }),
    fetching: true
  };
  updateStore({ communities });

  return new Promise((resolve) => {
    xhr(`${urlUser}/follow`, {
      method: 'DELETE',
      data: {
        userId: authUser.profile._id,
        itemId: item.id,
        itemType: 'C' 
      }
    })
    .then((res) => {
      updateStore({
        communities: {
          ...communities,
          fetching: false
        }
      });
      console.log(`SPA >> unFollowCommunity Success`, res);
      resolve(true);
    })
    .catch((err) => {
      updateStore({
        communities: {
          ...communities,
          data: communities.data.map(i => {
            if(i.id === item.id) {
              i.followed = true;
            }
            return i;
          }),
          fetching: false
        }
      });
      console.log(`SPA >> unFollowCommunity Error`, err);
      resolve(false);
    });
  });
}