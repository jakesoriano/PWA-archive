import { store } from '_unistore';

export function messageModal (data) {
  store.setState({
    messageModal: data,
    promptModal: null,
    componentModal: null,
    circleModal: null
  });
}

export function promptModal (data) {
  store.setState({
    messageModal: null,
    promptModal: data,
    componentModal: null,
    circleModal: null
  });
}

export function componentModal (data) {
  store.setState({
    messageModal: null,
    promptModal: null,
    componentModal: data,
    circleModal: null
  });
}

export function circleModal (data) {
  store.setState({
    messageModal: null,
    promptModal: null,
    componentModal: null,
    circleModal: data
  });
}

export function showAlertBox (data) {
  store.setState({
    alertShow: data
  });
}
