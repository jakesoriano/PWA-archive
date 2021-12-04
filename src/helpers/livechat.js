import {
  getLanguageCode,
  replaceUrlPlaceholders,
  getConfigByKey
} from '_helpers';

export function livechatEnabled (link) {
  return Boolean(['LPV2', 'CW'].indexOf(link) > -1);
}

export function livechatClick (link) {
  try {
    if (['LPV2', 'CW'].indexOf(link) > -1) {
      const url =
				getConfigByKey('livechat', link === 'CW' ? 'chatwoot' : 'lpv2') || '';
      window.open(replaceUrlPlaceholders(url), '_blank');
    } else {
      document.getElementsByClassName('LPMcontainer')[0].click();
    }
  } catch (err) {}
}

export function livechatLog (selectedLanguage, authUser) {
  try {
    // SDES
    const sdesParams = {
      type: 'ctmrinfo', // MANDATORY
      info: {
        ctype: authUser ? authUser.RiskId : '', // Only Apply After Login VIP / NON VIP
        currency: authUser ? authUser.CurrencyCode : '', // Only Apply After Login
        userName: authUser ? authUser.MemberCode : '', // Only Apply After Login
        language: getLanguageCode(selectedLanguage) // LANGUAGE
      }
    };
    window.lpTag.sdes = window.lpTag.sdes || [];
    window.lpTag.sdes.push(sdesParams);
    // SECTION
    const sectionParams = [
      'mobweb',
      getLanguageCode(selectedLanguage),
      authUser ? authUser.RiskId : ''
    ];
    window.lpTag.section = sectionParams;
    // eslint-disable-next-line no-console
    console.log('lpTag.sdes', sdesParams);
    // eslint-disable-next-line no-console
    console.log('lpTag.section', sectionParams);
  } catch (err) {}
}
