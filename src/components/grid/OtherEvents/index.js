import { Component } from 'preact';
import { connect } from 'unistore/preact';
import { EventsList, LoaderRing, ImageLoader } from '_components/core';
import { fetchUpcomingOtherEvents, shareEvent } from '_mutations';
import {
	getTranslation,
	dateEventFormat,
} from '_helpers';
import { nativeShare } from '_platform/helpers';
import style from './style';

class OtherEvents extends Component {
	constructor(props) {
		super(props);
		this.state = {
			moreFetching: false,
			selectedItem: null
		};
	}
nativeShare
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

	onClickItem = (data) => {
		this.setState({
			selectedItem: data
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
			`
		});
		if (!item.shared) {
			shareEvent(item);
		}
	};

	renderDetails = (data) => {
		if (data) {
			return (
				<div className={style.pWrap}>
					<a className={`${style.pClose}`} onClick={() => {
						this.setState({
							selectedItem: null
						});
					}}>
						<ImageLoader
							src="assets/images/closebutton.png"
							style={{container: style.closeBtn}}
						/>
					</a>
					<div className={`${style.pHeader} ${style.pHeaderEvents}`}>
						<ImageLoader
								src={data.image}
								style={{container: style.pImage}}
								lazy />
						<div className={style.pEvents}>
							<p className={`bold ${style.pTitle}`}>{getTranslation(data.title)}</p>
							<p className={`${style.pDate}`}>
								{`${getTranslation('WHEN')}: ${dateEventFormat(data.date)}`} <br />
								{`${getTranslation('WHERE')}: ${data.location}`}
							</p>
						</div>
					</div>
					<p
						className={style.pContent}
						dangerouslySetInnerHTML={{
							__html: data.desc
						}}
					/>
					<a className={style.pShare} onClick={() => {
						this.onShareEvent(this.state.selectedItem);
					}}>
						<ImageLoader
								id={'event-like'}
								src="assets/images/share_icon_white.png"
								style={{container: style.pIconShare}} />
							<span>{getTranslation('SHARE')}</span>
					</a>
				</div>
			)
		}
		return null;
	};

	render = (props, state) => {
		return (
			<div className={style.otherEventsEventsWrap}>
				<div className={style.header}>
					<span className="bold">{getTranslation('OTHER_EVENTS')}</span>
				</div>
				<div className={style.body}>
          <EventsList data={props.oevents.data} onClickItemCallback={this.onClickItem} />
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
				{state.selectedItem && this.renderDetails(state.selectedItem)}
			</div>
		);
	};
}
export default connect(['oevents'])(OtherEvents);
