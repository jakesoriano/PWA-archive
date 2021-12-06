import { Component } from 'preact';
import { connect } from 'unistore/preact';
import { ImageLoader } from '_components/core';
import { getTranslation } from '_helpers';
import ButtonDescription from '_components/core/ButtonDescription';
import style from './style';

// eslint-disable-next-line react/prefer-stateless-function
class LandingPage extends Component {
	componentDidMount = () => {};

	clickSignIn = () =>  {
		console.log('click sign in');
	}

	render = () => {
	  return (
	    <div className={style.landingPage}>
	      <div className={style.leniLogo}>
				<div className={style.user}>
					<ImageLoader 
						src="assets/images/appLogo.png"
						style={{container: style.landingImg}} />
				</div>
	      </div>
		  <div className={style.signInUp}>
			<p>{getTranslation('SIGNIN_DESC')} 
				 <a className={`extraBold ${style.pClose}`} onClick={() => {
					console.log('open modal');
				}}>Sign in</a>	
			</p>
	        <ButtonDescription
	          onClickCallback={this.clickSignIn}
	          text={getTranslation('SIGNUP_BUTTON')}
	          bottomDescription=""
	          isDisabled={this.state.isReading}
	        />
		  </div>
	    </div>
	  );

	};
}
export default connect(['authUser'])(LandingPage);
