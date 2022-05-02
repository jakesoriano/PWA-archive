import { Component } from 'preact';
import { getTranslation, getQueryStringValue } from '_helpers';
import { ImageLoader, ButtonDescription } from '_components/core';
import style from './style';
class RedirectToApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      path: '',
    };
  }
	componentDidMount = () => {
	  const path = getQueryStringValue('path');
	  if (path) {
	    this.setState(
	      {
	        path,
	      },
	      () => {
	        this.onOpenApp();
	      }
	    );
	  }
	};

	onOpenApp = () => {
	  const url = `com.leni2022://mobile/${this.state.path || ''}`;
	  console.log(`redirect to ${url}`);
	  window.location.href = url;
	  window.close();
	};

	render = (props) => {
	  return (
	    <div className={style.redirect}>
	      <div className={style.header}>
	        <h1 className={`extraBold ${style.title}`}>
	          <ImageLoader
	            src={'assets/icons/pink_ribbon.png'}
	            style={{ container: style.logo }}
	          />
						LENI 2022
	        </h1>
	      </div>
	      <div className={style.contentWrap}>
	        <div className={style.content}>
	          <p className={style.text}>{getTranslation('REDIRECTING_TO_APP')}</p>
	          <ButtonDescription
	            onClickCallback={this.onOpenApp}
	            text={getTranslation('OPEN_APP')}
	            buttonStyle={`${style.buttonStyle}`}
	          />
	        </div>
	      </div>
	    </div>
	  );
	};
}
export default RedirectToApp;
