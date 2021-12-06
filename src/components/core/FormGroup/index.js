import { h } from 'preact';
import { getTranslation } from '_helpers';
// eslint-disable-next-line import/extensions
import style from './style';

export default (props) => (
  <div className={`${style.formGroup} ${props.className || ''}`}>
    {props.label && <label>{getTranslation(props.label)}</label>}
    {props.children}
  </div>
);
