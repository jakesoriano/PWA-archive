import { Component } from 'preact';
import { connect } from 'unistore/preact';
import { fetchHouse2HouseCalendar } from '_mutations';
import {
  FormGroup,
  LoaderRing,
  FormDropdown,
  ImageLoader,
} from '_components/core';
import {
  getRegions,
  getProvince,
  getMunicipality,
  getTranslation,
  getDayText,
  getDayNum,
  dateH2HCalendarFormat,
  displayPageLoader,
  componentModal,
} from '_helpers';
import DateRangePicker from '@wojtekmaj/react-daterange-picker';
import style from './style';
class House2HouseCalendar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dates: [
        new Date(),
        new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000),
      ],
      regionOptions: getRegions(),
      provinceOptions: [],
      municipalityOptions: [],
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
      moreFetching: false,
    };
  }

	onRegionChange = (value) => {
	  if (this.state.region.value !== value) {
	    this.setState({
	      region: {
	        ...this.state.region,
	        value: value,
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
	    });
	    let filter = {
	      date_start: this.state.dates[0],
	      date_end: this.state.dates[1],
	      region: value,
	      province: this.state.province.value,
	      city: this.state.municipality.value,
	    };
	    this.validateFilter(filter);
	    this.fetchData(null, filter);
	  }
	};

	onProvinceChange = (value) => {
	  if (this.state.province.value !== value) {
	    this.setState({
	      province: {
	        ...this.state.province,
	        value: value,
	      },
	      municipalityOptions: value
	        ? getMunicipality(this.state.region.value, value)
	        : [],
	      municipality: {
	        ...this.state.municipality,
	        value: '',
	      },
	    });
	    let filter = {
	      date_start: this.state.dates[0],
	      date_end: this.state.dates[1],
	      region: this.state.region.value,
	      province: value,
	      city: this.state.municipality.value,
	    };
	    this.validateFilter(filter);
	    this.fetchData(null, filter);
	  }
	};

	onMunicipalityChange = (value) => {
	  if (this.state.municipality.value !== value) {
	    this.setState({
	      municipality: {
	        ...this.state.municipality,
	        value: value,
	      },
	    });
	    let filter = {
	      date_start: this.state.dates[0],
	      date_end: this.state.dates[1],
	      region: this.state.region.value,
	      province: this.state.province.value,
	      city: value,
	    };
	    this.validateFilter(filter);
	    this.fetchData(null, filter);
	  }
	};

	onDateChange = (value) => {
	  if (this.state.dates !== value) {
	    this.setState({
	      dates: value,
	    });
	    let filter = {
	      date_start: value[0],
	      date_end: value[1],
	      region: this.state.region.value,
	      province: this.state.province.value,
	      city: this.state.municipality.value,
	    };
	    this.validateFilter(filter);
	    this.fetchData(null, filter);
	  }
	};

	validateFilter = (filter) => {
	  Object.keys(filter).forEach((key) => {
	    if (!filter[key]) {
	      delete filter[key];
	    }
	  });
	};

	fetchData = (page, filter) => {
	  try {
	    displayPageLoader(true);
	    fetchHouse2HouseCalendar(page, filter)
	      .then(() => {
	        displayPageLoader(false);
	      })
	      .catch((e) => {
	        displayPageLoader(false);
	      });
	  } catch (err) {
	    displayPageLoader(false);
	  }
	};

	handleShowMore = () => {
	  if (!this.state.moreFetching) {
	    // flag
	    this.setState({
	      moreFetching: true,
	    });
	    // fetch
	    fetchHouse2HouseCalendar(this.props.h2hcalendar.page + 1).then(() => {
	      this.setState({
	        moreFetching: false,
	      });
	    });
	  }
	};

	componentDidMount = () => {
	  let filter = {
	    date_start: this.state.dates[0],
	    date_end: this.state.dates[1],
	  };
	  fetchHouse2HouseCalendar(null, filter);
	};

	renderModalContent = (loc, city, name, num, desc) => (
	  <div className={style.modalContent}>
	    <div className={style.modalHead}>
	      <p className={`bold ${style.title}`}>{getTranslation('ORGANIZER')}</p>
	      <p className={style.location}>
	        {`${getTranslation('MEETUP_LOCATION')}: ${loc || ''}`},{' '}
	        <span className={style.city}>{city}</span>
	      </p>
	    </div>
	    <div className={style.modalBody}>
	      <p className={style.descr}>{desc}</p>
	    </div>
	    <div className={style.footer}>
	      <p className={style.name}>
	        {`${getTranslation('CHAPTER_HEAD')}: ${name || ''}`}
	      </p>
	      <p className={style.contact}>
	        {`${getTranslation('CONTACT_NO')}: ${num || ''}`}
	      </p>
	    </div>
	  </div>
	);

	renderResults = (data) => {
	  if (data && data.length) {
	    return data.map((item) => (
	      <div className={style.resultItem}>
	        <div className={style.head}>
	          <div className={style.dateBox}>
	            <span className={style.day}>
	              {getDayText(item.date).substring(0, 3)}
	            </span>
	            <span className={`bold ${style.date}`}>
	              {getDayNum(item.date)}
	            </span>
	          </div>
	          <div className={style.info}>
	            <ImageLoader
	              src={item.image}
	              style={{ container: style.image }}
	            />
	            <div className={style.infoText}>
	              {item.date && (
	                <p className={`bold ${style.date}`}>
	                  {dateH2HCalendarFormat(item.date)}
	                </p>
	              )}
	              {item.location && (
	                <p className={style.location}>
	                  {item.location},{' '}
	                  <span className={style.city}>
	                    {item.city.replace('CITY OF', '')}
	                  </span>
	                </p>
	              )}
	              {item.contact?.name && (
	                <p className={style.name}>{`${getTranslation(
	                  'CONTACT_PERSON'
	                )}: ${item.contact?.name}`}</p>
	              )}
	            </div>
	          </div>
	        </div>
	        <div className={style.body}>
	          <p className={style.descr}>{item.description}</p>
	        </div>
	        <div className={style.footer}>
	          <button
	            className={style.btn}
	            onClick={() => {
	              componentModal({
	                content: this.renderModalContent(
	                  item.location,
	                  item.city.replace('CITY OF', ''),
										item.contact?.name,
										item.contact?.mobile,
										item.description
	                ),
	                transparentBG: true,
	                modalId: style.h2hcModal,
	              });
	            }}
	          >
	            {getTranslation('CONTACT_ORGANIZER')}
	          </button>
	        </div>
	      </div>
	    ));
	  }
	  return <p className={style.noResult}>{getTranslation('NO_H2H_DATA')}</p>;
	};

	render = (
	  { h2hcalendar },
	  {
	    dates,
	    region,
	    regionOptions,
	    province,
	    provinceOptions,
	    municipality,
	    municipalityOptions,
	  }
	) => (
	  <div className={style.h2hcWrap}>
	    <div className={style.filter}>
	      <DateRangePicker
	        className={`h2h-date ${style.datepicker}`}
	        value={dates}
	        onChange={(e) => {
	          this.onDateChange(e);
	        }}
	        maxDetails
	        locale="en-US"
	      />
	      <div className={style.location}>
	        <FormGroup label="Region" className={style.formGroup}>
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
	          />
	        </FormGroup>
	        <FormGroup label="Province" className={style.formGroup}>
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
	          />
	        </FormGroup>
	        <FormGroup label="Municipality" className={style.formGroup}>
	          <FormDropdown
	            className={style.municipality}
	            value={municipality?.value || ''}
	            options={municipalityOptions}
	            getValue={(option) => option.value}
	            getText={(option) => option.text}
	            onBlur={(e) => {
	              this.onMunicipalityChange(e.target.value);
	            }}
	            onChange={(e) => {
	              this.onMunicipalityChange(e.target.value);
	            }}
	          />
	        </FormGroup>
	      </div>
	    </div>
	    <p className={`semiBold ${style.message}`}>
	      {getTranslation('RESULTS_AUTOMATIC')}
	    </p>
	    <div className={style.results}>
	      <p className={`bold ${style.heading}`}>{getTranslation('RESULTS')}</p>
	      {/* results */}
	      {this.renderResults(h2hcalendar?.data)}
	      {/* show more */}
	      {h2hcalendar &&
					h2hcalendar.data.length < h2hcalendar.total &&
					!h2hcalendar.fetching && (
	        <button className={style.showMore} onClick={this.handleShowMore}>
	          <span>
	            <span>&#8659;</span> {getTranslation('SHOW_MORE')}
	          </span>
	        </button>
	      )}
	      {/* loader */}
	      {this.state.moreFetching && (
	        <LoaderRing styles={{ container: style.loaderWrap }} />
	      )}
	    </div>
	  </div>
	);
}
export default connect(['h2hcalendar'])(House2HouseCalendar);
