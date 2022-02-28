import { Component } from 'preact';
import { ImageLoader, LoaderRing } from '_components/core';
import { fetchMessages } from '_mutations';
import { connect } from 'unistore/preact';
import { route } from 'preact-router';
import { getTranslation } from '_helpers';
import style from './style';
class MessagesPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      moreFetching: false
    }
  };

  handleShowMore = () => {
    if (!this.state.moreFetching) {
      this.setState({
        moreFetching: true
      });
      fetchMessages();
    }
  };
  viewMessage = (feedId, listingId) => {
    route(`${this.props.page}/messages-chat?feedId=${feedId}&listingId=${listingId}`);
  };
  componentDidMount = () => {
    fetchMessages();
  };

  componentDidUpdate = () => {
    if (this.state.moreFetching && !this.props.messages.fetching) {
      this.setState({
        moreFetching: false
      });
    }
  };
  render = ({messages, authUser}) => (
    <div className={style.messagesWrap}>
      {
        messages.data.map((item, i) => (
          <div className={style.item} onClick={() => this.viewMessage(item.feedId, item.listingId)}>
            <ImageLoader
              src={item.community.image}
              style={{container: style.image}}
              lazy
            />
            <div className={`${style.details} ${item.unread ? style.unread : ''}`}>
              <p className={`extraBold ${style.name}`}>
                {item.community.name}
              </p>
              <p className={style.needs}>{item.listing?.needs}</p>
              <p className={style.text}>{item.latestMessage}</p>
            </div>
          </div>
        ))
      }
      {messages?.data?.length < messages?.total && !messages?.fetching && (
        <button
          className={style.showMore} onClick={this.handleShowMore}>
          <span><span>&#8659;</span> {getTranslation('SHOW_MORE')}</span>
        </button>
      )}
      {this.state.moreFetching && (
        <LoaderRing styles={{container: style.loaderWrap}}/>
      )}
    </div>
  )
}
export default connect(['messages', 'authUser'])(MessagesPage);
