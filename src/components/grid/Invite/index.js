import { h, Component } from 'preact';
import { connect } from 'unistore/preact';
import { fetchInvited } from '_mutations';
import { getTranslation, getRegions} from '_helpers';
import { FormGroup, FormInput, FormDropdown, ImageLoader } from '_components/core';
import { nativeShare } from '_platform/helpers';
// eslint-disable-next-line import/extensions
import style from './style';

// eslint-disable-next-line react/prefer-stateless-function
class Invite extends Component {
	constructor(props){
		super(props);
		this.state = {
			regionOptions: getRegions(),
			fname: {
				value: '',
				error: '',
				message: '',
				hasError: false
			},
			lname: {
				value: '',
				error: '',
				message: '',
				hasError: false
			},
			region: {
				value: '',
				error: '',
				message: '',
				hasError: false
			}
		}
	}
	componentDidMount = () => {
	  const { invited } = this.props;
	  if (!invited.result && !invited.fetching) {
	    fetchInvited();
	  }
	};
	
	onFnameChange = (value) => {
		this.setState({
			fname: {
				...this.state.fname,
				value: value,
				hasError: !Boolean(value),
				error: !Boolean(value) ? 'REQUIRED' : ''
			}
		});
	};
	
	onLnameChange = (value) => {
		this.setState({
			lname: {
				...this.state.lname,
				value: value,
				hasError: !Boolean(value),
				error: !Boolean(value) ? 'REQUIRED' : ''
			}
		});
	};
	
	onRegionChange = (value) => {
		this.setState({
			region: {
				...this.state.region,
				value: value,
				hasError: !Boolean(value),
				error: !Boolean(value) ? 'REQUIRED' : ''
			}
		});
	};

	onShare = () => {
		if (!this.state.fname.value || !this.state.lname.value || !this.state.region.value) {
			this.onFnameChange(this.state.fname.value);
			this.onLnameChange(this.state.lname.value);
			this.onRegionChange(this.state.region.value);
		} else {
			nativeShare({
				message: `Hi ${this.state.fname.value}, You are invited: ${this.props.authUser.refCode}`
			});
		}
	}

	render = ({ authUser, invited }, { fname, lname, region, regionOptions }) => {

	  return (
			<div className={style.inviteWrap}>
				<form className={style.form}>
					<FormGroup label="NAME">
						<FormInput
							className={style.name}
							style={{error: style.name}}
							value={fname.value}
							type="text"
							placeholder={getTranslation('FIRST_NAME')}
							onBlur={(e) => {
								this.onFnameChange(e.target.value)
							}}
							onInput={(e) => {
								this.onFnameChange(e.target.value)
							}}
							hasError={fname.hasError}
							error={fname.error}
							message={fname.message} />
						<FormInput
							className={style.name}
							style={{error: style.name}}
							value={lname.value}
							type="text"
							placeholder={getTranslation('LAST_NAME')}
							onBlur={(e) => {
								this.onLnameChange(e.target.value)
							}}
							onInput={(e) => {
								this.onLnameChange(e.target.value)
							}}
							hasError={lname.hasError}
							error={lname.error}
							message={lname.message} />
					</FormGroup>
					<FormGroup label="REGION">
						<FormDropdown
							label=""
							className={style.region}
							value={region.value}
							options={regionOptions}
							getValue={option => option.value}
							getText={option => option.text}
							onBlur={(e) => {
								this.onRegionChange(e.target.value)
							}}
							onIonChangenput={(e) => {
								this.onRegionChange(e.target.value)
							}}
							hasError={region.hasError}
							error={region.error}
							message={region.message}
							 />
					</FormGroup>
					{/* Invite */}
					<FormGroup label="INVITE">
						<div className={style.invite}>
							<span className={`bold`}>{authUser.refCode}</span>
							<div>
								<a className={style.pShare} onClick={this.onShare}>
									<ImageLoader
											src="assets/images/share_icon.png"
											style={{container: style.pIconShare}} />
										<span>{getTranslation('SHARE')}</span>
								</a>
							</div>
						</div>
					</FormGroup>
				</form>
				<div className={style.list}>
					<div className={`${style.item} ${style.header}`}>
						<p className={`bold ${style.name}`}>{getTranslation('ADDED_MEMBERS')}</p>
						<p className={`bold ${style.status}`}>{getTranslation('STATUS')}</p>
					</div>
					{invited.data.map(item => (
						<div className={style.item}>
							<p className={`light ${style.name}`}>{`${item.fname} ${item.lname}`}</p>
							<p className={`light ${style.status}`}>{getTranslation(item.status)}</p>
						</div>
					))}
				</div>
			</div>
	  );
	};
}
export default connect(['authUser', 'invited'])(Invite);
