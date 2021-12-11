import { updateStore } from '_unistore';
import { xhr, urlUserData, urlSendOTP } from '_helpers';

// eslint-disable-next-line import/prefer-default-export
// export function verifyOTP(regData	) {
// 	// return xhr(urlValidateOTP, config)
// 	// 	.then((res) => {
// 	// 		console.log(res.success);
// 	// 		return res.success;
// 	// 	})
// 	// 	.catch((err) => {
// 	// 		console.log(err);
// 	// 		return false;
// 	// 	});
//   return  xhr(urlUserData)
// 		.then((res) => {
// 			updateStore({
// 				authUser: {
// 					...res,
// 					...regData
// 				},
// 				signup: null,
// 				newlyRegistered: true
// 			});
// 			// eslint-disable-next-line
// 			console.log(`SPA >> verifyOTP successful`, res);
// 			return true
// 		})
// 		.catch((err) => {
// 			// eslint-disable-next-line
// 			console.log(`SPA >> verifyOTP Error`, err);
// 			return false
// 		});
// }

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
