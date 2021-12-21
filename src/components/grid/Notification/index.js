import { connect } from 'unistore/preact';
import { Component } from 'preact/dist/preact';
import { ImageLoader } from '_components/core';
import { getTranslation, displayPageLoader, replaceUrlPlaceholders } from '_helpers';
import style from './style';

class Notification extends Component {
  constructor () {
    super();
    this.state = {
      notifications: {
        isRead: false,
        data: []
      }
    }
  }

  componentDidMount = () => {
  }

  renderNotifications = () => {
    const { data } = this.props.notifications
    if (data && data.length) {
      return data.map((item) => (
        <div className={style.contentDetail}>
          <ImageLoader
            src={replaceUrlPlaceholders(item.image)}
            style={{ container: style.detailImage }}
          />
          <div className={style.detailCopy}>
            <p className={`bold ${style.detailTitle}`}>{getTranslation(item.title)}</p>
            <p className={style.detailDescription}>{getTranslation(item.description)}</p>
          </div>
          <a className={style.detailShare} onClick={this.onShare}>
            <ImageLoader
              src="assets/images/share_icon.png"
              style={{ container: style.share }}
            />
          </a>
        </div>
      ));
    }
    return <p className={style.noRecord}>{getTranslation('NO_DATA')}</p>
  }

  render = () => {
    return (
      <div className={style.notificationsWrapper}>
        <div className={style.notificationsContent}>
          <p className={style.heading}>{getTranslation('PAGE_NOTIFICATION')}</p>
          <div className={style.contentDetails}>
            {this.renderNotifications()}
          </div>
        </div>
      </div>
    );
  }
}

export default connect(['notifications', 'events', 'authUser'])(Notification);