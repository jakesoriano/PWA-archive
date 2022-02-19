import { h, Component } from 'preact';
import { Link } from 'preact-router/match';
import { connect } from 'unistore/preact';
import { LoaderRing, ImageLoader } from '_components/core';
import { fetchLeaderboard } from '_mutations';
import { leaderboardOptions } from '_constant';
import {
	getTranslation,
	formatNumber,
	getDefaultAvatar,
	showFilter,
	getRegions,
	displayName,
	displayPageLoader,
} from '_helpers';
// eslint-disable-next-line import/extensions
import style from './style';

// eslint-disable-next-line react/prefer-stateless-function
class Leaderboard extends Component {
	constructor(props) {
		super(props);
	}

	componentDidMount = () => {
		if (!this.props.leaderboard.fetching && !this.props.leaderboard.data) {
			displayPageLoader(true);
			fetchLeaderboard().then(() => {
				displayPageLoader(false);
			});
		}
	};

	onShowFilter = () => {
		leaderboardOptions.map((item) => {
			if (item.value === 'regional') {
				item.children = getRegions().map((i) => {
					if (this.props.leaderboard.filter.region === i.value) {
						i.selected = true;
					}
					return i;
				});
			}
		});
		let props = {
			data: leaderboardOptions,
			onClickParent: (val) => this.onClickCallback(val),
			onClickChild: (val) => this.onClickCallback(val),
			selected: this.props.leaderboard.filter.type || null,
		};

		// show popup options
		showFilter(props);
	};

	onClickCallback = (val) => {
		if (!val.hasChildren) {
			try {
				if ((val.parentVal === 'regional' && this.props.leaderboard.filter.region === val.childVal) || 
				(val.parentVal !== 'regional' &&  this.props.leaderboard.filter.type === val.parentVal)) {
					showFilter(null);
				} else {
					displayPageLoader(true);
					fetchLeaderboard(
						val.parentVal,
						val.parentVal === 'regional' ? val.childVal : null
					).then((a) => {
						displayPageLoader(false);
						showFilter(null);
					});
				}
			} catch (err) {
				console.log(err);
			}
		}
	};

	render = ({ leaderboard }) => {
		return (
			<dv className={style.membersWrap}>
				{/* Title */}
				<div className={style.titleHead}>
					<p className={`bold ${style.title}`}>
						{getTranslation('TOP_PERFORMERS')}
					</p>
					<div className={style.filter} onClick={this.onShowFilter}>
						<ImageLoader
							src="assets/icons/filter_icon.png"
							style={{ container: style.filterIcon }}
						/>
						<span>{getTranslation('FILTER')}</span>
					</div>
				</div>
				{/* header */}
				<div className={`${style.item} ${style.itemHeader}`}>
					<div className={style.avatar}></div>
					<div className={style.nameMember}></div>
					<div className={style.rank}>
						<p className={`bold`}>{getTranslation('RANK')}</p>
					</div>
					<div className={style.points}>
						<p className={`bold`}>{getTranslation('POINTS')}</p>
					</div>
				</div>
				{/* content */}
				{leaderboard.data &&
					leaderboard.data.length ?
					leaderboard.data
						.sort((a, b) => b.points - a.points)
						.map((item, index) => (
							<div className={style.item}>
								<ImageLoader
									src={item.profile.image || getDefaultAvatar()}
									style={{ container: style.avatar }}
								/>
								<div className={style.nameMember}>
									<div>
										<p
											className={`light ${style.name}`}
										>{displayName(item.profile)}</p>
										<p className={`light ${style.members}`}>{`${
											item.members
										} ${getTranslation('MEMBERS')}`}</p>
									</div>
								</div>
								<div className={style.rank}>
									<p className={`light`}>
										{formatNumber(item.rank || index + 1)}
									</p>
								</div>
								<div className={style.points}>
									<p className={`light`}>{formatNumber(item.points) || 0}</p>
								</div>
							</div>
						)) : null}
				{/* no record */}
				{!leaderboard.data ||
					(leaderboard.data.length <= 0 && (
						<p className={style.noRecord}>{getTranslation('NO_DATA')}</p>
					))}
				{/* Loader */}
				{!leaderboard.result && <LoaderRing fullpage />}
				{/* Filter */}
			</dv>
		);
	};
}
export default connect(['leaderboard'])(Leaderboard);
