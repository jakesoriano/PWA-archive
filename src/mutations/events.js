import { store, updateStore } from '_unistore';
import { xhr, urlEvents, urlShare, urlTag } from '_helpers';

// eslint-disable-next-line import/prefer-default-export
export function fetchEvents(page, limit) {
	const { events } = store.getState();

	// fetching
	if (events.fetching) {
		return;
	}

	// initial state
	updateStore({
		events: {
			...events,
			fetching: true,
			result: false,
		},
	});

	return new Promise((resolve) => {
		xhr(urlEvents + '/feed/followed', {
			method: 'GET',
			params: {
				p: page || 1, // page number
				s: limit || 9, // limit
			},
		})
			.then((res) => {
				updateStore({
					events: {
						data:
							page && page > 1
								? [...events.data, ...res.data.results]
								: res.data.results,
						total: res.data.total,
						page: page || 1,
						fetching: false,
						result: true,
					},
				});
				console.log(`SPA >> fetchEvents Success`, res.success);
				resolve(true);
			})
			.catch((err) => {
				updateStore({
					events: {
						...events,
						fetching: false,
						result: false,
					},
				});
				console.log(`SPA >> fetchEvents Error`, err);
				resolve(false);
			});
	});
}
export function fetchUpcomingOtherEvents(view, page, limit) {
	const { upevents, oevents } = store.getState();

	// fetching
	if (upevents.fetching || oevents.fetching) {
		return;
	}

	// initial state
	if (view === 'current_month') {
		updateStore({
			upevents: {
				...upevents,
				fetching: true,
				result: false,
			},
		});
	} else {
		updateStore({
			oevents: {
				...oevents,
				fetching: true,
				result: false,
			},
		});
	}

	return new Promise((resolve) => {
		xhr(`${urlEvents}/feed/followed`,{
			method: 'GET',
			params: {
				s: limit || '50',
				p: page || '1',
				view: view
			}
		})
			.then((res) => {
				console.log(res)
				if (view === 'current_month') {
					updateStore({
						upevents: {
							data:
								page && page > 1
									? [...upevents.data, ...res.data.results]
									: res.data.results,
							total: res.data.total,
							page: page || 1,
							fetching: false,
							result: true,
						},
					});
				} else {
					updateStore({
						oevents: {
							data:
								page && page > 1
									? [...oevents.data, ...res.data.results]
									: res.data.results,
							total: res.data.total,
							page: page || 1,
							fetching: false,
							result: true,
						},
					});
					console.log(`SPA >> fetchUpcomingOtherEvents Success`, res.success);
				}
				resolve(res);
			})
			.catch((err) => {
				if (view === 'current_month') {
					updateStore({
						upevents: {
							...upevents,
							fetching: false,
							result: false,
						},
					});
				} else {
					updateStore({
						oevents: {
							...oevents,
							fetching: false,
							result: false,
						},
					});
				}
				console.log(`SPA >> fetchUpcomingOtherEvents Error`, err);
				resolve(false);
			});
	});
}
export function fetchEventsByCommunityId(id, page, limit) {
	const { cevents } = store.getState();

	// fetching
	if (cevents.fetching) {
		return;
	}

	// initial state
	updateStore({
		cevents: {
			...cevents,
			data: page && page > 1 ? cevents.data : [],
			fetching: true,
			result: false,
		},
	});

	return new Promise((resolve) => {
		xhr(urlEvents + `/${id}`, {
			method: 'GET',
			params: {
				p: page || 1, // page number
				s: limit || 9, // limit
			},
		})
			.then((res) => {
				if (res && res.success) {
					updateStore({
						cevents: {
							...cevents,
							data:
								page && page > 1
									? [...cevents.data, ...res.data.results]
									: res.data.results,
							total: res.data.total,
							page: page || 1,
							fetching: false,
							result: true,
						},
					});
				}
				console.log(`SPA >> fetchEventsByCommunityId Success`, res);
				resolve(true);
			})
			.catch((err) => {
				updateStore({
					cevents: {
						...cevents,
						fetching: false,
						result: true,
					},
				});
				console.log(`SPA >> fetchEventsByCommunityId Error`, err);
				resolve(false);
			});
	});
}

export function shareEvent(item, parentId, parentType) {
	let { events, cevents, upevents, oevents } = store.getState();
	const { authUser } = store.getState();

	// fetching
	if (
		events.fetching ||
		cevents.fetching ||
		upevents.fetching ||
		oevents.fetching
	) {
		return;
	}

	// initial state
	events = {
		...events,
		data: events.data.map((i) => {
			if (i.id === item.id) {
				i.shared = true;
			}
			return i;
		}),
		fetching: true,
	};
	cevents = {
		...cevents,
		data: cevents.data.map((i) => {
			if (i.id === item.id) {
				i.shared = true;
			}
			return i;
		}),
		fetching: true,
	};
	upevents = {
		...upevents,
		data: upevents.data.map((i) => {
			if (i.id === item.id) {
				i.shared = true;
			}
			return i;
		}),
		fetching: true,
	};
	oevents = {
		...oevents,
		data: oevents.data.map((i) => {
			if (i.id === item.id) {
				i.shared = true;
			}
			return i;
		}),
		fetching: true,
	};
	updateStore({ events, cevents, upevents, oevents });

	return new Promise((resolve) => {
		xhr(urlShare, {
			method: 'POST',
			data: {
				userId: authUser.profile._id,
				itemId: item.id,
				itemType: 'E',
				parentId: parentId || 'X',
				parentType: parentType || 'X',
			},
		})
			.then((res) => {
				updateStore({
					events: {
						...events,
						fetching: false,
					},
					cevents: {
						...cevents,
						fetching: false,
					},
					upevents: {
						...upevents,
						fetching: false,
					},
					oevents: {
						...oevents,
						fetching: false,
					},
				});
				console.log(`SPA >> shareEvents Success`, res);
				resolve(true);
			})
			.catch((err) => {
				updateStore({
					events: {
						...events,
						data: events.data.map((i) => {
							if (i.id === item.id) {
								i.shared = false;
							}
							return i;
						}),
						fetching: false,
					},
					cevents: {
						...cevents,
						data: cevents.data.map((i) => {
							if (i.id === item.id) {
								i.shared = false;
							}
							return i;
						}),
						fetching: false,
					},
					upevents: {
						...upevents,
						data: upevents.data.map((i) => {
							if (i.id === item.id) {
								i.shared = false;
							}
							return i;
						}),
						fetching: false,
					},
					oevents: {
						...oevents,
						data: oevents.data.map((i) => {
							if (i.id === item.id) {
								i.shared = false;
							}
							return i;
						}),
						fetching: false,
					},
				});
				console.log(`SPA >> shareEvents Error`, err);
				resolve(false);
			});
	});
}

export function selectTag(tag, item) {
	let { events, cevents, upevents, oevents } = store.getState();
	const { authUser } = store.getState();
	const defaultTag = item.tagged;

	// fetching
	if (
		events.fetching ||
		cevents.fetching ||
		upevents.fetching ||
		oevents.fetching
	) {
		return;
	}

	// initial state
	events = {
		...events,
		data: events.data.map((i) => {
			if (i.id === item.id) {
				i.tagged = tag;
			}
			return i;
		}),
		fetching: true,
	};
	cevents = {
		...cevents,
		data: cevents.data.map((i) => {
			if (i.id === item.id) {
				i.tagged = tag;
			}
			return i;
		}),
		fetching: true,
	};
	upevents = {
		...upevents,
		data: upevents.data.map((i) => {
			if (i.id === item.id) {
				i.tagged = tag;
			}
			return i;
		}),
		fetching: true,
	};
	oevents = {
		...oevents,
		data: oevents.data.map((i) => {
			if (i.id === item.id) {
				i.tagged = tag;
			}
			return i;
		}),
		fetching: true,
	};
	updateStore({ events, cevents, upevents, oevents });

	return new Promise((resolve) => {
		xhr(urlTag, {
			method: 'POST',
			data: {
				userId: authUser.profile._id,
				itemId: item.id,
				itemType: 'E',
				tag,
				parentType: 'C',
				parentId: item.communityId || '',
			},
		})
			.then((res) => {
				updateStore({
					events: {
						...events,
						fetching: false,
					},
					cevents: {
						...cevents,
						fetching: false,
					},
					upevents: {
						...upevents,
						fetching: false,
					},
					oevents: {
						...oevents,
						fetching: false,
					},
				});
				console.log(`SPA >> selectTag Success`, res);
				resolve(true);
			})
			.catch((err) => {
				updateStore({
					events: {
						...events,
						data: events.data.map((i) => {
							if (i.id === item.id) {
								i.tagged = defaultTag;
							}
							return i;
						}),
						fetching: false,
					},
					cevents: {
						...cevents,
						data: cevents.data.map((i) => {
							if (i.id === item.id) {
								i.tagged = defaultTag;
							}
							return i;
						}),
						fetching: false,
					},
					upevents: {
						...upevents,
						data: upevents.data.map((i) => {
							if (i.id === item.id) {
								i.tagged = defaultTag;
							}
							return i;
						}),
						fetching: false,
					},
					oevents: {
						...oevents,
						data: oevents.data.map((i) => {
							if (i.id === item.id) {
								i.tagged = defaultTag;
							}
							return i;
						}),
						fetching: false,
					},
				});
				console.log(`SPA >> selectTag Error`, err);
				resolve(false);
			});
	});
}
