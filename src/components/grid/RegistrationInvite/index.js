import { Component } from 'preact';
import { route } from 'preact-router';
import { updateAvatar } from '_mutations';
import { connect } from 'unistore/preact';
import { nativeSelfie } from '_platform/helpers';
import {
	getTranslation,
	showAlertBox,
	promptModal,
  resizeImage,
  uploadFile,
	displayPageLoader
} from '_helpers';
import {
	InviteForm,
	ImageLoader,
	ButtonDescription,
	FormInput
} from '_components/core';
// import { nativeShare } from '_platform/helpers';
// eslint-disable-next-line import/extensions
import style from './style';

// eslint-disable-next-line react/prefer-stateless-function
class RegistrationInvite extends Component {
	constructor(props) {
		super(props);
		this.state = {
			hasSentInvite: false,
			attachment: {
				file: null
			}
		};
	}

	componentDidMount = () => {
		promptModal({
			title: getTranslation('SELFIE_TITLE'),
			message: getTranslation('SELFIE_MSG'),
			textNo: getTranslation('SKIP'),
			textYes: getTranslation('OPEN_CAMERA'),
			cbOk: () => {
				document.getElementById('inputAttachment').click();
				promptModal(null);
			}
		});
	};

  updateUserImage = (file) => {
		this.setState({
			attachment: {
				file: file,
			}
		});
    displayPageLoader(true);
    uploadFile({file: file}).then((res) => {
      displayPageLoader(false);
      if (res.success && res.data) {
        updateAvatar(res.data).then((resUpdate) => {
          if (resUpdate.success) {
            showAlertBox({
              message: 'UPDATE_AVATAR_SUCCESS',
              success: true
            });
          } else {
            showAlertBox({
              message: (resUpdate.errMessage || 'SOMETHING_WRONG')
            });
          }
        })
      } else {
        showAlertBox({
          message: (res.errMessage || 'SOMETHING_WRONG')
        });
      }
    })
  }

	onAttachmentChange = (file) => {
    if (!file) {
      return;
    }

    resizeImage({
      file: file,
      maxSize: 1200
    })
    .then(resizedImage => {
      console.log("upload resized image", resizedImage);
      this.updateUserImage(resizedImage);
    })
    .catch(err => {
      // console.error(err);
      this.updateUserImage(file);
    });
	};

	onDownloadKit = (url) => {
		window.open(url, '_blank');
	};

	handleContinue = () => {
		route('home', true);
	};

	render = ({ authUser, invited }, { hasSentInvite, attachment }) => {
		if (!authUser) {
			return null;
		}

		return (
			<div className={style.inviteWrap}>
				<div className={style.inviteForm}>
					{/* Hidden input */}
					<FormInput
							id='inputAttachment'
							className={style.attachment}
							style={{error: style.attachment}}
							value={attachment.file}
							type="file"
							accept="image/*"
							capture="user"
							onBlur={(e) => {
								this.onAttachmentChange(e.target.files[0])
							}}
							onInput={(e) => {
								this.onAttachmentChange(e.target.files[0])
							}}
						/>
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
						<a className={style.kitsItem} onClick={(e) => {
							e.stopPropagation();
							this.onDownloadKit('https://bit.ly/KKP_volunteer_toolkit');
						}}>
							<span>{getTranslation('CONVERSION_KIT')} 1</span>
							<ImageLoader
								src="assets/images/icon_download.png"
								style={{ container: style.iconDownload }}
							/>
						</a>
						<a className={style.kitsItem} onClick={(e) => {
							e.stopPropagation();
							this.onDownloadKit('https://bit.ly/bakitsileni');
						}}>
							<span>{getTranslation('CONVERSION_KIT')} 2</span>
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
export default connect(['authUser', 'invited', 'route'])(RegistrationInvite);
