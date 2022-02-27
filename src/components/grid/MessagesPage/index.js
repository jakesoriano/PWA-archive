import { Component } from 'preact';
import { ImageLoader } from '_components/core';
import { fetchMessages } from '_mutations';
import { connect } from 'unistore/preact';
import { route } from 'preact-router';
import { store, updateStore } from '_unistore';
import style from './style';
class MessagesPage extends Component {
  constructor(props) {
    super(props)
  };
  
  viewMessage = (feedId, listingId) => {
    route(`${this.props.page}/messages-chat?feedId=${feedId}&listingId=${listingId}`);
  };
  componentDidMount = () => {
    fetchMessages();
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
                {authUser.profile._id === item.user1 ? item.community.name : `${item.profile.fname} ${item.profile.lname}`}
              </p>
              <p className={style.text}>{item.latestMessage}</p>
            </div>
          </div>
        ))
      }
    </div>
  )
}
export default connect(['messages', 'authUser'])(MessagesPage);
