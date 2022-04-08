/* eslint-disable react/jsx-curly-brace-presence */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable indent */
import { Component } from 'preact';
import { ImageLoader } from '_components/core';
import style from './style';

class LandingTitle extends Component {
	render = () => {
		return (
			<div className={style.titleComponent}>
				<div className={style.text}>
					<span className={`bold`}>WELCOME,</span>
					<span className={`bold`}>KAKAMPINK!</span>
				</div>
				<ImageLoader
					style={{ container: style.imgWrap }}
					src={'{CDN_DOMAIN_FILES}ribbon-big.png'}
					lazy
				/>
			</div>
		);
	};
}
1;
export default LandingTitle;
