import { Component } from 'preact';
import { getTranslation } from '_helpers';
import style from './style.scss';
class Timeline extends Component {
  render = ({ title, data }) => {
    return (
      <div className={style.timelineWrap}>
        <p className={`bold ${style.heading}`}>{getTranslation(title)}</p>
        {
          (data && data.length) && data.map(item => {
            return (
              <div className={style.timeline}>
                <div className={style.left}>
                  <p className={`bold ${style.leftText}`}>{item.leftText}</p>
                </div>
                <div className={style.right}>
                  { // text
                    item.rightText && <p className={style.rightText}>{item.rightText}</p>
                  }
                  { // list
                    item.list && (
                      <ul className={style.list}>
                        {
                          item.list.map(listItem => {
                            return (
                              <li>{listItem}</li>
                            )
                          })
                        }
                      </ul>
                    )
                  }
                </div>
              </div>
            )
          })
        }
      </div>
    )
  }
}
export default Timeline;
