import { h, Component } from 'preact';
import { connect } from 'unistore/preact';
import { sendContactUs, newInvite } from '_mutations';
import { LoaderRing } from '_components/core';
import { FormGroup, FormInput, FormDropdown, ImageLoader, ButtonDescription } from '_components/core';
import { getTranslation, getCategories, circleModal } from '_helpers';
// eslint-disable-next-line import/extensions
import style from './style';

// eslint-disable-next-line react/prefer-stateless-function
class ContactUs extends Component {
	constructor(props){
		super(props);
		this.state = {
			categoryOptions: getCategories(),
			category: {
				value: '',
				error: '',
				message: '',
				hasError: false
			},
			subject: {
				value: '',
				error: '',
				message: '',
				hasError: false
			},
			message: {
				value: '',
				error: '',
				message: '',
				hasError: false
			},
			attachment: {
				value: '',
				error: '',
				message: '',
				hasError: false
			}
		}
	}

	onAttachmentChange = (value) => {
		this.setState({
			attachment: {
				...this.state.attachment,
				value: value,
				hasError: !Boolean(value),
				error: !Boolean(value) ? 'REQUIRED' : ''
			}
		});
	};
	
	onMessageChange = (value) => {
		this.setState({
			message: {
				...this.state.message,
				value: value,
				hasError: !Boolean(value),
				error: !Boolean(value) ? 'REQUIRED' : ''
			}
		});
	};

	onSubjectChange = (value) => {
		this.setState({
			subject: {
				...this.state.subject,
				value: value,
				hasError: !Boolean(value),
				error: !Boolean(value) ? 'REQUIRED' : ''
			}
		});
	};
	
	onCategoryChange = (value) => {
		this.setState({
			category: {
				...this.state.category,
				value: value,
				hasError: !Boolean(value),
				error: !Boolean(value) ? 'REQUIRED' : ''
			}
		});
	};

	handleContinue = () => {
		
		if (!this.state.category.value || 
			!this.state.subject.value || 
			!this.state.message.value ||
			!this.state.attachment.value) {
			this.onCategoryChange(this.state.category.value);
			this.onSubjectChange(this.state.subject.value);
			this.onMessageChange(this.state.message.value);
			this.onAttachmentChange(this.state.attachment.value);
		} else {
			sendContactUs({
				category: this.state.category.value,
				suject: this.state.subject.value,
				message: this.state.message.value,
				attachment: this.state.attachment.value
	    })
	      .then((res) => {
					if(res && res.success) {
						circleModal({
							title: getTranslation('MESSAGE_SENT_TITLE'),
							content: getTranslation('MESSAGE_SENT_MSG'),
							code: `${getTranslation('CODE_REF')} 12345678`
						});
					} else {
						circleModal({
							title: getTranslation('OOPS_SOMETHING_WRONG'),
							content: getTranslation('TRY_AGAIN_CONTINUE')
						});
					}
	      })
	      
		}
	}

	render = ({ authUser },{category, subject, message, attachment, categoryOptions}) => {
		if (!authUser) {
			return <LoaderRing fullpage />;
		}

		return (
			<div className={style.contactUs}>
				<div className={style.infoWrap}>
					<FormGroup label={getTranslation("CATEGORY")} hasError={category.hasError}>
						<FormDropdown
							label=""
							className={style.category}
							value={category.value}
							options={categoryOptions}
							getValue={option => option.value}
							getText={option => option.text}
							onBlur={(e) => {
								this.onCategoryChange(e.target.value)
							}}
							onIonChangenput={(e) => {
								this.onCategoryChange(e.target.value)
							}}
							hasError={category.hasError}
							error={category.error}
							message={category.message}
							 />
					</FormGroup>
					<FormGroup label={getTranslation("SUBJECT")}>
						<FormInput
							className={style.subject}
							style={{error: style.subject}}
							value={subject.value}
							type="text"
							onBlur={(e) => {
								this.onSubjectChange(e.target.value)
							}}
							onInput={(e) => {
								this.onSubjectChange(e.target.value)
							}}
							hasError={subject.hasError}
							error={subject.error}
							message={subject.message} />
					</FormGroup>
				</div>

				<div className={style.infoWrap}>
					<FormGroup>
						<FormInput
							className={style.message}
							style={{error: style.message}}
							value={message.value}
							type="textarea"
							rows="4"
							onBlur={(e) => {
								this.onMessageChange(e.target.value)
							}}
							onInput={(e) => {
								this.onMessageChange(e.target.value)
							}}
							hasError={message.hasError}
							error={message.error}
							message={message.message} />
					</FormGroup>
				</div>

				<div className={style.infoWrap}>
					<FormGroup label={getTranslation("ATTACHMENT")}>
						<div className={style.attachmentWrap}>
							<div className={style.attachmentInputWrap}>
								<FormInput
									className={style.attachment}
									style={{error: style.attachment}}
									value={attachment.value}
									type="file"
									onBlur={(e) => {
										this.onAttachmentChange(e.target.value)
									}}
									onInput={(e) => {
										this.onAttachmentChange(e.target.value)
									}}
									hasError={attachment.hasError}
									error={attachment.error}
									message={attachment.message} />
							</div>
							<div>
								<a className={style.pShare} 
									onClick={() => {
										this.onSend()
									}}>
								<ImageLoader
											src="assets/images/attachment_icon_white.png"
											style={{container: style.pIconShare}} />
										<span>{getTranslation('SEND')}</span>
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
export default connect(['authUser'])(ContactUs);
