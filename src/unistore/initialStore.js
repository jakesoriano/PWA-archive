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
  cnews: {
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
  lpannouncements: {
    fetching: false,
    result: false,
    data: [],
    filter: '',
    total: 0,
    page: 1,
    selected: null
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
    featured: null,
    filter: null,
    sort: null,
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
  appLandingConfig: {
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
  communityInfo: {
    fetching: false,
    result: false,
    data: null
  },
  leaderCommunityEvents: {
    fetching: false,
    result: false,
    data: [],
    total: 0,
    page: 1
  },
  leaderCommunityAnnouncements: {
    fetching: false,
    result: false,
    data: [],
    total: 0,
    page: 1
  },
  videos: {
    fetching: false,
    result: false,
    data: [],
    total: 0,
    page: 1,
    selected: null
  },
  messages: {
    fetching: false,
    result: false,
    data: [],
    total: 0,
    page: 1,
    selected: null
  },
  communityVolunteers: {
    fetching: false,
    result: false,
    data: [],
  }
};
