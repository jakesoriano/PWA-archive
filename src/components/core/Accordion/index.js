import { Component } from 'preact';
import { connect } from 'unistore/preact';
import { ImageLoader } from '_components/core';
import style from './style';
class Accordion extends Component {
	render = ({ onClickCallback, data }) => {
	  if (!data) {
	    return null;
	  }
	  return (
	    <div className={style.accordion}>
	      {/* QUESTION */}
	      <button
	        onClick={() => {
	          onClickCallback();
	        }}
	        className={style.question}
	      >
	        <div className={style.title}>
	          <ImageLoader
	            src="assets/icons/q.svg"
	            style={{ container: style.qIconWrap, image: style.qIcon }}
	            lazy
	          />
	          <p className={`bold`}>{data.question.text}</p>
	          {data.question.thumb && !data.active && (
	            <div className={style.iconWrap}>
	              <ImageLoader
	                src={data.question.thumb}
	                style={{
	                  container: style.imageContainer,
	                  image: style.image,
	                }}
	                lazy
	              />
	            </div>
	          )}
	        </div>
	        <ImageLoader
	          src="assets/images/downarrow-gray.png"
	          style={{
	            container: `${style.dropdown} ${data.active ? style.active : ''}`,
	          }}
	        />
	      </button>
	      {/* ANSWER */}
	      <div className={`${data.active ? style.active : ''} ${style.answer}`}>
	        <div className={style.pAnswer}>
	          <ImageLoader
	            src="assets/icons/a.svg"
	            style={{ container: style.aIconWrap, image: style.aIcon }}
	            lazy
	          />
	          <p>{data.answer.text}</p>
	        </div>
	        <div className={style.aBottom}>
	          {data.answer.video && (
	            <iframe
	              className={style.video}
	              width="100%"
	              height="auto"
	              frameBorder="0"
	              src={data.answer.video}
	            ></iframe>
	          )}
	          <div className={style.author}>
	            <p>{data.answer.author}</p>
	            <ImageLoader
	              src={data.answer.authorImg}
	              style={{ container: style.authorImg, image: style.image }}
	              lazy
	            />
	          </div>
	        </div>
	      </div>
	    </div>
	  );
	};
}
export default connect([])(Accordion);
