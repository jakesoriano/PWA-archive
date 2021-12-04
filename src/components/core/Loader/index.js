import { h } from 'preact';
// eslint-disable-next-line import/extensions
import style from './style';

export default ({ fullpage }) => (
  <div className={fullpage ? `${style.fullscreen}` : ''}>
    <div className={`${style.ringloader}`}>
      <div />
      <div />
      <div />
      <div />
    </div>
  </div>
);
