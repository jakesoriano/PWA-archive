import { h, Component } from 'preact';
import { Link } from 'preact-router/match';
import { connect } from 'unistore/preact';
import { LoaderRing, ImageLoader } from '_components/core';
import { fetchMembers } from '_mutations';
import { getTranslation, getDefaultAvatar, formatNumber, displayName } from '_helpers';
// eslint-disable-next-line import/extensions
import style from './style';

// eslint-disable-next-line react/prefer-stateless-function
class Members extends Component {
	componentDidMount = () => {
		fetchMembers();
	};

	renderUserTitle = (profile) => {
		let user = profile.fname;
		if (profile.region) {
			user = user + `, ${profile.region}.`;
		}
		if (profile.municipality) {
			user = user + ` ${profile.municipality}`;
		}
		return user;
	};

	render = ({ members }) => {
	  if (!members.result) {
	    return <LoaderRing fullpage />;
	  }
		if (members.data && members.data.length) {
			return (
				<div className={style.membersWrap}>
					{members.data.map(item => (
						<div className={style.item}>
							<ImageLoader 
								src={item.image || getDefaultAvatar()}
								style={{container: style.avatar}}
								lazy />
							<div className={style.nameMember}>
								<div>
									<p className={`light ${style.name}`}>{this.renderUserTitle(item.profile)}</p>
									<p className={`light ${style.members}`}>{`${formatNumber(item.members, 2) || 0} ${getTranslation('MEMBERS')}`}</p>
								</div>
							</div>
						</div>
					))}
				</div>
			);
		} else {
			return <div className={style.membersWrap}><p className={style.noRecord}>{getTranslation('NO_MEMBERS')}</p></div>
		}
	};
}
export default connect(['members'])(Members);
