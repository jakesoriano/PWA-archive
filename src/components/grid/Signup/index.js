import { h, Component } from 'preact';
import { connect } from 'unistore/preact';
import { route } from 'preact-router';
import { updateStore } from '_unistore';
import { completeSignup, validateMobile } from '_mutations';
import {
	getTranslation,
	getMaxDOBDate,
	getRegions,
	getProvince,
	getMunicipality,
	getBarangay,
	displayPageLoader,
	showAlertBox
} from '_helpers';
import {
	FormGroup,
	FormInput,
	FormDropdown,
	ButtonDescription,
} from '_components/core';
// eslint-disable-next-line import/extensions
import style from './style';

// eslint-disable-next-line react/prefer-stateless-function
class Signup extends Component {
	constructor(props) {
		super(props);
		this.state = {
			regionOptions: getRegions(),
			provinceOptions: props.signup ? getProvince(props.signup.region) : [],
			municipalityOptions: props.signup
				? getMunicipality(props.signup.region, props.signup.province)
				: [],
			barangayOptions: props.signup
				? getBarangay(
						props.signup.region,
						props.signup.province,
						props.signup.municipality
				  )
				: [],
			fname: {
				value: props.signup ? props.signup.fname : '',
				error: '',
				message: 'NAME_MSG',
				hasError: false,
			},
			mname: {
				value: props.signup ? props.signup.mname : '',
				error: '',
				message: '',
				hasError: false,
			},
			lname: {
				value: props.signup ? props.signup.lname : '',
				error: '',
				message: '',
				hasError: false,
			},
			gender: {
				value: props.signup ? props.signup.gender : '',
				error: '',
				message: '',
				hasError: false,
			},
			birthday: {
				value: props.signup ? props.signup.birthday : '',
				error: '',
				message: '',
				hasError: false,
			},
			mobile: {
				value: props.signup ? props.signup.mobile : '',
				error: '',
				message: 'MOBILE_NUMBER_MSG',
				hasError: false,
			},
			region: {
				value: props.signup ? props.signup.region : '',
				error: '',
				message: '',
				hasError: false,
			},
			province: {
				value: props.signup ? props.signup.province : '',
				error: '',
				message: '',
				hasError: false,
			},
			municipality: {
				value: props.signup ? props.signup.municipality : '',
				error: '',
				message: '',
				hasError: false,
			},
			barangay: {
				value: props.signup ? props.signup.barangay : '',
				error: '',
				message: '',
				hasError: false,
			},
			isRegisteredVoter: {
				value: props.signup && props.signup.isRegisteredVoter === false ? 'no' : 'yes',
				error: '',
				message: '',
				hasError: false,
			},
			parentRefCode: {
				value:
					props.signup && props.signup.parentRefCode
						? props.signup.parentRefCode
						: '',
				error: '',
				message: 'REFERRAL_CODE_MSG',
				hasError: false,
			},
		};
	}
	componentDidMount = () => {
		updateStore({
			customBack: () => {
				route(`/${this.props.parent}/data-privacy`, true);
			},
		});
	};

	onFnameChange = (value) => {
		this.setState({
			fname: {
				...this.state.fname,
				value: value,
				hasError: !Boolean(value),
				error: !Boolean(value) ? 'REQUIRED' : '',
			},
		});
	};

	onMnameChange = (value) => {
		this.setState({
			mname: {
				...this.state.mname,
				value: value,
				hasError: !Boolean(value),
				error: !Boolean(value) ? 'REQUIRED' : '',
			},
		});
	};

	onLnameChange = (value) => {
		this.setState({
			lname: {
				...this.state.lname,
				value: value,
				hasError: !Boolean(value),
				error: !Boolean(value) ? 'REQUIRED' : '',
			},
		});
	};

	onGenderChange = (value) => {
		this.setState({
			gender: {
				...this.state.gender,
				value: value,
				hasError: !Boolean(value),
				error: !Boolean(value) ? 'REQUIRED' : '',
			},
		});
	};

	onDobChange = (value) => {
		this.setState({
			birthday: {
				...this.state.birthday,
				value: value,
				hasError: !Boolean(value),
				error: !Boolean(value) ? 'REQUIRED' : '',
			},
		}, () =>  {
			// ios workaround
			this.validateDob(value);
		});
	};

	onMobileChange = (value) => {
		this.setState({
			mobile: {
				...this.state.mobile,
				value: (value || '').slice(0, 11),
				hasError: !Boolean(value),
				error: !Boolean(value) ? 'REQUIRED' : '',
			},
		});
	};

	onRegionChange = (value) => {
		this.setState({
			region: {
				...this.state.region,
				value: value,
				hasError: !Boolean(value),
				error: !Boolean(value) ? 'REQUIRED' : '',
			},
			provinceOptions: value ? getProvince(value) : [],
			province: {
				...this.state.province,
				value: '',
			},
			municipalityOptions: [],
			municipality: {
				...this.state.municipality,
				value: '',
			},
			barangayOptions: [],
			barangay: {
				...this.state.barangay,
				value: '',
			},
		});
	};

	onProvinceChange = (value) => {
		this.setState({
			province: {
				...this.state.province,
				value: value,
				hasError: !Boolean(value),
				error: !Boolean(value) ? 'REQUIRED' : '',
			},
			municipalityOptions: value
				? getMunicipality(this.state.region.value, value)
				: [],
			municipality: {
				...this.state.municipality,
				value: '',
			},
			barangayOptions: [],
			barangay: {
				...this.state.barangay,
				value: '',
			},
		});
	};

	onMunicipalityChange = (value) => {
		this.setState({
			municipality: {
				...this.state.municipality,
				value: value,
				hasError: !Boolean(value),
				error: !Boolean(value) ? 'REQUIRED' : '',
			},
			barangayOptions: value
				? getBarangay(this.state.region.value, this.state.province.value, value)
				: [],
			barangay: {
				...this.state.barangay,
				value: '',
			},
		});
	};

	onBarangayChange = (value) => {
		this.setState({
			barangay: {
				...this.state.barangay,
				value: value,
				hasError: !Boolean(value),
				error: !Boolean(value) ? 'REQUIRED' : '',
			},
		});
	};

	onVoterChange = (value) => {
		this.setState({
			isRegisteredVoter: {
				...this.state.isRegisteredVoter,
				value: value,
			},
		});
	};

	onParentRefCodeChange = (value) => {
		this.setState({
			parentRefCode: {
				...this.state.parentRefCode,
				value: value,
				// hasError: !Boolean(value),
				// error: !Boolean(value) ? 'REQUIRED' : ''
			},
		});
	};

	validateDob = (value) => {
		const maxDate = new Date(getMaxDOBDate()).getTime();
		const selectedDate = new Date(value).getTime();
		if (maxDate < selectedDate) {
			this.setState({
				birthday: {
					...this.state.birthday,
					value: value,
					hasError: true,
					error: getTranslation('ERRMSG_DOB'),
				}
			})
		}
	};

	handleContinue = () => {
		if (
			!this.state.fname.value ||
			// !this.state.mname.value ||
			// !this.state.lname.value ||
			// !this.state.gender.value ||
			// !this.state.birthday.value ||
			!this.state.mobile.value
			// !this.state.region.value ||
			// !this.state.province.value ||
			// !this.state.municipality.value ||
			// !this.state.barangay.value ||
			// !this.state.isRegisteredVoter.value ||
			// !this.state.parentRefCode.value
		) {
			this.onFnameChange(this.state.fname.value);
			// this.onMnameChange(this.state.mname.value);
			// this.onLnameChange(this.state.lname.value);
			// this.onGenderChange(this.state.gender.value);
			// this.onDobChange(this.state.birthday.value);
			this.onMobileChange(this.state.mobile.value);
			// this.onRegionChange(this.state.region.value);
			// this.onProvinceChange(this.state.province.value);
			// this.onMunicipalityChange(this.state.municipality.value);
			// this.onBarangayChange(this.state.barangay.value);
			this.onVoterChange(this.state.isRegisteredVoter.value);
			// this.onParentRefCodeChange(this.state.parentRefCode.value);
		} else {
			displayPageLoader(true);
			validateMobile(this.state.mobile.value).then((res) => {
				displayPageLoader(false);
				if (!res.hasOwnProperty('error')) {
					if (res.available) {
						// displayPageLoader(false);
						setTimeout(() => {
							const userData = {
								...(this.props.signup || {}),
								'fname': this.state.fname.value,
								'mname': this.state.mname.value,
								'lname': '', // this.state.lname.value,
								// 'gender': this.state.gender.value,
								'birthday': this.state.birthday.value,
								'mobile': this.state.mobile.value,
								'region': this.state.region.value,
								'province': this.state.province.value,
								'municipality': this.state.municipality.value,
								'barangay': this.state.barangay.value,
								'isRegisteredVoter': this.state.isRegisteredVoter.value === 'yes' ? true : false,
								'parentRefCode': this.state.parentRefCode.value.length < 12 ? this.state.parentRefCode.value.toUpperCase() : this.state.parentRefCode.value,
								'deviceId': this.props.deviceId,
								'socType': this.props.signup.socType,
								'socId': this.props.signup.socId,
								'image': '',
								'industry': ''
							};
							displayPageLoader(true);
							completeSignup(userData)
								.then((res) => {
									displayPageLoader(false);
									if (res.success) {
										// route(`/${this.props.parent}/registration-otp`);
										// route(`/${this.props.parent}/home`);
										route(`/signup-success`);
									} else {
										showAlertBox({
											message: res.error || 'SOMETHING_WRONG'
										});
									}
								})
								.catch((err) => {
									console.error('error', err);
								});
						}, 100);
					} else {
						this.setState({
							mobile: {
								...this.state.mobile.value,
								hasError: true,
								error: getTranslation('MOBILE_UNAVAILABLE'),
							},
						});
					}
				} else {
					showAlertBox({
						message: 'SOMETHING_WRONG'
					});
				}
			});
		}
	};

	render = (
		{},
		{
			fname,
			mname,
			lname,
			birthday,
			mobile,
			region,
			province,
			municipality,
			barangay,
			isRegisteredVoter,
			parentRefCode,
			regionOptions,
			provinceOptions,
			municipalityOptions,
			barangayOptions,
			gender,
		}
	) => {
		return (
			<div className={style.signupWrap}>
				<form className={style.form}>
{/* 					
					<FormGroup
						label="NAME"
						hasError={fname.hasError || mname.hasError || lname.hasError}
					>
						<FormInput
							className={style.name}
							style={{ error: style.name }}
							value={fname.value}
							type="text"
							placeholder={getTranslation('FIRST_NAME')}
							onBlur={(e) => {
								this.onFnameChange(e.target.value);
							}}
							onInput={(e) => {
								this.onFnameChange(e.target.value);
							}}
							hasError={fname.hasError}
							error={fname.error}
							message={fname.message}
						/>
						<FormInput
							className={style.name}
							style={{ error: style.name }}
							value={mname.value}
							type="text"
							placeholder={getTranslation('MIDDLE_NAME')}
							onBlur={(e) => {
								this.onMnameChange(e.target.value);
							}}
							onInput={(e) => {
								this.onMnameChange(e.target.value);
							}}
							hasError={mname.hasError}
							error={mname.error}
							message={mname.message}
						/>
						<FormInput
							className={style.name}
							style={{ error: style.name }}
							value={lname.value}
							type="text"
							placeholder={getTranslation('LAST_NAME')}
							onBlur={(e) => {
								this.onLnameChange(e.target.value);
							}}
							onInput={(e) => {
								this.onLnameChange(e.target.value);
							}}
							hasError={lname.hasError}
							error={lname.error}
							message={lname.message}
						/>
					</FormGroup>

					<FormGroup label="GENDER" hasError={gender.hasError}>
						<div className={style.radioWrap}>
							<FormInput
								name="male"
								type="radio"
								label="MALE"
								value="M"
								id="male"
								checked={gender.value === 'M'}
								onInput={(e) => {
									this.onGenderChange(e.target.value);
								}}
							/>
							<FormInput
								name="female"
								type="radio"
								label="FEMALE"
								value="F"
								id="female"
								checked={gender.value === 'F'}
								onInput={(e) => {
									this.onGenderChange(e.target.value);
								}}
							/>
						</div>
					</FormGroup>

					<FormGroup label="DATE_OF_BIRTH" hasError={birthday.hasError}>
						<FormInput
							value={birthday.value}
							type="date"
							max={getMaxDOBDate()}
							onBlur={(e) => {
								this.onDobChange(e.target.value);
							}}
							onInput={(e) => {
								this.onDobChange(e.target.value);
							}}
							hasError={birthday.hasError}
							error={birthday.error}
							message={birthday.message}
						/>
					</FormGroup> */}

					<FormGroup label="NAME" hasError={fname.hasError}>
						<FormInput
							value={fname.value}
							type="text"
							onBlur={(e) => {
								this.onFnameChange(e.target.value);
							}}
							onInput={(e) => {
								this.onFnameChange(e.target.value);
							}}
							hasError={fname.hasError}
							error={fname.error}
							message={fname.message}
						/>
					</FormGroup>

					<FormGroup label="MOBILE_NUMBER" hasError={mobile.hasError}>
						<FormInput
							value={mobile.value}
							type="number"
							placeholder={'0919...'}
							max={11}
							onBlur={(e) => {
								this.onMobileChange(e.target.value);
							}}
							onInput={(e) => {
								this.onMobileChange(e.target.value);
							}}
							hasError={mobile.hasError}
							error={mobile.error}
							message={mobile.message}
						/>
					</FormGroup>
{/* 
					<FormGroup label="REGION" hasError={region.hasError}>
						<FormDropdown
							className={style.region}
							value={region.value}
							options={regionOptions}
							getValue={(option) => option.value}
							getText={(option) => option.text}
							onBlur={(e) => {
								this.onRegionChange(e.target.value);
							}}
							onIonChangenput={(e) => {
								this.onRegionChange(e.target.value);
							}}
							hasError={region.hasError}
							error={region.error}
							message={region.message}
						/>
					</FormGroup>

					<FormGroup label="PROVINCE" hasError={province.hasError}>
						<FormDropdown
							className={style.province}
							value={province.value}
							options={provinceOptions}
							getValue={(option) => option.value}
							getText={(option) => option.text}
							onBlur={(e) => {
								this.onProvinceChange(e.target.value);
							}}
							onIonChangenput={(e) => {
								this.onProvinceChange(e.target.value);
							}}
							hasError={province.hasError}
							error={province.error}
							message={province.message}
						/>
					</FormGroup>

					<FormGroup label="MUNICIPALITY" hasError={municipality.hasError}>
						<FormDropdown
							className={style.municipality}
							value={municipality.value}
							options={municipalityOptions}
							getValue={(option) => option.value}
							getText={(option) => option.text}
							onBlur={(e) => {
								this.onMunicipalityChange(e.target.value);
							}}
							onIonChangenput={(e) => {
								this.onMunicipalityChange(e.target.value);
							}}
							hasError={municipality.hasError}
							error={municipality.error}
							message={municipality.message}
						/>
					</FormGroup>

					<FormGroup label="BARANGAY" hasError={barangay.hasError}>
						<FormDropdown
							className={style.barangay}
							value={barangay.value}
							options={barangayOptions}
							getValue={(option) => option.value}
							getText={(option) => option.text}
							onBlur={(e) => {
								this.onBarangayChange(e.target.value);
							}}
							onIonChangenput={(e) => {
								this.onBarangayChange(e.target.value);
							}}
							hasError={barangay.hasError}
							error={barangay.error}
							message={barangay.message}
						/>
					</FormGroup>

					<FormGroup
						label="REGISTERED_VOTER"
						hasError={isRegisteredVoter.hasError}
					>
						<div className={style.radioWrap}>
							<FormInput
								name="voter"
								type="radio"
								label="YES"
								value="yes"
								id="yes"
								checked={isRegisteredVoter.value === 'yes'}
								onInput={(e) => {
									this.onVoterChange(e.target.value);
								}}
							/>
							<FormInput
								name="voter"
								type="radio"
								label="NO"
								value="no"
								id="no"
								checked={isRegisteredVoter.value === 'no'}
								onInput={(e) => {
									this.onVoterChange(e.target.value);
								}}
							/>
						</div>
					</FormGroup> */}

					<FormGroup label="REFERRAL_CODE" hasError={parentRefCode.hasError}>
						<FormInput
							value={parentRefCode.value}
							type="text"
							onBlur={(e) => {
								this.onParentRefCodeChange(e.target.value);
							}}
							onInput={(e) => {
								this.onParentRefCodeChange(e.target.value);
							}}
							hasError={parentRefCode.hasError}
							error={parentRefCode.error}
							message={parentRefCode.message}
						/>
					</FormGroup>

					<ButtonDescription
						onClickCallback={this.handleContinue}
						text="CONTINUE"
						isDisabled={this.state.isReading}
					/>
				</form>
			</div>
		);
	};
}
export default connect(['signup', 'deviceId'])(Signup);
