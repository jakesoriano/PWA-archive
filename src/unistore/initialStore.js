// eslint-disable-next-line import/prefer-default-export
export const initialStore = {
  // project data
  translation: {
    fetching: false,
    result: false,
    data: null
  },
  selectedLanguage: null,
  grid: {
    fetching: false,
    result: false,
    data: []
  },
  news: {
    fetching: false,
    result: false,
    data: [],
    total: 0,
    page: 1
  },
  events: {
    fetching: false,
    result: false,
    data: [],
    total: 0,
    page: 1
  },
	upevents: {
		fetching: false,
		result: false,
		data: [],
		total: 0,
		page: 1,
	},
	oevents: {
		fetching: false,
		result: false,
		data: [],
		total: 0,
		page: 1,
	},
  announcements: {
    fetching: false,
    result: false,
    data: [],
    total: 0,
    page: 1
  },
  members: {
    fetching: false,
    result: false,
    data: []
  },
  invited: {
    fetching: false,
    result: false,
    data: []
  },
  communities: {
    fetching: false,
    result: false,
    data: [],
    featured: [],
    total: 0,
    page: 1
  },
  communityDetails: {
    id: '',
    image: '',
    fetching: false,
    result: false,
  },
  cevents: {
    fetching: false,
    result: false,
    data: [],
    total: 0,
    page: 1
  },
  notifications: {
    fetching: false,
    result: false,
    data: [],
    isRead: false,
    lastDateNotified: null,
    lastDatePointsNotified: null
  },
  stories: {
    fetching: false,
    result: false,
    data: []
  },
  signup: null,
  forgot: null,
  settings: {
    touchId: false
  },
  appConfig: {
    fetching: false,
    result: false,
    data: {}
  },
  tasks: {
    fetching: false,
    result: false,
    data: null,
    date: null,
    completed: false
  },
  leaderboard: {
    fetching: false,
    result: false,
    data: null,
    featured: null,
    filter: {}
  },
  communityInfo: {
    fetching: false,
    result: false,
    data: null
  },
  videos: {
    fetching: false,
    result: false,
    data: [],
    total: 0,
    page: 1,
    selected: null
  },
  // user
  authUser: null,
  deviceId: null,
  // modals
  promptModal: null,
  messageModal: null,
  componentModal: null,
  popupModal: null,
  circleModal: null,
  alertShow: null,
  filterShow: null,
  pageLoader: {
    display: false
  },
};
