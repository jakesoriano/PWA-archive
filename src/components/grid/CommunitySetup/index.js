import { h, Component } from 'preact';
import { connect } from 'unistore/preact';
import { LoaderRing } from '_components/core';
import { FormGroup, FormInput, ImageLoader, ButtonDescription } from '_components/core';
import { getTranslation, circleModal } from '_helpers';
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
	componentDidMount = () => {
		circleModal({
			title: getTranslation('COMMUNITY_SETUP_SUCCESS'),
			content: getTranslation('COMMUNITY_SETUP_DESC')
		});
	}


	handleContinue = () => {
		
		
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
											src="assets/images/upload-logo.png"
											style={{container: style.pIconShare}} />
								</a>
							</div>
						</div>
					</FormGroup>
				
				</div>
				
				<div className={style.buttonContainer}>
					<ButtonDescription
						onClickCallback={() => {
							this.handleContinue()
						}}
						text={getTranslation('CONTINUE')}
					/>
				</div>

			</div>
		);
	};
}
export default connect(['authUser'])(CommunitySetup);
