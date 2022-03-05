/* eslint-disable react/jsx-curly-brace-presence */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable indent */
import { Component } from 'preact';
import { connect } from 'unistore/preact';
import { EventsList, LoaderRing, ImageLoader } from '_components/core';
import { fetchUpcomingOtherEvents, shareEvent } from '_mutations';
import {
	getTranslation,
	getMonthYear,
	getDayText,
	dateEventFormat,
} from '_helpers';
import { nativeShare } from '_platform/helpers';
import style from './style';

class UpcomingEvents extends Component {
	constructor(props) {
		super(props);
		this.state = {
			grouped: null,
			moreFetching: false,
			selectedItem: null,
		};
	}
	componentDidMount = () => {
		fetchUpcomingOtherEvents('current_month').then(() => {
			const { data } = this.props.upevents;
			let groupsByDate = data
				.sort((a, b) => new Date(b.date) - new Date(a.date))
				.reduce((arr, item) => {
					// group data by date
					arr[item.date] = arr[item.date] || [];
					arr[item.date].push(item);
					return arr;
				}, Object.create(null));
			this.setState({
				grouped: groupsByDate,
			});
			fetchUpcomingOtherEvents('outside_current_month', 1, 6);
		});
	};

	onClickItem = (data) => {
		this.setState({
			selectedItem: data,
		});
	};

	onShareEvent = (item) => {
		nativeShare({
			url: item.image,
			title: item.title,
			message: `\n\n
				Unity despite diversity leads to victory. Come join us, KakamPink!\n\n
				Event Title: ${item.title}\n
				Event Date: ${dateEventFormat(item.date)}\n
				${item.link ? 'Event Link: ' + item.link : ''}\n\n
				${getTranslation(item.isOnline ? 'ONLINE_EVENT' : 'ONSITE_EVENT')}:\n
				Event Location: ${item.location}
			`,
		});
		if (!item.shared) {
			shareEvent(item);
		}
	};

	renderDetails = (data) => {
		if (data) {
			return (
				<div>
					<div className={style.backDrop}></div>
						<a className={`${style.pClose}`}
						onClick={() => {
							this.setState({
							selectedItem: null
							});
						}}>
						<ImageLoader
							src="assets/images/icon_close_white.png"
							style={{ container: style.closeBtn }}
						/>
					</a>
					<div className={style.pWrap}>
						<div className={`${style.pHeader} ${style.pHeaderEvents}`}>
							<p className={`bold ${style.pTitle}`}>
								{getTranslation(data.title)}
							</p>
							<ImageLoader
								src={data.image}
								style={{ container: style.pImage }}
								lazy
							/>
							<div className={style.pEvents}>
								<p className={`${style.pDate}`}>
									{`${getTranslation('WHEN')}: ${dateEventFormat(data.date)}`}{' '}
									<br />
									{`${getTranslation('WHERE')}: ${data.location}`}
								</p>
							</div>
						</div>
						<p
							className={style.pContent}
							dangerouslySetInnerHTML={{
								__html: data.desc,
							}}
						/>
						<a
							className={style.pShare}
							onClick={() => {
								this.onShareEvent(this.state.selectedItem);
							}}
						>
							<ImageLoader
								id={'event-like'}
								src="assets/images/share_icon_white.png"
								style={{ container: style.pIconShare }}
							/>
							<span>{getTranslation('SHARE')}</span>
						</a>
					</div>
				</div>
			);
		}
		return null;
	};

	render = (props, state) => {
		return (
			<div className={style.upcomingEventsWrap}>
				<div className={style.header}>
					<span className="bold">{getTranslation('UPCOMING_EVENTS')}</span>
				</div>
				<div className={style.body}>
					<p className={`extraBold ${style.title}`}>
						{getMonthYear(new Date())}
					</p>
					{state.grouped &&
						Object.keys(state.grouped).length &&
						Object.keys(state.grouped).map((key) => {
							const date = new Date(
								state.grouped[key].filter(
									(item) => key.toString() === item.date.toString()
								)[0].date
							);
							return (
								<div className={style.item}>
									<div className={style.box}>
										<span className={style.day}>
											{getDayText(date).substring(0, 3)}
										</span>
										<span className={`extraBold ${style.date}`}>
											{date.getUTCDate()}
										</span>
									</div>
									<div className={style.events}>
										<EventsList
											data={state.grouped[key]}
											onClickItemCallback={this.onClickItem}
										/>
									</div>
								</div>
							);
						})}
					{props.upevents.fetching && (
						<LoaderRing styles={{ container: style.loaderWrap }} />
					)}
					{!props.upevents.fetching &&
						state.grouped &&
						!Object.keys(state.grouped).length && (
							<p className={style.noRecord}>{getTranslation('NO_DATA')}</p>
						)}
				</div>
				{state.selectedItem && this.renderDetails(state.selectedItem)}
			</div>
		);
	};
}
export default connect(['upevents'])(UpcomingEvents);
