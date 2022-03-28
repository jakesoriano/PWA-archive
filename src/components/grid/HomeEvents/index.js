/* eslint-disable react/jsx-curly-brace-presence */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable indent */
import { Component } from 'preact';
import { connect } from 'unistore/preact';
import { Link } from 'preact-router';
import { EventsList, ImageLoader } from '_components/core';
import { shareEvent } from '_mutations';
import {
	getTranslation,
	getMonthYear,
	getDayText,
	dateEventFormat,
	getFormatedDate,
	getDayNum,
	componentModal,
	getConfigByKey,
	gmtHours,
} from '_helpers';
import { nativeShare } from '_platform/helpers';
import style from './style';

class HomeEvents extends Component {
	constructor(props) {
		super(props);
		this.state = {
			grouped: null,
			moreFetching: false,
		};
	}
	componentDidMount = () => {
		const data = getConfigByKey('events') || [];
		// remove expired date / event
		const currentTimestamp = new Date().setHours('00', '00', '00');
		let groupsByDate = data
			.map((i) => {
				return {
					...i,
					date: new Date(i.date.replace(/-/gim, '/')).getTime() + gmtHours,
				};
			})
			.filter(
				(i) => new Date(getFormatedDate(i.date)).getTime() > currentTimestamp
			);
		// group by date
		if (groupsByDate && groupsByDate.length) {
			groupsByDate = groupsByDate
				.sort((a, b) => new Date(b.date) + new Date(a.date))
				.reduce((arr, item) => {
					// group data by date
					const eDate = getFormatedDate(item.date);
					arr[eDate] = arr[eDate] || [];
					arr[eDate].push(item);
					return arr;
				}, {});
			this.setState({
				grouped: groupsByDate,
			});
		}
	};

	onClickItem = (data) => {
		componentModal({
			content: this.renderDetails(data),
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
			);
		}
		return null;
	};

	render = ({ title, more, page }, { grouped }) => {
		if (!grouped) {
			return null;
		}

		return (
			<div className={style.homeEvents} id={`home-events`}>
				{/* Title and See All */}
				<div className={style.header}>
					<p className={`bold ${style.title}`}>{getTranslation(title)}</p>
					<Link
						href={`/${more.url}`}
						id={`${page}-see-all-news`}
						className={`bold ${style.name}`}
					>
						{getTranslation(more.text)}
					</Link>
				</div>
				<div className={style.body}>
					<p className={`bold ${style.title}`}>{getMonthYear(new Date())}</p>
					{grouped &&
						Object.keys(grouped).length &&
						Object.keys(grouped).map((key) => {
							const date =
								grouped[key] && grouped[key].length ? grouped[key][0].date : '';
							return (
								<div className={style.item}>
									<div className={style.box}>
										<span className={style.day}>
											{date ? getDayText(date).substring(0, 3) : ''}
										</span>
										<span className={`bold ${style.date}`}>
											{date ? getDayNum(date) : ''}
										</span>
									</div>
									<div className={style.events}>
										<EventsList
											data={grouped[key]}
											onClickItemCallback={this.onClickItem}
											hideTag
										/>
									</div>
								</div>
							);
						})}
				</div>
			</div>
		);
	};
}
export default connect(['upevents'])(HomeEvents);
