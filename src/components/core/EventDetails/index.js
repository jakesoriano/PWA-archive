/* eslint-disable react/jsx-curly-brace-presence */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable indent */
import { Component } from 'preact';
import { connect } from 'unistore/preact';
import { ImageLoader } from '_components/core';
import { shareEvent } from '_mutations';
import { getTranslation, dateEventFormat } from '_helpers';
import { nativeShare } from '_platform/helpers';
import style from './style';

class EventDetails extends Component {
	onShareEvent = (item) => {
		nativeShare({
			url: item.image,
			title: item.title,
			message: `\n\n
				Unity despite diversity leads to victory. Come join us, KakamPink!\n\n
				Event Title: ${item.title}\n
				Event Date: ${dateEventFormat(item.date)}\n
				${item.link ? 'Event Link: ' + item.link : ''}\n\n
				${getTranslation(item.isOnline ? 'ONLINE_EVENT' : 'ONSITE_EVENT')}:\n
				Event Location: ${item.location}
			`,
		});
		if (!item.shared) {
			shareEvent(item);
		}
	};

	render = ({ data }) => {
		return (
			<div className={style.pWrap}>
				<div className={`${style.pHeader} ${style.pHeaderEvents}`}>
					<p className={`bold ${style.pTitle}`}>{getTranslation(data.title)}</p>
					<ImageLoader
						src={data.image}
						style={{ container: style.pImage }}
						lazy
					/>
					<div className={style.pEvents}>
						<p className={`${style.pDate}`}>
							{`${getTranslation('WHEN')}: ${dateEventFormat(data.date)}`}{' '}
							<br />
							{`${getTranslation('WHERE')}: ${data.location}`}
						</p>
					</div>
				</div>
				<p
					className={style.pContent}
					dangerouslySetInnerHTML={{
						__html: data.desc,
					}}
				/>
				<a
					className={style.pShare}
					onClick={() => {
						this.onShareEvent(this.state.selectedItem);
					}}
				>
					<ImageLoader
						id={'event-like'}
						src="assets/images/share_icon_white.png"
						style={{ container: style.pIconShare }}
					/>
					<span>{getTranslation('SHARE')}</span>
				</a>
			</div>
		);
	};
}
export default connect(['upevents'])(EventDetails);
