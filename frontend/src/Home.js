import React, { Component } from 'react';
import './Home.css';
import Navbar from './Navbar';
import MarketplaceSearch from './MarketplaceSearch';

export default class Home extends Component {
	
	render () {
		
		return (
			<>
				<Navbar />
				<div id="Title_Container">
					<div id="Title_Wrapper">
						<span id="Title">Promociona tu negocio en segundos</span>
						<span>Pon tu negocio en la vista de mas de 1.6 millones de domincanos</span>
						<button>Crea Una Cuenta Gratis</button>
					</div>
				</div>
				<div id="marketplace_container">
					<div id="marketplace_title">
						<span>Buscar Influencias Locales</span>
					</div>
					<MarketplaceSearch />
					<div id="marketplace_button">
						<button>Registrate Para Ver Mas</button>
					</div>
				</div>
			</>
		);
		
	}
}
