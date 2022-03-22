import { Component } from 'preact';
import { connect } from 'unistore/preact';
import { updateStore } from '_unistore';
import { getConfigByKey, gmtHours } from '_helpers';
import { DismissableText } from '_components/core';
import Countdown from '../Countdown';
import style from './style.scss';

// eslint-disable-next-line react/prefer-stateless-function
class CountdownAndDismissableText extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notif: null,
      hide: false,
    };
  }

	componentDidMount = () => {
	  this.setNotif();
	};

	componentDidUpdate = () => {
	  this.setNotif();
	};

	setNotif = () => {
	  // try {
	  const newNotif = getConfigByKey('homeNotif');
	  const { notif } = this.state;
	  const { hnotification, authUser } = this.props;
	  if (
	    newNotif &&
			authUser &&
			(!hnotification || hnotification !== newNotif?.id) &&
			notif?.id !== newNotif?.id
	  ) {
	    return this.setState({
	      notif: newNotif,
	    });
	  }
	  // } catch(err) {
	  // 	console.warn('Set Dissimisable Text', err);
	  // }
	};

	onDismissText = () => {
	  const { notif } = this.state;
	  // hide class first to animate
	  this.setState(
	    {
	      hide: true,
	    },
	    () => {
	      setTimeout(() => {
	        // tag last id shown
	        updateStore({
	          hnotification: notif?.id,
	        });
	        // reset notif in state
	        this.setState({
	          notif: null,
	          hide: false,
	        });
	      }, 200);
	    }
	  );
	};

	renderDismissableText = () => {
	  const { notif, hide } = this.state;
	  const { authUser } = this.props;
	  if (notif) {
	    return (
	      <div className={`${style.dismissTextWrap} ${hide ? style.hide : ''}`}>
	        <DismissableText
	          text={notif.text.replace(
	            /{NAME}/,
							authUser?.profile?.fname || 'User'
	          )}
	          date={new Date(notif.date).getTime() + gmtHours}
	          onClickDismissCb={this.onDismissText}
	        />
	      </div>
	    );
	  }
	};

	render = ({}, { notif }) => {
	  return (
	    <div className={notif ? style.hasDismissableText : ''}>
	      {/* text */}
	      {this.renderDismissableText()}
	      {/* countdown */}
	      <div className={style.countdownCont}>
	        <Countdown />
	      </div>
	    </div>
	  );
	};
}

export default connect(['hnotification', 'authUser'])(
  CountdownAndDismissableText
);
