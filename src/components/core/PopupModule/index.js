/* eslint-disable consistent-return */
/* eslint-disable react/no-unknown-property */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react/jsx-fragments */
/* eslint-disable no-restricted-syntax */
/* eslint-disable react/destructuring-assignment */

/** @format */
import { h, Component } from 'preact';
import { connect } from 'unistore/preact';
import {
  componentModal,
  getCookie,
  setCookieWithExpiration,
  generateStyles,
  replaceUrlPlaceholders
} from '_helpers';
// eslint-disable-next-line import/extensions
import style from './style';

// eslint-disable-next-line react/prefer-stateless-function
class PopupModule extends Component {
  constructor (props) {
    super(props);
    this.state = {
      currentlyOpened: false,
      popupItem: null
      // orientation: isPortrait() ? 'port' : 'land'
    };
  }

	clickHandler = () => {
	  this.setState({
	    currentlyOpened: false,
	    popupItem: null
	  });
	  componentModal(null);
	};

	shouldIntervalPopupDisplay = (sched, today) => {
	  const intervalStartTime = new Date(
	    `${today.getFullYear()}/${today.getMonth() + 1}/${today.getDate()} ${
	      sched.interval.start
	    }`
	  ).getTime();
	  let intervalEndTime = new Date(
	    `${today.getFullYear()}/${today.getMonth() + 1}/${today.getDate()} ${
	      sched.interval.end
	    }`
	  ).getTime();

	  // set interval end date to next day if time is less than start time
	  if (intervalEndTime < intervalStartTime) {
	    const nextDay = new Date(today.getTime() + 24 * 60 * 60 * 1000);
	    intervalEndTime = new Date(
	      `${nextDay.getFullYear()}/${
	        nextDay.getMonth() + 1
	      }/${nextDay.getDate()} ${sched.interval.end}`
	    ).getTime();
	  }

	  if (
	    today.getTime() > intervalStartTime &&
			today.getTime() < intervalEndTime
	  ) {
	    return true;
	  }
	  return false;
	};

	scheduledPopup = (sched, today) => {
	  let cookieExpiry = null;
	  // loop through expiration inside item's schedule
	  // get closest expiration time based on today's time
	  for (const exptime of sched.expiration) {
	    const exp = new Date(
	      `${today.getFullYear()}/${
	        today.getMonth() + 1
	      }/${today.getDate()} ${exptime}`
	    );

	    if (today.getTime() < exp.getTime()) {
	      // set cookie expiry if date time today is less than the scheduled expiration
	      cookieExpiry = exp.getTime();
	    }
	  }

	  return cookieExpiry;
	};

	intervalPopup = (sched, today) => {
	  // ? Add time of interval to today's date and time
	  let cookieExpiry = null;
	  if (sched.interval) {
	    const intervalSeconds = sched.interval.time * 60000;
	    cookieExpiry = today.getTime() + intervalSeconds;
	  }
	  return cookieExpiry;
	};

	getPopupItem = () => {
	  const { page } = this.props;

	  for (const item of this.props.popupModule.data) {
	    // get page to display from config
	    const pageToDisplay = item.config.page
	      ? item.config.page.toLowerCase()
	      : null;

	    // loop through schedules
	    for (const [i, sched] of item.config.schedule.entries()) {
	      // ? Replace dashes with slashes in case if config still has it
	      const schedule = Object.assign(sched, {
	        start: sched.start.replace(/-/g, '/'),
	        end: sched.end.replace(/-/g, '/')
	      });

	      const start = new Date(schedule.start).getTime();
	      const end = new Date(schedule.end).getTime();
	      const today = new Date();

	      // if dateToday is within start and end date and current page matches page to display
	      if (
	        today.getTime() >= start &&
					today.getTime() < end &&
					pageToDisplay === page.toLowerCase()
	      ) {
	        const cookieName = `popupModule_${item.id}_${i}`;
	        const popupCookie = getCookie(cookieName);

	        let popupCookieExpiry = null;
	        const intervalPopupShouldDisplay = sched.interval
	          ? this.shouldIntervalPopupDisplay(sched, today)
	          : false;

	        if (!sched.interval) {
	          // ! SCHEDULED POPUP
	          popupCookieExpiry = this.scheduledPopup(sched, today);
	        } else {
	          // ! INTERVAL POPUP
	          // eslint-disable-next-line no-lonely-if
	          if (intervalPopupShouldDisplay) {
	            popupCookieExpiry = this.intervalPopup(sched, today);
	          }
	        }

	        // if above condiions aren't met and/or cookieExpiry is null
	        if (!popupCookieExpiry) {
	          let exptime = '23:59'; // default expiration time
	          if (sched.expiration && sched.expiration.length) {
	            // eslint-disable-next-line prefer-destructuring
	            exptime = sched.expiration[0]; // set expiration time
	          }
	          // set cookie expiry on the next day
	          popupCookieExpiry = new Date(
	            `${today.getFullYear()}/${today.getMonth() + 1}/${
	              today.getDate() + 1
	            } ${exptime}`
	          ).getTime();
	        }

	        if (
	          (!sched.interval && !popupCookie) ||
						(sched.interval && intervalPopupShouldDisplay && !popupCookie)
	        ) {
	          // if no cookie is set
	          return {
	            data: item,
	            cookieName,
	            cookieExpiry: popupCookieExpiry
	          };
	        }
	      }
	    }
	  }

	  return null;
	};

	setPopupData = () => {
	  if (this.props.popupModule.data && !this.props.popupModule.fetching) {
	    const popupItem = this.getPopupItem();

	    if (popupItem) {
	      // Set State
	      this.setState({
	        popupItem: {
	          data: popupItem.data,
	          cookieName: popupItem.cookieName,
	          cookieExpiry: popupItem.cookieExpiry
	        }
	      });

	      // set cookie expiration
	      setCookieWithExpiration(
	        popupItem.cookieName,
	        1,
	        new Date(popupItem.cookieExpiry)
	      );

	      // log popup opened event
	      // this.logEvent(
	      // 	popupItem.data,
	      // 	'OPENED',
	      // 	popupItem.data.config.redirectTo.type
	      // );
	    }
	  }
	};

	componentDidMount = () => {
	  if (
	    !this.props.popupModule.fetching &&
			!this.state.popupItem &&
			!this.state.currentlyOpened
	  ) {
	    this.setPopupData();
	  }
	};

	shouldComponentUpdate = (nextProps, nextState) => {
	  if (!nextState.popupItem && !nextState.currentlyOpened) {
	    return true;
	  }

	  if (this.state.popupItem && this.state.currentlyOpened) {
	    return false;
	  }

	  return true;
	};

	componentDidUpdate = () => {
	  if (
	    !this.props.popupModule.fetching &&
			!this.state.popupItem &&
			!this.state.currentlyOpened
	  ) {
	    setTimeout(() => {
	      this.setPopupData();
	    }, 300);
	  }
	};

	setDisplayState = (status) => {
	  this.setState({
	    currentlyOpened: status
	  });
	};

	renderWithExternalLink = (item) => {
	  this.setDisplayState(true);
	  const content = (
	    <>
	      <a
	        class={style.popupimg}
	        href={item.config.redirectTo.link}
	        onClick={this.clickHandler}
	      >
	        <img src={replaceUrlPlaceholders(item.config.imageUrl)} />
	      </a>
	      <style type="text/css">
	        {generateStyles(
	          item.config.overrideStyles ? item.config.overrideStyles : []
	        )}
	      </style>
	    </>
	  );
	  return componentModal({
	    title: item.config.title,
	    content
	  });
	};

	renderWithPageLink = (item) => {
	  this.setDisplayState(true);
	  const content = (
	    <>
	      <a
	        class={style.popupimg}
	        href={item.config.redirectTo.link}
	        onClick={this.clickHandler}
	      >
	        <img src={replaceUrlPlaceholders(item.config.imageUrl)} />
	      </a>
	      <style type="text/css">
	        {generateStyles(
	          item.config.overrideStyles ? item.config.overrideStyles : []
	        )}
	      </style>
	    </>
	  );
	  return componentModal({
	    title: item.config.title,
	    content
	  });
	};

	render = () => {
	  if (this.state.popupItem) {
	    switch (this.state.popupItem.data.config.redirectTo.type) {
	    case 'page':
	      // render modal
	      return this.renderWithPageLink(this.state.popupItem.data);
	    case 'link':
	      // render modal
	      return this.renderWithExternalLink(this.state.popupItem.data);
				// case 'game':
				// 	// render modal
				// 	const imageUrl = this.props.popupItem.data.config.imageUrl;
				// 	return this.renderWithGameLink(
				// 		this.props.popupItem.data,
				// 		imageUrl
				// 	);
	    }
	  }
	  return null;
	};
}

export default connect(['popupModule'])(PopupModule);
