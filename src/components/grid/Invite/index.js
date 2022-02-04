import { h, Component } from 'preact';
import { connect } from 'unistore/preact';
import { fetchInvited } from '_mutations';
import { getTranslation, circleModal } from '_helpers';
import { InviteForm, ImageLoader } from '_components/core';
import { nativeShare } from '_platform/helpers';
// eslint-disable-next-line import/extensions
import style from './style';

// eslint-disable-next-line react/prefer-stateless-function
class Invite extends Component {
	constructor(props) {
		super(props);
	}
	componentDidMount = () => {
		fetchInvited();
	};

	handleClickJoin = () => {
		circleModal({
			headerIcon: 'assets/images/info2.png',
			title: getTranslation('INVITE_JOIN_TITLE'),
			content: getTranslation('INVITE_JOIN_CONTENT'),
		});
	};

	handleClickDiscord = () => {
		window.open('https://forms.gle/RZLdKo1UtiEQRSRX6', '_blank');
	};

	render = ({ authUser, invited }) => {
		if (!authUser) {
			return null;
		}

		return (
			<div className={style.inviteWrap}>
				<InviteForm
					refCode={authUser.profile.refCode}
					invited={invited}
					onSendCallback={fetchInvited}
				/>
				<div className={style.list}>
					<div className={`${style.item} ${style.header}`}>
						<p className={`extraBold ${style.name}`}>
							{getTranslation('ADDED_MEMBERS')}
						</p>
						<p className={`extraBold ${style.status}`}>{getTranslation('STATUS')}</p>
						<a
							className={`extraBold ${style.status}`}
							onClick={this.handleClickJoin}
						>
							{getTranslation('JOIN')}
							<ImageLoader
								src="assets/images/info.png"
								style={{ container: style.listIcon }}
							/>
						</a>
					</div>
					{invited.data.map((item) => (
						<div className={style.item}>
							<p
								className={`light ${style.name}`}
							>{`${item.fname} ${item.lname}`}</p>
							<p className={`light ${style.status}`}>
								{getTranslation(item.status)}
							</p>
							{item.status === 'PENDING' ? (
								<a
									className={`light ${style.status}`}
									onClick={this.handleClickDiscord}
								>
									<ImageLoader
										src="assets/images/discord.png"
										style={{ container: style.listIcon }}
									/>
								</a>
							) : (
								<p className={style.status}></p>
							)}
						</div>
					))}
				</div>
			</div>
		);
	};
}
export default connect(['authUser', 'invited'])(Invite);
