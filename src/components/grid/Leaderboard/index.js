import { h, Component } from 'preact';
import { Link } from 'preact-router/match';
import { connect } from 'unistore/preact';
import { LoaderRing, ImageLoader } from '_components/core';
import { fetchMembers } from '_mutations';
import { getTranslation, formatNumber, getDefaultAvatar } from '_helpers';
// eslint-disable-next-line import/extensions
import style from './style';

// eslint-disable-next-line react/prefer-stateless-function
class Leaderboard extends Component {
	componentDidMount = () => {
		fetchMembers();
	};

	render = ({ members }) => {
	  return (
	    <dv className={style.membersWrap}>
				
				{/* Title */}
				<p className={`bold ${style.title}`}>{getTranslation('TOP_PERFORMERS')}</p>
				{/* header */}
				<div className={`${style.item} ${style.itemHeader}`}>
					<div className={style.avatar}></div>
					<div className={style.nameMember}>
					</div>
					<div className={style.rank}>
						<p className={`bold`}>{getTranslation('RANK')}</p>
					</div>
					<div className={style.points}>
						<p className={`bold`}>{getTranslation('POINTS')}</p>
					</div>
				</div>
				{/* content */}
				{members.data.sort((a, b) => b.points - a.points).map((item, index) => (
					<div className={style.item}>
						<ImageLoader 
							src={item.image || getDefaultAvatar()}
							style={{container: style.avatar}} />
						<div className={style.nameMember}>
							<div>
								<p className={`light ${style.name}`}>{`${item.profile.fname} ${item.profile.lname}`}</p>
								<p className={`light ${style.members}`}>{`${item.members} ${getTranslation('MEMBERS')}`}</p>
							</div>
						</div>
						<div className={style.rank}>
							<p className={`light`}>{formatNumber(item.rank || index + 1)}</p>
						</div>
						<div className={style.points}>
							<p className={`light`}>{formatNumber(item.points) || 0}</p>
						</div>
					</div>
				))}
				{/* no record */}
				{members.data.length <= 0 && <p className={style.noRecord}>{getTranslation('NO_DATA')}</p>}
				{/* Loader */}
				{!members.result && <LoaderRing fullpage />}
			</dv>
	  );
	};
}
export default connect(['members'])(Leaderboard);
