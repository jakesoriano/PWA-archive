import { h, Component } from 'preact';
import { getTranslation } from '_helpers';
// eslint-disable-next-line import/extensions
import style from './style';

// eslint-disable-next-line react/prefer-stateless-function
class LeaderboardFilterBy extends Component {
  constructor(props) {
    super(props);
  }

	render = ({ period, range, selected, callback }) => {
	  return (
	    <div className={style.filterBy}>
	      <p className={`bold ${style.title}`}>{getTranslation('FILTER_BY')}</p>
	      {/* period */}
	      <div className={style.items}>
	        <p className={style.title}>{getTranslation('PERIOD')}:</p>
	        <div className={style.buttons}>
	          {period.map((i) => {
	            return (
	              <button
	                className={`${style.btn} ${
										i === selected.period ? style.active : ''
									}`}
	                onClick={(e) => {
	                  e.stopPropagation();
	                  if (selected.period !== i) {
	                    callback({
	                      ...selected,
	                      period: i,
	                    });
	                  }
	                }}
	              >
	                {getTranslation(i)}
	              </button>
	            );
	          })}
	        </div>
	      </div>
	      {/* range */}
	      <div className={style.items}>
	        <p className={style.title}>{getTranslation('RANGE')}:</p>
	        <div className={style.buttons}>
	          {range.map((i) => {
	            return (
	              <button
	                className={`${style.btn} ${
										i === selected.range ? style.active : ''
									}`}
	                onClick={(e) => {
	                  e.stopPropagation();
	                  if (selected.range !== i) {
	                    callback({
	                      ...selected,
	                      range: i,
	                    });
	                  }
	                }}
	              >
	                {getTranslation(i)}
	              </button>
	            );
	          })}
	        </div>
	      </div>
	    </div>
	  );
	};
}
export default LeaderboardFilterBy;
