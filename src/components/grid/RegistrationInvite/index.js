import { Component } from 'preact';
import { route } from 'preact-router';
import { updateStore } from '_unistore';
import { updateAvatar } from '_mutations';
import { connect } from 'unistore/preact';
import { nativeSelfie } from '_platform/helpers';
import { getTranslation, showAlertBox } from '_helpers';
import { InviteForm, ImageLoader, ButtonDescription } from '_components/core';
import { nativeShare } from '_platform/helpers';
// eslint-disable-next-line import/extensions
import style from './style';

// eslint-disable-next-line react/prefer-stateless-function
class RegistrationInvite extends Component {
	constructor(props) {
		super(props);
		this.state = {
			hasSentInvite: false,
		};
	}

	onDownloadKit = () => {
		window.open('http://Bit.ly/LabanLeni22', '_blank');
	};

	componentDidMount = () => {
		nativeSelfie().then((image) => {
			if (image) {
				let data = {
					image: image
				}
				updateAvatar(data).then((res) => {
					if (!res.success) {
						showAlertBox({
							message: getTranslation('SOMETHING_WRONG')
						});
					}
				})
			}
		});
	};

	handleContinue = () => {
		route('home', true);
	};

	render = ({ authUser, invited }, { hasSentInvite }) => {
		if (!authUser) {
			return null;
		}

		return (
			<div className={style.inviteWrap}>
				<div className={style.inviteForm}>
					<p className={`${style.heading} extraBold`}>
						{getTranslation('SET_GOAL')}
					</p>
					<InviteForm
						refCode={authUser.profile.refCode}
						invited={invited}
						onSendCallback={() => {
							this.setState({
								hasSentInvite: true,
							});
						}}
					/>
					<p className={style.skip}>
						<a class="bold" onClick={this.handleContinue}>
							{getTranslation('SKIP')}
						</a>
					</p>
				</div>
				<div className={style.kitsContainer}>
					<p className={`${style.heading} extraBold`}>
						{getTranslation('DOWNLOAD_KITS')}
					</p>
					<div className={style.kits}>
						<a className={style.kitsItem} onClick={this.onDownloadKit}>
							<span>{getTranslation('CONVERSION_KIT')} 1</span>
							<ImageLoader
								src="assets/images/icon_download.png"
								style={{ container: style.iconDownload }}
							/>
						</a>
					</div>
				</div>
				<div className={style.buttonContainer}>
					<ButtonDescription
						onClickCallback={this.handleContinue}
						text="Continue"
						isDisabled={!hasSentInvite}
					/>
				</div>
			</div>
		);
	};
}
export default connect(['authUser', 'invited'])(RegistrationInvite);
