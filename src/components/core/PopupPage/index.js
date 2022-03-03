/* eslint-disable no-unused-expressions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import { h, Component, createRef } from 'preact';
import { connect } from 'unistore/preact';
import { getTranslation } from '_helpers';
import { ImageLoader } from '_components/core';
// eslint-disable-next-line import/extensions
import style from './style';

class PopupPage extends Component {
	ref = createRef();

	handleBack = (cb) => {
		if (this.ref.current) {
			this.ref.current && this.ref.current.classList.remove(style.animate);
			this.ref.current && this.ref.current.classList.add(style.close);
			setTimeout(cb, 400);
		} else {
			cb();
		}
	};

	componentDidMount = () => {
		if (this.ref.current) {
			setTimeout(() => {
				this.ref.current && this.ref.current.classList.add(style.animate);
			}, 0);
		}
	};

	render = ({ title, children, onBack, customBack, page, authUser }) => (
		<div
			ref={this.ref}
			className={`${style.popupPage} popup-${page} ${
				!authUser ? style.noAnimate : ''
			}`}
		>
			<div className={style.header}>
				<button
					className="icon-back clickable"
					onClick={() => {
						this.handleBack(customBack || onBack);
					}}
				>
					<ImageLoader
						style={{ container: style.backImg }}
						src="assets/images/downarrow.png"
					/>
				</button>
				<h3 className={`extraBold`}>{getTranslation(title)}</h3>
			</div>
			<div className={style.body}>{children}</div>
		</div>
	);
}

export default connect(['customBack', 'authUser'])(PopupPage);
