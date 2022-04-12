import { store, updateStore } from '_unistore';
import { xhr, urlProjectsSupported } from '_helpers';

// eslint-disable-next-line import/prefer-default-export
export function fetchProjectsSupported(page, limit) {
  const { projectsSupported } = store.getState();

  // fetching
  if (projectsSupported.fetching) {
    return;
  }

  // initial state
  updateStore({
    projectsSupported: {
      ...projectsSupported,
      fetching: true,
      result: false,
    },
  });

  return new Promise((resolve) => {
    xhr(urlProjectsSupported, {
      method: 'GET',
      params: {
        p: page || 1, // page number
        s: limit || 9, // limit
      },
    })
      .then((res) => {
        updateStore({
          projectsSupported: {
            data: (page && page > 1
              ? [...projectsSupported.data, ...res.data.results]
              : res.data.results) || [
              {
                name: 'Sample User',
                barangayName: 'Barangay Juan Luna',
                status: 'Verify Payment',
              },
              {
                name: 'Sample User 2',
                barangayName: 'Barangay Juan Sagisag',
                status: 'Verify Payment',
              },
            ],
            total: res.data.total,
            page: page || 1,
            fetching: false,
            result: true,
          },
        });
        console.log(`SPA >> fetchProjectsSupported Success`, res.success);
        resolve(true);
      })
      .catch((err) => {
        updateStore({
          projectsSupported: {
            ...projectsSupported,
            fetching: false,
            result: false,
          },
        });
        console.log(`SPA >> fetchProjectsSupported Error`, err);
        resolve(false);
      });
  });
}
