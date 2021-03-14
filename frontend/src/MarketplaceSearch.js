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
						<div className="User_Profile_Pic_Container User_Child">
							<div className="Profile_Pic"></div>
						</div>
						<div className="User_Name User_Child">@{i}</div>
						<div className="User_Followers User_Child">{this.props.data[i].Followers}</div>
						<div className="User_Cost User_Child">${this.props.data[i].Cost}</div>
						<div className="User_Contact User_Child">
							<button>Contactar</button>
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
					<div id="Seguidores_Container">
						<div className="Seguidores_Costo_Title"># de seguidores</div>
						<div className="Section_Containers">
							<div className="Section_Content_Containers">0-500</div>
							<div className="Section_Content_Containers">501-5k</div>
							<div className="Section_Content_Containers">5k-20k</div>
						</div>
						<div className="Section_Containers">
							<div className="Section_Content_Containers">20k-50k</div>
							<div className="Section_Content_Containers">50k-100k</div>
							<div className="Section_Content_Containers">100k-500k</div>
						</div>
					</div>
					<div id="Interest_Container">
						<div id="Interest_Title">Interés</div>
						<div className="Section_Containers">
							<div className="Section_Content_Containers">Comida</div>
							<div className="Section_Content_Containers">Peliculas</div>
							<div className="Section_Content_Containers">Belleza</div>
						</div>
						<div className="Section_Containers">
							<div className="Section_Content_Containers">Autos</div>
							<div className="Section_Content_Containers">Deportes</div>
							<div className="Section_Content_Containers">Juegos</div>
						</div>
						<div className="Section_Containers">
							<div className="Section_Content_Containers"></div>
							<div className="Section_Content_Containers"></div>
							<div className="Section_Content_Containers"></div>
						</div>
						<div className="Section_Containers">
							<div className="Section_Content_Containers"></div>
							<div className="Section_Content_Containers"></div>
							<div className="Section_Content_Containers"></div>
						</div>
					</div>
					<div id="Costo_Container">
						<div className="Seguidores_Costo_Title">Costo</div>
						<div className="Section_Containers">
							<div className="Section_Content_Containers">
							</div>
							<div className="Section_Content_Containers">
							</div>
							<div className="Section_Content_Containers">
							</div>
						</div>
						<div className="Section_Containers">
							<div className="Section_Content_Containers">
							</div>
							<div className="Section_Content_Containers">
							</div>
							<div className="Section_Content_Containers">
							</div>
						</div>
					</div>
				</div>
				<div id="InfluencerListing_Container">
				{/* Starting off display the top 5 influencers with the most views then display based on filters on ComponentMount*/} 
				{ this.state.fetched == true && <DisplayFetch parentCallback = {this.callbackFunction} data = {this.state.data} /> }
				</div>
			</div>
		);
		
	}
}
