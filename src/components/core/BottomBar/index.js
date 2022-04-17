import { h } from 'preact';
import { Link } from 'preact-router/match';
import { ImageLoader } from '_components/core';
import { getTranslation } from '_helpers';
// eslint-disable-next-line import/extensions
import style from './style';

export default ({ page }) => (
  <div className={style.bottomBar}>
    <Link
      id="tab-home"
      class={style.menu}
      activeClassName={style.active}
      href="/home"
    >
      <ImageLoader
        src={`assets/icons/bb_home.png`}
        style={{ container: style.imgCont }}
      />
      <p className={`bold ${style.title}`}>{getTranslation('PAGE_HOME')}</p>
      {page === 'home' && (
        <p className={style.dot}>
          <span>●</span>
        </p>
      )}
    </Link>
    <Link
      id="tab-invite"
      class={style.menu}
      activeClassName={style.active}
      href="/invite"
    >
      <ImageLoader
        src={`assets/icons/bb_invite.png`}
        style={{ container: style.imgCont }}
      />
      <p className={`bold ${style.title}`}>{getTranslation('PAGE_INVITE')}</p>
      {page === 'invite' && (
        <p className={style.dot}>
          <span>●</span>
        </p>
      )}
    </Link>
    <Link
      id="tab-tasks"
      class={style.menu}
      activeClassName={style.active}
      href="/task-center"
    >
      <ImageLoader
        src={`assets/icons/bb_todo.png`}
        style={{ container: style.imgCont }}
      />
      <p className={`bold ${style.title}`}>{getTranslation('TASK_CENTER')}</p>
      {page === 'task-center' && (
        <p className={style.dot}>
          <span>●</span>
        </p>
      )}
    </Link>
    <Link
      id="tab-community"
      class={style.menu}
      activeClassName={style.active}
      href="/community"
    >
      <ImageLoader
        src={`assets/icons/bb_com.png`}
        style={{ container: style.imgCont }}
      />
      <p className={`bold ${style.title}`}>
        {getTranslation('PAGE_COMMUNITY')}
      </p>
      {page.indexOf('community') > -1 && (
        <p className={style.dot}>
          <span>●</span>
        </p>
      )}
    </Link>
    <Link
      id="tab-profile"
      class={style.menu}
      activeClassName={style.active}
      href="/profile"
    >
      <ImageLoader
        src={`assets/icons/bb_prof.png`}
        style={{ container: style.imgCont }}
      />
      <span className={style.redDot}>●</span>
      <p className={`bold ${style.title}`}>{getTranslation('ACCOUNT')}</p>
      {page === 'profile' && (
        <p className={style.dot}>
          <span>●</span>
        </p>
      )}
    </Link>
  </div>
);
