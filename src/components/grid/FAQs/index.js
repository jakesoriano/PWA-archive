import { Component } from 'preact';
import { faqs } from '_constant';
import { Accordion } from '_components/core';
import { getTranslation, getConfigByKey } from '_helpers';
import style from './style.scss';
class FAQs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: (props.dataKey && props.dataSubKey) ? faqs[props.dataKey][props.dataSubKey] : props.data,
    };
  }

	toggleAccordion = (item) => {
	  this.setState({
	    data: this.state.data.map((i, index) => {
	      if (index === item) {
	        i.active = !i.active;
	      }
	      return i;
	    }),
	  });
	};

  render = ({ title }, { data }) => {
    if (data.length) {
      return (
        <div className={style.vfaqWrap}>
          <p className={`bold ${style.heading}`}>{getTranslation(title)}</p>
          {
            data.map((item, i) => {
              return (
                <Accordion
                  data={item}
                  onClickCallback={() => {
                    this.toggleAccordion(i);
                  }}
                />
              )
            })
          }
        </div>
      )
    }
  };
}
export default FAQs;
