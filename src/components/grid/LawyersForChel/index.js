import { Component } from 'preact';
import { route } from 'preact-router';
import { ImageLoader } from '_components/core';
import style from './style';

class LawyersForChel extends Component {
  constructor(props) {
    super(props);
  }

	onClickItem = (url) => {
	  route(url);
	};

	render = ({ page, headerImage }) => {
	  return (
	    <div className={style.hfWrap}>
	      <div className={style.headerImage}>
	        <ImageLoader style={{ container: style.backImg }} src={headerImage} />
	      </div>

	      <div className={style.pageTitle}>{this.props?.title}</div>
	      <div className={style.body}>
	        {/* Invite */}
	        {this.props?.issues?.map((issue) => {
	          return (
	            <a
	              id={`${page}`}
	              onClick={(e) => {
	                e.stopPropagation();
	                this.onClickItem(issue.url);
	              }}
	              className={`${style.item}`}
	            >
	              <div className={`bold ${style.button}`}>
	                <a>{issue?.title}</a>
	                <div className={style.arrow}>
	                  <ImageLoader src="assets/icons/arrow.svg" />
	                </div>
	              </div>

	              <span className={style.subtitle}>
	                <div className={style.information}>
	                  <ImageLoader src="assets/icons/information.svg" />
	                </div>
	                <div>{issue?.title}</div>
	              </span>
	              <p className={style.description}>{issue?.description}</p>
	            </a>
	          );
	        })}
	      </div>
	    </div>
	  );
	};
}
export default LawyersForChel;
