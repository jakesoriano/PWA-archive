/* eslint-disable react/jsx-indent */
import { h, Component } from 'preact';
import { connect } from 'unistore/preact';
import { route } from 'preact-router';
import { updateStore } from '_unistore';
import {
  prefetch,
  renderGrid,
  updateLanguage,
  getDefaultLanguage,
  getLanguageAlias,
  getQueryStringValue,
  getCookie,
  messageModal,
  getTranslation,
  setCookie
} from '_helpers';
import { fetchTranslation, fetchUserData } from '_mutations';
import {
  LoaderRing,
  MessageModal,
  PromptModal,
  ComponentModal,
  BottomBar,
  Topbar,
  PopupPage,
  SideBar,
  BackToTop
} from '_components/core';
import { nativeDashboardReady, nativeGetDeviceId } from '_platform/helpers';
// eslint-disable-next-line import/extensions
import style from './style';

class Grid extends Component {
  constructor (props) {
    super(props);
    this.state = {
      dataSet: false,
      data: null,
      popupSet: false,
      popup: null,
      rightSideBar: false,
      hideElements: null
    };
  }

	getPageName = (isPopup) => {
	  const { page, popup } = this.props;
	  if (isPopup) {
	    return popup;
	  }
	  return page || 'home';
	};

	setPageData = () => {
	  const { grid } = this.props;
	  const { data, dataSet, popup, popupSet } = this.state;
	  // set data
	  if (!grid.fetching && grid.data.length) {
	    if (!data && !dataSet) {
	      this.setState({
	        data: grid.data.find((i) => i.uri === this.getPageName()),
	        dataSet: true
	      });
	    }
	    if (this.getPageName(true) && !popup && !popupSet) {
	      this.setState({
	        popup: {
	          ...grid.data.find((i) => i.uri === this.getPageName(true)),
	          parent: grid.data.find((i) => i.uri === this.getPageName())
	        },
	        popupSet: true
	      });
	    }
	  }
	};

	resetPageData = (prevProps) => {
	  const resetState = {
	    data: false,
	    popup: false
	  };

	  if (prevProps !== undefined && prevProps.page !== this.getPageName()) {
	    resetState.data = true;
	  }

	  if (prevProps.popup !== this.getPageName(true)) {
	    resetState.popup = true;
	  }

	  // reset data
	  if (resetState.data || resetState.popup) {
	    const { data, dataSet, popup, popupSet } = this.state;
	    // eslint-disable-next-line react/no-did-update-set-state
	    this.setState({
	      data: resetState.data ? null : data,
	      dataSet: resetState.data ? false : dataSet,
	      popup: resetState.popup ? null : popup,
	      popupSet: resetState.popup ? false : popupSet
	    });
	  }
	};

	componentWillMount = () => {
	  const hideElements = getQueryStringValue('hide');
	  this.setState({
	    hideElements: hideElements
	      ? window
	        .decodeURIComponent(hideElements)
	        .replace(/\+/gim, ' ')
	        .split(',')
	      : null
	  });
	};

	componentDidMount = () => {
	  const { selectedLanguage, authUser, url } = this.props;
	  let langAlias = getLanguageAlias(
	    getQueryStringValue('lang') || getCookie('language')
	  );
	  new Promise((resolve) => {
	    if (
	      !selectedLanguage ||
				(langAlias && selectedLanguage && langAlias !== selectedLanguage)
	    ) {
	      langAlias = langAlias || getLanguageAlias(getDefaultLanguage());
	      updateLanguage(langAlias);
	      resolve(true);
	    } else {
	      resolve(false);
	    }
	  })
	    .then((shouldReFetch) => {
	      const buildCookie = getCookie(`${process.env.PREFIX}_build`);
	      setCookie(`${process.env.PREFIX}_build`, process.env.BUILD_NO);
	      return buildCookie !== process.env.BUILD_NO || shouldReFetch;
	    })
	  // eslint-disable-next-line consistent-return
	    .then((shouldReFetch) => {
	      // FETCH USER DATA
	      const token = getQueryStringValue('token') || getCookie('token');
	      if (token && (!authUser || (authUser && authUser.Token !== token))) {
	        return new Promise((resolve) => {
	          fetchUserData(token).then((res) => {
	            if (!res) {
	              messageModal({
	                title: '',
	                message: getTranslation('Login_LoggedOut')
	              });
	            }
	            resolve(true);
	          });
	        });
	      }
	      return shouldReFetch;
	    })
	    .then((shouldReFetch) => {
	      if (shouldReFetch) {
	        return new Promise((resolve) => {
	          fetchTranslation().then(() => {
	            // fetch data
	            prefetch().then(() => {
	              // set page data
	              this.setPageData();
	              resolve(true);
	            });
	          });
	        });
	      }
	      // set page data
	      this.setPageData();
	      return false;
	    })
	    .then(() => {
	      // dashboard is now ready
	      nativeDashboardReady();
	      // Save Prev and Last/Current Page to Cookie
	      setCookie(`${process.env.PREFIX}PrevPage`, '');
	      setCookie(`${process.env.PREFIX}LastPage`, url);
	      // device id
	      nativeGetDeviceId((id) => {
	        updateStore({
	          deviceId: id
	        });
	      });
	    });
	};

	componentDidUpdate = (prevProps) => {
	  // change language
	  const { selectedLanguage, url } = this.props;
	  if (
	    prevProps !== undefined &&
			prevProps.selectedLanguage !== selectedLanguage
	  ) {
	    // changed language
	    fetchTranslation().then(() => {
	      // reset state
	      this.setState({
	        data: null,
	        dataSet: false,
	        popup: null,
	        popupSet: false
	      });
	      // fetch data
	      prefetch();
	      // set page data
	      this.setPageData();
	      // redirect to home page
	      route('/', true);
	    });
	  } else {
	    // reset page data
	    this.resetPageData(prevProps);
	  }

	  // change route
	  if (prevProps.url !== url) {
	    // Save Prev and Last/Current Page to Cookie
	    setCookie(`${process.env.PREFIX}PrevPage`, prevProps.url);
	    setCookie(`${process.env.PREFIX}LastPage`, url);
	  }

	  this.setPageData();
	};

	toggleRightSideBar = () => {
	  const { rightSideBar } = this.state;
	  this.setState({ rightSideBar: !rightSideBar });
	};

	renderMessageModal = () => {
	  const { messageModal } = this.props;
	  try {
	    const props = { ...messageModal };
	    // eslint-disable-next-line react/jsx-props-no-spreading
	    return <MessageModal {...props} />;
	  } catch (err) {
	    // eslint-disable-next-line no-console
	    console.error('Widget Component >> rendemMessageModal >> Error:', err);
	    return null;
	  }
	};

	renderPromptModal = () => {
	  const { promptModal } = this.props;
	  try {
	    const props = { ...promptModal };
	    // eslint-disable-next-line react/jsx-props-no-spreading
	    return <PromptModal {...props} />;
	  } catch (err) {
	    // eslint-disable-next-line no-console
	    console.error('Widget Component >> rendemPromptModal >> Error:', err);
	    return null;
	  }
	};

	renderComponentModal = () => {
	  const { componentModal } = this.props;
	  try {
	    const props = { ...componentModal };
	    // eslint-disable-next-line react/jsx-props-no-spreading
	    return <ComponentModal {...props} />;
	  } catch (err) {
	    // eslint-disable-next-line no-console
	    console.error('Widget Component >> rendemPromptModal >> Error:', err);
	    return null;
	  }
	};

	renderStyleViaQuery = (elements) => {
	  return (
	    <style type="text/css">{`${elements.join(',')} { display:none; }`}</style>
	  );
	};

	render = (
	  { translation, messageModal, promptModal, componentModal, pageLoader },
	  { data, popup, rightSideBar }
	) => {
	  if (!data || !translation.data) {
	    return <LoaderRing fullpage />;
	  }

	  return (
	  // eslint-disable-next-line react/jsx-fragments
	    <>
	      {/* Main Content */}
	      <div className={style.mainContent}>
	        {/* Content Wrap */}
	        <div className={style.contentWrap}>
	          <Topbar
	            page={this.getPageName()}
	            toggleSideBar={this.toggleRightSideBar}
	          />
	          <div
	            className={`${style.grid} ${rightSideBar ? style.pageOpac : ''}`}
	            id={`page-${this.getPageName()}`}
	            type="grid_content"
	          >
	            {renderGrid(this.getPageName(), this.getPageName(), data)}
	          </div>
	          <BottomBar page={this.getPageName()} />
	        </div>
	        {/* Popup Page */}
	        {popup && (
	          <PopupPage
	            title={popup.pageTitle}
	            onBack={() => {
	              route(`/${this.getPageName()}`, true);
	            }}
	          >
	            <div className={style.grid} id={`page-${this.getPageName(true)}`}>
	              {renderGrid(this.getPageName(true), this.getPageName(), popup)}
	            </div>
	          </PopupPage>
	        )}
	        {/* Side Bar */}
	        <SideBar
	          isOpen={rightSideBar}
	          toggleSideBar={this.toggleRightSideBar}
	        />
	        <div className={style.footer}>{process.env.BUILD_NO}</div>
	      </div>
	      {/* Modals */}
	      {messageModal && this.renderMessageModal()}
	      {promptModal && this.renderPromptModal()}
	      {componentModal && this.renderComponentModal()}
	      {pageLoader.display && <LoaderRing fullpage />}

	      <BackToTop
	        selector={`#page-${this.getPageName()}`}
	        scrollEnd
	        threshold={100}
	      />
	      {this.state.hideElements &&
					this.renderStyleViaQuery(this.state.hideElements)}
	    </>
	  );
	};
}

const ConnectComponent = connect([
  'authUser',
  'selectedLanguage',
  'grid',
  'translation',
  'promptModal',
  'messageModal',
  'componentModal',
  'pageLoader'
])(Grid);
export default ConnectComponent;

// Push Forward
if (typeof window !== 'undefined') {
  window.pushForward = (payload) => {
    if (!payload) {
      return false;
    }

    // eslint-disable-next-line
		console.log('SPA >> window.pushForward', payload);

    // redirect
    route(payload, false);

    return true;
  };
}
