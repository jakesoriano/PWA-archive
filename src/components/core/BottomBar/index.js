import { h } from 'preact';
import { Link } from 'preact-router/match';
import { ImageLoader } from '_components/core';
// eslint-disable-next-line import/extensions
import style from './style';

export default ({ page }) => (
  <div className={style.bottomBar}>
    <Link class={style.menu} activeClassName={style.active} href="/">
      <ImageLoader
        src={`assets/images/icon_home_${page === 'home' ? 'active' : 'default'}.png`}
        style={{container: style.imgCont}} />
    </Link>
    <Link class={style.menu} activeClassName={style.active} href="/invite">
      <ImageLoader src={`assets/images/icon_invite_${page === 'invite' ? 'active' : 'default'}.png`}
        style={{container: style.imgCont}} />
    </Link>
    <Link class={style.menu} activeClassName={style.active} href="/leaderboard">
      <ImageLoader src={`assets/images/icon_home_${page === 'leaderboard' ? 'active' : 'default'}.png`}
        style={{container: style.imgCont}} />
    </Link>
    <Link class={style.menu} activeClassName={style.active} href="/community">
      <ImageLoader src={`assets/images/icon_donate_${page === 'community' ? 'active' : 'default'}.png`}
        style={{container: style.imgCont}} />
    </Link>
    <Link class={style.menu} activeClassName={style.active} href="/profile">
      <ImageLoader src={`assets/images/icon_profile_${page === 'profile' ? 'active' : 'default'}.png`}
        style={{container: style.imgCont}} />
    </Link>
  </div>
);
