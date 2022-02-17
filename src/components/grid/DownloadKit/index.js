import { h, Component } from 'preact';
import { connect } from 'unistore/preact';
import { route } from 'preact-router';
import { ImageLoader } from '_components/core';
import {
	getTranslation,
} from '_helpers';
// eslint-disable-next-line import/extensions
import style from './style';

// eslint-disable-next-line react/prefer-stateless-function
class DownloadKit extends Component {
	constructor(props) {
    super(props);
    this.state = {
      showDropdown: false
    }
  }

	componentDidMount = () => {};

	onDownloadKit = (url) => {
		window.open(url, '_blank');
		this.setState({
			showDropdown: false
		});
	};

	gotoVideos = () => {
		route(`/videos`);
	}

	clickDropdown = () => {
		this.setState({
			showDropdown: !this.state.showDropdown
		});
	}

	renderDropdown = () => {
		const { showDropdown } = this.state;
		if (showDropdown) {
			return (
				<div className={style.selectDropdown}>
					<a className={style.download} onClick={() => {
						this.onDownloadKit('http://bit.ly/LabanLeni22');
					}}>
						<div>
							{/* <ImageLoader
								src="assets/images/icon_download.png"
								style={{ container: style.iconDownload }}
							/> */}
							<span>{getTranslation('DOWNLOAD_CAMPAIGN_KIT')}</span>
						</div>
					</a>
					<a className={style.download} onClick={() => {
						this.onDownloadKit('http://bit.ly/bakitsileni');
					}}>
						<div>
							<span>{getTranslation('DOWNLOAD_CONVERSTIONAL_KIT')}</span>
						</div>
					</a>
					<a className={style.download} onClick={() => {
						this.onDownloadKit('http://bit.ly/KKP_volunteer_toolkit');
					}}>
						<div>
							<span>{getTranslation('DOWNLOAD_VOLUNTEER_KIT')}</span>
						</div>
					</a>
					<a className={style.download} onClick={this.gotoVideos}>
						<div>
							{/* <ImageLoader
								src="assets/images/icon_download.png"
								style={{ container: style.iconDownload }}
							/> */}
							<span>{getTranslation('WATCH_VIDEOS')}</span>
						</div>
					</a>
				</div>
			);
		}
	}

	render = ({},{showDropdown}) => {
		return (
			<div className={style.downloadKit}>
				<a className={style.download} onClick={this.clickDropdown}>
					<div>
						<ImageLoader
							src="assets/images/icon_download.png"
							style={{ container: style.iconDownload }}
						/>
						<span>{getTranslation('GET_KIT')}</span>
						<ImageLoader
							src="assets/images/downarrow.png"
							style={{ container: `${style.dropdown} ${showDropdown ? style.active : ''}` }}
						/>
					</div>
				</a>
				{this.renderDropdown()}
			</div>
		);
	};
}
export default connect([''])(DownloadKit);
