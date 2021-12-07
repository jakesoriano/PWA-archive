import { xhr, urlValidateOTP, urlSendOTP } from '_helpers';

// eslint-disable-next-line import/prefer-default-export
export function verifyOTP(config) {
	return xhr(urlValidateOTP, config)
		.then((res) => {
			console.log(res.success);
			return res.success;
		})
		.catch((err) => {
			console.log(err);
			return false;
		});
}

export function sendOTP(config) {
	return xhr(urlSendOTP, config)
		.then((res) => {
			return res;
		})
		.catch((err) => {
			console.log(err);
			return false;
		});
}
