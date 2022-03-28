import { Component } from 'preact';
import { Link, route } from 'preact-router';
import { connect } from 'unistore/preact';
import { ImageLoader, ArticleDetails } from '_components/core';
import { nativeShare } from '_platform/helpers';
import {
  dateNewsFormat,
  getTranslation,
  getConfigByKey,
  removeTags,
  componentModal,
} from '_helpers';
import { fetchAppHomeConfig } from '_mutations';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import style from './style';
class HomeNews extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: getConfigByKey('news'),
    };
  }
	componentDidMount = () => {
	  fetchAppHomeConfig();
	};
	onShareAnnouncement = (item) => {
	  nativeShare({
	    url: item.image,
	    title: item.title,
	    message: `\n\n
				We tell it as it is. Only the truth, KakamPink!\n\n
				Shared via Kakampink App\n
				Download now!\n
				Android: ${getConfigByKey('playStore')}\n
				iOS: ${getConfigByKey('appStore')}\n\n
				Article Title: ${item.title}\n
				Ariticle Link: ${item.link || ''}\n
				Use my invite code: ${this.props.authUser.profile.refCode}
			`,
	  });
	};
	onShowPopup = (data) => {
	  componentModal({
	    content: <ArticleDetails data={data} />,
	  });
	};
	render = ({ title, more, page }, { data }) => {
	  if (!(data && data.length)) {
	    return null;
	  }

	  return (
	    <div className={style.homeNewsWrap} id="home-news">
	      {/* Title and See All */}
	      <div className={style.header}>
	        <p className={`bold ${style.title}`}>{getTranslation(title)}</p>
	        <Link
	          href={`/${more.url}`}
	          id={`${page}-see-all-news`}
	          className={`bold ${style.name}`}
	        >
	          {getTranslation(more.text)}
	        </Link>
	      </div>
	      {/* Slider */}
	      <div className={style.sliderWrap}>
	        <Carousel
	          showArrows
	          showStatus
	          showThumbs={false}
	          autoPlay
	          className={`${style.customCarousel}`}
	        >
	          {data.map((item) => {
	            return (
	              <div
	                className={`home-news ${style.item}`}
	                onClick={() => {
	                  this.onShowPopup(item);
	                }}
	              >
	                <ImageLoader
	                  src={item.image}
	                  style={{ container: style.sliderImage }}
	                  lazy
	                />
	                <p className={`bold ${style.iTitle}`}>{item.title}</p>
	                <p className={`bold ${style.iDesc}`}>
	                  {item.postedDate ? dateNewsFormat(item.postedDate) : ''}
	                </p>
	                <p className={style.iDesc}>{`${removeTags(item.desc).substr(
	                  0,
	                  120
	                )}...`}</p>
	              </div>
	            );
	          })}
	        </Carousel>
	      </div>
	    </div>
	  );
	};
}
export default connect(['authUser'])(HomeNews);
