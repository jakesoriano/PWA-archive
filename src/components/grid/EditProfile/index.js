/* eslint-disable no-unneeded-ternary */
/* eslint-disable no-extra-boolean-cast */
/* eslint-disable react/no-access-state-in-setstate */
/* eslint-disable prefer-destructuring */
import { h, Component } from 'preact';
import { connect } from 'unistore/preact';
import { route } from 'preact-router';
import { updateProfile } from '_mutations';
import {
  getTranslation,
  getMaxDOBDate,
  getRegions,
  getProvince,
  getMunicipality,
  getBarangay,
  displayPageLoader,
  showAlertBox,
  isUserUpdatedProfile,
  circleModal,
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
class EditProfile extends Component {
  constructor(props) {
    super(props);
    const profile = props.authUser.profile;
    this.state = {
      regionOptions: getRegions(),
      provinceOptions: getProvince(profile.region),
      municipalityOptions: getMunicipality(profile.region, profile.province),
      barangayOptions: getBarangay(
        profile.region,
        profile.province,
        profile.municipality
      ),
      fname: {
        value: profile.fname ? profile.fname : '',
        error: '',
        message: '',
        hasError: false,
      },
      mname: {
        value: profile.mname ? profile.mname : '',
        error: '',
        message: '',
        hasError: false,
      },
      lname: {
        value: profile.lname ? profile.lname : '',
        error: '',
        message: '',
        hasError: false,
      },
      gender: {
        value: profile.gender ? profile.gender : '',
        error: '',
        message: '',
        hasError: false,
      },
      birthday: {
        value: profile.birthday ? profile.birthday : '',
        error: '',
        message: '',
        hasError: false,
      },
      mobile: {
        value: profile.mobile ? profile.mobile : '',
        error: '',
        message: '',
        hasError: false,
      },
      region: {
        value: profile.region ? profile.region : '',
        error: '',
        message: '',
        hasError: false,
      },
      province: {
        value: profile.province ? profile.province : '',
        error: '',
        message: '',
        hasError: false,
      },
      municipality: {
        value: profile.municipality ? profile.municipality : '',
        error: '',
        message: '',
        hasError: false,
      },
      barangay: {
        value: profile.barangay ? profile.barangay : '',
        error: '',
        message: '',
        hasError: false,
      },
      isRegisteredVoter: {
        value: profile && profile.isRegisteredVoter === false ? 'no' : 'yes',
        error: '',
        message: '',
        hasError: false,
      },
    };
  }
  // componentDidMount = () => {

  // };

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
	  this.setState(
	    {
	      birthday: {
	        ...this.state.birthday,
	        value: value,
	        hasError: !Boolean(value),
	        error: !Boolean(value) ? 'REQUIRED' : '',
	      },
	    },
	    () => {
	      // ios workaround
	      this.validateDob(value);
	    }
	  );
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

	validateDob = (value) => {
	  try {
	    const maxDate = new Date(getMaxDOBDate()).getTime();
	    const selectedDate = new Date(value).getTime();
	    const spliteValue = (value || '').split('-');
	    if (
	      maxDate < selectedDate ||
				Boolean(
				  new Date(value).toString().toLowerCase().indexOf('invalid') > -1
				) ||
				!(spliteValue[0] && spliteValue[0].length === 4) ||
				!(
				  spliteValue[1] &&
					(spliteValue[1].length === 1 || spliteValue[1].length === 2)
				) ||
				!(
				  spliteValue[2] &&
					(spliteValue[2].length === 1 || spliteValue[1].length === 2)
				)
	    ) {
	      this.setState({
	        birthday: {
	          ...this.state.birthday,
	          value: value,
	          hasError: true,
	          error: getTranslation('ERRMSG_DOB'),
	        },
	      });
	    }
	  } catch (err) {
	    console.error('validateDob', err);
	    this.setState({
	      birthday: {
	        ...this.state.birthday,
	        value: value,
	        hasError: true,
	        error: getTranslation('ERRMSG_DOB'),
	      },
	    });
	  }
	};

	handleContinue = () => {
	  if (
	    !this.state.fname.value ||
			!this.state.lname.value ||
			!this.state.gender.value ||
			!this.state.birthday.value ||
			this.state.birthday.error ||
			!this.state.region.value ||
			!this.state.province.value ||
			!this.state.municipality.value ||
			!this.state.barangay.value ||
			!this.state.isRegisteredVoter.value
	  ) {
	    this.onFnameChange(this.state.fname.value);
	    this.onLnameChange(this.state.lname.value);
	    this.onGenderChange(this.state.gender.value);
	    this.onDobChange(this.state.birthday.value);
	    this.onRegionChange(this.state.region.value);
	    this.onProvinceChange(this.state.province.value);
	    this.onMunicipalityChange(this.state.municipality.value);
	    this.onBarangayChange(this.state.barangay.value);
	    this.onVoterChange(this.state.isRegisteredVoter.value);
	  } else {
	    const userData = {
	      fname: this.state.fname.value,
	      mname: this.state.mname.value,
	      lname: this.state.lname.value,
	      gender: this.state.gender.value,
	      birthday: this.state.birthday.value,
	      region: this.state.region.value,
	      province: this.state.province.value,
	      municipality: this.state.municipality.value,
	      barangay: this.state.barangay.value,
	      isRegisteredVoter:
					this.state.isRegisteredVoter.value === 'yes' ? true : false,
	    };
	    displayPageLoader(true);
	    const isUpdatedProfile = isUserUpdatedProfile();
	    updateProfile(userData)
	      .then((res) => {
	        displayPageLoader(false);
	        if (res.success) {
	          // route(`/${this.props.parent}/registration-otp`);
	          route(`/${this.props.parent}`);
	          if (!isUpdatedProfile) {
	            circleModal({
	              title: getTranslation('UPDATE_PROFILE_SUCCESS'),
	              content: getTranslation('NEWLY_UPDATED_PROFILE'),
	            });
	          } else {
	            showAlertBox({
	              message: 'UPDATE_PROFILE_SUCCESS',
	              success: true,
	            });
	          }
	        } else {
	          showAlertBox({
	            message: res.error || 'SOMETHING_WRONG',
	          });
	        }
	      })
	      .catch((err) => {
	        console.error('error', err);
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
	    regionOptions,
	    provinceOptions,
	    municipalityOptions,
	    barangayOptions,
	    gender,
	  }
	) => {
	  return (
	    <div className={style.profileWrap}>
	      <form className={style.form}>
	        <FormGroup label="First Name" hasError={fname.hasError}>
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
	        </FormGroup>
	        <FormGroup label="Middle Name" hasError={mname.hasError}>
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
	        </FormGroup>
	        <FormGroup label="Last Name" hasError={lname.hasError}>
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

	        <FormGroup label="Gender" hasError={gender.hasError}>
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
	            type="custom-date"
	            max={getMaxDOBDate()}
	            onInput={(date) => {
	              this.onDobChange(date);
	            }}
	            hasError={birthday.hasError}
	            error={birthday.error}
	            message={birthday.message}
	          />
	        </FormGroup>

	        <FormGroup label="MOBILE_NUMBER">
	          {/* <FormInput
							value={mobile.value}
							disabled={true}
						/> */}
	          <p className={style.displayOnly}>{mobile.value}</p>
	        </FormGroup>

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
	            onChange={(e) => {
	              this.onRegionChange(e.target.value);
	            }}
	            hasError={region.hasError}
	            error={region.error}
	            message={region.message}
	          />
	        </FormGroup>

	        {provinceOptions && provinceOptions.length ? (
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
	              onChange={(e) => {
	                this.onProvinceChange(e.target.value);
	              }}
	              hasError={province.hasError}
	              error={province.error}
	              message={province.message}
	            />
	          </FormGroup>
	        ) : null}

	        {municipalityOptions && municipalityOptions.length ? (
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
	              onChange={(e) => {
	                this.onMunicipalityChange(e.target.value);
	              }}
	              hasError={municipality.hasError}
	              error={municipality.error}
	              message={municipality.message}
	            />
	          </FormGroup>
	        ) : null}

	        {barangayOptions && barangayOptions.length ? (
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
	              onChange={(e) => {
	                this.onBarangayChange(e.target.value);
	              }}
	              hasError={barangay.hasError}
	              error={barangay.error}
	              message={barangay.message}
	            />
	          </FormGroup>
	        ) : null}

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
	        </FormGroup>

	        <ButtonDescription
	          onClickCallback={this.handleContinue}
	          text="SAVE_PROFILE"
	          isDisabled={this.state.isReading}
	          id="update-profile-submit"
	        />
	      </form>
	    </div>
	  );
	};
}
export default connect(['authUser'])(EditProfile);
