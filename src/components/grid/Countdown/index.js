import { Component } from 'preact';
// import { route } from 'preact-router';
import {
  getTranslation,
  getConfigByKey,
  getCountdown,
  formatNumber
} from '_helpers';
import style from './style.scss';

// eslint-disable-next-line react/prefer-stateless-function
class Countdown extends Component {
  constructor(props) {
    super(props);
    this.state = {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      finish: false
    };
    this.timer = null;
  }

	componentDidMount = () => {
	  this.setCountdown();
	};

	componentWillUnmount = () => {
	  try {
	    clearTimeout(this.timer);
	  } catch (err) {}
	}

	setCountdown = () => {
	  clearTimeout(this.timer);
	  const result = getCountdown(getConfigByKey('votingDate'));
	  this.setState({
	    ...result
	  }, () => {
	    this.timer = setTimeout(this.setCountdown, 1000);
	  })
	};

	render = ({}, { days, hours, minutes, seconds }) => {
	  return (
	    <div className={style.countdownWrap}>
	      <div className={style.countdown}>
	        <p className={`extraBold ${style.title}`}>{getTranslation('COUNTDOWN_TITLE')}</p>
	        <div className={style.content}>
	          <div className={style.count}>
	            <span>{days || '00'}</span>
	            <span>{getTranslation('DAYS')}</span>
	          </div>
	          <span> : </span>
	          <div className={style.count}>
	            <span>{hours || '00'}</span>
	            <span>{getTranslation('HOURS')}</span>
	          </div>
	          <span> : </span>
	          <div className={style.count}>
	            <span>{minutes || '00'}</span>
	            <span>{getTranslation('MINUTES')}</span>
	          </div>
	          <span> : </span>
	          <div className={style.count}>
	            <span>{seconds || '00'}</span>
	            <span>{getTranslation('SECONDS')}</span>
	          </div>
	        </div>
	      </div>
	      <div className={`${style.countdown} ${style.countdownAppDownload}`}>
	        <p className={`extraBold ${style.title}`}>{getTranslation('APP_DOWNLOADS')}</p>
	        <span className={style.appDownload}>{formatNumber(getConfigByKey('appDownloads'), 0)}</span>
	      </div>
	    </div>
	  );
	};
}
export default Countdown;
