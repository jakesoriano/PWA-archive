import { Component } from 'preact';
import { route } from 'preact-router';
import { connect } from 'unistore/preact';
import { ButtonDescription } from '_components/core';
import { getTranslation } from '_helpers';
import style from './style';

// eslint-disable-next-line react/prefer-stateless-function
class LandingButtons extends Component {
  constructor(props) {
    super(props);
  }

	render = ({}) => {
	  return (
	    <>
	      <div className={style.signInUpBtnWrap}>
	        <ButtonDescription
	          onClickCallback={() => {
	            route('/initial-signup');
	          }}
	          text={getTranslation('SIGNUP_BUTTON')}
	          bottomDescription=""
	          buttonStyle={`${style.buttonStyle}`}
	        />
	        <p>
	          {getTranslation('SIGNIN_DESC')}
	          <a
	            className={`extraBold ${style.pClose}`}
	            onClick={() => {
	              route('/login');
	            }}
	          >
	            {getTranslation('SIGNIN')}
	          </a>
	        </p>
	      </div>
	    </>
	  );
	};
}
export default connect(['authUser'])(LandingButtons);
