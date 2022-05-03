import { Component } from 'preact';
import { connect } from 'unistore/preact';
import { ImageLoader } from '_components/core';
import { Carousel } from 'react-responsive-carousel';
import { getTranslation, epochDateFormat, componentModal } from '_helpers';
import style from './style';
class CrowdSourcingTransactionDetails extends Component {
	showProofModal = (data) => {
	  componentModal({
	    content: this.renderProofModal(data),
	    transparentBG: true,
	  });
	};

	renderProofModal = (data) => {
	  return (
	    <div className={style.proofContent}>
	      <div className={style.sliderWrap}>
	        <Carousel
	          showArrows
	          showStatus
	          showThumbs={false}
	          autoPlay
	          className={`${style.customCarousel}`}
	        >
	          {data.map((item) => {
	            return (
	              <div className={style.item}>
	                <ImageLoader
	                  src={item}
	                  style={{ container: style.proofImg }}
	                  lazy
	                />
	              </div>
	            );
	          })}
	        </Carousel>
	      </div>
	    </div>
	  );
	};

	render = ({ cstransactions }) => {
	  return (
	    cstransactions.selected && (
	      <div className={style.tdWrap}>
	        <p className={`extraBold ${style.title}`}>
	          {cstransactions.selected.crowdsource.name}
	        </p>
	        <div className={style.tdInfo}>
	          {/* image */}
	          <ImageLoader
	            src={cstransactions.selected.crowdsource.image}
	            style={{ container: style.csImg }}
	            lazy
	          />
	          {/* crowdsourcing info */}
	          <div className={style.csInfo}>
	            <div className={style.csInfoHead}>
	              <span className={`bold ${style.vName}`}>
	                {cstransactions.selected.crowdsource.volunteerName}
	              </span>
	              <span
	                className={style.amount}
	              >{`₱ ${cstransactions.selected.crowdsource.amount}`}</span>
	            </div>
	            <div className={style.csInfoBody}>
	              {cstransactions?.selected?.crowdsource?.target && (
	                <div>
	                  <span className={`bold ${style.vName}`}>
	                    {cstransactions.selected.crowdsource?.target}{' '}
	                  </span>
	                  <span>{getTranslation('HOUSES')}</span>
	                </div>
	              )}
	              <div>
	                <span className={`bold ${style.vName}`}>
	                  {cstransactions.selected.crowdsource.amount}
	                </span>
	                <span>{cstransactions.selected.crowdsource.purpose}</span>
	              </div>
	            </div>
	          </div>
	        </div>
	        {
						// description
						cstransactions.selected.crowdsource?.shortDesc && (
	            <p className={style.csDescr}>
								"{cstransactions.selected.crowdsource.shortDesc}"
	            </p>
	          )
	        }
	        {/* volunteer info */}
	        <div className={style.vInfo}>
	          <p className={`bold`}>{getTranslation('NANAY_VOLUNTEER')}</p>
	          <div className={style.vInfoHead}>
	            <ImageLoader
	              src={cstransactions.selected.crowdsource.volunteerImage}
	              style={{ container: style.vImg }}
	              lazy
	            />
	            <span>
	              {`${cstransactions.selected.crowdsource.volunteerName}, ${cstransactions.selected.crowdsource.volunteerAge} y.o`}
	            </span>
	          </div>
	          <div className={style.vInfoBody}>
	            <p>{cstransactions.selected.crowdsource.longDesc}</p>
	          </div>
	        </div>
	        {/* note */}
	        <p className={style.note}>{getTranslation('TRANSACTION_NOTE')}</p>
	        {/* progress */}
	        <div className={style.tdProgress}>
	          <p className={`extraBold ${style.title}`}>
	            {getTranslation('PROGRESS')}
	          </p>
	          <div className={style.tdProgressBody}>
	            {
	              // cs received
	              cstransactions.selected.h2hProof && (
	                <div
	                  className={`${style.pStatus} ${
											cstransactions.selected.h2hProof ? style.active : ''
										}`}
	                >
	                  <p className={style.pStatusDate}>
	                    {epochDateFormat(cstransactions.selected.h2hProofDate)}
	                  </p>
	                  <div className={style.pStatusText}>
	                    <p className={`bold ${style.pStatusTextTitle}`}>
	                      {getTranslation('H2H_COMPLETED')}
	                    </p>
	                    <p className={style.pStatusTitle}>
	                      {getTranslation('H2H_COMPLETED_DESCR')}
	                    </p>
	                  </div>
	                </div>
	              )
	            }
	            {
	              // disbursed
	              cstransactions.selected.disbursed && (
	                <div
	                  className={`${style.pStatus} ${
											!cstransactions.selected.h2hProof ? style.active : ''
										}`}
	                >
	                  <p className={style.pStatusDate}>
	                    {epochDateFormat(cstransactions.selected.disbursedDate)}
	                  </p>
	                  <div className={style.pStatusText}>
	                    <p className={`bold ${style.pStatusTextTitle}`}>
	                      {getTranslation('PAYMENT_DISBURSED')}
	                    </p>
	                    <p className={style.pStatusTitle}>
	                      {getTranslation('PAYMENT_DISBURSED_DESCR')}
	                    </p>
	                  </div>
	                </div>
	              )
	            }
	            {/* payment complete */}
	            <div
	              className={`${style.pStatus} ${
									!cstransactions.selected.disbursed ? style.active : ''
								}`}
	            >
	              <p className={style.pStatusDate}>
	                {epochDateFormat(cstransactions.selected.date)}
	              </p>
	              <div className={style.pStatusText}>
	                <p className={`bold ${style.pStatusTextTitle}`}>
	                  {getTranslation('PAYMENT_COMPLETED')}
	                </p>
	                <p className={style.pStatusTitle}>
	                  {getTranslation('PAYMENT_COMPLETED_DESCR')}
	                </p>
	              </div>
	            </div>
	            {
	              // view proof button
	              cstransactions.selected.h2hProof && (
	                <a
	                  className={style.proof}
	                  onClick={() =>
	                    this.showProofModal(cstransactions.selected.h2hProof)}
	                >
	                  {getTranslation('VIEW_PROOF')}
	                </a>
	              )
	            }
	          </div>
	        </div>
	      </div>
	    )
	  );
	};
}
export default connect(['cstransactions'])(CrowdSourcingTransactionDetails);
