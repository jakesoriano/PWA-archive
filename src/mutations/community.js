import { updateStore, store } from '_unistore';
import { xhr, urlCommunity, urlCommunitySearch, urlCommunityGetById } from '_helpers';

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
