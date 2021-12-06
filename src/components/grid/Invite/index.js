import { h, Component } from 'preact';
import { connect } from 'unistore/preact';
import { fetchInvited } from '_mutations';
import { getTranslation } from '_helpers';
import { FormGroup, FormInput, FormDropdown, ImageLoader } from '_components/core';
import { nativeShare } from '_platform/helpers';
// eslint-disable-next-line import/extensions
import style from './style';

// eslint-disable-next-line react/prefer-stateless-function
class Invite extends Component {
	constructor(props){
		super(props);
		this.state = {
			regionOptions:[
				{v: "v1", t:"t1"},
				{v: "v2", t:"t2"}
			],
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
	
	onFnameChange = (e) => {
		this.setState({
			fname: {
				...this.state.fname,
				value: e.target.value,
				hasError: !Boolean(e.target.value),
				error: !Boolean(e.target.value) ? 'REQUIRED' : ''
			}
		});
	}
	
	onLnameChange = (e) => {
		this.setState({
			lname: {
				...this.state.lname,
				value: e.target.value,
				hasError: !Boolean(e.target.value),
				error: !Boolean(e.target.value) ? 'REQUIRED' : ''
			}
		});
	}
	
	onRegionChange = (e) => {
		this.setState({
			region: {
				...this.state.region,
				value: e.target.value,
				hasError: !Boolean(e.target.value),
				error: !Boolean(e.target.value) ? 'REQUIRED' : ''
			}
		});
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
							onBlur={this.onFnameChange}
							onInput={this.onFnameChange}
							hasError={fname.hasError}
							error={fname.error}
							message={fname.message} />
						<FormInput
							className={style.name}
							style={{error: style.name}}
							value={lname.value}
							type="text"
							placeholder={getTranslation('LAST_NAME')}
							onBlur={this.onLnameChange}
							onInput={this.onLnameChange}
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
							getValue={option => option.v}
							getText={option => option.t}
							onChange={this.onRegionChange}
							onBlur={this.onRegionChange}
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
								<a className={style.pShare} onClick={() => {
									nativeShare({
										message: `You are invited: ${authUser.refCode}`
									})
								}}>
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
