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
  liveChatLink: null,
  dashboard: {
    fetching: false,
    result: false,
    data: []
  },
  games: {
    fetching: false,
    result: false,
    data: []
  },
  lottery: {
    fetching: false,
    result: false,
    data: []
  },
  popupModule: {
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
  pageLoader: {
    display: false
  }
};
