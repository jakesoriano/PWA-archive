import { updateStore, store } from '_unistore';
import { xhr, urlCommunity, urlCommunitySearch, urlCommunityGetById } from '_helpers';

// eslint-disable-next-line import/prefer-default-export
export function filterCommunityByName(name) {
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
				return false;
			});
		});
	} else {
		fetchAllCommunities();
	}
}

export function fetchCommunityById(id) {
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
			}
			resolve(true);
		})
		.catch((err) => {
			console.log(err);
			return false;
		});
	});
}

export function fetchAllCommunities() {
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
