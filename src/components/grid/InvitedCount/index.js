import { Component } from 'preact';
import { connect } from 'unistore/preact';
import { getTranslation } from '_helpers';
import style from './style';
class InvitedCount extends Component {
  render = ({ authUser, members }) => (
    <div className={style.invitedCountWrap}>
      {members.data.length > 0 &&
      (
        <>
          <div className={style.countCard}>
            <p className={`extraBold ${style.text}`}>{getTranslation('TOTAL_INVITED')} </p>
            <p className={`extraBold ${style.count}`}>{members.data.length} </p>
          </div>
          <div className={style.countCard}>
            <p className={`extraBold ${style.text}`}>{getTranslation('TOTAL_POINTS')} </p>
            <p className={`extraBold ${style.count}`}>{authUser.points} </p>
          </div>
        </>
      )}
      {!members.data.length && <p className={`extraBold ${style.noInvite}`}>{getTranslation('NO_INVITE')} </p>}
    </div>
  );
}
export default connect(['authUser','members'])(InvitedCount);
