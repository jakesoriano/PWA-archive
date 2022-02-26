import { Component } from 'preact';
import { connect } from 'unistore/preact';
import { ImageLoader } from '_components/core';
import { store, updateStore } from '_unistore';
import { getTranslation, dateNewsFormat } from '_helpers';
import style from './style';
class MessagesChat extends Component {
    constructor(props) {
        super(props);
        this.state = {
            newMessage: ''
        }
    };
    handleSend = (e) => {
        if (this.state.newMessage) {
            let { messages } = store.getState();
            let selected = messages.data[messages.selected];
            e.preventDefault();
            updateStore({
                messages: {
                    ...messages,
                    data: messages.data.map((item) => {
                        if (item.id === selected.id) {
                            item.chat.push({
                                type: 'self',
                                text: this.state.newMessage
                            })
                        }
                        return item;
                    })
                }
            });
            this.setState({
                newMessage: ''
            })
        }
    };
    onInput = (e) => {
        this.setState({
            newMessage: e.target.value
        })
    };
    componentDidMount = () => {
        this.scrollToBottom();
    };
    componentDidUpdate = () => {
        this.scrollToBottom();
    };
    scrollToBottom = () => {
        let chatEl = document.querySelector('.chat');
        chatEl.scrollTop = chatEl.scrollHeight - chatEl.clientHeight;
    };
    render = ({authUser, messages}) => {
        let selected = messages.data[messages.selected];
        return (
            <div className={style.chatWrap}>
            <div className={style.head}>
                <ImageLoader
                    src={'asd'}
                    style={{container: style.listingImg}}
                    lazy
                />
                <div className={style.details}>
                    <p className='extraBold'>{selected.community.name}</p>
                    <p>{selected.listing.needs}</p>
                    <p>{dateNewsFormat(selected.listing.date)}</p>
                    <p>{selected.listing.province}, {selected.listing.municipality}, {selected.listing.barangay}</p>
                    {
                        selected.userId === authUser.profile._id && selected.status === 'pending' && <a href="#" className={style.button}>{getTranslation('MARK_AS_VOLUNTEER')}</a>
                    }
                </div>
            </div>
            <div className={style.body}>
                <div className={style.communityDetails}>
                    <ImageLoader
                        src={selected.community.image}
                        style={{container: style.communityImg}}
                        lazy
                    />
                    <p className={`extraBold ${style.name}`}>{selected.community.name}</p>
                </div>
                <div className={`chat ${style.chat}`}>
                    {
                      selected.chat.map((ch) => {
                          return (
                            <div className={`${style.chatBubble} ${ch.type === 'self' ? style.self : style.other}`}>
                                {ch.text}
                            </div>
                          )
                      })  
                    }
                </div>
            </div>
            <div className={style.footer}>
                <input
                    type="text"
                    className={style.sendInput}
                    onInput={this.onInput}
                    value={this.state.newMessage}
                />
                <a
                    className={style.button}
                    onClick={this.handleSend}
                >{getTranslation('SEND')}</a>
            </div>
            {
                selected.userId !== authUser.profile._id && selected.status === 'approved' && <div className={style.optOut}>
                    <p className='bold'>{getTranslation('MARKED_AS_VOLUNTEER')}</p>
                    <a className={`bold ${style.button}`}>{getTranslation('OPT_OUT')}</a>
                </div>
            }
        </div>
        )
    }
}
export default connect(['authUser', 'messages'])(MessagesChat);