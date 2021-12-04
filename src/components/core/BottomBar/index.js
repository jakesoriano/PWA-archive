import { h } from 'preact';
import { Link } from 'preact-router/match';
import { getTranslation } from '_helpers';
// eslint-disable-next-line import/extensions
import style from './style';

export default ({ page }) => (
  <div className={style.bottomBar}>
    <Link class={style.menu} activeClassName={style.active} href="/">
      <span className="icon-rewards-home" />
      <span className="text">{getTranslation('LABEL_MENU_HOME')}</span>
    </Link>
    <Link class={style.menu} activeClassName={style.active} href="/games">
      <span className="icon-shopping-bag" />
      <span className="text">{getTranslation('Label_Catalogue')}</span>
    </Link>
    <Link class={style.menu} activeClassName={style.active} href="/buttons">
      <span className="icon-live-chat" />
      <span className="text">{getTranslation('LABEL_MENU_LIVE_CASINO')}</span>
    </Link>
    <Link
      class={style.menu}
      activeClassName={style.active}
      href={`/${page}/buttons`}
    >
      <span className="icon-spin-wheel" />
      <span className="text">{getTranslation('SpinWheel_WheelLabel')}</span>
    </Link>
  </div>
);
