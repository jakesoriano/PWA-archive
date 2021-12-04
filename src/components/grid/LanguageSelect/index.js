/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/destructuring-assignment */

import { h, Component } from 'preact';
import { route } from 'preact-router';
import { connect } from 'unistore/preact';
import {
  getTranslation,
  replaceUrlPlaceholders,
  updateLanguage,
  supportedLanguages
} from '_helpers';
// eslint-disable-next-line import/extensions
import style from './style';

class LanguageSelect extends Component {
  constructor (props) {
    super(props);
    this.state = {
      selectedLanguage: null
    };
  }

	componentDidMount = () => {
	  if (this.props.selectedLanguage) {
	    // eslint-disable-next-line react/no-did-mount-set-state
	    this.setState({
	      selectedLanguage: this.props.selectedLanguage
	    });
	  }
	};

	shouldComponentUpdate = (nextProps, nextState) => {
	  if (nextState.selectedLanguage === this.state.selectedLanguage) {
	    return false;
	  }
	  return true;
	};

	clickHandler = (langData) => {
	  updateLanguage(langData.langAlias);
	  const { selectedLanguage } = this.props;
	  if (selectedLanguage === langData.langAlias) {
	    route('/', true);
	  }
	};

	render = () => {
	  return (
	    <div id="language-select" className={style.languageselect}>
	      <div className={style.languageselectwrap}>
	        {supportedLanguages.map((langData) => {
	          return (
	            <div
	              className={
	                this.state.selectedLanguage === langData.langAlias
	                  ? `${style.lang} ${style.active}`
	                  : `${style.lang}`
	              }
	              onClick={() => {
	                this.clickHandler(langData);
	              }}
	            >
	              <div className={style.langWrap}>
	                {langData.flag ? (
	                  <img
	                    alt={getTranslation(langData.Name)}
	                    src={replaceUrlPlaceholders(langData.flag)}
	                  />
	                ) : null}
	                <p>{getTranslation(langData.Name)}</p>
	              </div>
	            </div>
	          );
	        })}
	      </div>
	    </div>
	  );
	};
}
export default connect(['selectedLanguage'])(LanguageSelect);
