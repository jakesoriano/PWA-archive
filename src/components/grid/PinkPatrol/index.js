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
  promptModal,
} from '_helpers';
import { pinkPatrolReport } from '_mutations';
import { patrolReportTypes } from '_constant';
import { updateStore } from '_unistore';
import style from './style';

class PinkPatrol extends Component {
  constructor(props) {
    super(props);
    this.initialState = {
      reportType: {
        value: '',
        error: '',
        message: '',
        hasError: false,
      },
      witness: {
        value: '',
        error: '',
        message: '',
        hasError: false,
      },
      witnessName: {
        value: '',
        error: '',
        message: '',
        hasError: false,
      },
      witnessContact: {
        value: '',
        error: '',
        message: '',
        hasError: false,
      },
      time: {
        value: '',
        error: '',
        message: '',
        hasError: false,
      },
      location: {
        value: '',
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
      precint: {
        value: '',
        error: '',
        message: '',
        hasError: false,
      },
      message: {
        value: '',
        error: '',
        message: '',
        hasError: false,
      },
      witnessOptions: ['OO, AKO ANG SAKSI', 'HINDI, IBANG TAO ANG SAKSI'],
      locationOptions: ['SA MISMONG PRESINTO', 'SA LABAS'],
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
    this.state = this.initialState;
  }

	componentDidMount = () => {
	  const { authUser } = this.props;
	  if (this.props.draftIndex === undefined) {
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
	  } else {
	    this.intializeEdit(this.props.draftIndex);
	  }
	};

	intializeEdit = (i) => {
	  let { file } = this.props.pinkPatrol.data[i];
	  const currentItem = this.props.pinkPatrol.data[i].data;
	  this.setState({
	    ...this.state,
	    reportType: {
	      ...this.state.reportType,
	      value: currentItem.reportType,
	    },
	    witness: {
	      ...this.state.witness,
	      value: currentItem.witness,
	    },
	    witnessName: {
	      ...this.state.witnessName,
	      value: currentItem.witnessName,
	    },
	    witnessContact: {
	      ...this.state.witnessContact,
	      value: currentItem.witnessContact,
	    },
	    time: {
	      ...this.state.time,
	      value: currentItem.time,
	    },
	    location: {
	      ...this.state.location,
	      value: currentItem.location,
	    },

	    region: {
	      ...this.state.region,
	      value: currentItem.region,
	    },
	    province: {
	      ...this.state.province,
	      value: currentItem.province,
	    },
	    municipality: {
	      ...this.state.municipality,
	      value: currentItem.municipality,
	    },
	    barangay: {
	      ...this.state.barangay,
	      value: currentItem.barangay,
	    },
	    provinceOptions: getProvince(currentItem.region),
	    municipalityOptions: getMunicipality(
	      currentItem.region,
	      currentItem.province
	    ),
	    barangayOptions: getBarangay(
	      currentItem.region,
	      currentItem.province,
	      currentItem.municipality
	    ),
	    precint: {
	      ...this.state.precint,
	      value: currentItem.precintNo,
	    },
	    message: {
	      ...this.state.message,
	      value: currentItem.message,
	    },
	    attachment: {
	      ...this.state.attachment,
	      file,
	    },
	  });
	};

	onReportTypeChange = (value) => {
	  this.setState({
	    reportType: {
	      ...this.state.reportType,
	      value: value,
	      hasError: !Boolean(value),
	      error: !Boolean(value) ? 'REQUIRED' : '',
	    },
	  });
	  if (
	    !this.state.reportType.value ||
			this.state.reportType.value === patrolReportTypes[0] ||
			this.state.reportType.value === patrolReportTypes[1]
	  ) {
	    this.setState({
	      witness: {
	        ...this.state.witness,
	        value: '',
	        hasError: !Boolean(value),
	        error: !Boolean(value) ? 'REQUIRED' : '',
	      },
	      witnessName: {
	        ...this.state.witnessName,
	        value: '',
	        hasError: !Boolean(value),
	        error: !Boolean(value) ? 'REQUIRED' : '',
	      },
	      witnessContact: {
	        ...this.state.witnessContact,
	        value: '',
	        hasError: !Boolean(value),
	        error: !Boolean(value) ? 'REQUIRED' : '',
	      },
	    });
	  }
	};

	onWitnessChange = (value) => {
	  this.setState({
	    witness: {
	      ...this.state.witness,
	      value: value,
	      hasError: !Boolean(value),
	      error: !Boolean(value) ? 'REQUIRED' : '',
	    },
	  });
	  if (this.state.witness.value !== this.state.witnessOptions[1]) {
	    this.setState({
	      witnessName: {
	        ...this.state.witnessName,
	        value: '',
	        hasError: !Boolean(value),
	        error: !Boolean(value) ? 'REQUIRED' : '',
	      },
	      witnessContact: {
	        ...this.state.witnessContact,
	        value: '',
	        hasError: !Boolean(value),
	        error: !Boolean(value) ? 'REQUIRED' : '',
	      },
	    });
	  }
	};

	onWitnessNameChange = (value) => {
	  this.setState({
	    witnessName: {
	      ...this.state.witnessName,
	      value: value,
	      hasError: !Boolean(value),
	      error: !Boolean(value) ? 'REQUIRED' : '',
	    },
	  });
	};

	onWitnessContactChange = (value) => {
	  this.setState({
	    witnessContact: {
	      ...this.state.witnessContact,
	      value: value,
	      hasError: !Boolean(value),
	      error: !Boolean(value) ? 'REQUIRED' : '',
	    },
	  });
	};

	onTimeChange = (value) => {
	  this.setState({
	    time: {
	      ...this.state.time,
	      value: value,
	      hasError: !Boolean(value),
	      error: !Boolean(value) ? 'REQUIRED' : '',
	    },
	  });
	};

	onLocationChange = (value) => {
	  this.setState({
	    location: {
	      ...this.state.location,
	      value: value,
	      hasError: !Boolean(value),
	      error: !Boolean(value) ? 'REQUIRED' : '',
	    },
	  });
	  if (!value || value !== this.state.locationOptions[0]) {
	    this.setState({
	      precint: {
	        ...this.state.precint,
	        value: '',
	        hasError: !Boolean(value),
	        error: !Boolean(value) ? 'REQUIRED' : '',
	      },
	    });
	  }
	};

	onPrecintChange = (value) => {
	  this.setState({
	    precint: {
	      ...this.state.precint,
	      value: value,
	      hasError: !Boolean(value),
	      error: !Boolean(value) ? 'REQUIRED' : '',
	    },
	  });
	};

	onMessageChange = (value) => {
	  this.setState({
	    message: {
	      ...this.state.message,
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
	    !this.state.reportType.value ||
			!this.state.region.value ||
			!this.state.province.value ||
			!this.state.municipality.value ||
			!this.state.barangay.value ||
			!this.state.time.value ||
			!this.state.location.value ||
			!this.state.message.value ||
			(this.state.reportType.value &&
			this.state.reportType.value !== patrolReportTypes[0] &&
			this.state.reportType.value !== patrolReportTypes[1] &&
			!this.state.witness.value) ||
			(this.state.witness.value === this.state.witnessOptions[1] && 
			(!this.state.witnessName.value || !this.state.witnessContact.value)) ||
			(this.state.location.value === this.state.locationOptions[0] && !this.state.precint.value)
	  ) {
	    this.onReportTypeChange(this.state.reportType.value);
	    this.onWitnessChange(this.state.witness.value);
	    this.onWitnessNameChange(this.state.witnessName.value);
	    this.onWitnessContactChange(this.state.witnessContact.value);
	    this.onTimeChange(this.state.time.value);
	    this.onLocationChange(this.state.location.value);
	    this.onRegionChange(this.state.region.value);
	    this.onProvinceChange(this.state.province.value);
	    this.onMunicipalityChange(this.state.municipality.value);
	    this.onBarangayChange(this.state.barangay.value);
	    this.onMessageChange(this.state.message.value);
	  } else {
	    let { file } = this.state.attachment;
	    const data = {
	      reportType: this.state.reportType.value,
	      witness: this.state.witness.value,
	      witnessName: this.state.witnessName.value,
	      witnessContact: this.state.witnessContact.value,
	      time: this.state.time.value,
	      location: this.state.location.value,
	      region: this.state.region.value,
	      province: this.state.province.value,
	      municipality: this.state.municipality.value,
	      barangay: this.state.barangay.value,
	      precintNo: this.state.precint.value,
	      message: this.state.message.value,
	      images: [],
	    };
	    displayPageLoader(true);

	    // upload all files
	    Promise.all(
	      file.map((item) => {
	        // convert image from base64 string to blob
	        if (this.props.draftIndex > -1) {
	          return fetch(item)
	            .then((res) => res.blob())
	            .then((res) => {
	              console.error(res);
	              return uploadFile({ file: res });
	            });
	        } 
	        return uploadFile({ file: item });
	      })
	    )
	      .then((res) => {
	        console.log(res);
	        // post data with images
	        pinkPatrolReport({
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
	              // Delete from draft
	              if (this.props.draftIndex > -1) {
	                promptModal(null);
	                this.onDeleteDraft(this.props.draftIndex);
	              }
	              showAlertBox({
	                message: 'SUBMIT_SUCCESS',
	                success: true,
	              });
	              this.setState({
	                ...this.initialState,
	              });
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

	onSaveDraft = () => {
	  if (
	    !this.state.reportType.value ||
			!this.state.region.value ||
			!this.state.province.value ||
			!this.state.municipality.value ||
			!this.state.barangay.value ||
			!this.state.time.value ||
			!this.state.location.value ||
			!this.state.message.value ||
			(this.state.reportType.value &&
				this.state.reportType.value !== patrolReportTypes[0] &&
				this.state.reportType.value !== patrolReportTypes[1] &&
				!this.state.witness.value) ||
			(this.state.witness.value === this.state.witnessOptions[1] &&
				(!this.state.witnessName.value || !this.state.witnessContact.value)) ||
			(this.state.location.value === this.state.locationOptions[0] &&
				!this.state.precint.value)
	  ) {
	    this.onReportTypeChange(this.state.reportType.value);
	    this.onWitnessChange(this.state.witness.value);
	    this.onWitnessNameChange(this.state.witnessName.value);
	    this.onWitnessContactChange(this.state.witnessContact.value);
	    this.onTimeChange(this.state.time.value);
	    this.onLocationChange(this.state.location.value);
	    this.onRegionChange(this.state.region.value);
	    this.onProvinceChange(this.state.province.value);
	    this.onMunicipalityChange(this.state.municipality.value);
	    this.onBarangayChange(this.state.barangay.value);
	    this.onMessageChange(this.state.message.value);
	    this.onPrecintChange(this.state.precint.value);
	  } else {
	    let { file } = this.state.attachment;
	    const item = {
	      data: {
	        reportType: this.state.reportType.value,
	        witness: this.state.witness.value,
	        witnessName: this.state.witnessName.value,
	        witnessContact: this.state.witnessContact.value,
	        time: this.state.time.value,
	        location: this.state.location.value,
	        region: this.state.region.value,
	        province: this.state.province.value,
	        municipality: this.state.municipality.value,
	        barangay: this.state.barangay.value,
	        precintNo: this.state.precint.value,
	        message: this.state.message.value,
	        images: [],
	      },
	      file,
	    };
	    this.setState({
	      ...this.initialState,
	    });

	    if (this.props.draftIndex > -1) {
	      // Modify draft
	      promptModal(null);
	      this.editDraft(item);
	    } else {
	      // Save draft
	      this.addDraft(item);
	    }
	    showAlertBox({
	      message: 'SAVE_SUCCESS',
	      success: true,
	    });
	  }
	};

	addDraft = (item) => {
	  Promise.all(
	    item.file.map((file) => {
	      return new Promise((resolve) => {
	        const reader = new FileReader();
	        reader.readAsDataURL(file);
	        reader.onload = () => {
	          resolve(reader.result);
	        };
	        reader.onerror = (error) => {
	          resolve(null);
	        };
	      });
	    })
	  ).then((res) => {
	    let pinkPatrolDrafts = this.props.pinkPatrol.data;
	    pinkPatrolDrafts.push({
	      ...item,
	      file: res.filter((i) => i),
	    });
	    updateStore({
	      pinkPatrol: {
	        ...this.props.pinkPatrol,
	        data: pinkPatrolDrafts,
	      },
	    });
	  });
	};

	addDraftOld = (item) => {
	  let pinkPatrolDrafts = this.props.pinkPatrol.data;
	  pinkPatrolDrafts.push(item);
	  updateStore({
	    pinkPatrol: {
	      ...this.props.pinkPatrol,
	      data: pinkPatrolDrafts,
	    },
	  });
	};

	editDraft = (item) => {
	  let pinkPatrolDrafts = this.props.pinkPatrol.data;
	  pinkPatrolDrafts[this.props.draftIndex] = item;
	  updateStore({
	    pinkPatrol: {
	      ...this.props.pinkPatrol,
	      data: pinkPatrolDrafts,
	    },
	  });
	};

	onDeleteDraft = (i) => {
	  let newData = this.props.pinkPatrol.data;
	  newData.splice(i, 1);
	  updateStore({
	    pinkPatrol: {
	      ...this.props.pinkPatrol,
	      data: newData,
	    },
	  });
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
	    reportType,
	    witness,
	    witnessName,
	    witnessContact,
	    witnessOptions,
	    time,
	    location,
	    locationOptions,
	    precint,
	    message,
	  }
	) => (
	  <div className={style.pinkPatrol}>
	    <div className={style.formContainer}>
	      <FormGroup
	        label="Ano ang gusto mong i-report? *"
	        hasError={reportType.hasError}
	        className={style.mainFields}
	      >
	        <FormDropdown
	          className={style.reportType}
	          value={reportType.value}
	          options={patrolReportTypes}
	          getValue={(option) => option}
	          getText={(option) => option}
	          onBlur={(e) => {
	            this.onReportTypeChange(e.target.value);
	          }}
	          onChange={(e) => {
	            this.onReportTypeChange(e.target.value);
	          }}
	          hasError={reportType.hasError}
	          error={reportType.error}
	          message={reportType.message}
	        />
	      </FormGroup>

	      {reportType.value &&
					reportType.value !== patrolReportTypes[0] &&
					reportType.value !== patrolReportTypes[1] && (
	        <>
	          <FormGroup
	            label="Ikaw ba mismo ang nakasaksi nito? *"
	            hasError={witness.hasError}
	            className={style.mainFields}
	          >
	            <FormDropdown
	              className={style.witness}
	              value={witness.value}
	              options={witnessOptions}
	              getValue={(option) => option}
	              getText={(option) => option}
	              onBlur={(e) => {
	                this.onWitnessChange(e.target.value);
	              }}
	              onChange={(e) => {
	                this.onWitnessChange(e.target.value);
	              }}
	              hasError={witness.hasError}
	              error={witness.error}
	              message={witness.message}
	            />
	          </FormGroup>

	          {witness.value === witnessOptions[1] && (
	            <div>
	              <FormGroup
	                label="Sino ang nakasaksi nito? *"
	                hasError={witnessName.hasError}
	              >
	                <FormInput
	                  className={style.witnessName}
	                  style={{ error: style.witnessName }}
	                  value={witnessName.value}
	                  type="text"
	                  placeholder="I-type ang buong pangalan ng saksi"
	                  onBlur={(e) => {
	                    this.onWitnessNameChange(e.target.value);
	                  }}
	                  onInput={(e) => {
	                    this.onWitnessNameChange(e.target.value);
	                  }}
	                  hasError={witnessName.hasError}
	                  error={witnessName.error}
	                  message={witnessName.message}
	                />
	              </FormGroup>
	              <FormGroup
	                label="Contact Number ng Saksi? *"
	                hasError={witnessContact.hasError}
	              >
	                <FormInput
	                  className={style.witnessContact}
	                  style={{ error: style.witnessContact }}
	                  value={witnessContact.value}
	                  type="number"
	                  placeholder="I-type ang contact number ng saksi"
	                  onBlur={(e) => {
	                    this.onWitnessContactChange(e.target.value);
	                  }}
	                  onInput={(e) => {
	                    this.onWitnessContactChange(e.target.value);
	                  }}
	                  hasError={witnessContact.hasError}
	                  error={witnessContact.error}
	                  message={witnessContact.message}
	                />
	              </FormGroup>
	            </div>
	          )}
	        </>
	      )}

	      <FormGroup
	        label="Anong oras ito nangyari? *"
	        hasError={time.hasError}
	        className={style.mainFields}
	      >
	        <FormInput
	          className={style.time}
	          style={{ error: style.time }}
	          value={time.value}
	          type="time"
	          onBlur={(e) => {
	            this.onTimeChange(e.target.value);
	          }}
	          onInput={(e) => {
	            this.onTimeChange(e.target.value);
	          }}
	          hasError={time.hasError}
	          error={time.error}
	          message={time.message}
	        />
	      </FormGroup>
	      <FormGroup
	        label="Saan ito nangyari? *"
	        hasError={location.hasError}
	        className={style.mainFields}
	      >
	        <FormDropdown
	          className={style.location}
	          value={location.value}
	          options={locationOptions}
	          getValue={(option) => option}
	          getText={(option) => option}
	          onBlur={(e) => {
	            this.onLocationChange(e.target.value);
	          }}
	          onChange={(e) => {
	            this.onLocationChange(e.target.value);
	          }}
	          hasError={location.hasError}
	          error={location.error}
	          message={location.message}
	        />
	      </FormGroup>
	      <div className={style.locInfo}>
	        <FormGroup
	          label="REGION"
	          hasError={region.hasError}
	          className={style.locField}
	        >
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
	        <FormGroup
	          label="PROVINCE"
	          hasError={province.hasError}
	          className={style.locField}
	        >
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
	      </div>

	      <div className={style.locInfo}>
	        <FormGroup
	          label="MUNICIPALITY"
	          hasError={municipality.hasError}
	          className={style.locField}
	        >
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
	        <FormGroup
	          label="BARANGAY"
	          hasError={barangay.hasError}
	          className={style.locField}
	        >
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
	      </div>

	      {location.value === locationOptions[0] && (
	        <FormGroup label="Precinct No.">
	          <FormInput
	            className={style.precint}
	            style={{ error: style.precint }}
	            value={precint.value}
	            type="text"
	            placeholder="I-type ang presinto"
	            onBlur={(e) => {
	              this.onPrecintChange(e.target.value);
	            }}
	            onInput={(e) => {
	              this.onPrecintChange(e.target.value);
	            }}
	            hasError={precint.hasError}
	            error={precint.error}
	            message={precint.message}
	          />
	        </FormGroup>
	      )}

	      <FormGroup label="Ilahad ang pangyayari *" className={style.mainFields}>
	        <FormInput
	          className={style.message}
	          style={{ error: style.message }}
	          value={message.value}
	          type="textarea"
	          rows="4"
	          placeholder="Magbigay ng maikling salaysay ng pangyayari."
	          onBlur={(e) => {
	            this.onMessageChange(e.target.value);
	          }}
	          onInput={(e) => {
	            this.onMessageChange(e.target.value);
	          }}
	          hasError={message.hasError}
	          error={message.error}
	          message={message.message}
	        />
	      </FormGroup>
	      <p className={`bold ${style.uploadMsg}`}>
	        {getTranslation('UPLOAD_MSG')}
	      </p>
	      <FormGroup className={style.mainFields} label="UPLOAD PHOTO">
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
	              accept="image/*"
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
	              <span className={`bold`}>{getTranslation('ADD_FILE')}s</span>
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
	        text={getTranslation('SUBMIT_REPORT')}
	        buttonStyle={style.submiReport}
	      />

	      <ButtonDescription
	        onClickCallback={() => {
	          this.onSaveDraft();
	        }}
	        buttonStyle={style.saveDraft}
	        text={getTranslation('SAVE_DRAFT')}
	      />
	    </div>
	  </div>
	);
}
export default connect(['authUser', 'pinkPatrol'])(PinkPatrol);
