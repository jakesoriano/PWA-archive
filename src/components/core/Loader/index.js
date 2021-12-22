import { h } from 'preact';
// eslint-disable-next-line import/extensions
import style from './style';

export default ({ fullpage, styles }) => (
  <div className={`${styles && styles.container ? styles.container : ''} ${fullpage ? `${style.fullscreen}` : ''}`}>
    <div className={`${style.ringloader}`}>
      <div />
      <div />
      <div />
      <div />
    </div>
  </div>
);
