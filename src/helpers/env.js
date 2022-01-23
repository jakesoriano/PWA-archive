export const urlTranslation = `{PUBLIC_PATH}assets/data/translations/{langAlias}.json?_{_}`;
export const urlGrid = `{PUBLIC_PATH}assets/data/grid.json?_{_}`;
export const urlUser = `${process.env.API_DOMAIN}user`;
export const urlUserLogin = urlUser + `/login`;
export const urlUserProfile = urlUser + `/profile`;
export const urlUserPoints = `${process.env.API_DOMAIN}user/points`;
export const urlRegistration = `${process.env.API_DOMAIN}registration`;
export const urlValidateUsername = urlRegistration + `/validate/username/{username}`;
export const urlValidateMobile = urlRegistration + `/validate/mobile/{mobile}`;
export const urlSignup = urlRegistration + `/signup`;
export const urlRegister = urlRegistration + `/register`;
export const urlResendOTP = urlRegistration + `/resend-otp`;
export const urlNews = `${process.env.API_DOMAIN}news`;
export const urlEvents = `${process.env.API_DOMAIN}events`;
export const urlMembers = `${process.env.API_DOMAIN}user/members`;
export const urlValidateOTP = `{PUBLIC_PATH}assets/data/otp.json?_={_}`;
export const urlInvited = `${process.env.API_DOMAIN}invitation`;
export const urlLike = urlUser + `/like`;
export const urlFollow = urlUser + `/follow`;
export const urlTag = urlUser + `/tag`;
export const urlShare = urlUser + `/share`;
export const urlCommunity = `${process.env.API_DOMAIN}community`;
export const urlChangePassword = urlUser + `/change-password`;
export const urlContactUs = `${process.env.API_DOMAIN}contactus`;
export const urlForgot =`${process.env.API_DOMAIN}forgot`;
export const urlForgotPassword =`${urlForgot}/password`;
export const urlForgotUsername =`${urlForgot}/username`;
export const urlForgotSendOTP =`${urlForgot}/otp`;
export const urlForgotValidateOTP =`${urlForgotSendOTP}/validate`;
export const urlNotifications =`{PUBLIC_PATH}assets/data/notifications.json?_{_}`;
export const urlUploadFile =`${process.env.API_DOMAIN}uploader`;
export const urlFetchStories =`${process.env.API_DOMAIN}stories`;
export const urlUserLoginOTP = urlUserLogin + `/otp`;
export const urlCommunityInviteCode = urlCommunity + `/useCode`;
export const urlCommunitySetup = urlCommunity + `/setup`;
export const urlAnnouncements =`${process.env.API_DOMAIN}announcements`;
export const urlTasks = urlUser + `/tasks`;
export const urlCommunityGetInfo = urlCommunity + `/info`;
export const urlCommunityLeader = urlCommunity + `/leader`;
export const urlValidateTask = urlUser + `/tasks/validate/{id}`;

export const playStore = 'https://play.google.com/store/apps/details?id=com.leni2022&hl=en&gl=US';
export const appStore = 'https://apps.apple.com/us/app/facebook/id284882215'