import { h } from 'preact';
// eslint-disable-next-line import/extensions
import style from './style';

export default ({}) => (
  <div className={style.appVersion}>{process.env.BUILD_NO}</div>
);
