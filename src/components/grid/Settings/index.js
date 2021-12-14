import { Component } from 'preact';
import { connect } from 'unistore/preact';
import { getTranslation} from '_helpers';
import { route } from 'preact-router';
// eslint-disable-next-line import/extensions
import style from './style';
import { ToggleInput } from '../../core';

// eslint-disable-next-line react/prefer-stateless-function
class Settings extends Component {
	constructor(props){
		super(props);
		this.state = {
			isTouchIdEnable: true
		}
	}
	
	onTouchIdChange = () => {
		this.setState({
			isTouchIdEnable: !this.state.isTouchIdEnable
		});
	};
	
	onClickChangePass = () => {
		route(`/${this.props.parent}/change-password`);
	}

	render = ({ authUser}, {}) => {

		if (!authUser) {
			return null;
		}

	  return (
			<div className={style.settingsWrap}>
				<button 
					onClick={() => {
						this.onClickChangePass();
					}}>
						<span>{getTranslation('CHANGE_PASS')}</span>
				</button>
				<button>
					<span>{getTranslation('ENABLE_TOUCHID')}</span>
					<div className={style.inputWrap}>
						<ToggleInput
							onClickCallback={() => {
								this.onTouchIdChange()
							}}
							isChecked={this.state.isTouchIdEnable}
							>	
						</ToggleInput>
					</div>
				</button>
			</div>
	  );
	};
}
export default connect(['authUser'])(Settings);
