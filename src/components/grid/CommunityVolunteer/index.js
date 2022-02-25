import React, { Component } from 'react';
import { connect } from 'unistore/preact';
import { ImageLoader } from '_components/core';
import { fetchCommunityVolunteers } from '_mutations';
import { getTranslation, isUserUpdatedProfile } from '_helpers';
import style from './style';
import { route } from 'preact-router';
import { format } from 'date-fns';
import { LoaderRing } from '_components/core';

class CommunityVolunteer extends Component {
	constructor(props) {
		super(props);
		this.initialState = {
			search: '',
			data: [],
		};
		this.state = this.initialState;
	}

	componentDidMount = () => {
		// fetch community volunteers
		fetchCommunityVolunteers();

		this.setState({
			data: this?.props?.communityVolunteers,
		});
	};

	handleSearchByTitle = (e) => {
		this.setState({
			search: e.target.value,
		});
	};

	render() {
		// filtering community data
		const communityData = this.state?.data?.data?.filter((data) => {
			return data?.title?.includes(this?.state?.search);
		});

		if (!isUserUpdatedProfile()) {
			route('community');
		}

		if (this?.props?.communityVolunteers?.fetching) {
			return <LoaderRing fullpage />;
		}

		return (
			<div className={style.communityVolunteerContainer}>
				{/* Header with Message and Saved Listings */}

				<div className={style.volunteer}>
					{/* Be a Volunteer */}
					<div className={style.title}>
						<p>{getTranslation('COMMUNITY_BE_A_VOLUNTEER')}</p>
					</div>

					{/* Message And Saved Listings */}
					<div className={style.actionContainer}>
						<div className={style.button} onClick={() => route('messages')}>
							<ImageLoader
								src="assets/images/message_icon.png"
								style={{ container: style.iconDownload }}
							/>
							<p>Messages</p>
						</div>
					</div>
				</div>

				{/* Search Box and Filter*/}
				<div className={style.filters}>
					<div className={style.search}>
						<input
							value={this.state.search}
							name="communitySearch"
							placeholder="Search a Community"
							onInput={this.handleSearchByTitle}
						/>
						<ImageLoader
							src={'assets/images/magnifying_icon.png'}
							style={{ container: style.searchIcon }}
						/>
					</div>
				</div>

				{/* List */}
				<div className={style.communityVolunteerListing}>
					{/* Title */}
					<div className={style.title}>
						<p>{getTranslation('COMMUNITY_VOLUNTEER_TITLE')}</p>
					</div>

					{/* List */}
					<div className={style.list}>
						{communityData?.map((data) => {
							return (
								<div
									className={style.card}
									onClick={() => route(`message-chat/${data?.id}`)}
								>
									{/* Icon */}
									<div className={style.avatar}>
										<ImageLoader
											src={data?.img}
											style={{ container: style.icon }}
											lazy
										/>
									</div>

									{/* Information */}
									<div className={style.details}>
										<p className={style.communityTitle}>{data?.title}</p>
										<p>{data?.community}</p>
										<p>{format(new Date(data?.when), 'PPP')}</p>
										<p>{data?.location}</p>
										<p>
											{data?.noOfMembers} {getTranslation('KAKAMPINKS')}
										</p>
									</div>
								</div>
							);
						})}
					</div>
				</div>
			</div>
		);
	}
}

export default connect(['communityVolunteers'])(CommunityVolunteer);
