import { h, Component } from 'preact';
import { getTranslation } from '_helpers';
// eslint-disable-next-line import/extensions
import style from './style';

class FormInput extends Component {
  constructor(props) {
    super(props);
  }

	handleCustimDateInput = (e, type) => {
	  try {
	    const date = this.props.value.split('-');
	    const maxDay = new Date(date[0], date[1], 0).getDate();
	    const value = e.target.value;
	    switch (type) {
	    case 'y':
	      date[0] = value.substr(0, 4);
	      break;
	    case 'm':
	      date[1] = parseInt(value) > 12 ? 12 : value.substr(0, 2);
	      break;
	    case 'd':
	      date[2] = parseInt(value) > maxDay ? maxDay : value.substr(0, 2);
	      break;
	    }
	    this.props.onInput(date.join('-'));
	  } catch (err) {
	    console.error('handleCustimDateInput', err);
	  }
	};

	render = (props) => {
	  return (
	    <div
	      className={`${style.inputWrap}  ${
					['checkbox', 'radio'].indexOf(props.type) > -1
					  ? style.isCheckRadio
					  : ''
				}`}
	    >
	      {props.type === 'textarea' ? (
	        <textarea
	          {...{
	            ...props,
	            rows: `${props.rows || '4'}`,
	            className: `${style.formInput} ${props.className || ''} ${
								props.hasError ? style.error : ''
							}`,
	          }}
	        ></textarea>
	      ) : props.type === 'custom-date' ? (
	        <div className={style.customDate} m="" d="" y="">
	          <input
	            type="number"
	            value={props.value?.split('-')[0]}
	            className={`${style.formInput} ${
								props.hasError ? style.error : ''
							}`}
	            maxLength="4"
	            placeholder="YYYY"
	            onInput={(e) => {
	              this.handleCustimDateInput(e, 'y');
	            }}
	          />
	          <input
	            type="number"
	            value={props.value?.split('-')[1]}
	            className={`${style.formInput} ${
								props.hasError ? style.error : ''
							}`}
	            maxLength="2"
	            placeholder="MM"
	            onInput={(e) => {
	              this.handleCustimDateInput(e, 'm');
	            }}
	          />
	          <input
	            type="number"
	            value={props.value?.split('-')[2]}
	            className={`${style.formInput} ${
								props.hasError ? style.error : ''
							}`}
	            maxLength="2"
	            placeholder="DD"
	            onInput={(e) => {
	              this.handleCustimDateInput(e, 'd');
	            }}
	          />
	        </div>
	      ) : (
	        <input
	          {...{
	            ...props,
	            className: `${style.formInput} ${props.className || ''} ${
								props.hasError ? style.error : ''
							}`,
	          }}
	          disabled={props.disabled ? props.disabled : false}
	        />
	      )}

	      {['checkbox', 'radio'].indexOf(props.type) > -1 && props.label && (
	        <label for={props.id}>{getTranslation(props.label)}</label>
	      )}
	      {['file'].indexOf(props.type) > -1 && (
	        <input
	          disabled
	          className={`${style.dummyInput} ${props?.style?.dummy}`}
	          value={props.value && props.value.name}
	        />
	      )}
	      {props.error && (
	        <small
	          className={`${style.text} ${style.errorText} ${
							props.style && props.style.error
						}`}
	        >
	          {getTranslation(props.error)}
	        </small>
	      )}
	      {props.message && (
	        <small
	          className={`${style.text} ${props.style && props.style.message}`}
	        >
	          {getTranslation(props.message)}
	        </small>
	      )}
	    </div>
	  );
	};
}

export default FormInput;
