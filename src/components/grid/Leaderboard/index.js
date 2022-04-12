import { h, Component } from 'preact';
import { connect } from 'unistore/preact';
import {
  Tabs,
  LeaderboardFilterBy,
  LeaderboardListing,
  ImageLoader,
} from '_components/core';
import {
  fetchLeaderboardPoints,
  fetchLeaderboardTask,
  fetchLeaderboardH2H,
} from '_mutations';
import { getTranslation } from '_helpers';
// eslint-disable-next-line import/extensions
import style from './style';

// eslint-disable-next-line react/prefer-stateless-function
class Leaderboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tabs: [
        {
          id: 'task',
          title: 'Tasks',
          period: ['Daily', 'Weekly', 'Alltime'],
          range: ['Global', 'Regional'],
          defaultFilter: {
            period: 'Daily',
            range: 'Global',
          },
          dataKey: 'leaderboardTask',
        },
        {
          id: 'points',
          title: 'Hero Points',
          period: ['Daily', 'Weekly', 'Alltime'],
          range: ['Global', 'Regional', 'Personal'],
          defaultFilter: {
            period: 'Daily',
            range: 'Global',
          },
          dataKey: 'leaderboard',
        },
        {
          id: 'h2h',
          title: 'H2H Helpers',
          text: 'H2H_THANK_YOU',
          defaultFilter: null,
          dataKey: 'leaderboardH2H',
        },
      ],
      active: {
        tab: 'points',
        filter: {
          period: 'Daily',
          range: 'Global',
        },
        text: null,
      },
      moreFetching: false,
    };
  }

	componentDidMount = () => {
	  this.initFetch();
	};

	initFetch = () => {
	  if (this.state.active.tab === 'points') {
	    fetchLeaderboardPoints();
	  } else if (this.state.active.tab === 'task') {
	    fetchLeaderboardTask();
	  } else if (this.state.active.tab === 'h2h') {
	    fetchLeaderboardH2H();
	  }
	};

	getTabById = (id, field) => {
	  const tab = this.state.tabs.find((i) => i.id === id);
	  if (field === 'period') {
	    return tab?.period;
	  }
	  if (field === 'range') {
	    return tab?.range;
	  }
	  return tab;
	};

	getDataById = (id) => {
	  const tab = this.state.tabs.find((i) => i.id === id);
	  return this.props[tab?.dataKey].data;
	};

	onTabSelect = (id) => {
	  if (id !== this.state.active.tab) {
	    const tab = this.getTabById(id);
	    this.setState(
	      {
	        active: {
	          tab: id,
	          filter: tab?.defaultFilter,
	          text: tab?.text,
	        },
	      },
	      () => {
	        this.initFetch();
	      }
	    );
	  }
	};

	onFilterSelect = (filter) => {
	  this.setState(
	    {
	      active: {
	        ...this.state.active,
	        filter,
	      },
	    },
	    () => {
	      if (this.state.active.tab === 'points') {
	        fetchLeaderboardPoints(filter);
	      } else if (this.state.active.tab === 'task') {
	        fetchLeaderboardTask(filter);
	      }
	    }
	  );
	};

	render = (
	  { leaderboard, leaderboardTask, leaderboardH2H },
	  { active, tabs, moreFetching }
	) => {
	  return (
	    <dv className={style.leaderboard}>
	      {/* Tabs */}
	      <Tabs list={tabs} selected={active.tab} callback={this.onTabSelect} />
	      {/* Text / Thank You */}
	      {active.text && (
	        <div>
	          <div className={style.heartWrap}>
	            <ImageLoader
	              src="assets/icons/heart.svg"
	              style={{ container: style.heart }}
	              lazy
	            />
	          </div>
	          <p className={`bold ${style.text}`}>
	            {getTranslation(active.text)}
	          </p>
	        </div>
	      )}
	      {/* Filter By */}
	      {active.filter && (
	        <LeaderboardFilterBy
	          period={this.getTabById(active.tab, 'period')}
	          range={this.getTabById(active.tab, 'range')}
	          selected={active.filter}
	          callback={this.onFilterSelect}
	        />
	      )}
	      {/* Listing */}
	      <LeaderboardListing
	        id={active?.tab}
	        fetching={
	          leaderboard.fetching ||
						leaderboardTask.fetching ||
						leaderboardH2H.fetching
	        }
	        data={this.getDataById(active.tab)}
	      />
	    </dv>
	  );
	};
}
export default connect(['leaderboard', 'leaderboardTask', 'leaderboardH2H'])(
  Leaderboard
);
