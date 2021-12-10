import { xhr, urlCommunitySearch, urlCommunityGetById } from '_helpers';

// eslint-disable-next-line import/prefer-default-export
export function filterCommunityByName(name) {
  const url = urlCommunitySearch.replace(/{name}/gim, name);
	return xhr(url)
		.then((res) => {
			return (res);
		})
		.catch((err) => {
			console.log(err);
			return false;
		});
}

export function fetchCommunityById(id) {
  const url = urlCommunityGetById.replace(/{id}/gim, id);
	return xhr(url)
		.then((res) => {
			return res;
		})
		.catch((err) => {
			console.log(err);
			return false;
		});
}
