import { Component } from 'preact';
import { route, Link } from 'preact-router';
import { connect } from 'unistore/preact';
import { ImageLoader } from '_components/core';
import { getTranslation } from '_helpers';
import style from './style';
class VolunteerKit extends Component {
    handleClick = (url) => {
      if (url.substr(0,4) == 'http') {
        window.open(url, '_blank');
      } else {
        route(url);
      }
    };

    render = ({ data }) => {
      if (!(data && data.length)) {
        return null;
      }
      return (
        <div className={style.hfWrap}>
          <div className={style.body}>
            {data.map(item => {
              return (
                <a 
                  id={item.icon}
                  onClick={(e) => {
                    e.stopPropagation();
                    this.handleClick(item.link);
                  }}
                  className={style.item}>
                  <div className={style.iconWrap}>
                    <ImageLoader
                      src={`assets/images/${item.icon}.png`}
                      style={{ container: style.imageContainer, image: style.image }}
                      lazy
                    />
                  </div>
                  <p className={style.title}>{item.title}</p>
                </a>
              )
            })}
          </div>
        </div>
      );
    };
}
export default connect([])(VolunteerKit);
