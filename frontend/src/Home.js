import React, { Component } from 'react';
import './Home.css';
import Navbar from './Navbar';
import Login from './Login';
import Register from './Register';
import MarketplaceSearch from './MarketplaceSearch';

export default class Home extends Component {
	constructor(props) {
	super(props);
	this.state = {component: "Home", key: ""};
	}
	
	callbackFunction = (componentName, returnedStatus) => {
		
		if ( returnedStatus === "Accepted") {
			this.props.parentCallback(componentName);
		} else {
			this.setState({component: componentName});
		}
		

	}
	
	render () {
		
		return (
			<>
				{/* If portal button clickled in navbar present portal login */} 
				<Navbar parentCallback = {this.callbackFunction} />
				<div id="Title_Container">
					<div id="Title_Wrapper">
						<span id="Title">Promociona tu negocio en segundos</span>
						<span>Pon tu negocio en la vista de mas de 1.6 millones de domincanos</span>
						{/* If button clickled in present portal login*/} 
						<button> Crea Una Cuenta Gratis</button>
					</div>
				</div>
				<div id="marketplace_container">
					<div id="marketplace_title">
						<span>Buscar Influencias Locales</span>
					</div>
					<MarketplaceSearch />
					<div id="marketplace_button">
						{/* If button clickled in present portal login*/} 
						<button>Registrate Para Ver Mas</button>
					</div>
				</div>
				{ this.state.component == "Login" && <Login parentCallback = {this.callbackFunction} /> }
				{ this.state.component == "Register" && <Register parentCallback = {this.callbackFunction} /> }
			</>
		);
		
	}
}
