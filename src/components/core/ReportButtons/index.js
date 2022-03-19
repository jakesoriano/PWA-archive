import { Component } from 'preact';
import { route } from 'preact-router';
import { getTranslation, componentModal } from '_helpers';
import style from './style';
class ReportButtons extends Component {
	onNavigate = (to) => {
	  componentModal(null);
	  route(to);
	};
	render = () => (
	  <div className={style.rbWrap}>
	    <button
	      className={style.button}
	      onClick={() => this.onNavigate('contactus')}
	    >
	      {getTranslation('WHERE_HERE_TO_LISTEN')}
	    </button>
	    <button
	      className={style.button}
	      onClick={() => this.onNavigate('lawyers-for-chel')}
	    >
	      {getTranslation('LAWYERS_FOR_CHEL')}
	    </button>
	  </div>
	);
}
export default ReportButtons;
