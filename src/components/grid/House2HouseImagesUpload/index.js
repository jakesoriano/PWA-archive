import { Component } from 'preact';
import { connect } from 'unistore/preact';
import { route } from 'preact-router';
import {
  FormGroup,
  FormDropdown,
  FormInput,
  ImageLoader,
  ButtonDescription,
} from '_components/core';
import {
  getRegions,
  getProvince,
  getMunicipality,
  getBarangay,
  displayPageLoader,
  getTranslation,
  showAlertBox,
  uploadFile,
  resizeImage,
} from '_helpers';
import { crowdSourcingImageUpload } from '_mutations';
import style from './style';
class House2HouseImagesUpload extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: {
        value: `${props.authUser.profile.fname}${
					props.authUser.profile?.lname
					  ? ` ${props.authUser.profile?.lname}`
					  : ''
				}`,
        error: '',
        message: '',
        hasError: false,
      },
      region: {
        value: props.authUser?.profile?.region || '',
        error: '',
        message: '',
        hasError: false,
      },
      province: {
        value: props.authUser?.profile?.province || '',
        error: '',
        message: '',
        hasError: false,
      },
      municipality: {
        value: props.authUser?.profile?.municipality || '',
        error: '',
        message: '',
        hasError: false,
      },
      barangay: {
        value: props.authUser?.profile?.barangay || '',
        error: '',
        message: '',
        hasError: false,
      },
      regionOptions: getRegions(),
      provinceOptions: [],
      municipalityOptions: [],
      barangayOptions: [],
      attachment: {
        file: [],
        error: '',
        message: '',
        hasError: false,
      },
    };
  }

	componentDidMount = () => {
	  const { authUser } = this.props;
	  if (authUser?.profile?.region) {
	    this.onRegionChange(authUser?.profile?.region);
	  }
	  if (authUser?.profile?.province) {
	    this.onProvinceChange(authUser?.profile?.province);
	  }
	  if (authUser?.profile?.municipality) {
	    this.onMunicipalityChange(authUser?.profile?.municipality);
	  }
	  if (authUser?.profile?.barangay) {
	    this.onBarangayChange(authUser?.profile?.barangay);
	  }
	};

	onNameChange = (value) => {
	  this.setState({
	    name: {
	      ...this.state.name,
	      value: value,
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

	onAttachmentChange = (file) => {
	  let { attachment } = this.state;
	  let files = [];
	  Array.from(file).map((f, i) => {
	    resizeImage({
	      file: f,
	      maxSize: 2400,
	    }).then((resizedImage) => {
	      console.log('upload resized image', resizedImage);
	      files.push(resizedImage);
	      this.setState({
	        attachment: {
	          ...attachment,
	          file: files,
	        },
	      });
	    });
	  });
	};

	onSubmit = () => {
	  if (
	    !this.state.name.value ||
			!this.state.region.value ||
			!this.state.province.value ||
			!this.state.municipality.value ||
			!this.state.barangay.value ||
			!this.state.attachment.file
	  ) {
	    this.onNameChange(this.state.name.value);
	    this.onRegionChange(this.state.region.value);
	    this.onProvinceChange(this.state.province.value);
	    this.onMunicipalityChange(this.state.municipality.value);
	    this.onBarangayChange(this.state.barangay.value);
	    this.onAttachmentChange(this.state.attachment.file);
	  } else {
	    let { file } = this.state.attachment;
	    const data = {
	      name: this.state.name.value,
	      region: this.state.region.value,
	      province: this.state.province.value,
	      municipality: this.state.municipality.value,
	      barangay: this.state.barangay.value,
	      images: [],
	    };
	    displayPageLoader(true);

	    // upload all files
	    Promise.all(file.map((item) => uploadFile({ file: item })))
	      .then((res) => {
	        console.error(res);
	        // post h2h data with images
	        crowdSourcingImageUpload({
	          ...data,
	          images: res
	            .map((i) => {
	              return i.data?.image || '';
	            })
	            .filter((i) => i),
	        })
	          .then((res) => {
	            displayPageLoader(false);
	            if (res.success) {
	              showAlertBox({
	                message: 'H2H_UPLOAD_IMAGE_SUCCESS',
	                success: true,
	              });
	              route(`/`);
	            } else {
	              displayPageLoader(false);
	              showAlertBox({
	                message: res.error || 'SOMETHING_WRONG',
	              });
	            }
	          })
	          .catch((err) => {
	            console.error('error', err);
	          });
	      })
	      .catch((err) => {
	        displayPageLoader(false);
	        showAlertBox({
	          message: res.errMessage || 'OOPS_SOMETHING_WRONG',
	        });
	      });
	  }
	};

	render = (
	  {},
	  {
	    region,
	    province,
	    municipality,
	    barangay,
	    regionOptions,
	    provinceOptions,
	    municipalityOptions,
	    barangayOptions,
	    attachment,
	    name,
	  }
	) => (
	  <div className={style.h2hIUWrap}>
	    <div className={style.formContainer}>
	      <FormGroup label="Name*" hasError={name.hasError}>
	        <FormInput
	          className={style.name}
	          style={{ error: style.name }}
	          value={name.value}
	          type="text"
	          onBlur={(e) => {
	            this.onNameChange(e.target.value);
	          }}
	          onInput={(e) => {
	            this.onNameChange(e.target.value);
	          }}
	          hasError={name.hasError}
	          error={name.error}
	          message={name.message}
	        />
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
	      <FormGroup className={style.formGroup}>
	        <div className={style.attachmentWrap}>
	          <div className={style.attachmentInputWrap}>
	            {!attachment.file && (
	              <span className={style.attLabel}>
	                {getTranslation('ATTACHMENT')}s
	                <ImageLoader
	                  src="assets/images/icon_attachment_blue.png"
	                  style={{ container: style.attIcon }}
	                />
	              </span>
	            )}
	            <FormInput
	              id="inputAttachment"
	              className={style.attachment}
	              style={{
	                error: style.attachment,
	                dummy: attachment.file ? style.dummyInput : style.hidden,
	              }}
	              value={`${
									attachment.file ? attachment.file.length + ' item(s)' : ''
								}`}
	              type="file"
	              onBlur={(e) => {
	                this.onAttachmentChange(e.target.files);
	              }}
	              onInput={(e) => {
	                this.onAttachmentChange(e.target.files);
	              }}
	              hasError={attachment.hasError}
	              error={attachment.error}
	              message={attachment.message}
	              multiple
	            />
	          </div>
	          <div>
	            <a
	              className={style.pShare}
	              onClick={() => {
	                document.getElementById('inputAttachment').click();
	              }}
	            >
	              <span>{getTranslation('ADD_FILE')}s</span>
	            </a>
	          </div>
	        </div>
	      </FormGroup>
	    </div>

	    <div className={style.buttonContainer}>
	      <ButtonDescription
	        onClickCallback={() => {
	          this.onSubmit();
	        }}
	        text={getTranslation('UPLOAD')}
	      />
	    </div>
	  </div>
	);
}
export default connect('authUser')(House2HouseImagesUpload);
