import { h } from 'preact';
import { Link } from 'preact-router/match';
import { ImageLoader } from '_components/core';
// eslint-disable-next-line import/extensions
import style from './style';

export default ({ page }) => (
  <div className={style.bottomBar}>
    <Link class={style.menu} activeClassName={style.active} href="/">
      <ImageLoader
        src={`assets/images/home_icon_${
          page === 'home' ? 'active' : 'inactive'
        }.png`}
        style={{ container: style.imgCont }}
      />
    </Link>
    <Link class={style.menu} activeClassName={style.active} href="/invite">
      <ImageLoader
        src={`assets/images/invite_icon_${
          page === 'invite' ? 'active' : 'inactive'
        }.png`}
        style={{ container: style.imgCont }}
      />
    </Link>
    <Link class={style.menu} activeClassName={style.active} href="/leaderboard">
      <ImageLoader
        src={`assets/images/members_icon_${
          page === 'leaderboard' ? 'active' : 'inactive'
        }.png`}
        style={{ container: style.imgCont }}
      />
    </Link>
    <Link class={style.menu} activeClassName={style.active} href="/community">
      <ImageLoader
        src={`assets/images/donate_icon_${
          page === 'community' ? 'active' : 'inactive'
        }.png`}
        style={{ container: style.imgCont }}
      />
    </Link>
    <Link class={style.menu} activeClassName={style.active} href="/profile">
      <ImageLoader
        src={`assets/images/myaccount_icon_${
          page === 'profile' ? 'active' : 'inactive'
        }.png`}
        style={{ container: style.imgCont }}
      />
    </Link>
  </div>
);
