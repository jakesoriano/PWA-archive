import React, { Component } from 'react';
import { connect } from 'unistore/preact';
import { ImageLoader } from '_components/core';
import { fetchCommunityVolunteers } from '_mutations';
import { getTranslation, isUserUpdatedProfile, dateNewsFormat } from '_helpers';
import style from './style';
import { route } from 'preact-router';
import { LoaderRing } from '_components/core';

class CommunityVolunteer extends Component {
	constructor(props) {
		super(props);
		this.initialState = {
			search: this.props?.communityVolunteers?.filter || '',
			data: [],
		};
		this.state = this.initialState;
	}

	componentDidMount = () => {
		// fetch community volunteers
		fetchCommunityVolunteers(this?.state?.search);

		this.setState({
			data: this?.props?.communityVolunteers?.data,
			moreFetching: false,
		});
	};

	componentDidUpdate = (prevProps, prevState) => {
		if (
			prevProps?.communityVolunteers?.data !==
				this.props.communityVolunteers?.data ||
			prevState?.search !== this.state.search
		) {
			this.setState({
				data: this?.props?.communityVolunteers?.data,
				moreFetching: false,
			});
		}
	};

	handleSearchByTitle = (e) => {
		clearTimeout(this.timer);
		this.timer = setTimeout(() => {
			fetchCommunityVolunteers(e.target.value || '');
			this.setState({
				search: e.target.value,
			});
		}, 500);
	};

	isOwnData = (data) => {
		return data?.userId === this.props.authUser?.profile?._id;
	};	

	handleShowMore = () => {
		if (!this.state.moreFetching) {
			// flag
			this.setState({
				moreFetching: true,
			});
			// fetch
			fetchCommunityVolunteers(
				this.state?.search,
				this?.props?.communityVolunteers?.page + 1
			);
		}
	};

	onListingClicked = (data) => {
		if(this.isOwnData(data)) {
			route(`messages`);
		} else {
			let feedId = [data?.userId, this.props.authUser?.profile?._id, data?.id].sort().join(':');
			route(`${this.props.page}/messages-chat?feedId=${feedId}&listingId=${data.id}`);
		}
	}

	render() {
		// filtering community data
		const filteredData = this.state?.data?.sort((a,b) => b?.postedDate - a?.postedDate)
		const communityData = filteredData.filter((data) => {
			const communityToLower = data?.community?.name?.toLowerCase();
			return communityToLower?.includes(
				this?.state?.search?.toLowerCase()
			);
		});

		if (!isUserUpdatedProfile()) {
			route('community');
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
									className={`${style.card} ${this.isOwnData(data) ? style.ownData : ''}`}
									onClick={() => { this.onListingClicked(data) }}
								>
									{/* Icon */}
									<div className={style.avatar}>
										<ImageLoader
											src={data?.community?.image}
											style={{ container: style.icon }}
											lazy
										/>
									</div>

									{/* Information */}
									<div className={style.details}>
										<p className={style.communityTitle}>
											{data?.community?.name}
										</p>
										<p>{data?.needs}</p>
										<p>{dateNewsFormat(data?.date)}</p>
										<p>
										{data?.province}, {data?.barangay} {data?.municipality} 
										</p>
										<p>
											{data?.noOfVolunteers} {getTranslation('KAKAMPINKS')}
										</p>
									</div>
								</div>
							);
						})}

						{this.state?.data.length < this.props.communityVolunteers?.total &&
							!this?.props?.communityVolunteers?.fetching && (
								<button
									className={style.showMore}
									onClick={this.handleShowMore}
								>
									<span>
										<span>&#8659;</span> {getTranslation('SHOW_MORE')}
									</span>
								</button>
							)}

						{this.state.moreFetching && (
							<LoaderRing styles={{ container: style.loaderWrap }} />
						)}
					</div>
				</div>
			</div>
		);
	}
}

export default connect(['communityVolunteers', 'authUser'])(CommunityVolunteer);
