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
    data: []
  },
  events: {
    fetching: false,
    result: false,
    data: []
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
  // user
  authUser: null,
  // modals
  promptModal: null,
  messageModal: null,
  componentModal: null,
  notification: null,
  pageLoader: {
    display: false
  }
};
