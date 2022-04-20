/* eslint-disable react/jsx-curly-brace-presence */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable indent */
import { Component } from 'preact';
import { ImageLoader } from '_components/core';
import {
	getTranslation,
	dateNewsFormat,
	getConfigByKey,
	dateEventFormat,
	removeTags,
} from '_helpers';
import { fetchAppHomeConfig } from '_mutations';
import style from './style';

class LandingNewsAndEvents extends Component {
	constructor(props) {
		super(props);
		this.state = {
			activeTab: 1,
			events: (getConfigByKey('events') || []).slice(0, 2),
			news: (getConfigByKey('news') || []).slice(0, 2),
		};
	}

	componentWillMount = () => {
		try {
			fetchAppHomeConfig().then(() => {
				this.setState({
					events: (getConfigByKey('events') || []).slice(0, 2),
					news: (getConfigByKey('news') || []).slice(0, 2),
				});
			});
		} catch (err) {}
	};

	render = () => {
		return (
			<div className={style.tabComponent}>
				{/* Tab Container */}
				<div className={style.tabContainer}>
					<div
						className={
							this.state.activeTab === 1 ? style.active : style.inactive
						}
						onClick={() => this.setState({ activeTab: 1 })}
					>
						<span>{getTranslation('UPCOMING_EVENTS')}</span>
					</div>
					<div
						className={
							this.state.activeTab === 2 ? style.active : style.inactive
						}
						onClick={() => this.setState({ activeTab: 2 })}
					>
						<span>{getTranslation('NEWS')}</span>
					</div>
				</div>

				{/* Tab Content */}
				<div className={style.tabContent}>
					{/* Tab 1 */}
					{this.state.activeTab === 1 && (
						<div className={style.eventContainer}>
							{this.state.events?.map((item) => {
								return (
									<div className={style.newsCardContainer}>
										{/* Image */}
										<div className={style.imageContainer}>
											<ImageLoader
												src={item?.image}
												style={{
													container: style.aIconWrap,
													image: style.aIcon,
												}}
												lazy
											/>
										</div>

										{/* Content */}

										<div className={style.contentContainer}>
											<span className={style.date}>
												{dateNewsFormat(item?.date)}
											</span>
											<span className={style.title}>{item?.title}</span>
											<span className={style.location}>{item?.location}</span>
											<span className={style.desc}>
												{`${removeTags(item?.desc).substr(0, 120)}...`}
											</span>
										</div>
									</div>
								);
							})}
						</div>
					)}

					{/* Tab 2 */}
					{this.state.activeTab === 2 && (
						<div className={style.newsContainer}>
							{this.state.news?.map((item) => {
								return (
									<div className={style.newsCardContainer}>
										{/* Image */}
										<div className={style.imageContainer}>
											<ImageLoader
												src={item?.image}
												style={{
													container: style.aIconWrap,
													image: style.aIcon,
												}}
												lazy
											/>
										</div>

										{/* Content */}
										<div className={style.contentContainer}>
											<p className={style.title}>{item?.title}</p>

											<p className={style.postedDate}>
												{dateEventFormat(item?.postedDate)}
											</p>

											<p className={style.desc}>
												{`${removeTags(item?.desc).substr(0, 120)}...`}
											</p>
										</div>
									</div>
								);
							})}
						</div>
					)}
				</div>
			</div>
		);
	};
}
1;
export default LandingNewsAndEvents;
