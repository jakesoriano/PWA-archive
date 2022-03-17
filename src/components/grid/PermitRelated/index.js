import { Component } from 'preact';
import { route, Link } from 'preact-router';
import { connect } from 'unistore/preact';
import { ButtonDescription, Accordion, SubHeader } from '_components/core';
import { getTranslation, getConfigByKey } from '_helpers';
import style from './style';
class PermitRelated extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: props.dataKey ? getConfigByKey(props.dataKey) : props.data,
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
	clickReport = () => {
	  route(`/${this.props.parent}/permit-related-report`);
	};

	render = ({}, { data }) => {
	  if (!(data && data.length)) {
	    return null;
	  }
	  return (
	    <>
	      <SubHeader title="PERMIT_RELATED" />
	      <div className={style.oplanWrap}>
	        {items.map((item, i) => {
	          return (
	            <Accordion
	              data={item}
	              onClickCallback={() => {
	                this.toggleAccordion(i);
	              }}
	            />
	          );
	        })}
	        {/* Goto Report Incident Form */}
	        <ButtonDescription
	          onClickCallback={() => {
	            this.clickReport();
	          }}
	          text={getTranslation('REPORT_PERMIT_RELATED')}
	          topDescription={getTranslation('INCIDENT_REPORT_MSG')}
	          buttonStyle={`${style.buttonStyle}`}
	          topDescStyle={`bold ${style.topDescStyle}`}
	          icon="assets/images/punctuation.png"
	          iconStyle={style.iconStyle}
	        />
	      </div>
	    </>
	  );
	};
}
export default connect([])(PermitRelated);
