import { h, Component } from 'preact';
import { connect } from 'unistore/preact';
import { sendContactUs, uploadFile } from '_mutations';
import { LoaderRing } from '_components/core';
import { FormGroup, FormInput, FormDropdown, ImageLoader, ButtonDescription } from '_components/core';
import { getTranslation, getCategories, circleModal } from '_helpers';
// eslint-disable-next-line import/extensions
import style from './style';

// eslint-disable-next-line react/prefer-stateless-function
class PostContent extends Component {
	constructor(props){
		super(props);
		
	}



	handleContinue = () => {
		

	}

	render = () => {
		
		return (
			<div className={style.postContent}>
				
				<div className={style.buttonContainer}>
					<ButtonDescription
						onClickCallback={() => {
							this.handleContinue()
						}}
						text={getTranslation('CONTINUE')}
					/>
				</div>

			</div>
		);
	};
}
export default connect(['authUser'])(PostContent);
