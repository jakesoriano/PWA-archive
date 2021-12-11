export const urlTranslation = `{PUBLIC_PATH}assets/data/translations/{langAlias}.json?_{_}`;
export const urlGrid = `{PUBLIC_PATH}assets/data/grid.json?_{_}`;
export const urlUser = `{API_DOMAIN}user`;
export const urlUserLogin = urlUser + `/login`;
export const urlUserData = `${process.env.apiDomain}assets/data/user.json?_={_}`;
export const urlUserPoints = `{PUBLIC_PATH}assets/data/user-points.json?_={_}`;
export const urlRegistration = `{API_DOMAIN}registration`;
export const urlValidateUsername = urlRegistration + `/validate/username/{username}`;
export const urlSignup = urlRegistration + `/signup`;
export const urlRegister = urlRegistration + `/register`;
export const urlNews = `{API_DOMAIN}news`;
export const urlEvents = `{PUBLIC_PATH}assets/data/events.json?_{_}`;
export const urlMembers = `{PUBLIC_PATH}assets/data/members.json?_{_}`;
export const urlSendOTP = `{PUBLIC_PATH}assets/data/otp.json?_={_}`;
export const urlValidateOTP = `{PUBLIC_PATH}assets/data/otp.json?_={_}`;
export const urlInvited = `{API_DOMAIN}invitation`;
export const urlLike = urlUser + `/like`;
export const urlFollow = urlUser + `/follow`;
export const urlShare = urlUser + `/share`;

export const playStore = 'https://play.google.com/store/apps/details?id=com.facebook.katana&hl=en&gl=US';
export const appStore = 'https://apps.apple.com/us/app/facebook/id284882215'