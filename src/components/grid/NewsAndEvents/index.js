import { Component } from 'preact';
import { connect } from 'unistore/preact';
import { 
  fetchNews,
  fetchNewsByCommunity,
  fetchEventsByCommunityId,
  fetchEvents,
  fetchAnnouncements } from '_mutations';
import {
  getTranslation,
  dateEventFormat,
  getConfigByKey
} from '_helpers';
import { nativeShare } from '_platform/helpers';
import { ImageLoader, LoaderRing, EventsList, AnnouncementsList, NewsList } from '_components/core';
import { getCurrentUrl } from 'preact-router';
// eslint-disable-next-line import/extensions
import style from './style';

// eslint-disable-next-line react/prefer-stateless-function
class NewsAndEvents extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: '',
      tabs: ['events', 'announcements', 'news'],
      selectedItem: null,
      moreFetching: false
    }
  }

	componentDidMount = () => {
	  const { hiddenTabs } = this.props;
	  let { tabs } = this.state;
	  if (hiddenTabs) {
	    tabs = tabs.filter((i) => hiddenTabs.indexOf(i) === -1);
	    this.setState({
	      tabs: tabs,
	      active: tabs[0]
	    }, () => {
	      this.initFetch()
	    });
	  } else {
	    this.initFetch()
	  }
	};

	initFetch = () => {
	  this.state.tabs.map((i) => { 
	    if (i === 'events') {
	      fetchEvents();
	    } else if (i === 'news') {
	      fetchNews();
	    } else if (i === 'announcements') {
	      fetchAnnouncements();
	    }
	  });
	}

  componentDidUpdate = () => {
    if (this.state.moreFetching && this.getSelectedTabContent() && !this.getSelectedTabContent().fetching) {
      this.setState({
        moreFetching: false
      });
    }
  }

  handleShowMore = () => {
    if (!this.state.moreFetching) {
      let { active } = this.state;
      // flag
      this.setState({
        moreFetching: true
      });
      // fetch
      if (active === 'news') {
        getCurrentUrl() === '/community-details' ? fetchNewsByCommunity(fetchNews(this.props.communityDetails.details.id, this.getSelectedTabContent().page + 1)) : fetchNews(this.getSelectedTabContent().page + 1);
      } else if (active === 'events') {
        getCurrentUrl() === '/community-details' ? fetchEventsByCommunityId(this.props.communityDetails.details.id, this.getSelectedTabContent().page + 1) : fetchEvents(this.getSelectedTabContent().page + 1);
      } else {
        fetchAnnouncements(this.getSelectedTabContent().page + 1);
      }
    }
  };

	toggleTab = (tab) => {
	  this.setState({
	    active: tab
	  })
	}

	onClickItem = (data) => {
	  this.setState({
	    selectedItem: data
	  });
	};

	onShareNews = (item) => {
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
			`
	  });
	  if (!item.shared) {
	    likeShareNews(item, 'shared', item.community.id);
	  }
	};

	onShareEvent = (item) => {
	  nativeShare({
	    url: item.image,
	    title: item.title,
	    message: `\n\n
				Unity despite diversity leads to victory. Come join us, KakamPink!\n\n
				Event Title: ${item.title}\n
				Event Date: ${dateEventFormat(item.date)}\n
				${item.link ? 'Event Link: ' + item.link : ''}\n\n
				${getTranslation(item.isOnline ? 'ONLINE_EVENT' : 'ONSITE_EVENT')}:\n
				Event Location: ${item.location}
			`
	  });
	  if (!item.shared) {
	    shareEvent(item);
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
			`
	  });
	  if (!item.shared) {
	    likeShareAnnouncements(item, 'shared');
	  }
	};

	renderDetails = (data) => {
	  if (data) {
	    return (
	      <div>
	        <div className={style.backDrop}></div>
	        <a className={`${style.pClose}`}
	          onClick={() => {
	            this.setState({
	              selectedItem: null
	            });
	          }}>
	          <ImageLoader
	            src="assets/images/icon_close_white.png"
	            style={{ container: style.closeBtn }}
	          />
	        </a>
	        <div className={style.pWrap}>
	          <div className={`${style.pHeader} ${this.state.active === 'events' ? style.pHeaderEvents : ''}`}>
	            <div className={style.pNews}>
	              <p className={`bold ${style.pTitle}`}>{getTranslation(data.title)}</p>
	            </div>
	            <ImageLoader
	              src={data.image}
	              style={{ container: style.pImage }}
	              lazy />
					
	            <p className={style.source}>
	              {getTranslation('SOURCE')}: <br />
	              <a className={style.pLink} href={data.link}>{data.link}</a>
	            </p>
	            {(this.state.active === 'events') && (
	              <div className={style.pEvents}>
	                <p className={`${style.pDate}`}>
	                  {`${getTranslation('WHEN')}: ${dateEventFormat(data.date)}`} <br />
	                  {`${getTranslation('WHERE')}: ${data.location}`}
	                </p>
	              </div>
	            )}
	          </div>
	          <p
	            className={style.pContent}
	            dangerouslySetInnerHTML={{
	              __html: data.desc
	            }}
	          />
	          <a className={style.pShare}
	            onClick={() => {
	              if (this.state.active == 'news') {
	                this.onShareNews(this.state.selectedItem);
	              } else if (this.state.active == 'events') {
	                this.onShareEvent(this.state.selectedItem);
	              } else if (this.state.active == 'announcements') {
	                this.onShareAnnouncement(this.state.selectedItem);
	              }
	            }}>
	            <ImageLoader
	              id={this.state.active === 'events' ? 'event-like' : 'announcement-like'}
	              src="assets/images/share_icon_white.png"
	              style={{ container: style.pIconShare }} />
	            <span>{getTranslation('SHARE')}</span>
	          </a>
	        </div>
	      </div>
	    )
	  }
	  return null;
	};

	renderNews = (data) => {
	  return <NewsList data={data} authUser={this.props.authUser} onClickItemCallback={this.onClickItem} />
	};

	renderAnnouncements = (data) => {
	  return <AnnouncementsList data={data} authUser={this.props.authUser} onClickItemCallback={this.onClickItem} />
	};

	renderEvents = (data) => {
	  return <EventsList data={data} onClickItemCallback={this.onClickItem} />
	};

	renderData = (active) => {
	  if (this.getSelectedTabContent()) {
	    if (active === 'news') {
	      return this.renderNews(this.getSelectedTabContent().data)
	    } if (active === 'events') {
	      return this.renderEvents(this.getSelectedTabContent().data)
	    } if (active === 'announcements') {
	      return this.renderAnnouncements(this.getSelectedTabContent().data)
	    }
	  }
	}

	renderTabs = (tabTitle) => {
	  return this.state.tabs.map((i) => {
	    return (
	      <span 
	        className={`bold ${this.state.active === i ? style.activeTab : ''}`}
	        onClick={() => {
	          this.toggleTab(i);
	        }}>{(tabTitle && getTranslation(tabTitle[i])) || getTranslation(i.toUpperCase())}</span>
	    );
	  });
	}

	render = (props, state) => {
	  return (
	    <>
	      <div className={style.newsAndEvents}>
	        <div className={style.tabWrap}>
	          {state.active && this.renderTabs(props.tabTitle)}
	        </div>
	        <div className={style.content}>
	          {/* data */}
	          { this.getSelectedTabContent() && this.getSelectedTabContent().page === 1 && !this.getSelectedTabContent().data.length && this.getSelectedTabContent().fetching 
	            ? <LoaderRing styles={{ container: style.loaderWrapCenter }} />
	            : this.renderData(state.active) }
	          {/* show more */}
	          {state.active && this.getSelectedTabContent() && this.getSelectedTabContent().data.length < this.getSelectedTabContent().total && !this.getSelectedTabContent().fetching && (
	            <button
	              className={style.showMore}
	              onClick={this.handleShowMore}>
	              <span><span>&#8659;</span> {getTranslation('SHOW_MORE')}</span>
	            </button>
	          )}
	          {/* loader */}
	          {this.state.moreFetching && (
	            <LoaderRing styles={{ container: style.loaderWrap }} />
	          )}
	        </div>
	      </div>
	      {state.selectedItem && this.renderDetails(state.selectedItem)}
	    </>
	  );
	};

	getSelectedTabContent = () => {
	  if (getCurrentUrl() === '/community-details') {
	    return this.props[`c${this.state.active}`];
	  } 
	  return this.props[this.state.active]
	}
}
export default connect(['news', 'events', 'announcements', 'authUser', 'cevents', 'cnews', 'communityDetails',])(NewsAndEvents);
