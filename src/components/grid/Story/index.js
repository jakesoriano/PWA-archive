import { Component } from 'preact';
import { getQueryStringValue } from '_helpers';
import { connect } from 'unistore/preact';
import style from './style.scss';
import { ImageLoader } from '_components/core';
import { fetchStories } from '_mutations';


// eslint-disable-next-line react/prefer-stateless-function
class Story extends Component {
	constructor(props) {
		super(props);
		this.state = {
			storyId: getQueryStringValue('id'),
		}
	};

	componentDidMount = () => {
		fetchStories();
	};
	
	render = ({stories, authUser},{storyId}) => {

		if (!authUser) {
			return null;
		}

		return stories.data.map((i) => {
			if(i.id === storyId) {
				return <div className={style.storyWrapper}>
					<div className={style.storyContent}>
						<div className={style.storyHeader}>
							<ImageLoader
								src={i.image}
								style={{container: style.detailImage}}
							/>
							<div className={style.detailContent}>
								<span className={`extraBold ${style.userName}`}>{i.name}</span>
								
							</div>
						</div>
						<div className={style.detailBody}>
						<p className={`bold ${style.detailTitle}`}>{i.title}</p>
							<p className={style.detailDescription}>{i.message}</p>
						</div>
					</div>
				</div>
			}
		});
	};
}
export default connect(['authUser', 'stories'])(Story);
