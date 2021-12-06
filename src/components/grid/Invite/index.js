import { h, Component } from 'preact';
import { connect } from 'unistore/preact';
import { fetchInvited } from '_mutations';
import { getTranslation } from '_helpers';
import { nativeShare } from '_platform/helpers';
// eslint-disable-next-line import/extensions
import style from './style';

// eslint-disable-next-line react/prefer-stateless-function
class Invite extends Component {
	componentDidMount = () => {
	  const { invited } = this.props;
	  if (!invited.result && !invited.fetching) {
	    fetchInvited();
	  }
	};

	render = ({ invited }) => {

	  return (
			<>
				<Form>
					<Form.Group controlId="formBasicEmail">
						<Form.Label>Email address</Form.Label>
						<Form.Control type="email" placeholder="Enter email" />
						<Form.Text className="text-muted">
							We'll never share your email with anyone else.
							</Form.Text>
					</Form.Group>

					<Form.Group controlId="formBasicPassword">
						<Form.Label>Password</Form.Label>
						<Form.Control type="password" placeholder="Password" />
					</Form.Group>
					<Form.Group controlId="formBasicChecbox">
						<Form.Check type="checkbox" label="Check me out" />
					</Form.Group>
					<Button variant="primary" type="submit">
						Submit
						</Button>
				</Form>
				<div className={style.invitedWrap}>
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
			</>
	  );
	};
}
export default connect(['invited'])(Invite);
