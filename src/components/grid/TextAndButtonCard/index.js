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
          <a
            onClick={() => {
              this.redirectToLeaderboard();
            }}
            id="invite-to-leaderboard"
            className={`bold ${style.btn_}`}
          >{`${getTranslation('LEADERBOARD_CARD_BTN')} >`}</a>
        </div>
        <div className={style.item}>
          <p className={style.description}>
            {getTranslation('DISCORD_CARD_MSG')}</p>
          <a
            onClick={() => {
              this.redirectToDiscord();
            }}
            id="invite-to-discord"
            className={`bold ${style.btn_}`}
          >{`${getTranslation('DISCORD_CARD_BTN')} >`}</a>
        </div>
      </div>
    </div>
  );
}
export default TextAndButtonCard;
