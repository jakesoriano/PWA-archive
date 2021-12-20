import { Component } from 'preact';
import { connect } from 'unistore/preact';
import { getTranslation} from '_helpers';
import { route } from 'preact-router';
import { ToggleInput } from '_components/core';
import { nativeToggleTouchID } from '_platform/helpers';
// eslint-disable-next-line import/extensions
import style from './style';

// eslint-disable-next-line react/prefer-stateless-function
class Settings extends Component {
	constructor(props){
		super(props);
		this.state = {
			isTouchIdEnable: props.settings.touchId
		}
	}
	
	onTouchIdChange = () => {
		nativeToggleTouchID(!this.state.isTouchIdEnable)
			.then(res => {
				console.error(res);
				// update state
				this.setState({
					isTouchIdEnable: !this.state.isTouchIdEnable
				});
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
						<span>{getTranslation('PAGE_CHANGE_PASS')}</span>
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
export default connect(['authUser', 'settings'])(Settings);
