import React, { Component } from 'react';
import './Navbar.css';

export default class Navbar extends Component {
	
	onClick (e) {
		this.props.parentCallback("Login");
	}
	
	render () {
		
		return (
			<div id="Nav_Container">
				<div id="logo"></div>
				<div id="nav_wrapper">
					<span> Eres Influnencer?</span>
					<button onClick={ this.onClick.bind(this) } >Portal</button>
				</div>
			</div>
		);
		
	}
}
