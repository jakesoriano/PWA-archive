import { Component } from 'preact';
import { connect } from 'unistore/preact';
import { EventsList, LoaderRing } from '_components/core';
import { fetchUpcomingOtherEvents } from '_mutations';
import {
	getTranslation,
	getMonthYear,
	getDayText,
} from '_helpers';
import style from './style';

class UpcomingEvents extends Component {
	constructor(props) {
		super(props);
		this.state = {
			grouped: null,
			moreFetching: false
		};
	}
	componentDidMount = () => {
		fetchUpcomingOtherEvents('current_month').then(() => {
			const { data } = this.props.upevents;
			let groupsByDate = data.sort((a, b) => new Date(b.date) - new Date(a.date)).reduce((arr, item) => {
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
					{state.grouped && Object.keys(state.grouped).length &&
						Object.keys(state.grouped).map((key) => {
							const date = new Date(state.grouped[key].filter((item) => key.toString() === item.date.toString())[0].date);
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
					{props.upevents.fetching && (
						<LoaderRing styles={{container: style.loaderWrap}}/>
					)}
					{!props.upevents.fetching && state.grouped && !Object.keys(state.grouped).length && (
						<p className={style.noRecord}>{getTranslation('NO_DATA')}</p>
					)}
				</div>
			</div>
		);
	};
}
export default connect(['upevents'])(UpcomingEvents);
