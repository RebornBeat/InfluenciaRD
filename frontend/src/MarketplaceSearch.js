import React, { Component } from 'react';
import './MarketplaceSearch.css';
import axios from 'axios';

export class DisplayFetch extends Component {
	
	render () {
		
		let userList = []
		
		for ( let i in this.props.data ) {
			if ( i !== "Logged" && i !== "seenIndexes" ) {
				console.log(i)
				userList.push(
					<div className="User_Container">
						<div className="User_Profile_Pic User_Child"></div>
						<div className="User_Name User_Child">{i}</div>
						<div className="User_Followers User_Child">{this.props.data[i].Followers}</div>
						<div className="User_Cost User_Child">${this.props.data[i].Cost}</div>
						<div className="User_Contact User_Child">
							<button>Contact</button>
						</div>
					</div>
				)
			}
		}
	
		
		return (
			<>
				{userList}
			</>
		)
		
	}
}


export default class MarketplaceSearch extends Component {
	constructor(props) {
		super(props);
		this.state = { data: "n/a", fetched: "", seenIndexes: [] };
	}
	
	componentDidMount() {
		{/* If user is not logged in then display a list of 5 random users else display 20 random users at a time */} 
		axios.post(`/initialSearch/`).then((res) =>  {
			this.setState({ data: res.data, fetched: true, seenIndexes: res.data.seenIndexes })
		}) 
	}
	
	render () {
		
		return (
			<div id="MarketplaceSearch_Container">
				<div id="InfluencerFilter_Container">
				 {/* If a filter is selected obtain all filters and fetch results based on filters */} 
				</div>
				<div id="InfluencerListing_Container">
				{/* Starting off display the top 5 influencers with the most views then display based on filters on ComponentMount*/} 
				{ this.state.fetched == true && <DisplayFetch parentCallback = {this.callbackFunction} data = {this.state.data} /> }
				</div>
			</div>
		);
		
	}
}
