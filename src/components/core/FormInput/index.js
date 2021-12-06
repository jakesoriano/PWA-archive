import { h } from 'preact';
import { getTranslation } from '_helpers';
// eslint-disable-next-line import/extensions
import style from './style';

export default (props) => (
  <>
    <input {... {
      ...props,
      className: `${style.formInput} ${props.className || ''} ${props.hasError ? style.error : ''}`
    }} />
    {props.error && <small className={`${style.text} ${style.errorText} ${props.style && props.style.error}`}>{getTranslation(props.error)}</small>}
    {props.message && <small className={`${style.text} ${props.style && props.style.message}`}>{getTranslation(props.message)}</small>}
  </>
);
