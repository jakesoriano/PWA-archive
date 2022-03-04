import { h } from 'preact';
import { Link } from 'preact-router/match';
import { ImageLoader } from '_components/core';
// eslint-disable-next-line import/extensions
import style from './style';

export default ({ page }) => (
  <div className={style.bottomBar}>
    <Link id="tab-home" class={style.menu} activeClassName={style.active} href="/home">
      <ImageLoader
        src={`assets/images/bb_home_${
          page === 'home' ? 'active' : 'inactive'
        }.png`}
        style={{ container: style.imgCont }}
      />
    </Link>
    <Link id="tab-invite" class={style.menu} activeClassName={style.active} href="/invite">
      <ImageLoader
        src={`assets/images/bb_invite_${
          page === 'invite' ? 'active' : 'inactive'
        }.png`}
        style={{ container: style.imgCont }}
      />
    </Link>
    <Link id="tab-tasks" class={style.menu} activeClassName={style.active} href="/task-center">
      <ImageLoader
        src={`assets/images/bb_task_${
          page === 'task-center' ? 'active' : 'inactive'
        }.png`}
        style={{ container: style.imgCont }}
      />
    </Link>
    <Link id="tab-leaderboard" class={style.menu} activeClassName={style.active} href="/leaderboard">
      <ImageLoader
        src={`assets/images/bb_lead_${
          page === 'leaderboard' ? 'active' : 'inactive'
        }.png`}
        style={{ container: style.imgCont }}
      />
    </Link>
    <Link id="tab-community" class={style.menu} activeClassName={style.active} href="/community">
      <ImageLoader
        src={`assets/images/bb_com_${
          page.indexOf('community') > -1 ? 'active' : 'inactive'
        }.png`}
        style={{ container: style.imgCont }}
      />
    </Link>
  </div>
);
