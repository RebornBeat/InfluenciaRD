import React, { Component } from 'react';
import './Home.css';
import Navbar from './Navbar';

export default class Home extends Component {
	
	render () {
		
		return (
			<>
				<Navbar />
				<div id="Title_Container">
					<div id="Title_Wrapper">
						<span id="Title">Promociona tu negocio en segundos</span>
						<span>Promociona tu negocio en segundos</span>
						<button>Crea Una Cuenta Gratis</button>
					</div>
				</div>
			</>
		);
		
	}
}
