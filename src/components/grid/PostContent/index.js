import { h, Component } from 'preact';
import { connect } from 'unistore/preact';
import { getCommunityInfo, createCommunityEvent, uploadFile } from '_mutations';
import { LoaderRing } from '_components/core';
import { FormGroup, FormInput, FormDropdown, ImageLoader, ButtonDescription } from '_components/core';
import { getTranslation, getContentTypes, circleModal, promptModal } from '_helpers';
import { updateStore } from '_unistore';
import { route } from 'preact-router';
// eslint-disable-next-line import/extensions
import style from './style';

// eslint-disable-next-line react/prefer-stateless-function
class PostContent extends Component {
	constructor(props){
		super(props);
		console.log('content type', getContentTypes);
		this.initialState = {
			contentTypeOptions: getContentTypes(),
			contentType: {
				value: 'Event',
				error: '',
				message: '',
				hasError: false
			},
			title: {
				value: '',
				error: '',
				message: '',
				hasError: false
			},
			desc: {
				value: '',
				error: '',
				message: '',
				hasError: false
			},
			location: {
				value: '',
				error: '',
				message: '',
				hasError: false
			},
			eventBy: {
				value: '',
				error: '',
				message: '',
				hasError: false
			},
			date: {
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
			},
			communityId: null
		}
		this.state = this.initialState;
	}

	componentDidMount = () => {
	  getCommunityInfo()
			.then((res) => {
				console.log('result----', res);
				if(res && res.success) {
					this.setState({
						...this.initialState,
						communityId: res.data._id
					});
				} else {
					promptModal({
						title: getTranslation('NO_COMMUNITY_INFO'),
						textYes: getTranslation('SETUP_COMMUNITY_PAGE_NOW'),
						textNo: null,
						cbOk: () => {
							// no action here
							promptModal(null);
							this.gotoCommunitySetup();
						}
					});
				}
			})
	};

	gotoCommunitySetup = () => {
		route(`/community-setup`);
	}

	onAttachmentChange = (file) => {
		this.setState({
			attachment: {
				...this.state.attachment,
				file: file,
			}
		});
	};
	
	onDescChange = (value) => {
		this.setState({
			desc: {
				...this.state.desc,
				value: value,
				hasError: !Boolean(value),
				error: !Boolean(value) ? 'REQUIRED' : ''
			}
		});
	};

	onTitleChange = (value) => {
		this.setState({
			title: {
				...this.state.title,
				value: value,
				hasError: !Boolean(value),
				error: !Boolean(value) ? 'REQUIRED' : ''
			}
		});
	};

	onLocationChange = (value) => {
		this.setState({
			location: {
				...this.state.location,
				value: value,
				hasError: !Boolean(value),
				error: !Boolean(value) ? 'REQUIRED' : ''
			}
		});
	};

	onEventByChange = (value) => {
		this.setState({
			eventBy: {
				...this.state.eventBy,
				value: value,
				hasError: !Boolean(value),
				error: !Boolean(value) ? 'REQUIRED' : ''
			}
		});
	};

	onDateChange = (value) => {
		this.setState({
			date: {
				...this.state.date,
				value: value,
				hasError: !Boolean(value),
				error: !Boolean(value) ? 'REQUIRED' : ''
			}
		});
	};
	
	onContentTypeChange = (value) => {
		this.setState({
			contentType: {
				...this.state.contentType,
				value: value,
				hasError: !Boolean(value),
				error: !Boolean(value) ? 'REQUIRED' : ''
			}
		});
	};

	showAlertBox = (message, hasError) => {
		updateStore({
			alertShow: {
				success: !hasError,
				content: message
			}
		});
	}

	submitData  = (image) => {
		const data = {
			title: this.state.title.value,
			image: image,
			date: this.state.date.value,
			by: this.state.eventBy.value,
			isOnline: true,
			location: this.state.location.value,
			desc: this.state.desc.value
		}
		createCommunityEvent({
			data,
			communityId: this.state.communityId
		})
			.then((res) => {
				if(res && res.success) {
					this.setState({
						...this.initialState
					});
					route(`/`);
					this.showAlertBox('POST_CONTENT_SUCCESS');
				} else {
					this.showAlertBox(res.error.message || 'SOMETHING_WRONG', true);
				}
			})
	}

	handleContinue = () => {
		console.log('state', this.state);
		if (!this.state.contentType.value || 
			!this.state.title.value || 
			!this.state.desc.value ||
			!this.state.date.value || 
			!this.state.eventBy.value || 
			!this.state.location.value) {
			this.onContentTypeChange(this.state.contentType.value);
			this.onTitleChange(this.state.title.value);
			this.onDescChange(this.state.desc.value);
			this.onDateChange(this.state.desc.value);
			this.onLocationChange(this.state.location.value);
			this.onEventByChange(this.state.eventBy.value);
		} else {
			if (this.state.attachment.file) {
				uploadFile({
					file: this.state.attachment.file
				})
					.then((res) => {
						if(res.success && res.data) {
							this.submitData(res.data.image);
						} else {
							circleModal({
								title: getTranslation('OOPS_SOMETHING_WRONG'),
								content: getTranslation('TRY_AGAIN_CONTINUE')
							});
						}
					});
			}
		}
	}

	render = ({ authUser },{title, desc, location, date, attachment, contentType, contentTypeOptions, eventBy}) => {
		if (!authUser) {
			return <LoaderRing fullpage />;
		}

		return (
			<div className={style.postContent}>
				<div className={style.infoWrap}>
					<FormGroup label={getTranslation("CONTENT_TYPE")} hasError={contentType.hasError}>
						<FormDropdown
							className={style.contentType}
							value={contentType.value}
							options={contentTypeOptions}
							getValue={option => option.value}
							getText={option => option.text}
							onBlur={(e) => {
								this.onContentTypeChange(e.target.value)
							}}
							onIonChangenput={(e) => {
								this.onContentTypeChange(e.target.value)
							}}
							hasError={contentType.hasError}
							error={contentType.error}
							message={contentType.message}
							 />
					</FormGroup>
				</div>
				<div className={style.infoWrap}>
					<FormGroup label={getTranslation("CONTENT_TITLE")}>
						<FormInput
							className={style.title}
							style={{error: style.title}}
							value={title.value}
							type="text"
							onBlur={(e) => {
								this.onTitleChange(e.target.value)
							}}
							onInput={(e) => {
								this.onTitleChange(e.target.value)
							}}
							hasError={title.hasError}
							error={title.error}
							message={title.message} />
					</FormGroup>
				</div>

				<div className={style.infoWrap}>
					<FormGroup label={getTranslation("CONTENT_DESC")}>
						<FormInput
							className={style.desc}
							style={{error: style.desc}}
							value={desc.value}
							type="textarea"
							rows="4"
							onBlur={(e) => {
								this.onDescChange(e.target.value)
							}}
							onInput={(e) => {
								this.onDescChange(e.target.value)
							}}
							hasError={desc.hasError}
							error={desc.error}
							message={desc.message} />
					</FormGroup>
				</div>

				<div className={style.infoWrap}>
					<FormGroup label={getTranslation("EVENT_BY")}>
						<FormInput
							className={style.eventBy}
							style={{error: style.eventBy}}
							value={eventBy.value}
							type="text"
							onBlur={(e) => {
								this.onEventByChange(e.target.value)
							}}
							onInput={(e) => {
								this.onEventByChange(e.target.value)
							}}
							hasError={eventBy.hasError}
							error={eventBy.error}
							message={eventBy.message} />
					</FormGroup>
				</div>

				<div className={style.infoWrap}>
					<FormGroup label={getTranslation("CONTENT_LOCATION")}>
						<FormInput
							className={style.location}
							style={{error: style.location}}
							value={location.value}
							type="text"
							onBlur={(e) => {
								this.onLocationChange(e.target.value)
							}}
							onInput={(e) => {
								this.onLocationChange(e.target.value)
							}}
							hasError={location.hasError}
							error={location.error}
							message={location.message} />
					</FormGroup>
				</div>

				<div className={style.infoWrap}>
					<FormGroup label={getTranslation("CONTENT_DATE")}>
						<FormInput
							className={style.date}
							style={{error: style.date}}
							value={date.value}
							type="date"
							onBlur={(e) => {
								this.onDateChange(e.target.value)
							}}
							onInput={(e) => {
								this.onDateChange(e.target.value)
							}}
							hasError={date.hasError}
							error={date.error}
							message={date.message} />
					</FormGroup>
				</div>

				<div className={style.infoWrap}>
					<FormGroup label={getTranslation("ATTACHMENT")}>
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
										<span>{getTranslation('ADD_FILE')}</span>
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
export default connect(['authUser'])(PostContent);
