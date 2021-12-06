import { h, Component } from 'preact';
import { Link } from 'preact-router/match';
import { connect } from 'unistore/preact';
import { LoaderRing, ImageLoader } from '_components/core';
import { fetchMembers } from '_mutations';
import { getTranslation, formatNumber } from '_helpers';
// eslint-disable-next-line import/extensions
import style from './style';

// eslint-disable-next-line react/prefer-stateless-function
class Leaderboard extends Component {
	componentDidMount = () => {
	  const { members } = this.props;
	  if (!members.result && !members.fetching) {
	    fetchMembers();
	  }
	};

	render = ({ members }) => {
	  return (
	    <dv className={style.membersWrap}>
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
				{members.data.sort((a, b) => a.rank - b.rank).map(item => (
					<div className={style.item}>
						<ImageLoader 
							src={item.image}
							style={{container: style.avatar}} />
						<div className={style.nameMember}>
							<div>
								<p className={`light ${style.name}`}>{`${item.fname} ${item.lname}`}</p>
								<p className={`light ${style.members}`}>{`${item.members} ${getTranslation('MEMBERS')}`}</p>
							</div>
						</div>
						<div className={style.rank}>
							<p className={`light`}>{formatNumber(item.rank)}</p>
						</div>
						<div className={style.points}>
							<p className={`light`}>{formatNumber(item.points)}</p>
						</div>
					</div>
				))}
				{/* Loader */}
				{!members.result && <LoaderRing fullpage />}
			</dv>
	  );
	};
}
export default connect(['members'])(Leaderboard);
