import { h, Component } from 'preact';
import { connect } from 'unistore/preact';
import { route } from 'preact-router';
import { showTourGuide, getTranslation, showAlertBox } from '_helpers';
import { Link } from 'preact-router/match';
import {
	ButtonDescription,
	ImageLoader
} from '_components/core';
// eslint-disable-next-line import/extensions
import style from './style';
import copy from 'clipboard-copy';

// eslint-disable-next-line react/prefer-stateless-function
class SignupSuccess extends Component {
	constructor(props) {
		super(props);
		this.state = {
			
		};
	}

	showTour = () => {
		route('/home', true);
		showTourGuide(true);
	}

	clickUpdateProfile = () => {
		route('/update-profile', true);
	}
	copyText = (text) =>{
		copy(text);
		showAlertBox({
			message: 'COPY_MSG_REFCODE',
			success: true
		});
	};

	render = ({authUser}) => {
		return (
			<>
			<div className={style.hashtag}>
				<h1 className={`extraBold`}>{`${getTranslation('IPANALO_NA10')}`}
					<span className={`extraBold`}>10</span>To</h1></div>
			<div className={style.introWrap}>
				<ImageLoader
					src={`leni_10.png`}
					style={{container: style.banner, image: style.img}}
					lazy />
				<div className={style.infoWrap}>
					<div className={style.referralCode}>
						<p className={`${style.text}`}>{getTranslation('YOUR_REFERRAL_CODE')} </p>
						<p onClick={() => {
							this.copyText(authUser.profile.refCode);
							}} id="copy-referral-code" className={`extraBold ${style.code}`}>
							{authUser.profile.refCode}
							<ImageLoader
								src="assets/icons/icon_copy_blue.png"
								style={{ container: `${style.copyImg}` }}
							/>
						</p>
					</div>
					<div className={style.recruit}>
						<Link id="update-profile" className={style.link} href={`/invite`}>
							<span>{getTranslation('RECRUIT')}</span>
						</Link> <span>{getTranslation('RECRUIT_MSG')}</span>
					</div>
				</div>

				<div className={style.navCards}>
					<div className={style.item}>
						<p className={style.description}>{getTranslation('QUICKTOUR_MSG')}</p>
							<button
									onClick={() => {this.showTour() }}
									id="signup-success-tour"
									className={`bold ${style.tour}`}
								>{getTranslation('QUICKTOUR')}</button>
					</div>
					<div className={style.item}>
						<p className={style.description}>
							{getTranslation('COMPLETE_PROFILE_MSG')}</p>
						<button
							onClick={() => {this.clickUpdateProfile() }}// onClickCallback={this.clickUpdateProfile()}
							id="signup-success-updateprofile"
							className={`bold ${style.updateProfile}`}
						>{getTranslation('GET_100PTS')}</button>
					</div>
				</div>

				<ButtonDescription
					onClickCallback={() => { route('/home', true) }}
					text={getTranslation('SKIP')}
					id="signup-success-skip"
					buttonStyle={`${style.skipBtn}`}
				/>
			</div>
			</>
		);
	};
}
export default connect(['authUser'])(SignupSuccess);