import { h, Component } from 'preact';
import { ImageLoader } from '_components/core';
import {
	getTranslation,
	dateNewsFormat
} from '_helpers';
// eslint-disable-next-line import/extensions
import style from './style';

// eslint-disable-next-line react/prefer-stateless-function
class GlobalAnnouncementsList extends Component {
	
	removeTags(str) {
    if ((str===null) || (str===''))
        return false;
    else
        str = str.toString(); 
    // Regular expression to identify HTML tags in 
    // the input string. Replacing the identified 
    // HTML tag with a null string.
    return str.replace( /(<([^>]+)>)/ig, '');
}

	render = ({ data, isDisplayFlex }) => {
		let announcements_ = data;
		const displayLimit = 3;
		if(isDisplayFlex && data.length > displayLimit) {
			announcements_ = data.slice(0,displayLimit);
		}
		return (
			<div className={style.announcementWrap}>
				<div className={style.announcementBody}>
					<div className={style.announcementWindow}>
						{announcements_.length > 0 ? (
							<div className={`${style.announcementWrap} ${isDisplayFlex ? style.rows : ''} ${style['i' + announcements_.length]}`}>
								{announcements_.map((i) => (
									<div className={style.item}>
										<div className={style.details} onClick={() => {
											this.props.onClickItemCallback(i);
										}}>
											<ImageLoader
												src={i.image}
												style={{container: style.detailImage}}
											/>
											<div className={`${style.detailContent} ${isDisplayFlex ? style.rows : ''}`}>
												<div className={style.detailHead}>
													<span className={`extraBold ${style.userName}`}>
														{`${i.title.length > 30 ? `${this.removeTags(i.title || '').substr(0, 30)}...` :  i.title }`}
													</span>
												</div>
												<div className={style.detailBody}>
													<p className={`${style.detailTitle}`}>
														{dateNewsFormat(i.postedDate)}</p>
													<p className={style.detailDescription}>{this.removeTags(i.desc || '').substr(0, 100)}...
														<span className='extraBold'> {`${i.desc.length > 100 ? `${getTranslation('READ_ALL')}`: ''}`}</span>
													</p>
												</div>
											</div>
										</div>
									</div>
								))}
							</div>
						) : <p className={style.noRecord}>{getTranslation('NO_DATA')}</p>}
					</div>
				</div>
			</div>
		);
	};
}
export default GlobalAnnouncementsList;
