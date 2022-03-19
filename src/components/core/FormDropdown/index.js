import { h } from 'preact';
import { getTranslation, platform } from '_helpers';
// eslint-disable-next-line import/extensions
import style from './style';

export default (props) => (
  <div className={`${style.dropdownWrap}`}>
    <select
      className={`${style.formDropdown} ${props.className || ''} ${
				props.hasError ? style.error : ''
			}`}
      id={props.id}
      onChange={props.onChange}
      onFocus={props.onFocus}
      onBlur={props.onBlur}
      disabled={props.disabled}
      value={props.value}
    >
      <option value="">{props.label ? getTranslation(props.label) : ''}</option>
      {props.options
        ? props.options.map((choice, i) =>
          typeof choice === 'object' ? (
            <option key={i} value={props.getValue(choice)}>
              {props.getText(choice)}
            </option>
          ) : (
            <option key={i} value={choice}>
              {choice}
            </option>
          )
				  )
        : null}
    </select>
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
      <small className={`${style.text} ${props.style && props.style.message}`}>
        {getTranslation(props.message)}
      </small>
    )}
    {process.env.PLATFORM == 'ios' && platform.os === 'ios' && (
      <span className={style.icon}></span>
    )}
  </div>
);
