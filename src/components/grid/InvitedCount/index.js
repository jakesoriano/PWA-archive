import { Component } from 'preact';
import { connect } from 'unistore/preact';
import { getTranslation } from '_helpers';
import style from './style';
class InvitedCount extends Component {
  render = ({ authUser, invited }) => (
    <div className={style.invitedCountWrap}>
      {invited.data.length > 0 &&
      (
        <>
          <div className={style.countCard}>
            <p className={`extraBold ${style.text}`}>{getTranslation('TOTAL_INVITED')} </p>
            <p className={`extraBold ${style.count}`}>{invited.data.length} </p>
          </div>
          <div className={style.countCard}>
            <p className={`extraBold ${style.text}`}>{getTranslation('TOTAL_POINTS')} </p>
            <p className={`extraBold ${style.count}`}>{authUser.points} </p>
          </div>
        </>
      )}
      {!invited.data.length && <p className={`extraBold ${style.noInvite}`}>{getTranslation('NO_INVITE')} </p>}
    </div>
  );
}
export default connect(['authUser','invited'])(InvitedCount);
