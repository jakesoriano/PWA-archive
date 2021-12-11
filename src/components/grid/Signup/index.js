import { h, Component } from 'preact';
import { connect } from 'unistore/preact';
import { route } from 'preact-router';
import { updateStore } from '_unistore';
import { completeSignup } from '_mutations';
import {
	getTranslation,
	getMaxDOBDate,
	getRegions,
	getProvince,
	getMunicipality,
	getBarangay,
	displayPageLoader
} from '_helpers';
import {
	FormGroup,
	FormInput,
	FormDropdown,
	ButtonDescription
} from '_components/core';
import {
	nativeSelfie
} from '_platform/helpers';
// eslint-disable-next-line import/extensions
import style from './style';

// eslint-disable-next-line react/prefer-stateless-function
class Signup extends Component {
	constructor(props){
		super(props);
		this.state = {
			regionOptions: getRegions(),
			provinceOptions: props.signup ? getProvince(props.signup.region) :[],
			municipalityOptions: props.signup ? getMunicipality(props.signup.region, props.signup.province) :[],
			barangayOptions: props.signup ? getBarangay(props.signup.region, props.signup.province, props.signup.municipality) :[],
			fname: {
				value: props.signup ? props.signup.fname : '',
				error: '',
				message: '',
				hasError: false
			},
			mname: {
				value: props.signup ? props.signup.mname : '',
				error: '',
				message: '',
				hasError: false
			},
			lname: {
				value: props.signup ? props.signup.lname : '',
				error: '',
				message: '',
				hasError: false
			},
			gender: {
				value: props.signup ? props.signup.gender : '',
				error: '',
				message: '',
				hasError: false
			},
			dob: {
				value: props.signup ? props.signup.birthday : '',
				error: '',
				message: '',
				hasError: false
			},
			number: {
				value: props.signup ? props.signup.mobile : '',
				error: '',
				message: '',
				hasError: false
			},
			region: {
				value: props.signup ? props.signup.region : '',
				error: '',
				message: '',
				hasError: false
			},
			province: {
				value: props.signup ? props.signup.province : '',
				error: '',
				message: '',
				hasError: false
			},
			municipality: {
				value: props.signup ? props.signup.municipality : '',
				error: '',
				message: '',
				hasError: false
			},
			barangay: {
				value: props.signup ? props.signup.barangay : '',
				error: '',
				message: '',
				hasError: false
			},
			voter: {
				value: props.signup && props.signup.isRegisteredVoter ? props.signup.isRegisteredVoter : 'yes',
				error: '',
				message: '',
				hasError: false
			},
			rCode: {
				value: props.signup && props.signup.parentRefCode? props.signup.parentRefCode : '',
				error: '',
				message: '',
				hasError: false
			}
		}
	}
	componentDidMount = () => {
		updateStore({
			customBack: () => {
				route(`/${this.props.parent}/terms`, true)
			}
		});
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
	
	onMnameChange = (value) => {
		this.setState({
			mname: {
				...this.state.lname,
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
	
	onGenderChange = (value) => {
		this.setState({
			gender: {
				...this.state.gender,
				value: value,
				hasError: !Boolean(value),
				error: !Boolean(value) ? 'REQUIRED' : ''
			}
		});
	};
	
	onDobChange = (value) => {
		this.setState({
			dob: {
				...this.state.dob,
				value: value,
				hasError: !Boolean(value),
				error: !Boolean(value) ? 'REQUIRED' : ''
			}
		});
	};
	
	onNumberChange = (value) => {
		this.setState({
			number: {
				...this.state.number,
				value: value.slice(0 ,11),
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
			},
			provinceOptions: value ? getProvince(value) : [],
			province: {
				...this.state.province,
				value: '',
			},
			municipalityOptions: [],
			municipality: {
				...this.state.province,
				value: '',
			},
			barangayOptions: [],
			barangay: {
				...this.state.province,
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
				error: !Boolean(value) ? 'REQUIRED' : ''
			},
			municipalityOptions: value ? getMunicipality(this.state.region.value, value) : [],
			municipality: {
				...this.state.province,
				value: '',
			},
			barangayOptions: [],
			barangay: {
				...this.state.province,
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
				error: !Boolean(value) ? 'REQUIRED' : ''
			},
			barangayOptions: value ? getBarangay(this.state.region.value, this.state.province.value, value) : [],
			barangay: {
				...this.state.province,
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
				error: !Boolean(value) ? 'REQUIRED' : ''
			}
		});
	};
	
	onVoterChange = (value) => {
		this.setState({
			voter: {
				...this.state.voter,
				value: value
			}
		});
	};
	
	onRCodeChange = (value) => {
		this.setState({
			rCode: {
				...this.state.rCode,
				value: value,
				hasError: !Boolean(value),
				error: !Boolean(value) ? 'REQUIRED' : ''
			}
		});
	};

	handleContinue = () => {
		if (!this.state.fname.value ||
			!this.state.mname.value ||
			!this.state.lname.value ||
			!this.state.dob.value ||
			!this.state.number.value ||
			!this.state.region.value ||
			!this.state.province.value ||
			!this.state.municipality.value ||
			!this.state.barangay.value ||
			!this.state.voter.value ||
			!this.state.rCode.value) {
			this.onFnameChange(this.state.fname.value);
			this.onMnameChange(this.state.lname.value);
			this.onLnameChange(this.state.lname.value);
			this.onDobChange(this.state.dob.value);
			this.onNumberChange(this.state.number.value);
			this.onRegionChange(this.state.region.value);
			this.onProvinceChange(this.state.province.value);
			this.onMunicipalityChange(this.state.municipality.value);
			this.onBarangayChange(this.state.barangay.value);
			this.onVoterChange(this.state.voter.value);
			this.onRCodeChange(this.state.rCode.value);
		} else {
			
			updateStore({
				signup: {
					...(this.props.signup || {}),
					fname: this.state.fname.value,
					mname: this.state.mname.value,
					lname: this.state.lname.value,
					gender: this.state.gender.value,
					birthday: this.state.dob.value,
					mobile: this.state.number.value,
					region: this.state.region.value,
					province: this.state.province.value,
					municipality: this.state.municipality.value,
					barangay: this.state.barangay.value,
					isRegisteredVoter: this.state.voter.value,
					parentRefCode: this.state.rCode.value,
				}
			});
			setTimeout(() => {
				completeSignup(this.props.signup).then((res) => {
					updateStore({
						signup: {
							...(this.props.signup || {}),
							registrationId: res.id
						}
					})
					route(`/${this.props.parent}/otp`);
				})
			}, 100)
			// displayPageLoader(false);
			// nativeSelfie().then(image => {
			// 	displayPageLoader(false);
			// 	updateStore({
			// 		signup: {
			// 			...(this.props.signup || {}),
			// 			image,
			// 			fname: this.state.fname.value,
			// 			mname: this.state.mname.value,
			// 			lname: this.state.lname.value,
			// 			gender: this.state.gender.value,
			// 			dob: this.state.dob.value,
			// 			number: this.state.number.value,
			// 			region: this.state.region.value,
			// 			province: this.state.province.value,
			// 			municipality: this.state.municipality.value,
			// 			barangay: this.state.barangay.value,
			// 			voter: this.state.voter.value,
			// 			rCode: this.state.rCode.value,
			// 		}
			// 	});
			// });
		}
	}

	render = ({}, {
		fname,
		mname,
		lname,
		dob,
		number,
		region,
		province,
		municipality,
		barangay,
		voter,
		rCode,
		regionOptions,
		provinceOptions,
		municipalityOptions,
		barangayOptions
	}) => {

	  return (
			<div className={style.signupWrap}>
				<form className={style.form}>

					<FormGroup label="NAME" hasError={fname.hasError || mname.hasError || lname.hasError}>
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
							value={mname.value}
							type="text"
							placeholder={getTranslation('MIDDLE_NAME')}
							onBlur={(e) => {
								this.onMnameChange(e.target.value)
							}}
							onInput={(e) => {
								this.onMnameChange(e.target.value)
							}}
							hasError={mname.hasError}
							error={mname.error}
							message={mname.message} />
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

					<FormGroup label="DATE_OF_BIRTH" hasError={dob.hasError}>
						<FormInput
							value={dob.value}
							type="date"
							max={getMaxDOBDate()}
							onBlur={(e) => {
								this.onDobChange(e.target.value)
							}}
							onInput={(e) => {
								this.onDobChange(e.target.value)
							}}
							hasError={dob.hasError}
							error={dob.error}
							message={dob.message} />
					</FormGroup>

					<FormGroup label="MOBILE_NUMBER" hasError={number.hasError}>
						<FormInput
							value={number.value}
							type="number"
							placeholder={'0919...'}
							max={11}
							onBlur={(e) => {
								this.onNumberChange(e.target.value)
							}}
							onInput={(e) => {
								this.onNumberChange(e.target.value)
							}}
							hasError={number.hasError}
							error={number.error}
							message={number.message} />
					</FormGroup>

					<FormGroup label="REGION" hasError={region.hasError}>
						<FormDropdown
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

					<FormGroup label="PROVINCE" hasError={province.hasError}>
						<FormDropdown
							className={style.province}
							value={province.value}
							options={provinceOptions}
							getValue={option => option.value}
							getText={option => option.text}
							onBlur={(e) => {
								this.onProvinceChange(e.target.value)
							}}
							onIonChangenput={(e) => {
								this.onProvinceChange(e.target.value)
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
							getValue={option => option.value}
							getText={option => option.text}
							onBlur={(e) => {
								this.onMunicipalityChange(e.target.value)
							}}
							onIonChangenput={(e) => {
								this.onMunicipalityChange(e.target.value)
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
							getValue={option => option.value}
							getText={option => option.text}
							onBlur={(e) => {
								this.onBarangayChange(e.target.value)
							}}
							onIonChangenput={(e) => {
								this.onBarangayChange(e.target.value)
							}}
							hasError={barangay.hasError}
							error={barangay.error}
							message={barangay.message}
							/>
					</FormGroup>

					<FormGroup label="REGISTERED_VOTER" hasError={voter.hasError}>
						<div className={style.radioWrap}>
						<FormInput
							name="voter"
							type="radio"
							label="YES"
							value="yes"
							id="yes"
							checked={voter.value === 'yes'}
							onBlur={(e) => {
								this.onVoterChange(e.target.value)
							}}
							onInput={(e) => {
								this.onVoterChange(e.target.value)
							}} />
							<FormInput
								name="voter"
								type="radio"
								label="NO"
								value="no"
								id="no"
								checked={voter.value === 'no'}
								onCLick={(e) => {
									this.onVoterChange(e.target.value)
								}}
								onInput={(e) => {
									this.onVoterChange(e.target.value)
								}} />
							</div>
					</FormGroup>

					<FormGroup label="REFERRAL_CODE" hasError={rCode.hasError}>
						<FormInput
							value={rCode.value}
							type="text"
							onBlur={(e) => {
								this.onRCodeChange(e.target.value)
							}}
							onInput={(e) => {
								this.onRCodeChange(e.target.value)
							}}
							hasError={rCode.hasError}
							error={rCode.error}
							message={rCode.message} />
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
export default connect(['signup'])(Signup);
