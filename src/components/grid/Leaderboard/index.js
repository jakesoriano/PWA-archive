import { h, Component } from 'preact';
import { Link } from 'preact-router/match';
import { connect } from 'unistore/preact';
import { LoaderRing, ImageLoader } from '_components/core';
import { fetchMembers, getLeaderboardFilters, fetchTopRanking } from '_mutations';
import { getTranslation, formatNumber, getDefaultAvatar, showFilter, getRegions, getConfigByKey, displayPageLoader } from '_helpers';
// eslint-disable-next-line import/extensions
import style from './style';

// eslint-disable-next-line react/prefer-stateless-function
class Leaderboard extends Component {
	componentDidMount = () => {
    let data = {
      type: 'global',
      top: getConfigByKey('leaderboardTop'),
			isFromFilter: true
    }
		fetchMembers();
		getLeaderboardFilters();
		fetchTopRanking(data)
	};
	
	onShowFilter = () => {
		let { filters } = this.props;
		filters.data.map(item => {
			if (item.value === 'regional') {
				item.children = getRegions()
			}
		});
		let props = {
			data: filters.data,
			onClickParent: (val) => this.onClickCallback(val),
			onClickChild: (val) => this.onClickCallback(val)
		}

		showFilter(props)
	}

	onClickCallback = (val) => {
		let data = {
			type: val.parentVal,
			top: getConfigByKey('leaderboardTop'),
			isFromFilter: true
		}
		if (data.type === 'regional') {
			data.region = val.childVal
		}
		if (!val.hasChildren) {
			try {
				fetchTopRanking(data).then(() => {
					showFilter(null);
				});
			} catch (err) {
				console.log(err);
			}
		}
	}

	render = ({ topPerformers, filters }) => {
	  return (
	    <dv className={style.membersWrap}>
				
				{/* Title */}
				<div className={style.titleHead}>
					<p className={`bold ${style.title}`}>{getTranslation('TOP_PERFORMERS')}</p>
					<div
						className={style.filter}
						onClick={this.onShowFilter}
					>
						<ImageLoader 
							src="assets/icons/filter_icon.png"
							style={{container: style.filterIcon}}
						/>
						<span>{getTranslation('FILTER')}</span>
					</div>
				</div>
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
				{topPerformers.data && topPerformers.data.length && topPerformers.data.sort((a, b) => b.points - a.points).map((item, index) => (
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
				{!topPerformers.data || topPerformers.data.length <= 0 && <p className={style.noRecord}>{getTranslation('NO_DATA')}</p>}
				{/* Loader */}
				{!topPerformers.result && <LoaderRing fullpage />}
				{/* Filter */}
			</dv>
	  );
	};
}
export default connect(['members', 'filters', 'topPerformers'])(Leaderboard);
