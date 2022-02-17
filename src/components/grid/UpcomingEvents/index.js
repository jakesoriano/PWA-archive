import { Component } from 'preact';
import { connect } from 'unistore/preact';
import { EventsList } from '_components/core';
import { fetchUpcomingEvents } from '_mutations';
import {
	getTranslation,
	getMonthYear,
	convertEpochToDate,
	getDayText,
} from '_helpers';
import style from './style';

class UpcomingEvents extends Component {
	constructor(props) {
		super(props);
		this.state = {
			grouped: [],
		};
	}
	componentDidMount = () => {
		fetchUpcomingEvents().then(() => {
			const { data } = this.props.upevents;
			let groupsByDate = data.reduce((arr, item) => {
				// group data by date
				arr[item.date] = arr[item.date] || [];
				arr[item.date].push(item);
				return arr;
			}, Object.create(null));
			this.setState({
				grouped: groupsByDate,
			});
		});
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
					{Object.keys(state.grouped).length &&
						Object.keys(state.grouped).map((key) => {
							const date = convertEpochToDate(key);
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
										<EventsList data={state.grouped[key]} />
									</div>
								</div>
							);
						})}
					{!Object.keys(state.grouped).length && (
						<p className={style.noRecord}>{getTranslation('NO_DATA')}</p>
					)}
				</div>
			</div>
		);
	};
}
export default connect(['upevents'])(UpcomingEvents);
