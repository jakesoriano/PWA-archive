import { h } from 'preact';
import { getTranslation } from '_helpers';
// eslint-disable-next-line import/extensions
import style from './style';

export default (props) => (
  <div className={`${style.inputWrap}  ${['checkbox', 'radio'].indexOf(props.type) > -1 ? style.isCheckRadio : ''}`}>
    {props.type === 'textarea' ? 
      <textarea {... {
        ...props,
        rows: `${props.rows || '4'}`,
        className: `${style.formInput} ${props.className || ''} ${props.hasError ? style.error : ''}`
      }}></textarea> : 
      <input {... {
        ...props,
        className: `${style.formInput} ${props.className || ''} ${props.hasError ? style.error : ''}`
      }} />
    }
    
    {['checkbox', 'radio'].indexOf(props.type) > -1 && props.label && <label for={props.id}>{getTranslation(props.label)}</label>}
    {['file'].indexOf(props.type) > -1 && <input className={style.dummyInput} value={props.value && props.value.name} />}
    {props.error && <small className={`${style.text} ${style.errorText} ${props.style && props.style.error}`}>{getTranslation(props.error)}</small>}
    {props.message && <small className={`${style.text} ${props.style && props.style.message}`}>{getTranslation(props.message)}</small>}
  </div>
);
