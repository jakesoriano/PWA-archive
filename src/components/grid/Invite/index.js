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
			regions:[
				{v: "v1", t:"t1"},
				{v: "v2", t:"t2"}
			]
		}
	}
	componentDidMount = () => {
	  const { invited } = this.props;
	  if (!invited.result && !invited.fetching) {
	    fetchInvited();
	  }
	};
	
	onFnameChange = (e) => {
		console.error(e.target.value);
	}
	
	onLnameChange = (e) => {
		console.error(e.target.value);
	}
	
	onRegionChange = (e) => {
		console.error(e.target.value);
	}

	render = ({ authUser, invited }, state) => {

	  return (
			<div className={style.inviteWrap}>
				<form className={style.form}>
					<FormGroup label="NAME">
						<FormInput
							className={style.name}
							type="text"
							placeholder={getTranslation('FIRST_NAME')}
							onInput={this.onFnameChange} />
						<FormInput
							className={style.name}
							type="text"
							placeholder={getTranslation('FIRST_NAME')}
							onInput={this.onLnameChange} />
					</FormGroup>
					<FormGroup label="REGION">
						<FormDropdown
							label=""
							className={style.region}
							options={state.regions}
							getValue={option => option.v}
							getText={option => option.t}
							onChange={this.onRegionChange}
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
