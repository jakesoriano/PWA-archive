import { Component } from 'preact';
import { connect } from 'unistore/preact';
import { ImageLoader } from '_components/core';
import { getTranslation } from '_helpers';
import style from './style';
class MessagesChat extends Component {
    render = ({authUser}) => (
        <div className={style.chatWrap}>
            <div className={style.head}>
                <ImageLoader
                    src={'asd'}
                    style={{container: style.listingImg}}
                    lazy
                />
                <div className={style.details}>
                    <p className='extraBold'>Community Volunteer Listing</p>
                    <p>Caravan Logistics</p>
                    <p>February 15, 2022</p>
                    <p>Metro Manila, QC, Batasan Hills</p>
                    {
                        authUser.profile.roles === '100' && <a href="#" className={style.button}>{getTranslation('MARK_AS_VOLUNTEER')}</a>
                    }
                </div>
            </div>
            <div className={style.body}>
                <div className={style.communityDetails}>
                    <ImageLoader
                        src={'ad'}
                        style={{container: style.communityImg}}
                        lazy
                    />
                    <p className={`extraBold ${style.name}`}>Engineers For Leni</p>
                </div>
                <div className={style.chat}>
                    <div className={`${style.chatBubble} ${style.self}`}>
                        Hi I want to be a volunteer for your caravan
                    </div>
                    <div className={`${style.chatBubble} ${style.self}`}>
                        Hi I want to be a volunteer for your caravan
                    </div>
                    <div className={`${style.chatBubble} ${style.other}`}>
                        Hi I want to be a volunteer for your carava
                    </div>
                    <div className={`${style.chatBubble} ${style.other}`}>
                        Hi I want to be a volunteer for your carava
                    </div>
                    <div className={`${style.chatBubble} ${style.self}`}>
                        Hi I want to be a volunteer for your caravan
                    </div>
                </div>
            </div>
        </div>
    )
}
export default connect(['authUser'])(MessagesChat);