// eslint-disable-next-line import/extensions
import style from './style';

export default ({ onClickCallback, isChecked }) => (
  <div className={style.toggleWrap}>
    <label className={style.switch}>
      <input 
        onClick={onClickCallback} 
        type="checkbox"
        checked={isChecked}
        className={style.switchInput} />
      <span className={style.slider}></span>
    </label>
  </div>
  
);
