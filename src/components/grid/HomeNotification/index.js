import { Component } from 'preact';
import { updateStore } from '_unistore';
import { getConfigByKey, gmtHours } from '_helpers';
import { connect } from 'unistore/preact';
import { DismissableText } from '_components/core';
import style from './style';
class HomeNotification extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notif: null,
    };
  }
	onDismiss = () => {
	  let { notif } = this.state;
	  updateStore({
	    hnotification: notif?.id,
	  });
	};
	componentDidMount = () => {
	  this.setState({
	    notif: getConfigByKey('homeNotif'),
	  });
	};
	render = ({ hnotification, authUser }, { notif }) => {
	  if (
	    (!hnotification && notif) ||
			(hnotification && notif && hnotification !== notif.id)
	  ) {
	    return (
	      <div className={style.hnWrap}>
	        <DismissableText
	          text={notif.text.replace(
	            /{NAME}/,
	            authUser.profile.fname || 'User'
	          )}
	          date={new Date(notif.date).getTime() + gmtHours}
	          onClickDismissCb={this.onDismiss}
	        />
	      </div>
	    );
	  }
	};
}
export default connect(['hnotification', 'authUser'])(HomeNotification);
