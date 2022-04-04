import { Component } from 'preact';
import { route } from 'preact-router';
import { connect } from 'unistore/preact';
import { ImageLoader } from '_components/core';
import { getTranslation, getConfigByKey } from '_helpers';
import style from './style';

// eslint-disable-next-line react/prefer-stateless-function
class LandingTrustedByAndLinks extends Component {
  constructor(props) {
    super(props);
    this.state = {
      trustedBy: getConfigByKey('trustedBy'),
    };
  }

	showPrivacyPolicy = () => {
	  route(`/landing/landing-data-privacy`);
	};

	showKayaNatin = () => {
	  route(`/landing/about-kaya-natin`);
	};

	render = ({}, { trustedBy }) => {
	  return (
	    <div className={style.trusted_by}>
	      <div className={style.partners}>
	        <p>{getTranslation('TRUSTED_BY')} </p>
	        <div
	          className={`${style.partnerImages} ${
							trustedBy?.length > 3 ? style.partnerImagesScroll : ''
						}`}
	        >
	          {trustedBy?.map((image) => {
	            return (
	              <ImageLoader
	                src={image}
	                style={{ container: style.imgWrap }}
	                lazy
	              />
	            );
	          })}
	        </div>
	      </div>

	      <div className={style.privacyPolicy}>
	        <a
	          onClick={() => {
	            this.showPrivacyPolicy();
	          }}
	        >
	          {' '}
	          {getTranslation('PRIVACY_POLICY')}{' '}
	        </a>{' '}
					|
	        <a
	          onClick={() => {
	            this.showKayaNatin();
	          }}
	        >
	          {' '}
	          {getTranslation('KAYA_NATIN')}{' '}
	        </a>
	      </div>
	    </div>
	  );
	};
}
export default connect(['authUser'])(LandingTrustedByAndLinks);
