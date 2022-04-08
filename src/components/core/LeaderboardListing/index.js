import { h, Component } from 'preact';
import { connect } from 'unistore/preact';
import { LoaderRing, ImageLoader } from '_components/core';
import {
  getTranslation,
  formatNumber,
  getDefaultAvatar,
  displayName,
} from '_helpers';
// eslint-disable-next-line import/extensions
import style from './style';

// eslint-disable-next-line react/prefer-stateless-function
class LeaderboardListing extends Component {
  constructor(props) {
    super(props);
  }

	renderHeader = (id) => {
	  return (
	    <div className={`${style.item} ${style.header}`}>
	      <div className={style.avatar}></div>
	      <div className={style.nameMember}>
	        <p className={`bold`}>{getTranslation('KakamPinks')}</p>
	      </div>
	      {id === 'task' && (
	        <>
	          <div className={style.count}>
	            <p className={`bold`}>{getTranslation('RANK')}</p>
	          </div>
	          <div className={style.count}>
	            <p className={`bold`}>{getTranslation('Task Count')}</p>
	          </div>
	        </>
	      )}
	      {id === 'points' && (
	        <>
	          <div className={style.count}>
	            <p className={`bold`}>{getTranslation('RANK')}</p>
	          </div>
	          <div className={style.count}>
	            <p className={`bold`}>{getTranslation('POINTS')}</p>
	          </div>
	        </>
	      )}
	      {id === 'h2h' && (
	        <>
	          <div className={style.count}>
	            <p className={`bold`}>{getTranslation('Supported')}</p>
	          </div>
	        </>
	      )}
	    </div>
	  );
	};

	render = ({ data, fetching, id, authUser }) => {
	  return (
	    <dv className={style.listing}>
	      {/* header */}
	      {this.renderHeader(id)}
	      {/* content */}
	      <div className={style.content}>
	        {data && data.length
	          ? data.map((item, index) => (
	            <div
	              className={`${style.item} ${
										authUser?.profile?._id === item?.profile?._id
										  ? style.featured
										  : ''
									}`}
	            >
	              <ImageLoader
	                src={
											item?.profile?.image || item.image || getDefaultAvatar()
	                }
	                style={{ container: style.avatar }}
	              />
	              <div className={style.nameMember}>
	                <div>
	                  <p className={`light ${style.name}`}>
	                    {displayName(item.profile ? item.profile : item)}
	                  </p>
	                  <p className={`light ${style.members}`}>{`${
												item.members
											} ${getTranslation('MEMBERS')}`}</p>
	                </div>
	              </div>
	              {id === 'task' && (
	                <>
	                  <div className={style.count}>
	                    <p className={`light`}>
	                      {formatNumber(item.rank || index + 1)}
	                    </p>
	                  </div>
	                  <div className={style.count}>
	                    <p className={`light`}>
	                      {item.completedTaskCount || 0}
	                    </p>
	                  </div>
	                </>
	              )}
	              {id === 'points' && (
	                <>
	                  <div className={style.count}>
	                    <p className={`light`}>
	                      {formatNumber(item.rank || index + 1)}
	                    </p>
	                  </div>
	                  <div className={style.count}>
	                    <p className={`light`}>
	                      {formatNumber(item.points) || 0}
	                    </p>
	                  </div>
	                </>
	              )}
	              {id === 'h2h' && (
	                <>
	                  <div className={style.count}>
	                    <p className={`light`}>{item.count || 0}</p>
	                  </div>
	                </>
	              )}
	            </div>
						  ))
	          : null}
	      </div>
	      {/* no record */}
	      {!data ||
					(data.length <= 0 && (
					  <p className={style.noRecord}>{getTranslation('NO_DATA')}</p>
					))}
	      {/* Loader */}
	      {fetching && <LoaderRing fullpage />}
	      {/* Filter */}
	    </dv>
	  );
	};
}
export default connect(['authUser'])(LeaderboardListing);
