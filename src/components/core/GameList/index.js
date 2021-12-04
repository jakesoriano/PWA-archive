import { h } from 'preact';
import { ImageLoader } from '_components/core';
// eslint-disable-next-line import/extensions
import style from './style';

export default ({ vertically, title, moreLink, games }) => (
  <div className={`${style.gameList} ${vertically ? style.vertically : ''}`}>
    <div className={style.header}>
      {/* Title */}
      {!vertically ? <span className={style.title}>{title}</span> : null}
      {/* More Link */}
      {!moreLink ? null : (
        <a className={style.moreLink} to={moreLink}>
					More
        </a>
      )}
    </div>
    {/* Content */}
    <div className={style.items}>
      {games.map((game) => {
        return (
          <a className={style.a} to={game.Links.page}>
            <ImageLoader src={game.ImageUrl} lazy alt="" />
            <span>{!vertically ? game.TranslatedTitle || game.Title : ''}</span>
          </a>
        );
      })}
    </div>
  </div>
);
