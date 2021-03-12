import React, { Component } from 'react';
import './MarketplaceSearch.css';
import axios from 'axios';

export class DisplayFetch extends Component {
	
	render () {
		
		console.log(this.props.data)
		let userList = []
		
		for ( let i in this.props.data ) {
			userList.push(
				<div className="User_Container"></div>
			)
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
		this.state = { data: "n/a", fetched: "" };
	}
	
	componentDidMount() {
		axios.post(`/ran5/`).then((res) =>  {
			console.log(res.data)
			this.setState({ data: res.data, fetched: true })
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
