import { h } from 'preact';
import { getTranslation } from '_helpers';
// eslint-disable-next-line import/extensions
import style from './style';

export default (props) => (
  <input {... {
    ...props,
    className: `${style.formInput} ${props.className || ''} ${props.hasError ? style.error : ''}`
  }} />
);
