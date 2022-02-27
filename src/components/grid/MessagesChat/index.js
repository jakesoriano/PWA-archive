import { Component } from 'preact';
import { connect } from 'unistore/preact';
import { ImageLoader } from '_components/core';
import { updateStore } from '_unistore';
import {
    getTranslation,
    dateNewsFormat,
    getQueryStringValue,
    getConfigByKey
} from '_helpers';
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
        this.timer = null;
        this.pollInterval = (getConfigByKey('messagePollInterval') || 5)* 1000; // default 5 seconds
        this.state = {
            newMessage: '',
            selected: {},
            checkerSet: false,
            vStatus: false,
            feedId: getQueryStringValue('feedId'),
            listingId: getQueryStringValue('listingId')
        };
    };
    handleSend = (e) => {
        if (this.state.newMessage) {
            let { mChat, authUser, communityVolunteers } = this.props,
                messages = mChat.data?.messages || [],
                data = {},
                sListing = communityVolunteers.data.filter((item) => item.id === this.state.listingId)[0];
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
                communityId: sListing.communityId,
                listingId: sListing.id,
                message: this.state.newMessage
            }
            sendMessage(data, mChat.data?.messages ? this.state.feedId : null).then((res) => {
                if (res.success) {
                    updateStore({
                        mChat: {
                            ...mChat,
                            data: {
                                ...mChat.data,
                                messages: mChat.data?.messages.map((item, i) => {
                                    if (i === mChat.data?.messages.length - 1) {
                                        item.id = res.data.msgId
                                    }
                                    return item;
                                })
                            }
                        }
                    });
                    fetchMessagesFeed(this.state.feedId);
                    this.setState({
                        newMessage: ''
                    })
                    this.scrollToBottom();
                }
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
        let { mChat } = this.props;
        if (mChat.data?.messages?.length) {
            clearTimeout(this.timer);
            this.timer = setTimeout(() => {
                fetchLatestMessage(this.state.feedId).then(res => {
                    let latestMsg = mChat.data.messages[mChat.data.messages.length - 1];
                    if (res.data.latestMessageId !== latestMsg.id) {
                        fetchMessagesFeed(this.state.feedId).then(() => {
                            this.scrollToBottom();
                        });
                    }
                });
                this.setLatestFeedChecker();
            }, this.pollInterval);
            this.setState({
                checkerSet: true
            });
        }
    };
    componentDidMount = () => {
        let { mChat, messages } = this.props;
        let sMessage = messages.data.find((i) => i.listingId === this.state.listingId);
        updateStore({
            mChat: {
                ...mChat,
                data: {}
            }
        });
        fetchMessagesFeed(this.state.feedId).then(() => {
            this.scrollToBottom();
        });
        this.setLatestFeedChecker();
        if (sMessage) {
            fetchVolunteerStatus(
                this.state.feedId,
                sMessage.user2
            ).then((res) => {
                if (res) {
                    this.setState({
                        vStatus: res.data?.volunteer
                    })
                }
            });   
        }
    };
    componentWillUnmount = () => {
        clearTimeout(this.timer);
        fetchMessages();
    };
    componentDidUpdate = () => {
        this.scrollToBottom();
    };
    scrollToBottom = () => {
        let chatEl = document.querySelector('.chat');
        chatEl.scrollTop = chatEl.scrollHeight - chatEl.clientHeight;
    };
    render = ({authUser, mChat, communityVolunteers, messages}, {vStatus}) => {
        let sListing = communityVolunteers.data.find((i) => i.id === this.state.listingId) || mChat.data;
        let sMessage = messages.data.find((i) => i.listingId === this.state.listingId);
        
        if (!sListing ) {
            return null;
        }
        return (
            <div className={`${style.chatWrap} ${sMessage && sMessage?.user1 === authUser?.profile._id && !vStatus ? style.hasMarVolunterButton : ''}`}>
                <div className={style.head}>
                    <ImageLoader
                        src={sListing?.community?.image || sListing?.listing.community.image}
                        style={{container: style.listingImg}}
                        lazy
                    />
                    <div className={style.details}>
                        <p className={style.detailsTitle}>{sListing?.community?.name || sListing?.listing.community.name}</p>
                        <p>{sListing?.needs || sListing?.listing?.needs}</p>
                        <p>{dateNewsFormat(sListing?.date || sListing?.listing?.date)}</p>
                        <p>{sListing?.province || sListing?.listing?.province}, {sListing?.municipality || sListing?.listing?.municipality}, {sListing?.barangay || sListing?.listing?.barangay}</p>
                        {
                            sMessage && sMessage?.user1 === authUser.profile._id && !vStatus &&
                            <a
                                className={style.button}
                                onClick={() => {
                                    this.onMarkClicked(sMessage?.communityId, sMessage?.listingId, sMessage?.user2)
                                }}
                            >
                                {getTranslation('MARK_AS_VOLUNTEER')}
                            </a>
                        }
                    </div>
                </div>
                <div className={style.body}>
                    <div className={`chat ${style.chat}`}>
                        {
                        mChat.data?.messages && mChat.data?.messages.map((m) => {
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
                {
                    !vStatus &&
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
                }
                {
                    sMessage?.user2 === authUser.profile._id && vStatus && <div className={style.optOut}>
                        <p className='bold'>{getTranslation('MARKED_AS_VOLUNTEER')}</p>
                        <a
                            className={`bold ${style.button}`}
                            onClick={() => { this.onOptOutClicked(sMessage?.feedId, sMessage?.user2) }}
                        >
                            {getTranslation('OPT_OUT')}
                        </a>
                    </div>
                }
            </div>
        )
    }
}
export default connect(['authUser', 'messages', 'mChat', 'communityVolunteers'])(MessagesChat);
