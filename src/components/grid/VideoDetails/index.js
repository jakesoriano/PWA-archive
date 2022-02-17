import { Component } from 'preact';
import { connect } from 'unistore/preact';
import style from './style';

class VideoDetails extends Component {
  render = ({videos}) => (
    <div className={style.videoDetailsWrap}>
      <p class={`bold ${style.heading}`}>{videos.selected.title}</p>
      <iframe width="100%" height="auto" frameborder="0"
        src={videos.selected.video}>
      </iframe>
      <p class={`${style.desc}`}>{videos.selected.desc}</p>
    </div>
  )
}
export default connect(['videos'])(VideoDetails);