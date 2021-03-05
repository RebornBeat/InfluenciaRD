import React, { Component } from 'react';
import './Login.css';

export default class Login extends Component {
	constructor(props) {
	super(props);
	this.state = {component: "Portal", key: ""};
	}
	
	callbackFunction = (componentName) => {
		console.log(componentName)
		this.setState({component: componentName});

	}
	
	render () {
		
		return (
			<>
				<div id="Login_Overlay">
					<div id="Login_Container">
						<div id="Login__Title_Container">
							<span> Login </span>
						</div>
						<div id="Login_Info_Container">
							<input type="text" placeholder="E-mail"></input>
							<input type="text" placeholder="Password"></input>
						</div>
						<div id="Login_Links_Container">
							<span> Already registred?</span>
							<span> Forgot Password?</span>
						</div>
						<div id="Login__Button_Container">
							<button> Enter </button>
						</div>
					</div>
				</div>
			</>
		);
		
	}
}
