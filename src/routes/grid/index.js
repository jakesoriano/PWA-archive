/* eslint-disable react/jsx-indent */
import { h, Component } from 'preact';
import { connect } from 'unistore/preact';
import { route, getCurrentUrl } from 'preact-router';
import { updateStore, store } from '_unistore';
import {
  prefetch,
  renderGrid,
  updateLanguage,
  getDefaultLanguage,
  getLanguageAlias,
  getQueryStringValue,
  getCookie,
  // messageModal,
  // getTranslation,
  setCookie
} from '_helpers';
import {
	fetchTranslation,
	fetchAppConfig,
	// fetchUserData
} from '_mutations';
import {
  LoaderRing,
  MessageModal,
  PromptModal,
  ComponentModal,
  BottomBar,
  Topbar,
  PopupPage,
  SideBar,
  BackToTop,
	AlertBox,
	PopupModal,
	CircleModal
} from '_components/core';
import {
	nativeWebReady,
	nativeExitApp,
	nativeGetDeviceId,
	nativeGetVersion
} from '_platform/helpers';
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
	  return page || 'landing';
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
	  const { selectedLanguage, authUser } = this.props;
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
	      return buildCookie !== process.env.BUILD_NO || shouldReFetch || (process.env.ENVIRONMENT === 'LOCAL');
	    })
			// // eslint-disable-next-line consistent-return
	    // .then((shouldReFetch) => {
	    //   // FETCH USER DATA
	    //   const token = getQueryStringValue('token') || getCookie('token');
	    //   if (token && (!authUser || (authUser && authUser.Token !== token))) {
	    //     return new Promise((resolve) => {
	    //       fetchUserData(token).then((res) => {
	    //         if (!res) {
	    //           messageModal({
	    //             title: '',
	    //             message: getTranslation('Login_LoggedOut')
	    //           });
	    //         }
	    //         resolve(true);
	    //       });
	    //     });
	    //   }
	    //   return shouldReFetch;
	    // })
	    .then((shouldReFetch) => {
	      if (shouldReFetch) {
	        return new Promise((resolve) => {
	          fetchTranslation().then(() => {
	            // fetch data
	            prefetch(Boolean(this.props.authUser)).then(() => {
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
				this.dashboardReady();
	    });
		
		// fetch app config
		fetchAppConfig();

		// get native version
		nativeGetVersion((v) => {
			updateStore({
				nativeVersion: v
			});
		});
	};

	componentDidUpdate = (prevProps) => {
	  // change language
	  const { selectedLanguage } = this.props;
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
	      prefetch(Boolean(this.props.authUser)).then(() => {
					if (!this.props.deviceId) {
						this.dashboardReady();
					}
					// set page data
					this.setPageData();
					// redirect to home page
					route('/home', true);
				});
	    });
		} else if (!prevProps.authUser && this.props.authUser) {
			// fetch data
			prefetch(Boolean(this.props.authUser));
	  } else {
	    // reset page data
	    this.resetPageData(prevProps);
	  }

	  this.setPageData();

		// page change
		if (prevProps && this.props && prevProps.url !== this.props.url) {
			// fetch app config
			fetchAppConfig();
		}
	};

	dashboardReady = () => {
		// dashboard is now ready
		nativeWebReady();
		// device id
		nativeGetDeviceId((id) => {
			updateStore({
				deviceId: id
			});
		});
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

	renderAlert = () => {
	  const { alertShow } = this.props;
	  try {
	    const props = { ...alertShow };
	    // eslint-disable-next-line react/jsx-props-no-spreading
	    return <AlertBox {...props} />;
	  } catch (err) {
	    // eslint-disable-next-line no-console
	    console.error('Widget Component >> renderAlert >> Error:', err);
	    return null;
	  }
	};

	renderPopupModal = () => {
	  const { popupModal } = this.props;
	  try {
	    const props = { ...popupModal };
	    // eslint-disable-next-line react/jsx-props-no-spreading
	    return <PopupModal {...props} />;
	  } catch (err) {
	    // eslint-disable-next-line no-console
	    console.error('Widget Component >> renderAlert >> Error:', err);
	    return null;
	  }
	};

	renderCircleModal = () => {
	  const { circleModal } = this.props;
	  try {
	    const props = { ...circleModal };
	    // eslint-disable-next-line react/jsx-props-no-spreading
	    return <CircleModal {...props} />;
	  } catch (err) {
	    // eslint-disable-next-line no-console
	    console.error('Widget Component >> renderCircleModal >> Error:', err);
	    return null;
	  }
	};

	render = (
	  { authUser, translation, messageModal, promptModal, componentModal, pageLoader, alertShow, popupModal, circleModal },
	  { data, popup, rightSideBar }
	) => {
	  if (!data || !translation.data) {
	    return <LoaderRing fullpage />;
	  }
		// redirect to landing page
		const url = getCurrentUrl();
		if (!authUser && data.auth && url !== '/') {
			route('/', true);
		} else if (authUser && authUser.isNewUser && url !== '/registration-invite' && url !== '/home') {
			route('/registration-invite', true);
		} else if (authUser && !authUser.isNewUser && !data.auth && url !== '/home') {
			route('/home', true);
		}

	  return (
	  // eslint-disable-next-line react/jsx-fragments
	    <>
	      {/* Main Content */}
	      <div className={style.mainContent}>
	        {/* Content Wrap */}
	        <div className={style.contentWrap}>
	          {data && data.auth && (
	            <Topbar
								title={data.pageTitle || ''}
	              page={this.getPageName()}
	              toggleSideBar={this.toggleRightSideBar}
								notifications={this.props.notifications}
								withBack={data.withBack}
								onBack={() => {
									route(`/home`, true);
								}}
	            />
	          )}
	          <div
	            className={`${style.grid} ${rightSideBar ? style.pageOpac : ''} ${
	              data && data.auth ? '' : style.noUser
	            }`}
	            id={`page-${this.getPageName()}`}
	            type="grid_content"
	          >
	            {renderGrid(this.getPageName(), this.getPageName(), data)}
	          </div>
	          {data && data.auth && <BottomBar page={this.getPageName()} />}
	        </div>
	        {/* Popup Page */}
	        {popup && (
	          <PopupPage
							page={this.getPageName(true)}
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
					{alertShow && this.renderAlert()}
	        {/* Side Bar */}
	        {data && data.auth && <SideBar
						page={data.uri}
	          isOpen={rightSideBar}
	          toggleSideBar={this.toggleRightSideBar}
	        />}
	        {!authUser && <div className={style.footer}>{process.env.ENVIRONMENT !== 'PROD' && process.env.ENVIRONMENT}  {process.env.BUILD_NO}</div>}
	      </div>
	      {/* Modals */}
	      {messageModal && this.renderMessageModal()}
	      {promptModal && this.renderPromptModal()}
	      {componentModal && this.renderComponentModal()}
	      {popupModal && this.renderPopupModal()}
				{circleModal && this.renderCircleModal()}
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
  'pageLoader',
	'alertShow',
	'popupModal',
	'circleModal',
	'notifications',
	'deviceId'
])(Grid);
export default ConnectComponent;

// Push Forward
if (typeof window !== 'undefined') {

	// native back
  window.onNativeBack = () => {
		const { authUser } = store.getState();
		const path = getCurrentUrl();
		if (authUser && path !== '/home') {
			history.back();
		} else if (!authUser && path !== '/landing' && path !== '/') {
			history.back();
		} else {console.error('done')
			nativeExitApp();
		}
  };

	// native on resume
	window.onResume = () => {
		const path = getCurrentUrl();
		console.log('onResume', path);
	}
}
