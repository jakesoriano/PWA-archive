import { Component } from 'preact';
import { route } from 'preact-router';
import { getTranslation } from '_helpers';
import style from './style';
class TextAndButtonCard extends Component {
  redirectToLeaderboard = () => {
    route('/leaderboard');
  }
  redirectToDiscord = () => {
    window.open('https://forms.gle/RZLdKo1UtiEQRSRX6', '_blank');
  }
  render = () => (
    <div className={style.navCardsWrap}>
      <div className={style.navCards}>
        <div className={style.item}>
          <p className={style.description}>{getTranslation('LEADERBOARD_CARD_MSG')}</p>
          <button
            onClick={() => {
              this.redirectToLeaderboard();
            }}
            id="invite-to-leaderboard"
            className={`bold ${style.tour}`}
          >{getTranslation('LEADERBOARD_CARD_BTN')}</button>
        </div>
        <div className={style.item}>
          <p className={style.description}>
            {getTranslation('DISCORD_CARD_MSG')}</p>
          <button
            onClick={() => {
              this.redirectToDiscord();
            }}
            id="invite-to-discord"
            className={`bold ${style.updateProfile}`}
          >{getTranslation('DISCORD_CARD_BTN')}</button>
        </div>
      </div>
    </div>
  );
}
export default TextAndButtonCard;
