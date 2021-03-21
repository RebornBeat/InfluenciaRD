import React, { Component } from 'react';
import './Controller.css';
import Home from './Home';
import Dashboard from './Dashboard';

export default class Controller extends Component {
	constructor(props) {
	super(props);
	this.state = {component: "Home"};
	}
	
	callbackFunction = (componentName) => {
		this.setState({component: componentName});

	}
	
	render () {
		
		return (
			<>
				{ this.state.component == "Home" && <Home parentCallback = {this.callbackFunction} /> }
				{ this.state.component == "Dashboard" && <Dashboard parentCallback = {this.callbackFunction} /> }
			</>
		);
		
	}
}
