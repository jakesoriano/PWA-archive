import { store } from '_unistore';

export function messageModal (data) {
  store.setState({
    messageModal: data,
    promptModal: null,
    componentModal: null
  });
}

export function promptModal (data) {
  store.setState({
    messageModal: null,
    promptModal: data,
    componentModal: null
  });
}

export function componentModal (data) {
  store.setState({
    messageModal: null,
    promptModal: null,
    componentModal: data
  });
}
