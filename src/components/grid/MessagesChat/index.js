import { Component } from 'preact';
import { connect } from 'unistore/preact';
import { ImageLoader } from '_components/core';
import { store, updateStore } from '_unistore';
import { getTranslation, dateNewsFormat } from '_helpers';
import {
    fetchMessages,
    fetchMessagesFeed,
    sendMessage,
    fetchLatestMessage,
    fetchVolunteerStatus,
    markAsVolunteer,
    optOutAsVolunteer
} from '_mutations';
import style from './style';
class MessagesChat extends Component {
    constructor(props) {
        super(props);
        let interval = null;
        this.state = {
            newMessage: '',
            selected: {},
            checkerSet: false,
            vStatus: false
        }
    };
    handleSend = (e) => {
        if (this.state.newMessage) {
            let { mChat, authUser } = this.props,
                messages = mChat.data.messages || [],
                data = {};
            messages.push({
                userId: authUser.profile._id,
                message: this.state.newMessage
            });
            e.preventDefault();
            updateStore({
                mChat: {
                    ...mChat,
                    data: {
                        ...mChat.data,
                        messages: messages
                    }
                }
            });
            data = {
                communityId: mChat.data.listing ? mChat.data.listing.community.id : this.state.selected.communityId,
                listingId: mChat.data.listing ? mChat.data.listing.id : this.state.selected.id,
                message: this.state.newMessage
            }
            sendMessage(data, this.state.selected.feedId).then(() => {
                updateStore({
                    mChat: {
                        ...mChat,
                        data: {
                            ...mChat.data,
                            messages: mChat.data.messages.map((item, i) => {
                                if (i === mChat.data.messages.length - 1) {
                                    item.id = res.data.msgId
                                }
                                return item;
                            })
                        }
                    }
                });
                this.scrollToBottom();
            });
        }
    };
    onInput = (e) => {
        this.setState({
            newMessage: e.target.value
        })
    };
    onMarkClicked = (communityId, listingId, userId) => {
        markAsVolunteer(communityId, listingId, userId).then((res) => {
            if (res.success) {
                this.setState({
                    vStatus: true
                })
            }
        })
    };
    onOptOutClicked = (feedId, userId) => {
        optOutAsVolunteer(feedId, userId).then((res) => {
            if (res) {
                this.setState({
                    vStatus: false
                })
            }
        })
    };
    setLatestFeedChecker = () => {
        this.interval = window.setInterval(() => {
            fetchLatestMessage(this.state.selected.feedId).then(res => {
                let { mChat } = this.props;
                let latestMsg = mChat.data.messages[mChat.data.messages.length - 1];
                if (res.data.latestMessageId !== latestMsg.id) {
                    fetchMessagesFeed(this.state.selected.feedId).then(() => {
                        this.scrollToBottom();
                    });
                }
            })
        }, 5000);
        this.setState({
            checkerSet: true
        });
    };
    componentWillMount = () => {
        let url = window.location.href,
            selected = {},
            { mChat } = this.props;
        updateStore({
            mChat: {
                ...mChat,
                data: {}
            }
        })
        if (!url.includes('?id')) {
            selected = this.props.messages.data[this.props.messages.selected];
        } else {
            selected = this.props.messages.selected
        }
        this.setState({
            selected: selected
        }, () => {
            if (this.state.selected.feedId) {
                console.log('wew')
                fetchMessagesFeed(this.state.selected.feedId).then(() => {
                    this.scrollToBottom();
                });
                this.setLatestFeedChecker();
                fetchVolunteerStatus(this.state.selected.feedId, this.state.selected.user2).then((res) => {
                    if (res) {
                        this.setState({
                            vStatus: res.data.volunteer
                        })
                    }
                })
            }
        })
    };
    componentWillUnmount = () => {
        clearInterval(this.interval);
    };
    componentDidUpdate = () => {
        this.scrollToBottom();
        if (!this.state.checkerSet) {
            this.setLatestFeedChecker();
        }
    };
    scrollToBottom = () => {
        let chatEl = document.querySelector('.chat');
        chatEl.scrollTop = chatEl.scrollHeight - chatEl.clientHeight;
    };
    render = ({authUser, mChat}, {selected, vStatus}) => {
        let s = !Object.keys(mChat.data).length ? selected : mChat.data.listing;
        console.log(s, 'wew ', selected)
        return (
            <div className={style.chatWrap}>
            <div className={style.head}>
                <ImageLoader
                    src={s?.community.image}
                    style={{container: style.listingImg}}
                    lazy
                />
                <div className={style.details}>
                    <p className='extraBold'>{s?.community.name}</p>
                    <p>{s?.needs}</p>
                    <p>{mChat.data.length && dateNewsFormat(s.date)}</p>
                    <p>{s?.province}, {s?.municipality}, {s?.barangay}</p>
                    {
                        selected?.user1 === authUser.profile._id && !vStatus &&
                        <a
                            className={style.button}
                            onClick={() => { this.onMarkClicked(selected.communityId, selected.listingId, selected.user2) }}
                        >
                            {getTranslation('MARK_AS_VOLUNTEER')}
                        </a>
                    }
                </div>
            </div>
            <div className={style.body}>
                <div className={`chat ${style.chat}`}>
                    {
                      mChat.data.messages && mChat.data.messages.map((m) => {
                          return (
                            <div
                                className={
                                    `
                                        ${!m.fromServer ? style.chatBubble : ''}
                                        ${m.userId === authUser.profile._id && !m.fromServer ? style.self : ''}
                                        ${m.userId !== authUser.profile._id && !m.fromServer ? style.other : ''}
                                        ${m.fromServer ? style.generated : ''}
                                    `
                                }
                            >
                                {m.message}
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
                selected.user2 === authUser.profile._id && vStatus && <div className={style.optOut}>
                    <p className='bold'>{getTranslation('MARKED_AS_VOLUNTEER')}</p>
                    <a
                        className={`bold ${style.button}`}
                        onClick={() => { this.onOptOutClicked(selected.feedId, selected.user2) }}
                    >
                        {getTranslation('OPT_OUT')}
                    </a>
                </div>
            }
        </div>
        )
    }
}
export default connect(['authUser', 'messages', 'mChat'])(MessagesChat);
