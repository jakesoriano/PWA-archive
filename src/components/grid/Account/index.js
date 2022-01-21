import { Component } from 'preact';
// import { route } from 'preact-router';
import { getTranslation, displayPageLoader } from '_helpers';
import { useCode } from '_mutations';
import { connect } from 'unistore/preact';
import { updateStore } from '_unistore';
import { FormGroup, FormInput, ButtonDescription } from '_components/core';
import { route } from 'preact-router';
import style from './style.scss';

// eslint-disable-next-line react/prefer-stateless-function
class Account extends Component {
	constructor(props) {
		super(props);
		this.state = {
			inviteCode: {
				value: '',
				error: '',
				message: '',
				hasError: false
			},
			communityRadio: {
				checked: true,
			}
		};
	};

	resetState = () => {
		this.setState({
			inviteCode: {
				value: '',
				error: '',
				message: '',
				hasError: false
			},
			communityRadio: {
				checked: true,
			}
		});
	}

	onCodeChange = (value) => {
		this.setState({
			inviteCode: {
				...this.state.inviteCode,
				value,
				hasError: !value,
				error: !value ? 'REQUIRED' : ''
			}
		});
	};

	onCommunityRadioChange = (value) => {
		console.log('radio change');
	};

	showAlertBox = (message, hasError) => {
		updateStore({
			alertShow: {
				success: !hasError,
				content: message
			}
		});
	}

	handleContinue = (e) => {
		if (!this.state.inviteCode.value) {
			this.onCodeChange(this.state.inviteCode.value);
		} else {
		const data = {
			inviteCode: this.state.inviteCode.value,
		};
			// Submit invite code
			useCode(data).then((res) => {
				if(res && res.success) {
					// reset form data
					this.resetState();
					updateStore({
						isCommunityCodeSuccess: true
					}, true)
					route(`/community-setup`);
				} else {
					this.showAlertBox('INCORRECT_CODE', true);
				}
				displayPageLoader(false);
			}).catch((err) => {
				this.showAlertBox('INCORRECT_CODE', true);
				displayPageLoader(false);
			});
		}
	};

	render = ({}, { inviteCode, communityRadio}) => {
		return (
			<div className={style.accountProfileWrap}>
				<div className={style.accountProfileContent}>
					
					<h4>{`${getTranslation('ACCOUNT_LEVEL')}: Member`}</h4>
					<h2>{getTranslation('UPGRADE_ACCOUNT')}</h2>
					<form className={style.form}>
						<FormGroup hasError={inviteCode.hasError}>
							<FormInput
								className={style.communityRadio}
								type='radio'
								checked={communityRadio.checked}
								label={getTranslation('COMMUNITY_LEADER')}
							/>
							<FormInput
								className={style.communityInputCode}
								value={inviteCode.value}
								placeholder={getTranslation('ENTER_INVITE_CODE')}
								onBlur={(e) => {
									this.onCodeChange(e.target.value)
								}}
								onInput={(e) => {
									this.onCodeChange(e.target.value)
								}}
								hasError={inviteCode.hasError}
								error={inviteCode.error}
								message={inviteCode.message}
							/>
						</FormGroup>
						<FormGroup className={style.inactive}>
							<FormInput
								className={style.communityRadio}
								value=''
								type='radio'
								label={getTranslation('APPLY_COMMUNITY_LEADER')}
							/>
						</FormGroup>

						<FormGroup className={style.inactive}>
							<FormInput
								className={style.communityRadio}
								value=''
								type='radio'
								label={getTranslation('VOLUNTEER')}
							/>
						</FormGroup>
					
					</form>
				</div>

				<div className={style.buttonContainer}>
					<ButtonDescription
						onClickCallback={() => {
							this.handleContinue()
						}}
						text="Continue"
					/>
				</div>
			</div>
		);
	};
}
export default connect(['authUser'])(Account);
