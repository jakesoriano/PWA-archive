import { Component } from 'preact';
import { connect } from 'unistore/preact';
import { route } from 'preact-router';
import { fetchAnnouncements, likeShareAnnouncements } from '_mutations';
import {
  getTranslation,
  getConfigByKey,
  dateNewsFormat,
  removeTags,
  componentModal,
} from '_helpers';
import { nativeShare } from '_platform/helpers';
import { ImageLoader, LoaderRing , ArticleDetails } from '_components/core';
// eslint-disable-next-line import/extensions
import style from './style';

// eslint-disable-next-line react/prefer-stateless-function
class GlobalAnnouncement extends Component {
  constructor(props) {
    super(props);
    this.state = {
      moreFetching: false,
    };
  }

	componentDidMount = () => {
	  fetchAnnouncements();
	};

	componentDidUpdate = () => {
	  if (
	    this.state.moreFetching &&
			this.props.announcements &&
			!this.props.announcements.fetching
	  ) {
	    this.setState({
	      moreFetching: false,
	    });
	  }
	};

	onShareAnnouncement = (item) => {
	  nativeShare({
	    url: item.image,
	    title: item.title,
	    message: `\n\n
				We tell it as it is. Only the truth, KakamPink!\n\n
				Shared via Kakampink App\n
				Download now!\n
				Android: ${getConfigByKey('playStore')}\n
				iOS: ${getConfigByKey('appStore')}\n\n
				Article Title: ${item.title}\n
				Ariticle Link: ${item.link || ''}\n
				Use my invite code: ${this.props.authUser.profile.refCode}
			`,
	  });
	  if (!item.shared) {
	    likeShareAnnouncements(item, 'shared');
	  }
	};

	onClickItem = (data) => {
	  componentModal({
	    content: <ArticleDetails data={data} />,
	  });
	};

	handleShowMore = () => {
	  if (!this.state.moreFetching) {
	    this.setState({
	      moreFetching: true,
	    });
	    fetchAnnouncements(this.props.announcements.page + 1);
	  }
	};

	seeAll = () => {
	  route(`/global-announcements`);
	};

	renderAnnouncements = () => {
	  let announcements_ = this.props.announcements.data;
	  const displayLimit = 3;
	  if (this.props.isDisplayFlex && announcements_.length > displayLimit) {
	    announcements_ = announcements_.slice(0, displayLimit);
	  }
	  return (
	    <div
	      className={`${style.announcementWindow} ${
					this.props.isDisplayFlex ? style.rows : ''
				} `}
	    >
	      {announcements_.length > 0 ? (
	        <div
	          className={`${style.announcementWrap} ${
							style['i' + announcements_.length]
						}`}
	        >
	          {announcements_.map((i) => (
	            <div className={style.item}>
	              <div
	                id="global-announcement-item"
	                className={style.details}
	                onClick={() => {
	                  this.onClickItem(i);
	                }}
	              >
	                <ImageLoader
	                  src={i.image}
	                  style={{ container: style.detailImage, image: style.img }}
	                />
	                <div
	                  className={`${style.detailContent} ${
											this.props.isDisplayFlex ? style.rows : ''
										}`}
	                >
	                  <div className={style.detailHead}>
	                    <span className={`extraBold ${style.userName}`}>
	                      {`${
													i.title.length > 30
													  ? `${removeTags(i.title || '').substr(0, 30)}...`
													  : i.title
												}`}
	                    </span>
	                  </div>
	                  <div className={style.detailBody}>
	                    <p className={`${style.detailTitle}`}>
	                      {dateNewsFormat(i.postedDate)}
	                    </p>
	                    <p className={style.detailDescription}>
	                      {removeTags(i.desc || '').substr(0, 100)}...
	                      <span className="extraBold">
	                        {' '}
	                        {`${
														i.desc.length > 100
														  ? `${getTranslation('VIEW')}`
														  : ''
													}`}
	                      </span>
	                    </p>
	                  </div>
	                </div>
	              </div>
	            </div>
	          ))}
	        </div>
	      ) : (
	        <p className={style.noRecord}>{getTranslation('NO_DATA')}</p>
	      )}
	    </div>
	  );
	};

	render = ({ announcements, title }, { selectedItem }) => {
	  return (
	    <>
	      <div
	        className={`${style.globalAnnouncement} ${
						!this.props.isDisplayFlex ? style.marginTop : ''
					}`}
	      >
	        {/* Title */}
	        {title && (
	          <div className={style.tabWrap}>
	            <span className={`bold ${style.activeTab}`}>
	              {getTranslation('ANNOUNCEMENTS')}
	            </span>
	          </div>
	        )}
	        <div className={style.content}>
	          {this.renderAnnouncements()}
	          {/* show more - horizontal */}
	          {this.props.isDisplayFlex && (
	            <p className={style.seeAll}>
	              <span className="extraBold" onClick={this.seeAll}>
	                {getTranslation('SEE_ALL')}
	              </span>
	            </p>
	          )}
	          {/* show more - vertical */}
	          {!this.props.isDisplayFlex &&
							announcements.data.length < announcements.total &&
							!announcements.fetching && (
	            <button
	              id="global-announcement-seeall"
	              className={style.showMore}
	              onClick={this.handleShowMore}
	            >
	              <span>
	                <span>&#8659;</span> {getTranslation('SHOW_MORE')}
	              </span>
	            </button>
	          )}
	          {/* loader */}
	          {this.state.moreFetching && (
	            <LoaderRing styles={{ container: style.loaderWrap }} />
	          )}
	        </div>
	      </div>
	    </>
	  );
	};
}
export default connect(['announcements', 'authUser'])(GlobalAnnouncement);
