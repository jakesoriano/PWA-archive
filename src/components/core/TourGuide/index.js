import { Component } from 'preact';
import { showTourGuide } from '_helpers';
import { ImageLoader } from '_components/core';
import style from './style';

class TourGuide extends Component {
  constructor(props) {
    super(props);
    this.state = {
      item: 0,
      data: [
        `{CDN_DOMAIN}tour/1.png`,
        `{CDN_DOMAIN}tour/2.png`,
        `{CDN_DOMAIN}tour/3.png`,
        `{CDN_DOMAIN}tour/4.png`,
      ]
    }
  };

  handleClick = (e) => {
    e.stopPropagation();

    const { item, data } = this.state;
    if (item + 1 >= data.length) {
      showTourGuide(null);
    } else {
      this.setState({
        item: item + 1
      });
    }
  };

  render = ({}, {item, data}) => {
    return (
      <div className={style.tourWrap}>
        <div className={style.tourContent} style={`width: ${data.length * 100}%; left: -${item * 100}%`}>
          {data.map((url) => {
            return (
              <div className={style.item} onClick={this.handleClick}>
                  <ImageLoader src={url} clasName={{container: style.imgWrap}}/>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}
export default TourGuide;