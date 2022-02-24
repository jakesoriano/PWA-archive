import { h, Component } from 'preact';
import { connect } from 'unistore/preact';
import { getCommunityInfo, createCommunityEvent, createCommunityNews, updateCommunityEvent, updateCommunityNews } from '_mutations';
import { LoaderRing } from '_components/core';
import { FormGroup, FormInput, FormDropdown, ImageLoader, ButtonDescription } from '_components/core';
import { getTranslation, getContentTypes, displayPageLoader, messageModal, uploadFile, showAlertBox } from '_helpers';
import { updateStore } from '_unistore';
import { getCurrentUrl, route, RouterProps, Route, Router } from 'preact-router';
// eslint-disable-next-line import/extensions
import style from './style';

// eslint-disable-next-line react/prefer-stateless-function
class PostContent extends Component {
	constructor(props){
		super(props);
		this.initialState = {
			contentTypeOptions: getContentTypes(),
			isOnlineOptions: [
				{value: 'yes', text: 'YES'},
				{value: 'no', text: 'NO'}
			],
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
				link: {
				value: '',
				error: '',
				message: '',
				hasError: false
			},
			isOnline: {
				value: 'yes',
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
			}
		}
		this.state = this.initialState;
	}

	componentDidMount = () => {
		
		if(this.props.leaderEditPost) {
			let editData;
			if(this.props.leaderEditPost.type === 'events') {
				editData = this.props.leaderCommunityEvents.data.find(e => e.id === this.props.leaderEditPost.id);
			} else {
				editData = this.props.leaderCommunityAnnouncements.data.find(e => e.id === this.props.leaderEditPost.id);
			}
			this.setState({
				contentType: {
					value: this.props.leaderEditPost.type === 'events' ? 'Event' : 'Announcement',
					error: '',
					message: '',
					hasError: false
				},
				title: {
					value: editData.title,
					error: '',
					message: '',
					hasError: false
				},
				desc: {
					value: editData.desc,
					error: '',
					message: '',
					hasError: false
				},
				link: {
					value: editData.link ? editData.link : '',
					error: '',
					message: '',
					hasError: false
				},
				eventBy: {
					value: editData.by ? editData.by : '',
					error: '',
					message: '',
					hasError: false
				},
				isOnline: {
					value: editData.isOnline ? 'yes' : 'no',
					error: '',
					message: '',
					hasError: false
				},
				location: {
					value: editData.location ? editData.location : '',
					error: '',
					message: '',
					hasError: false
				},
				date : {
					value: editData.date ? new Date(editData.date).toISOString().substr(0, 10) : '',
					error: '',
					message: '',
					hasError: false
				},
				attachment: {
					file: editData.image,
					error: '',
					message: '',
					hasError: false
				}
			})
		}
		
		if(!this.props.communityInfo.data) {
			getCommunityInfo()
			.then((res) => {
				if(!res) {
					messageModal({
						title: getTranslation('NO_COMMUNITY_INFO'),
						message: getTranslation('SETUP_COMMUNITY_PAGE_MSG'),
						disableClose: true,
						cbOk: () => {
							// no action here
							messageModal(null);
							this.gotoCommunitySetup();
						}
					});
				}
			})
		}
	};

	gotoCommunitySetup = () => {
		route(`/community-setup`);
	}

	onAttachmentChange = (file) => {
		this.setState({
			attachment: {
				...this.state.attachment,
				file: file,
				hasError: !Boolean(file),
				error: !Boolean(file) ? 'REQUIRED' : ''
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

	onLinkChange = (value) => {
		this.setState({
			link: {
				...this.state.link,
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

	onIsOnlineChange = (value) => {
		this.setState({
			isOnline: {
				...this.state.isOnline,
				value: value,
				hasError: !Boolean(value),
				error: !Boolean(value) ? 'REQUIRED' : ''
			}
		});
	};

	submitData  = (image) => {
		if(this.state.contentType.value === 'Event') {
			// CREATE COMMUNITY EVENT
			const data = {
				title: this.state.title.value,
				image: image,
				date: this.state.date.value,
				by: this.state.eventBy.value,
				isOnline: this.state.isOnline.value === 'yes' ? true : false,
				location: this.state.location.value,
				desc: this.state.desc.value
			}
			createCommunityEvent({
				data
			}).then((res) => {
				displayPageLoader(false)
				if(res && res.success) {
					this.setState({
						...this.initialState
					});
					route(`/`);
					showAlertBox({
						message: 'POST_CONTENT_SUCCESS',
						success: true
					});
				} else {
					showAlertBox({
						message: res.error.message || 'SOMETHING_WRONG'
					});
				}
			}).catch((err) => {
				showAlertBox({
					message: err.message || 'SOMETHING_WRONG'
				});
				displayPageLoader(false);
			});
		} else {
			// CREATE COMMUNITY ANNOUNCEMENT
			const data = {
				title: this.state.title.value,
				image: image,
				link: this.state.link.value,
				desc: this.state.desc.value
			}
			createCommunityNews({
				data
			}).then((res) => {
				displayPageLoader(false)
				if(res && res.success) {
					this.setState({
						...this.initialState
					});
					route(`/`);
					showAlertBox({
						message: 'POST_CONTENT_SUCCESS',
						success: true
					});
				} else {
					showAlertBox({
						message: res.error.message || 'SOMETHING_WRONG'
					});
				}
			}).catch((err) => {
				showAlertBox({
					message: err.message || 'SOMETHING_WRONG'
				});
				displayPageLoader(false);
			});
		}
		
	}

	uploadImage = (isEdit) => {
		displayPageLoader(true);
		uploadFile({
			file: this.state.attachment.file
		})
			.then((res) => {
				if(res.success && res.data) {
					if(isEdit) {
						this.submitEditData(res.data.image);
					} else {
						this.submitData(res.data.image);
					}
				} else {
					displayPageLoader(false)
					showAlertBox({
						message: res.errMessage || 'SOMETHING_WRONG'
					});
				}
			});
	}


	submitEditData = (image) => {
		displayPageLoader(true);
		if(this.props.leaderEditPost.type === 'events') {
			// EDIT COMMUNITY EVENT
			const data = {
				title: this.state.title.value,
				image: image,
				date: this.state.date.value,
				by: this.state.eventBy.value,
				isOnline: this.state.isOnline.value === 'yes' ? true : false,
				location: this.state.location.value,
				desc: this.state.desc.value
			}
			updateCommunityEvent({ data }, this.props.leaderEditPost.id).then((res) => {
				displayPageLoader(false)
				if(res && res.success) {
					this.setState({
						...this.initialState
					});
					route(`/`);
					showAlertBox({
						message: 'POST_CONTENT_SUCCESS',
						success: true
					});
				} else {
					showAlertBox({
						message: res.error.message || 'SOMETHING_WRONG'
					});
				}
			}).catch((err) => {
				showAlertBox({
					message: err.message || 'SOMETHING_WRONG'
				});
				displayPageLoader(false);
			});
		} else {
			// EDIT COMMUNITY ANNOUNCEMENT
			const data = {
				title: this.state.title.value,
				image: image,
				link: this.state.link.value,
				desc: this.state.desc.value
			}
			updateCommunityNews({ data }, this.props.leaderEditPost.id).then((res) => {
				displayPageLoader(false)
				if(res && res.success) {
					this.setState({
						...this.initialState
					});
					route(`/`);
					showAlertBox({
						message: 'POST_CONTENT_SUCCESS',
						success: true
					});
				} else {
					showAlertBox({
						message: res.error.message || 'SOMETHING_WRONG'
					});
				}
			}).catch((err) => {
				showAlertBox({
					message: err.message || 'SOMETHING_WRONG'
				});
				displayPageLoader(false);
			});
		}
	}

	handleContinue = () => {
		if(!this.state.contentType.value) {
			this.onContentTypeChange(this.state.contentType.value);
		} else {
			if(this.state.contentType.value === 'Event') {
				if(!this.state.title.value || 
					!this.state.desc.value ||
					!this.state.date.value || 
					!this.state.eventBy.value || 
					!this.state.location.value ||
					!this.state.attachment.file) {
					this.onTitleChange(this.state.title.value);
					this.onDescChange(this.state.desc.value);
					this.onDateChange(this.state.date.value);
					this.onLocationChange(this.state.location.value);
					this.onEventByChange(this.state.eventBy.value);
					this.onAttachmentChange(this.state.attachment.file);
				} else {
					if(this.props.leaderEditPost) {
						// if image will be replaced
						if (typeof this.state.attachment.file === 'string' || this.state.attachment.file instanceof String) {
							this.submitEditData(this.state.attachment.file);
						} else {
							this.uploadImage(true);
						}
					} else {
					this.uploadImage(false);
					}
				}
			} else {
				if(!this.state.title.value || 
					!this.state.desc.value ||
					!this.state.link.value || 
					!this.state.attachment.file) {
					this.onTitleChange(this.state.title.value);
					this.onDescChange(this.state.desc.value);
					this.onLinkChange(this.state.link.value);
					this.onAttachmentChange(this.state.attachment.file);
				} else {
					if(this.props.leaderEditPost) {
						// if image will be replaced
						if (typeof this.state.attachment.file === 'string' || this.state.attachment.file instanceof String) {
							this.submitEditData(this.state.attachment.file);
						} else {
							this.uploadImage(true);
						}
					} else {
						this.uploadImage(false);
					}
				}
			}
		}
	}

	renderEventForm = () => {
		return (
			<div>	
				<div className={style.infoWrap}>
					<FormGroup label={getTranslation("CONTENT_TITLE")}>
						<FormInput
							className={style.title}
							style={{error: style.title}}
							value={this.state.title.value}
							type="text"
							onBlur={(e) => {
								this.onTitleChange(e.target.value)
							}}
							onInput={(e) => {
								this.onTitleChange(e.target.value)
							}}
							hasError={this.state.title.hasError}
							error={this.state.title.error}
							message={this.state.title.message} />
					</FormGroup>
				</div>

				<div className={style.infoWrap}>
					<FormGroup label={getTranslation("CONTENT_DESC")}>
						<FormInput
							className={style.desc}
							style={{error: style.desc}}
							value={this.state.desc.value}
							type="textarea"
							rows="4"
							onBlur={(e) => {
								this.onDescChange(e.target.value)
							}}
							onInput={(e) => {
								this.onDescChange(e.target.value)
							}}
							hasError={this.state.desc.hasError}
							error={this.state.desc.error}
							message={this.state.desc.message} />
					</FormGroup>
				</div>

				<div className={style.infoWrap}>
					<FormGroup label={getTranslation("EVENT_BY")}>
						<FormInput
							className={style.eventBy}
							style={{error: style.eventBy}}
							value={this.state.eventBy.value}
							type="text"
							onBlur={(e) => {
								this.onEventByChange(e.target.value)
							}}
							onInput={(e) => {
								this.onEventByChange(e.target.value)
							}}
							hasError={this.state.eventBy.hasError}
							error={this.state.eventBy.error}
							message={this.state.eventBy.message} />
					</FormGroup>
				</div>
				<div className={style.infoWrap}>
					<FormGroup label={getTranslation("IS_ONLINE")}>
						<FormDropdown
							className={style.isOnline}
							value={this.state.isOnline.value}
							options={this.state.isOnlineOptions}
							getValue={option => option.value}
							getText={option => option.text}
							onBlur={(e) => {
								this.onIsOnlineChange(e.target.value)
							}}
							onChange={(e) => {
								this.onIsOnlineChange(e.target.value)
							}}
							hasError={this.state.isOnline.hasError}
							error={this.state.isOnline.error}
							message={this.state.isOnline.message}
							/>
					</FormGroup>
				</div>
				<div className={style.infoWrap}>
					<FormGroup label={getTranslation("CONTENT_LOCATION")}>
						<FormInput
							className={style.location}
							style={{error: style.location}}
							value={this.state.location.value}
							type="text"
							onBlur={(e) => {
								this.onLocationChange(e.target.value)
							}}
							onInput={(e) => {
								this.onLocationChange(e.target.value)
							}}
							hasError={this.state.location.hasError}
							error={this.state.location.error}
							message={this.state.location.message} />
					</FormGroup>
				</div>

				<div className={style.infoWrap}>
					<FormGroup label={getTranslation("CONTENT_DATE")}>
						<FormInput
							className={style.date}
							style={{error: style.date}}
							value={this.state.date.value}
							type="datetime-local"
							onBlur={(e) => {
								this.onDateChange(e.target.value)
							}}
							onInput={(e) => {
								this.onDateChange(e.target.value)
							}}
							hasError={this.state.date.hasError}
							error={this.state.date.error}
							message={this.state.date.message} />
					</FormGroup>
				</div>

				<div className={style.infoWrap}>
					<FormGroup label={getTranslation("IMAGE")}>
						<div className={style.attachmentWrap}>
							<div className={`${style.attachmentInputWrap} 
								${typeof this.state.attachment.file === 'string' || 
								this.state.attachment.file instanceof String ? style.hideInput : ''}`}>								
									<FormInput
										id='inputAttachment'
										className={style.attachment}
										style={{error: style.attachment}}
										value={this.state.attachment.file}
										type="file"
										onBlur={(e) => {
											this.onAttachmentChange(e.target.files[0])
										}}
										onInput={(e) => {
											this.onAttachmentChange(e.target.files[0])
										}}
										hasError={this.state.attachment.hasError}
										error={this.state.attachment.error}
										message={this.state.attachment.message} />
							</div>
							{this.props.leaderEditPost && (typeof this.state.attachment.file === 'string' || 
								this.state.attachment.file instanceof String) && 
								<ImageLoader
									src={this.state.attachment.file}
									style={{container: style.editImage}} />
								}
							<div className={style.uploadBtnWrap}>
								<a className={style.pShare} 
									onClick={() => {
										document.getElementById('inputAttachment').click()
									}}>
									<ImageLoader
										src="assets/images/attachment_icon_white.png"
										style={{container: style.pIconShare}} />
										<span>{getTranslation(typeof this.state.attachment.file === 'string' || 
										this.state.attachment.file instanceof String ? 'REPLACE_IMAGE':'ADD_IMAGE')}</span>
								</a>
							</div>
						</div>
					</FormGroup>
				</div>
			</div>
		);
	}

	renderNewsForm = () => {
		return (
			<div>
				<div className={style.infoWrap}>
					<FormGroup label={getTranslation("CONTENT_TITLE")}>
						<FormInput
							className={style.title}
							style={{error: style.title}}
							value={this.state.title.value}
							type="text"
							onBlur={(e) => {
								this.onTitleChange(e.target.value)
							}}
							onInput={(e) => {
								this.onTitleChange(e.target.value)
							}}
							hasError={this.state.title.hasError}
							error={this.state.title.error}
							message={this.state.title.message} />
					</FormGroup>
				</div>

				<div className={style.infoWrap}>
					<FormGroup label={getTranslation("CONTENT_DESC")}>
						<FormInput
							className={style.desc}
							style={{error: style.desc}}
							value={this.state.desc.value}
							type="textarea"
							rows="4"
							onBlur={(e) => {
								this.onDescChange(e.target.value)
							}}
							onInput={(e) => {
								this.onDescChange(e.target.value)
							}}
							hasError={this.state.desc.hasError}
							error={this.state.desc.error}
							message={this.state.desc.message} />
					</FormGroup>
				</div>

				<div className={style.infoWrap}>
					<FormGroup label={getTranslation("CONTENT_LINK")}>
						<FormInput
							className={style.link}
							style={{error: style.link}}
							value={this.state.link.value}
							type="text"
							rows="4"
							onBlur={(e) => {
								this.onLinkChange(e.target.value)
							}}
							onInput={(e) => {
								this.onLinkChange(e.target.value)
							}}
							hasError={this.state.link.hasError}
							error={this.state.link.error}
							message={this.state.link.message} />
					</FormGroup>
				</div>

				<div className={style.infoWrap}>
					<FormGroup label={getTranslation("IMAGE")}>
						<div className={style.attachmentWrap}>
							<div className={`${style.attachmentInputWrap} 
								${typeof this.state.attachment.file === 'string' || 
								this.state.attachment.file instanceof String ? style.hideInput : ''}`}>							
									<FormInput
										id='inputAttachment'
										className={style.attachment}
										style={{error: style.attachment}}
										value={this.state.attachment.file}
										type="file"
										onBlur={(e) => {
											this.onAttachmentChange(e.target.files[0])
										}}
										onInput={(e) => {
											this.onAttachmentChange(e.target.files[0])
										}}
										hasError={this.state.attachment.hasError}
										error={this.state.attachment.error}
										message={this.state.attachment.message} />
							</div>
							{this.props.leaderEditPost && (typeof this.state.attachment.file === 'string' || 
								this.state.attachment.file instanceof String) && 
								<ImageLoader
									src={this.state.attachment.file}
									style={{container: style.editImage}} />
								}
							<div className={style.uploadBtnWrap}>
								<a className={style.pShare} 
									onClick={() => {
										document.getElementById('inputAttachment').click()
									}}>
									<ImageLoader
										src="assets/images/attachment_icon_white.png"
										style={{container: style.pIconShare}} />
										<span>{getTranslation(typeof this.state.attachment.file === 'string' || 
										this.state.attachment.file instanceof String ? 'REPLACE_IMAGE':'ADD_IMAGE')}</span>
								</a>
							</div>
						</div>
					</FormGroup>
				</div>

			</div>
		);
	}

	render = ({ authUser },{contentType, contentTypeOptions}) => {
		if (!authUser) {
			return <LoaderRing fullpage />;
		}

		return (
			<div className={style.postContent}>
				<div className={style.infoWrap}>
					<FormGroup label={getTranslation("CONTENT_TYPE")} hasError={this.state.contentType.hasError}>
						<FormDropdown
							className={style.contentType}
							value={contentType.value}
							options={contentTypeOptions}
							getValue={option => option.value}
							getText={option => option.text}
							onBlur={(e) => {
								this.onContentTypeChange(e.target.value)
							}}
							onChange={(e) => {
								this.onContentTypeChange(e.target.value)
							}}
							hasError={contentType.hasError}
							error={contentType.error}
							message={contentType.message}
							/>
					</FormGroup>
				</div>

				{contentType.value === 'Event' && this.renderEventForm()}
				{contentType.value === 'Announcement' && this.renderNewsForm()}
				
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
export default connect(['authUser', 'communityInfo', 'leaderEditPost', 'leaderCommunityEvents', 'leaderCommunityAnnouncements'])(PostContent);
