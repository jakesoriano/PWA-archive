import { Component } from 'preact';
import { ImageLoader } from '_components/core';
import { fetchMessages } from '_mutations';
import { connect } from 'unistore/preact';
import { route } from 'preact-router';
import style from './style';
class MessagesPage extends Component {
  componentDidMount = () => {
    fetchMessages();
  };
  render = ({messages}) => (
    <div className={style.messagesWrap}>
      {
        messages.data.map((item) => (
          <div className={style.item} onClick={() => { route('messages-chat') }}>
            <ImageLoader
              src={item.user.image}
              style={{container: style.image}}
              lazy
            />
            <div className={`${style.details} ${item.unread ? style.unread : ''}`}>
              <p className={`extraBold ${style.name}`}>{item.user.name}</p>
              <p className={style.text}>{item.chat}</p>
            </div>
          </div>
        ))
      }
    </div>
  )
}
export default connect(['messages'])(MessagesPage);