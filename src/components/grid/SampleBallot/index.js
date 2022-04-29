import { Component } from 'preact';
import { ImageLoader } from '_components/core';
import {
  getTranslation,
  showAlertBox,
  displayPageLoader,
  uploadFile,
  getTraceID,
  replaceUrlPlaceholders,
  componentModal,
} from '_helpers';
import { presidentCandidate, viceCandidate, senatorCandidate } from '_constant';
import domtoimage from 'dom-to-image';
import style from './style';

class SampleBallot extends Component {
  constructor(props) {
    super(props);
    this.state = {
      maxSenators: 12,
      team: {
        president: 10,
        vice: 7,
        mainSenators: [4, 18, 21, 34, 38, 45, 58],
        allSenators: [4, 18, 21, 34, 38, 45, 58, 11, 25, 31, 61],
      },
      selected: {
        president: 0,
        vice: 0,
        senators: [],
      },
    };
  }

	componentDidMount = () => {
	  try {
	    document.getElementById('president').scroll({ left: 600 });
	    document.getElementById('vice').scroll({ left: 400 });
	  } catch (err) {}
	};

	onClickSuggestedPresident = () => {
	  const { selected, team } = this.state;
	  this.setState({
	    selected: {
	      ...this.state.selected,
	      president: team.president,
	      vice: team.vice,
	    },
	  });
	};

	onClickSuggestedSenators = (senators) => {
	  const { selected } = this.state;
	  this.setState({
	    selected: {
	      ...this.state.selected,
	      senators: senators,
	    },
	  });
	};

	onClickPresident = (no) => {
	  const { selected, team } = this.state;

	  // ignore selection
	  if (no !== team.president) {
	    showAlertBox({
	      message: 'PRESIDENT_ERROR',
	    });
	    return;
	  }

	  this.setState({
	    selected: {
	      ...this.state.selected,
	      president: selected.president === no ? 0 : no,
	    },
	  });
	};

	onClickVice = (no) => {
	  const { selected, team } = this.state;

	  // ignore selection
	  if (no !== team.vice) {
	    showAlertBox({
	      message: 'VICE_PRESIDENT_ERROR',
	    });
	    return;
	  }

	  this.setState({
	    selected: {
	      ...this.state.selected,
	      vice: selected.vice === no ? 0 : no,
	    },
	  });
	};

	onClickSenator = (no) => {
	  const { selected, maxSenators } = this.state;
	  this.setState({
	    selected: {
	      ...this.state.selected,
	      senators:
					selected.senators.indexOf(no) > -1
					  ? selected.senators.filter((i) => i !== no)
					  : selected.senators.length < maxSenators
					    ? [...selected.senators, ...[no]]
					    : selected.senators,
	    },
	  });

	  // send error message
	  if (
	    selected.senators.length >= maxSenators &&
			selected.senators.indexOf(no) <= -1
	  ) {
	    showAlertBox({
	      message: 'You have reached the maximum votes for Senators (12)',
	    });
	  }
	};

	onClickClear = () => {
	  this.setState({
	    selected: {
	      ...this.state.selected,
	      president: 0,
	      vice: 0,
	      senators: [],
	    },
	  });
	};

	onSaveSampleBallot = () => {
	  displayPageLoader(true);
	  try {
	    let node = document.getElementById('html-to-image');
	    node.style.width = '800px';
	    setTimeout(() => {
	      // convert dom to jpeg
	      // domtoimage
	      //   .toJpeg(node)
	      //   .then((file) => {
	      //     node.style.width = 'auto';
	      //     displayPageLoader(false);

	      //     // download image
	      //     const link = document.createElement('a');
	      //     link.href = file;
	      //     link.download = `sample-ballot.jpeg`;
	      //     document.body.appendChild(link);
	      //     link.click();
	      //     document.body.removeChild(link);

	      //   })
	      // convert dom to blob
	      domtoimage
	        .toBlob(node)
	        .then((blob) => {
	          node.style.width = 'auto';

	          // upload image
	          uploadFile({ file: blob }).then((res) => {
	            displayPageLoader(false);
	            if (res.success && res.data) {
	              // download image
	              componentModal({
	                content: this.renderModalContent(
										`{CDN_DOMAIN}${res.data.image}`
	                ),
	                modalId: 'sample-ballot-modal',
	                transparentBG: true,
	              });
	              // window.open(
	              //   replaceUrlPlaceholders(`{CDN_DOMAIN}${res.data.image}`),
	              //   '_blank'
	              // );
	            } else {
	              const errorMessage = getTraceID(res);
	              showAlertBox({
	                message: res.errMessage || errorMessage,
	              });
	            }
	          });
	        })
	        .catch(() => {
	          node.style.width = 'auto';
	          displayPageLoader(false);
	          showAlertBox({
	            message: 'SOMETHING_WRONG',
	          });
	        });
	    }, 200);
	  } catch (err) {
	    node.style.width = 'auto';
	    displayPageLoader(false);
	    showAlertBox({
	      message: 'SOMETHING_WRONG',
	    });
	  }
	};

	isSenatorsSelected = (senators) => {
	  const { selected } = this.state;
	  let isAllSelected = true;
	  // eslint-disable-next-line no-restricted-syntax
	  for (const s of senators) {
	    if (!selected.senators.find((i) => i === s)) {
	      isAllSelected = false;
	    }
	  }
	  return isAllSelected;
	};

	renderModalContent = (imageUrl) => (
	  <div className={style.modalWrap}>
	    <ImageLoader
	      src={imageUrl}
	      style={{ container: style.modalImage }}
	      lazy
	    />
	    <a
	      className={style.button}
	      href={replaceUrlPlaceholders(imageUrl)}
	      download={'SAMPLE-BALLOT.png'}
	      target="_blank"
	      rel="noopener noreferrer"
	    >
	      {getTranslation('DOWNLOAD_SAMPLE_BALLOT')}
	    </a>
	  </div>
	);

	renderSuggested = () => {
	  const { selected, team } = this.state;

	  return (
	    <div className={style.suggested}>
	      <p className={style.title}>
	        {getTranslation('SAMPLE_BALLOT_SUGGESTED')}
	      </p>
	      <div className={style.buttons}>
	        {/* Leni-Kiko */}
	        <button
	          className={`${style.sBtn} ${
							selected.president && selected.vice ? style.highlight : ''
						}`}
	          onClick={this.onClickSuggestedPresident}
	        >
	          {getTranslation('VOTE_FOR_LENI_KIKO')}
	        </button>
	        {/* Main Senators */}
	        <button
	          className={`${style.sBtn} ${
							this.isSenatorsSelected(team.mainSenators) ? style.highlight : ''
						}`}
	          onClick={() => {
	            this.onClickSuggestedSenators(team.mainSenators);
	          }}
	        >{`${team.mainSenators.length} ${getTranslation(
	          'SENATORS'
	        )}`}</button>
	        {/* Main and Guest Senators */}
	        <button
	          className={`${style.sBtn} ${
							this.isSenatorsSelected(team.allSenators) ? style.highlight : ''
						}`}
	          onClick={() => {
	            this.onClickSuggestedSenators(team.allSenators);
	          }}
	        >{`${team.allSenators.length} ${getTranslation('SENATORS')}`}</button>
	        {/* Clear */}
	        <button
	          className={`${style.sBtn} ${style.cBtn}`}
	          onClick={() => {
	            this.onClickClear();
	          }}
	        >
	          {getTranslation('CLEAR')}
	        </button>
	      </div>
	    </div>
	  );
	};

	renderStatus = () => {
	  const { selected, maxSenators } = this.state;

	  return (
	    <div className={style.status}>
	      <p
	        className={`bold ${selected.president ? style.completed : ''}`}
	      >{`${getTranslation('PRESIDENT')} ${selected.president ? 1 : 0}/1`}</p>
	      <p
	        className={`bold ${selected.vice ? style.completed : ''}`}
	      >{`${getTranslation('VICE_PRESIDENT')} ${selected.vice ? 1 : 0}/1`}</p>
	      <p
	        className={`bold ${
						selected.senators.length >= 1 ? style.completed : ''
					}`}
	      >{`${getTranslation('SENATORS')} ${
					selected.senators.length
				}/${maxSenators}`}</p>
	    </div>
	  );
	};

	renderCandidateList = (position, data, selected) => {
	  return (
	    <div id={position} className={style.listWrap}>
	      <div className={style.list}>
	        {data.map((item, index) => {
	          const active = selected.indexOf(index + 1) > -1;
	          return (
	            <button
	              className={`${style.item} ${active ? style.active : ''}`}
	              onClick={(e) => {
	                e.stopPropagation();
	                if (!item.name) {
	                  return;
	                }
	                if (position === 'president') {
	                  this.onClickPresident(index + 1);
	                } else if (position === 'vice') {
	                  this.onClickVice(index + 1);
	                } else if (position === 'senators') {
	                  this.onClickSenator(index + 1);
	                }
	              }}
	            >
	              {item.name ? (
	                <>
	                  <ImageLoader
	                    src={`assets/images/circle${
												active ? '_selected' : ''
											}.png`}
	                    style={{
	                      container: style.iconCircle,
	                    }}
	                  />
	                  <span className={`${active ? 'bold' : ''}`}>{`${
											index + 1
										}. ${item.name} (${item.party})`}</span>
	                </>
	              ) : null}
	            </button>
	          );
	        })}
	      </div>
	    </div>
	  );
	};

	renderPresidentCandidate = () => {
	  const { selected } = this.state;

	  return (
	    <div className={`${style.candidates}  ${style.president}`}>
	      <p className={`${style.title}`}>{`${getTranslation(
	        'PRESIDENT'
	      ).toUpperCase()} / ${getTranslation('VOTE_FOR')} 1`}</p>
	      {this.renderCandidateList('president', presidentCandidate, [
	        selected.president,
	      ])}
	    </div>
	  );
	};

	renderViceCandidate = () => {
	  const { selected } = this.state;

	  return (
	    <div className={`${style.candidates} ${style.vice}`}>
	      <p className={`${style.title}`}>{`${getTranslation(
	        'VICE_PRESIDENT'
	      ).toUpperCase()} / ${getTranslation('VOTE_FOR')} 1`}</p>
	      {this.renderCandidateList('vice', viceCandidate, [selected.vice])}
	    </div>
	  );
	};

	renderSenatorsCandidate = () => {
	  const { selected, maxSenators } = this.state;

	  return (
	    <div className={`${style.candidates} ${style.senators}`}>
	      <p className={`${style.title}`}>{`${getTranslation(
	        'SENATORS'
	      ).toUpperCase()} / ${getTranslation('VOTE_FOR')} ${maxSenators}`}</p>
	      {this.renderCandidateList(
	        'senators',
	        senatorCandidate,
	        selected.senators
	      )}
	    </div>
	  );
	};

	renderMainContent = () => {
	  return (
	    <div id="html-to-image" className={style.mainContent}>
	      {/* Status Count */}
	      {this.renderStatus()}
	      {/* President Candidate */}
	      {this.renderPresidentCandidate()}
	      {/* Vice President Candidate */}
	      {this.renderViceCandidate()}
	      {/* Senators Candidate */}
	      {this.renderSenatorsCandidate()}
	    </div>
	  );
	};

	render = () => {
	  return (
	    <div className={style.sampleBallot}>
	      {/* title and note */}
	      <p className={style.title}>
	        {getTranslation('SAMPLE_BALLOT_SIMULATOR')}
	      </p>
	      <p className={style.note}>
	        <ImageLoader
	          src={'assets/images/scroll.png'}
	          style={{
	            container: style.icon,
	          }}
	        />
	        <span>{getTranslation('SAMPLE_BALLOT_SCROLL_NOTE')}</span>
	      </p>
	      {/* Suggested Candidate Autofill */}
	      {this.renderSuggested()}
	      {/* Render Content*/}
	      {this.renderMainContent()}
	      {/* Button */}
	      <button
	        className={`bold ${style.btnSave}`}
	        onClick={this.onSaveSampleBallot}
	      >
	        {getTranslation('SAMPLE_BALLOT_SAVE')}
	      </button>
	    </div>
	  );
	};
}
export default SampleBallot;
