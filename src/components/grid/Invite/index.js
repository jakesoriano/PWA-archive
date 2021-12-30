import { h, Component } from 'preact';
import { connect } from 'unistore/preact';
import { fetchInvited, newInvite, validateMobile } from '_mutations';
import { getTranslation, getRegions, playStore, appStore, displayPageLoader} from '_helpers';
import { FormGroup, FormInput, FormDropdown, ImageLoader } from '_components/core';
import { nativeShare } from '_platform/helpers';
// eslint-disable-next-line import/extensions
import style from './style';

// eslint-disable-next-line react/prefer-stateless-function
class Invite extends Component {
	constructor(props){
		super(props);
		this.state = {
			regionOptions: getRegions(),
			fname: {
				value: '',
				error: '',
				message: '',
				hasError: false
			},
			lname: {
				value: '',
				error: '',
				message: '',
				hasError: false
			},
			region: {
				value: '',
				error: '',
				message: '',
				hasError: false
			},
			mobile: {
				value: '',
				error: '',
				message: '',
				hasError: false
			}
		}
	}
	componentDidMount = () => {
		fetchInvited();
	};
	
	onFnameChange = (value) => {
		this.setState({
			fname: {
				...this.state.fname,
				value: value,
				hasError: !Boolean(value),
				error: !Boolean(value) ? 'REQUIRED' : ''
			}
		});
	};
	
	onLnameChange = (value) => {
		this.setState({
			lname: {
				...this.state.lname,
				value: value,
				hasError: !Boolean(value),
				error: !Boolean(value) ? 'REQUIRED' : ''
			}
		});
	};

	onMobileChange = (value) => {
		this.setState({
			mobile: {
				...this.state.mobile,
				value: value,
				hasError: !Boolean(value),
				error: !Boolean(value) ? 'REQUIRED' : ''
			}
		});
	};
	
	onRegionChange = (value) => {
		this.setState({
			region: {
				...this.state.region,
				value: value,
				hasError: !Boolean(value),
				error: !Boolean(value) ? 'REQUIRED' : ''
			}
		});
	};

	getCopyText = () => {
		return `Come join us, be a KakamPink!\n\n
			Download now!\n
			Android: ${playStore}\n
			Apple: ${appStore}\n\n
			Use my invite code: ${this.props.authUser.profile.refCode}
		`;
	};

	onShare = () => {
		nativeShare({
			title: `Be a KakamPink`,
			message: this.getCopyText()
		});
	};

	mobileIsInvited = (mobile) => {
		return this.props.invited.data.find(i => i.mobile === mobile);
	};

	onSend = () => {
		if (!this.state.fname.value || 
			!this.state.lname.value || 
			!this.state.region.value ||
			!this.state.mobile.value) {
			this.onFnameChange(this.state.fname.value);
			this.onLnameChange(this.state.lname.value);
			this.onRegionChange(this.state.region.value);
			this.onMobileChange(this.state.mobile.value);
		} else {
			displayPageLoader(true);
			// validate number if registered
			validateMobile(this.state.mobile.value)
				.then((res) => {
					if (res.available) {
						// validate number if invited
						const invited = this.mobileIsInvited(this.state.mobile.value)
						if (!invited) {
							// post invite
							newInvite({
								fname: this.state.fname.value,
								lname: this.state.lname.value,
								type: 'M',
								mobile: this.state.mobile.value,
								message: this.getCopyText()
							})
								.then((res) => {
									fetchInvited();
								})
								.catch((err) => {
									console.log('err', err);
								});
							} else {
								displayPageLoader(false);
								this.setState({
									mobile: {
										...this.state.mobile.value,
										hasError: true,
										error: getTranslation('MOBILE_ALREADY_INVITED')
									}
								});
							}
					} else {
						displayPageLoader(false);
						this.setState({
							mobile: {
								...this.state.mobile.value,
								hasError: true,
								error: getTranslation('MOBILE_ALREADY_REGISTERED')
							}
						});
					}
			});
		}
	}

	render = ({ authUser, invited }, { fname, lname, region, regionOptions, mobile }) => {

		if (!authUser) {
			return null;
		}

	  return (
			<div className={style.inviteWrap}>
				<form className={style.form}>
					<FormGroup label="NAME" hasError={fname.hasError || lname.hasError}>
						<FormInput
							className={style.name}
							style={{error: style.name}}
							value={fname.value}
							type="text"
							placeholder={getTranslation('FIRST_NAME')}
							onBlur={(e) => {
								this.onFnameChange(e.target.value)
							}}
							onInput={(e) => {
								this.onFnameChange(e.target.value)
							}}
							hasError={fname.hasError}
							error={fname.error}
							message={fname.message} />
						<FormInput
							className={style.name}
							style={{error: style.name}}
							value={lname.value}
							type="text"
							placeholder={getTranslation('LAST_NAME')}
							onBlur={(e) => {
								this.onLnameChange(e.target.value)
							}}
							onInput={(e) => {
								this.onLnameChange(e.target.value)
							}}
							hasError={lname.hasError}
							error={lname.error}
							message={lname.message} />
					</FormGroup>
					<FormGroup label={getTranslation("REGION")} hasError={region.hasError}>
						<FormDropdown
							label=""
							className={style.region}
							value={region.value}
							options={regionOptions}
							getValue={option => option.value}
							getText={option => option.text}
							onBlur={(e) => {
								this.onRegionChange(e.target.value)
							}}
							onIonChangenput={(e) => {
								this.onRegionChange(e.target.value)
							}}
							hasError={region.hasError}
							error={region.error}
							message={region.message}
							 />
					</FormGroup>
					<FormGroup label={getTranslation("MOBILE_NUMBER")}>
						<div className={style.mobileWrap}>
							<div className={style.mobileInputWrap}>
								<FormInput
									className={style.mobile}
									style={{error: style.mobile}}
									value={mobile.value}
									type="number"
									placeholder={'0919...'}
									onBlur={(e) => {
										this.onMobileChange(e.target.value)
									}}
									onInput={(e) => {
										this.onMobileChange(e.target.value)
									}}
									hasError={mobile.hasError}
									error={mobile.error}
									message={mobile.message} />
							</div>
							<div>
								<a className={style.pShare} 
									onClick={() => {
										this.onSend()
									}}>
								<ImageLoader
											src="assets/images/send_icon_white.png"
											style={{container: style.pIconShare}} />
										<span>{getTranslation('SEND')}</span>
								</a>
							</div>
						</div>
					</FormGroup>
					{/* Invite */}
					<FormGroup label="INVITE">
						<div className={style.invite}>
							<span className={`bold`}>{authUser.profile.refCode}</span>
							<div>
								<a className={style.pShare}
									onClick={() => {
										this.onShare()
									}}
								>
									<ImageLoader
											src="assets/images/share_icon_white.png"
											style={{container: style.pIconShare}} />
										<span>{getTranslation('SHARE')}</span>
								</a>
							</div>
						</div>
					</FormGroup>
				</form>
				<div className={style.list}>
					<div className={`${style.item} ${style.header}`}>
						<p className={`bold ${style.name}`}>{getTranslation('ADDED_MEMBERS')}</p>
						<p className={`bold ${style.status}`}>{getTranslation('STATUS')}</p>
					</div>
					{invited.data.map(item => (
						<div className={style.item}>
							<p className={`light ${style.name}`}>{`${item.fname} ${item.lname}`}</p>
							<p className={`light ${style.status}`}>{getTranslation(item.status)}</p>
						</div>
					))}
				</div>
			</div>
	  );
	};
}
export default connect(['authUser', 'invited'])(Invite);
