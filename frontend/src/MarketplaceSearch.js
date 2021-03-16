import React, { Component } from 'react';
import './MarketplaceSearch.css';
import axios from 'axios';

export class DisplayFetch extends Component {
	
	render () {
		
		let userList = []
		
		for ( let i in this.props.data ) {
			if ( i !== "Logged" && i !== "seenIndexes" ) {
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
			this.setState({ data: res.data, fetched: true, seenIndexes: res.data.seenIndexes, selectedFiltersFollowers: [], selectedFiltersInterest: [], selectedFiltersCost: [] })
		}) 
	}
	
	onClick (e) {
		{/* Check Section in which Event belongs to and if stored in state then remove else add and change CSS accordingly */} 

		let data = undefined

		if ( e.target.parentElement.className.includes('Follower_Filter') ) {
			
			if ( this.state.selectedFiltersFollowers.includes( e.target.innerHTML ) ) {
				let ExistingList = this.state.selectedFiltersFollowers
				let selectedIndex = ExistingList.indexOf(e.target.innerHTML)
				ExistingList.splice(selectedIndex, 1)
				e.target.style.background = "white"
				e.target.style.color = "black"
				data = { selectedFiltersFollowers: this.state.selectedFiltersFollowers, selectedFiltersInterest: this.state.selectedFiltersInterest, selectedFiltersCost: this.state.selectedFiltersCost}
			} else {
				let addList = [e.target.innerHTML]
				let newList = this.state.selectedFiltersFollowers.concat(addList)
				this.setState({selectedFiltersFollowers: newList })
				e.target.style.background = "#671FAE"
				e.target.style.color = "white"
				data = { selectedFiltersFollowers: newList, selectedFiltersInterest: this.state.selectedFiltersInterest, selectedFiltersCost: this.state.selectedFiltersCost}
			}
			
		}
		
		if ( e.target.parentElement.className.includes('Interest_Filter') ) {

			if ( this.state.selectedFiltersInterest.includes( e.target.innerHTML ) ) {
				let ExistingList = this.state.selectedFiltersInterest
				let selectedIndex = ExistingList.indexOf(e.target.innerHTML)
				ExistingList.splice(selectedIndex, 1)
				e.target.style.background = "white"
				e.target.style.color = "black"
				data = { selectedFiltersFollowers: this.state.selectedFiltersFollowers, selectedFiltersInterest: this.state.selectedFiltersInterest, selectedFiltersCost: this.state.selectedFiltersCost}
			} else {
				let addList = [e.target.innerHTML]
				let newList = this.state.selectedFiltersInterest.concat(addList)
				this.setState({selectedFiltersInterest: newList })
				e.target.style.background = "#671FAE"
				e.target.style.color = "white"
				data = { selectedFiltersFollowers: this.state.selectedFiltersFollowers, selectedFiltersInterest: newList, selectedFiltersCost: this.state.selectedFiltersCost}
			}
			
		}
		
		if ( e.target.parentElement.className.includes('Cost_Filter') ) {

			if ( this.state.selectedFiltersCost.includes( e.target.innerHTML ) ) {
				let ExistingList = this.state.selectedFiltersCost
				let selectedIndex = ExistingList.indexOf(e.target.innerHTML)
				ExistingList.splice(selectedIndex, 1)
				e.target.style.background = "white"
				e.target.style.color = "black"
				data = { selectedFiltersFollowers: this.state.selectedFiltersFollowers, selectedFiltersInterest: this.state.selectedFiltersInterest, selectedFiltersCost: this.state.selectedFiltersCost}
			} else {
				let addList = [e.target.innerHTML]
				let newList = this.state.selectedFiltersCost.concat(addList)
				this.setState({selectedFiltersCost: newList })
				e.target.style.background = "#671FAE"
				e.target.style.color = "white"
				data = { selectedFiltersFollowers: this.state.selectedFiltersFollowers, selectedFiltersInterest: this.state.selectedFiltersInterest, selectedFiltersCost: newList}
			}
			
		}
		
		axios.post(`/filteredSearch/`, { data }).then((res) =>  {
		}) 
	}
	
	render () {
		
		return (
			<div id="MarketplaceSearch_Container">
				<div id="InfluencerFilter_Container">
				 {/* If a filter is selected obtain all filters and fetch results based on filters */} 
					<div id="Seguidores_Container">
						<div className="Seguidores_Costo_Title"># de seguidores</div>
						<div className="Section_Containers Follower_Filter">
							<div className="Section_Content_Containers" onClick={this.onClick.bind(this)}>0-500</div>
							<div className="Section_Content_Containers" onClick={this.onClick.bind(this)}>501-5k</div>
							<div className="Section_Content_Containers" onClick={this.onClick.bind(this)}>5k-20k</div>
						</div>
						<div className="Section_Containers Follower_Filter">
							<div className="Section_Content_Containers" onClick={this.onClick.bind(this)}>20k-50k</div>
							<div className="Section_Content_Containers" onClick={this.onClick.bind(this)}>50k-100k</div>
							<div className="Section_Content_Containers" onClick={this.onClick.bind(this)}>100k-500k</div>
						</div>
					</div>
					<div id="Interest_Container">
						<div id="Interest_Title">Interés</div>
						<div className="Section_Containers Interest_Filter">
							<div className="Section_Content_Containers" onClick={this.onClick.bind(this)}>Comida</div>
							<div className="Section_Content_Containers" onClick={this.onClick.bind(this)}>Peliculas</div>
							<div className="Section_Content_Containers" onClick={this.onClick.bind(this)}>Belleza</div>
						</div>
						<div className="Section_Containers Interest_Filter">
							<div className="Section_Content_Containers" onClick={this.onClick.bind(this)}>Autos</div>
							<div className="Section_Content_Containers" onClick={this.onClick.bind(this)}>Deportes</div>
							<div className="Section_Content_Containers" onClick={this.onClick.bind(this)}>Juegos</div>
						</div>
						<div className="Section_Containers Interest_Filter">
							<div className="Section_Content_Containers" onClick={this.onClick.bind(this)}>Viajes</div>
							<div className="Section_Content_Containers" onClick={this.onClick.bind(this)}>Moda</div>
							<div className="Section_Content_Containers" onClick={this.onClick.bind(this)}>Salud</div>
						</div>
						<div className="Section_Containers Interest_Filter">
							<div className="Section_Content_Containers" onClick={this.onClick.bind(this)}>Crianza</div>
							<div className="Section_Content_Containers" onClick={this.onClick.bind(this)}>Negocio</div>
							<div className="Section_Content_Containers" onClick={this.onClick.bind(this)}>Fotografía</div>
						</div>
					</div>
					<div id="Costo_Container">
						<div className="Seguidores_Costo_Title">Costo</div>
						<div className="Section_Containers Cost_Filter">
							<div className="Section_Content_Containers">
							</div>
							<div className="Section_Content_Containers">
							</div>
							<div className="Section_Content_Containers">
							</div>
						</div>
						<div className="Section_Containers Cost_Filter">
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
