import { h, Component } from 'preact';
import { connect } from 'unistore/preact';
import { LoaderRing } from '_components/core';
import { route } from 'preact-router';
import { setupCommunityInfo, getCommunityInfo } from '_mutations';
import { FormGroup, FormInput, ImageLoader, ButtonDescription } from '_components/core';
import { getTranslation, uploadFile, showAlertBox, displayPageLoader } from '_helpers';
// eslint-disable-next-line import/extensions
import style from './style';

// eslint-disable-next-line react/prefer-stateless-function
class CommunitySetup extends Component {
	constructor(props){
		super(props);
		this.initialState = {
			name: {
				value: '',
				error: '',
				message: '',
				hasError: false
			},
			about: {
				value: '',
				error: '',
				message: '',
				hasError: false
			},
			attachment: {
				file: null,
				error: '',
				message: '',
				hasError: false
			}
		}
		this.state = this.initialState;
	}
	onAboutChange = (value) => {
		this.setState({
			about: {
				...this.state.about,
				value: value,
				hasError: !Boolean(value),
				error: !Boolean(value) ? 'REQUIRED' : ''
			}
		});
	};

	onNameChange = (value) => {
		this.setState({
			name: {
				...this.state.name,
				value: value,
				hasError: !Boolean(value),
				error: !Boolean(value) ? 'REQUIRED' : ''
			}
		});
	};

	onAttachmentChange = (file) => {
		this.setState({
			attachment: {
				...this.state.attachment,
				file: file
			}
		});
	};

	submitData  = (image) => {
		setupCommunityInfo({
			name: this.state.name.value,
			desc: this.state.about.value,
			image: image
		})
			.then((res) => {
				displayPageLoader(false);
				if(res && res.success) {
					getCommunityInfo()
					this.setState({
						...this.initialState
					});
					showAlertBox({
						message: 'COMMUNITY_SETUP_SUCCESS',
						success: true
					});
					route(`/home`);
				} else {
					showAlertBox({
						message: res.message || 'OOPS_SOMETHING_WRONG'
					});
				}
			})
	}

	handleContinue = (e) => {
		e.stopPropagation();
		if (!this.state.about.value || 
			!this.state.name.value) {
			this.onAboutChange(this.state.about.value);
			this.onNameChange(this.state.name.value);
		} else {
			if (this.state.attachment.file) {
				// upload file to S3
				// submit data
				displayPageLoader(true);
				uploadFile({
					file: this.state.attachment.file
				})
				.then((res) => {
					if(res.success && res.data) {
						this.submitData(res.data.image);
					} else {
						showAlertBox({
							message: res.errMessage || 'OOPS_SOMETHING_WRONG'
						});
					}
				}).catch((err) => {
					showAlertBox({
						message: res.errMessage || 'OOPS_SOMETHING_WRONG'
					});
				});
			} 
		}
	}

	render = ({ authUser },{name, about, attachment}) => {
		if (!authUser) {
			return <LoaderRing fullpage />;
		}

		return (
			<div className={style.communitySetup}>
				<div className={style.infoWrap}>
				
					<FormGroup label={getTranslation("COMMUNITY_NAME")}>
						<FormInput
							className={style.name}
							style={{error: style.name}}
							value={name.value}
							type="text"
							onBlur={(e) => {
								this.onNameChange(e.target.value)
							}}
							onInput={(e) => {
								this.onNameChange(e.target.value)
							}}
							hasError={name.hasError}
							error={name.error}
							message={name.message} />
					</FormGroup>
				</div>

				<div className={style.infoWrap}>
					<FormGroup label={getTranslation("COMMUNITY_ABOUT")}>
						<FormInput
							className={style.about}
							style={{error: style.about}}
							value={about.value}
							type="textarea"
							onBlur={(e) => {
								this.onAboutChange(e.target.value)
							}}
							onInput={(e) => {
								this.onAboutChange(e.target.value)
							}}
							rows="6"
							hasError={about.hasError}
							error={about.error}
							message={about.message} />
					</FormGroup>
				</div>

				<div className={style.infoWrap}>
					<FormGroup label={getTranslation("COMMUNITY_LOGO")}>
						<div className={style.attachmentWrap}>
							<div className={style.attachmentInputWrap}>								
									<FormInput
										id='inputAttachment'
										className={style.attachment}
										style={{error: style.attachment}}
										value={attachment.file}
										type="file"
										onBlur={(e) => {
											this.onAttachmentChange(e.target.files[0])
										}}
										onInput={(e) => {
											this.onAttachmentChange(e.target.files[0])
										}}
										hasError={attachment.hasError}
										error={attachment.error}
										message={attachment.message} />
							</div>
							<div>
								<a className={style.pShare} 
									onClick={() => {
										document.getElementById('inputAttachment').click()
									}}>
								<ImageLoader
											src="assets/images/attachment_icon_white.png"
											style={{container: style.pIconShare}} />
										<span>{getTranslation('ADD_IMAGE')}</span>
								</a>
							</div>
						</div>
					</FormGroup>
				
				</div>
				
				<div className={style.buttonContainer}>
					<ButtonDescription
						onClickCallback={this.handleContinue}
						text={getTranslation('CONTINUE')}
					/>
				</div>

			</div>
		);
	};
}
export default connect(['authUser'])(CommunitySetup);
