import { Component } from 'preact';
import { getTranslation } from '_helpers';
import { ImageLoader } from '_components/core';
// eslint-disable-next-line import/extensions
import style from './style';

export default class Maintenance extends Component {
	render = () => {
	  return (
	    <div className={style.maintenanceWrap}>
	      <div className={style.maintenance}>
	        <p className={`bold ${style.title}`}>
	          {getTranslation('MAINTENANCE_TITLE')}
	        </p>
	        <p className={style.desc}>{getTranslation('MAINTENANCE_DESC')}</p>
	      </div>
	    </div>
	  );
	};
}
