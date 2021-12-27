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
    total: 0,
    page: 1
  },
  communityDetails: {
    id: '',
    image: '',
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
    }
  },
  notifications: {
    fetching: false,
    result: false,
    data: [],
    isRead: false
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
  // user
  authUser: null,
  // modals
  promptModal: null,
  messageModal: null,
  componentModal: null,
  popupModal: null,
  circleModal: null,
  alertShow: null,
  pageLoader: {
    display: false
  }
};
