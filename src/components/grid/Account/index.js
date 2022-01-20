import { Component } from 'preact';
// import { route } from 'preact-router';
import { getTranslation, displayPageLoader } from '_helpers';
import { changePassword } from '_mutations';
import { connect } from 'unistore/preact';
import { updateStore } from '_unistore';
import { FormGroup, FormInput, ButtonDescription } from '_components/core';
import { nativeSetCredential } from '_platform/helpers';
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
				value: '',
				error: '',
				message: '',
				checked: true,
				hasError: false
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
				value: '',
				error: '',
				message: '',
				checked: true,
				hasError: false
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
		// validate text input
		// submit invite code
		route(`/${this.props.parent}/community-setup`);
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
								value={communityRadio.value}
								type='radio'
								checked={communityRadio.checked}
								label={getTranslation('COMMUNITY_LEADER')}
								onBlur={(e) => {
									this.onCommunityRadioChange(e.target.value)
								}}
								onInput={(e) => {
									this.onCommunityRadioChange(e.target.value)
								}}
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
