import { Component } from 'preact';
import { getTranslation } from '_helpers';
import { Carousel } from 'react-responsive-carousel';
import { ImageLoader } from '_components/core';
import style from './style.scss';
class ElectionOffenses extends Component {
  render = ({ title, data }) => {
    return (
      <div className={style.eoWrap}>
        {
          title && <p className={`bold ${style.heading}`}>{getTranslation(title)}</p>
        }
        {
          data && data.length && (
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
                    className={style.item}
                  >
                    <ImageLoader
                      src={item}
                      style={{ container: style.sliderImg }}
                      lazy
                    />
                  </div>
                );
              })}
            </Carousel>
          )
        }
      </div>
    )
  }
}
export default ElectionOffenses;
