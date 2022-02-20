import { Component } from 'preact';
import { connect } from 'unistore/preact';
import { EventsList, LoaderRing } from '_components/core';
import { fetchUpcomingOtherEvents } from '_mutations';
import { getTranslation } from '_helpers';
import style from './style';

class OtherEvents extends Component {
	constructor(props) {
		super(props);
		this.state = {
			moreFetching: false
		};
	}

  handleShowMore = () => {
    if (!this.state.moreFetching) {
      this.setState({
        moreFetching: true
      });
      fetchUpcomingOtherEvents('outside_current_month', this.props.oevents.page + 1, 6);
    }
  };

  componentDidUpdate = () => {
    if (this.state.moreFetching && !this.props.oevents.fetching) {
      this.setState({
        moreFetching: false
      });
    }
  };
	render = (props, state) => {
		return (
			<div className={style.otherEventsEventsWrap}>
				<div className={style.header}>
					<span className="bold">{getTranslation('OTHER_EVENTS')}</span>
				</div>
				<div className={style.body}>
          <EventsList data={props.oevents.data} />
          {
            props.oevents.data.length < props.oevents.total && !state.moreFetching && <button className={style.showMore} onClick={this.handleShowMore}>
              <span><span>&#8659;</span> {getTranslation('SHOW_MORE')}</span>
            </button>
          }
					{state.moreFetching && (
						<LoaderRing styles={{container: style.loaderWrap}}/>
					)}
					{!props.oevents.fetching && state.grouped && !Object.keys(state.grouped).length && (
						<p className={style.noRecord}>{getTranslation('NO_DATA')}</p>
					)}
				</div>
			</div>
		);
	};
}
export default connect(['oevents'])(OtherEvents);
