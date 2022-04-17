import { Component } from 'preact';
import { ImageLoader } from '_components/core';
import style from './style';
class FullImage extends Component {
  render = ({ src, id }) => (
    <div id={`full-image-${id}`} class={style.fiContainer}>
      <ImageLoader
        src={src}
        style={{ container: style.ilContainer }}
        lazy
      />
    </div>
  )
}
export default FullImage;
