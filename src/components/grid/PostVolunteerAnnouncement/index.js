import { h, Component } from 'preact';
import { postVolunteerAnnouncement } from '_mutations';
import { volunteerNeeds } from '_constant';
import {
	getTranslation,
	getRegions,
	getProvince,
	getMunicipality,
	getBarangay,
	displayPageLoader,
	showAlertBox,
	circleModal
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
class PostVolunteerAnnouncement extends Component {
	constructor(props) {
		super(props);
		this.initialState = {
			needsOptions: volunteerNeeds,
			date: {
				value: '',
				error: '',
				message: '',
				hasError: false,
			},
			region: {
				value: '',
				error: '',
				message: '',
				hasError: false,
			},
			province: {
				value: '',
				error: '',
				message: '',
				hasError: false,
			},
			municipality: {
				value: '',
				error: '',
				message: '',
				hasError: false,
			},
			barangay: {
				value: '',
				error: '',
				message: '',
				hasError: false,
			},
			volunteers: {
				value: '',
				error: '',
				message: getTranslation('NEEDS_MSG'),
				hasError: false,
			},
			needs: {
				value: '',
				error: '',
				message: '',
				hasError: false,
			},
			otherNeeds: {
				value: '',
				error: '',
				message: '',
				hasError: false,
			},
			regionOptions: getRegions(),
			provinceOptions: null,
			municipalityOptions: null,
			barangayOptions: null
		};
		this.state = this.initialState;
	}

	onDateChange = (value) => {
		this.setState({
			date: {
				...this.state.date,
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

	onVolunteersChange = (value) => {
		this.setState({
			volunteers: {
				...this.state.volunteers,
				value: value,
				hasError: !Boolean(value),
				error: !Boolean(value) ? 'REQUIRED' : '',
			},
		});
	};

	onNeedsChange = (value) => {
		this.setState({
			needs: {
				...this.state.needs,
				value: value,
				hasError: !Boolean(value),
				error: !Boolean(value) ? 'REQUIRED' : '',
			},
			otherNeeds: {
				...this.state.otherNeeds,
				value: value !== 'Others not specified' ? '' : this.state.otherNeeds.value,
				hasError: false,
				error: false,
			}
		});
	};

	onOtherNeedsChange = (value) => {
		this.setState({
			otherNeeds: {
				...this.state.otherNeeds,
				value: value,
				hasError: !Boolean(value),
				error: !Boolean(value) ? 'REQUIRED' : '',
			},
		});
	};

	handleContinue = () => {
		if (
			!this.state.date.value ||
			!this.state.region.value ||
			!this.state.province.value ||
			!this.state.municipality.value ||
			!this.state.barangay.value ||
			!this.state.volunteers.value ||
			!this.state.needs.value ||
			(this.state.needs.value === 'Others not specified' && !this.state.otherNeeds.value)
		) {
			this.onDateChange(this.state.date.value);
			this.onRegionChange(this.state.region.value);
			this.onProvinceChange(this.state.province.value);
			this.onMunicipalityChange(this.state.municipality.value);
			this.onBarangayChange(this.state.barangay.value);
			this.onVolunteersChange(this.state.volunteers.value);
			this.onNeedsChange(this.state.needs.value);
			if(this.state.needs.value === 'Others not specified') {
				this.onOtherNeedsChange(this.state.otherNeeds.value);
			}
		} else {
			const userData = {
				'date': this.state.date.value,
				'region': this.state.region.value,
				'province': this.state.province.value,
				'municipality': this.state.municipality.value,
				'barangay': this.state.barangay.value,
				'noOfVolunteers': parseInt(this.state.volunteers.value),
				'needs': this.state.needs.value !== 'Others not specified' ? this.state.needs.value : this.state.otherNeeds.value
			};
			displayPageLoader(true);
			postVolunteerAnnouncement(userData)
				.then((res) => {
					displayPageLoader(false);
					if (res.success) {
						this.setState({
							...this.initialState
						});
						circleModal({
							title: getTranslation('VOLUNTEER_ANNOUNCEMENT_SUCCESS'),
							content: getTranslation('VOLUNTEER_ANNOUNCEMENT_MSG'),
							link: {
								url: '/community-volunteer',
								text: getTranslation('GOTO_VOLUNTEER_PAGE')
							}
						});
					} else {
						showAlertBox({
							message: res.error || 'SOMETHING_WRONG',
						});
					}
				})
				.catch((err) => {
					displayPageLoader(false);
					console.error('error', err);
				});
		}
	};

	render = (
		{},
		{
			date,
			region,
			province,
			municipality,
			barangay,
			volunteers,
			needs,
			otherNeeds,
			regionOptions,
			provinceOptions,
			municipalityOptions,
			barangayOptions,
			needsOptions
		}
	) => {
		return (
			<div className={style.volunteerAnnouncementWrap}>
				<form className={style.form}>
					
					<FormGroup label="CONTENT_DATE" hasError={date.hasError}>
						<FormInput
							value={date.value}
							type="datetime-local"
							onBlur={(e) => {
								this.onDateChange(e.target.value);
							}}
							onInput={(e) => {
								this.onDateChange(e.target.value);
							}}
							hasError={date.hasError}
							error={date.error}
							message={date.message}
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

					<FormGroup label="NO_OF_VOLUNTEERS" hasError={volunteers.hasError}>
						<FormInput
							value={volunteers.value}
							type="number"
							onBlur={(e) => {
								this.onVolunteersChange(e.target.value);
							}}
							onInput={(e) => {
								this.onVolunteersChange(e.target.value);
							}}
							hasError={volunteers.hasError}
							error={volunteers.error}
							message={volunteers.message}
						/>
					</FormGroup>

					<FormGroup label="NEEDS" hasError={needs.hasError}>
						<div className={style.radioWrap}>
							{needsOptions.map(i => (
								<FormInput
									type="radio"
									label={i.value}
									value={i.value}
									id={i.id}
									checked={needs.value === i.value}
									onInput={(e) => {
										this.onNeedsChange(e.target.value);
									}}
								/>
							))}
						</div>
						<FormInput
							value={otherNeeds.value}
							type="text"
							onBlur={(e) => {
								this.onOtherNeedsChange(e.target.value);
							}}
							onInput={(e) => {
								this.onOtherNeedsChange(e.target.value);
							}}
							disabled={needs.value !== 'Others not specified'}
							hasError={otherNeeds.hasError}
							error={otherNeeds.error}
							message={otherNeeds.message}
						/>
					</FormGroup>

					<ButtonDescription
						onClickCallback={this.handleContinue}
						text="POST"
						id="volunteer-announcement-submit"
					/>
				</form>
			</div>
		);
	};
}
export default PostVolunteerAnnouncement;
