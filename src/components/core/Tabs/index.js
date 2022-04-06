import { h, Component } from 'preact';
import { getTranslation } from '_helpers';
// eslint-disable-next-line import/extensions
import style from './style';

// eslint-disable-next-line react/prefer-stateless-function
class Tabs extends Component {
  constructor(props) {
    super(props);
  }

	render = ({ selected, list, callback }) => {
	  return (
	    <dv className={style.tabs}>
	      {list.map((i) => {
	        return (
	          <button
	            className={`bold ${style.btn} ${
								i.id === selected ? style.active : ''
							}`}
	            onClick={(e) => {
	              e.stopPropagation();
	              callback(i.id);
	            }}
	          >
	            {getTranslation(i.title)}
	          </button>
	        );
	      })}
	    </dv>
	  );
	};
}
export default Tabs;
