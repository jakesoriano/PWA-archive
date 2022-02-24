import { Component } from 'preact';
import { shareEvent, selectTag } from '_mutations';
import { getTranslation, dateEventFormat } from '_helpers';
import { nativeShare } from '_platform/helpers';
import { ImageLoader } from '_components/core';
import { getCurrentUrl } from 'preact-router';
import style from './style';
const eventTags = [
	'INTERESTED',
	'GOING',
	'NOT_INTERESTED'
];
class EventsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      eventDropdown: null
    }
  }

	onSelectEventTag = (tag, item) => {
		selectTag(tag, item);
		this.setState({
			eventDropdown: null,
		});
	};

	onClickInterested = (item) => {
		this.setState({
      eventDropdown: null,
		}, () => {
      this.setState({
        eventDropdown: {
          show: true,
          id: item.id,
          tagged: item.tagged
        }
      });
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

	renderEventsDropdown = (item, isLastItem) => {
		const { eventDropdown } = this.state;
		if (eventDropdown && eventDropdown.show && eventDropdown.id === item.id) {
			return (
				<div 
					className={`${eventDropdown.tagged === 'INTERSTED'} ${style.selectEventDropdown} ${isLastItem ? style.lastItem : ''}`}>
					{eventTags.map(tag => (
						<a
              className={`event-tag-${tag.toLocaleLowerCase().replace(/_/g, '-')} ${eventDropdown.tagged === tag ? 'extraBold' : ''}`}
							onClick={() => {
								this.onSelectEventTag(tag, item)
							}}>
								<ImageLoader
								src={ `assets/images/${tag}-${eventDropdown.tagged === tag ? 'pink' : 'dark'}.png`}
								style={{container: style.likeButton}}/>
								{getTranslation(tag)}
						</a>
					))}
				</div>
			);
		}
		return null;
	};

  renderDom = (data) => {
    if (data && data.length) {
      return data.map((i, index) => (
        <div className={`${style.contentItem} ${style.eventItem}`}>
          {
            !getCurrentUrl().includes('community') &&
            <div className={style.community}>
              <ImageLoader
                src={i.community.image}
                style={{container: style.comImage}}
                lazy />
              <span>{getTranslation(i.community.name)}</span>
            </div>
          }
          <a className={style.details} onClick={() => {
            this.props.onClickItemCallback(i);
          }}>
            <ImageLoader
              src={i.image}
              style={{container: style.detailImage}}
              lazy />
            <div className={style.detailContent}>
              <p>{dateEventFormat(i.date)} <br />
              {`${getTranslation('EVENT_BY')}: ${i.by}`} <br />
              {getTranslation(i.isOnline ? 'ONLINE_EVENT' : 'ONSITE_EVENT')}</p>
              {i.likeCount || i.shareCount ? (
                <div className={style.detailCount}>
                  {i.likeCount && <span>{`${i.likeCount} ${getTranslation('LIKES')}`}</span>}
                  {i.shareCount && <span>{`${i.shareCount} ${getTranslation('SHARES')}`}</span>}
                </div>
              ): null}
            </div>
          </a>
          <div className={style.buttons}>
            <a
              className={`event-tag-options ${i.tagged ? `extraBold ${style.buttonLikeActive}` : ''}`}
              id={i.id}
              onClick={() => {
                this.onClickInterested(i);
              }}
              >
              <ImageLoader
              src={!i.tagged ? 'assets/images/INTERESTED-dark.png' : `assets/images/${i.tagged}-pink.png`}
              style={{container: style.likeButton}}/>
              {getTranslation(i.tagged || eventTags[0])}
              <ImageLoader
                src={'assets/images/drop_down_icon.png'}
                style={{container: style.likeButton}}/>
            </a>
            <a
              className={`event-share ${i.shared ? style.buttonShareActive : ''}`}
              onClick={() => {
                this.onShareEvent(i);
              }}>
              <ImageLoader
              src={!i.shared ? 'assets/images/share_icon_lite.png' : 'assets/images/share_icon_dark.png'}
              style={{container: `extraBold ${style.likeButton}`}}/>
              {getTranslation('SHARE')}
            </a>
            {this.renderEventsDropdown(i, (data.length - 1) === index)}
          </div>
        </div>
      ))
    }

    return <p className={style.noRecord}>{getTranslation('NO_DATA')}</p>
  }
  render = ({ data, onClickItemCallback }) => {
    return (
      <div className={style.eventsListWrap}>
        { this.renderDom(data) }
      </div>
    );
  }
}
export default EventsList;