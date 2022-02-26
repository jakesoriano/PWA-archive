import { Component } from 'preact';
import { ImageLoader } from '_components/core';
import { fetchMessages } from '_mutations';
import { connect } from 'unistore/preact';
import { route } from 'preact-router';
import { store, updateStore } from '_unistore';
import style from './style';
class MessagesPage extends Component {
  viewMessage = (index) => {
    let { messages } = store.getState();
    updateStore({
      messages: {
        ...messages,
        selected: index
      }
    });
    route('messages-chat');
  };
  componentDidMount = () => {
    fetchMessages();
  };
  render = ({messages}) => (
    <div className={style.messagesWrap}>
      {
        messages.data.map((item, i) => (
          <div className={style.item} onClick={() => this.viewMessage(i)}>
            <ImageLoader
              src={item.community.image}
              style={{container: style.image}}
              lazy
            />
            <div className={`${style.details} ${item.unread ? style.unread : ''}`}>
              <p className={`extraBold ${style.name}`}>{item.community.name}</p>
              <p className={style.text}>{item.chat[0].text}</p>
            </div>
          </div>
        ))
      }
    </div>
  )
}
export default connect(['messages'])(MessagesPage);