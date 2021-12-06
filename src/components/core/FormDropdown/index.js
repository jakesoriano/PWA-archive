import { h } from 'preact';
import { getTranslation } from '_helpers';
// eslint-disable-next-line import/extensions
import style from './style';

export default (props) => (
  <select
    className={`${style.formDropdown} ${props.className || ''} ${props.hasError ? style.error : ''}`}
    id={props.id}
    onChange={props.onChange}
    onFocus={props.onFocus}
    onBlur={props.onBlur}
    disabled={props.disabled}
    value={props.value}>
    <option value="">{props.label ? getTranslation(props.label) : ""}</option>
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
);
