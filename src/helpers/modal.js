import { store } from '_unistore';

export function messageModal(data) {
  store.setState({
    messageModal: data,
    promptModal: null,
    componentModal: null,
    circleModal: null,
    successMessage: null,
  });
}

export function promptModal(data) {
  store.setState({
    messageModal: null,
    promptModal: data,
    componentModal: null,
    circleModal: null,
    successMessage: null,
  });
}

export function componentModal(data) {
  store.setState({
    messageModal: null,
    promptModal: null,
    componentModal: data,
    circleModal: null,
    successMessage: null,
  });
}

export function circleModal(data) {
  store.setState({
    messageModal: null,
    promptModal: null,
    componentModal: null,
    circleModal: data,
    successMessage: null,
  });
}

export function successMessage(data) {
  store.setState({
    messageModal: null,
    promptModal: null,
    componentModal: null,
    circleModal: null,
    successMessage: data,
  });
}

export function showAlertBox(data) {
  store.setState({
    alertShow: data,
  });
}

export function showFilter(data) {
  store.setState({
    filterShow: data,
  });
}

export function showTourGuide(val) {
  store.setState({
    tourGuide: val,
  });
}
