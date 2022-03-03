/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import { h, Component } from 'preact';
import { Link } from 'preact-router/match';
import { connect } from 'unistore/preact';
import {
	getTranslation,
	dateLastLoginFormat,
	isUsingSocialLogin,
	showTourGuide
} from '_helpers';
import { ImageLoader } from '_components/core';
import { logOut } from '_mutations';
import { updateStore } from '_unistore';
// eslint-disable-next-line import/extensions
import style from './style';

// eslint-disable-next-line react/prefer-stateless-function
class SideBar extends Component {
	onClickMenu = () => {
		this.props.toggleSideBar();
	};

	render = ({ toggleSideBar, isOpen, authUser, page, communityInfo }) => {
		if (!authUser) {
			return null;
		}

		return (
			<div className={style.sideBarContainer}>
				{/* eslint-disable-next-line react/self-closing-comp */}
				<div
					onClick={toggleSideBar}
					className={isOpen ? style.sideBarOutside : null}
				>
				</div>
				<div
					className={
						isOpen
							? `${style.sideBar} ${style.toggled}`
							: style.sideBar
					}
				>
					{/* Side Bar Contents Here */}
					<div className={style.sUser}>
						<ImageLoader 
							src={authUser.profile.image || 'assets/images/myaccount_icon_inactive.png'}
							style={{container: style.sAvatar}}
							lazy />
						<div>
							<div>
									<p className={`${style.sName}`}>{`${getTranslation('HI_NAME').replace('{NAME}', authUser.profile.fname)}`}</p>
									<p className={style.sLogin}>{`${getTranslation('LAST_LOGIN').replace('{DATE_TIME}', dateLastLoginFormat(authUser.loginDate))}`}</p>
							</div>
						</div>
					</div>
					<div className={style.sMenu}>
						<Link id="sm-myprofile" href={`/profile`} className={style.sMItem} onClick={this.onClickMenu}>{getTranslation('MY_PROFILE')}</Link>
						{(!authUser.profile.roles || authUser.profile.roles !== '100') && (
							<Link id="sm-accountprofile" href={`/account-profile`} className={style.sMItem} onClick={this.onClickMenu}>{getTranslation('ACCOUNT_PROFILE')}</Link>
						)}
						{(authUser.profile.roles && authUser.profile.roles === '100') && ( 
							<div>
								<a className={style.sMItem}>{getTranslation('MANAGE_COMMUNITY_PAGE')}</a>
								{!communityInfo.data && (
									<Link id="sm-setuppage" href={`/community-setup`} className={`${style.sMItem} ${style.subItem}`} onClick={this.onClickMenu}>{getTranslation('SETUP_PAGE')}</Link>)
								}
								<Link id="sm-postcontent" href={`/post-content`} className={`${style.sMItem} ${style.subItem}`} 
									onClick={(e) => {
										this.onClickMenu();
										updateStore({
											leaderEditPost: null
										});
									}}>{getTranslation('POST_CONTENT')}</Link>
								<Link id="sm-managepage" href={`/manage-page`} className={`${style.sMItem} ${style.subItem}`} onClick={this.onClickMenu}>{getTranslation('PAGE_MANAGE_PAGE')}</Link>
								<Link id="sm-postvolunteerannouncement" href={`/post-volunteer-announcement`} className={`${style.sMItem} ${style.subItem}`} onClick={this.onClickMenu}>
									<div>{getTranslation('POST_VOLUNTEER_ANNOUNCEMENT')}</div>
								</Link>
							</div>
						)}
						{!isUsingSocialLogin() && (
							<Link id="sm-settings" href={`/settings`} className={style.sMItem} onClick={this.onClickMenu}>{getTranslation('SETTINGS')}</Link>
						)}
						<Link id="sm-wherehertolisten" href={`/contactus`} className={style.sMItem} onClick={this.onClickMenu}>{getTranslation('WHERE_HERE_TO_LISTEN')}</Link>
						<Link id="sm-tour-guide" href={`/home`} className={style.sMItem} onClick={(e) => {
							this.onClickMenu();
							showTourGuide(true);
						}}>{getTranslation('TOUR_GUIDE')}</Link>
						{/* <Link id="sm-myprofile" href="/home" className={style.sMItem} onClick={this.onClickMenu}>{getTranslation('PROTECT_LENI')}</Link> */}
						<Link id="sm-logout" href={`/`} className={style.sMItem} onClick={(e) => {
							logOut();
							this.onClickMenu(e);
						}}>{getTranslation('LOGOUT')}</Link>
					</div>
	      	<div className={style.footer}>{process.env.ENVIRONMENT !== 'PROD' && process.env.ENVIRONMENT} {process.env.BUILD_NO}</div>
				</div>
			</div>
		);
	}
}

export default connect(['authUser','communityInfo'])(SideBar);
