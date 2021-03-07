import React, { Component } from 'react';
import axios from 'axios';
import './Login.css';

export default class Register extends Component {
	constructor(props) {
	super(props);
	this.state = { Email: "", Password: ""};
	}
	
	
	handleChange (e) {
	
		if ( e.target.id === "Email_Input" ) {
			this.setState({Email: e.target.value})
		}
		
		if ( e.target.id === "Password_Input" ) {
			this.setState({Password: e.target.value})
		}
		
	}
	
	onClick (e) {
		if ( e.target.id === "Login_Exit" ) {
			this.props.parentCallback("Home");
		}
		
		if ( e.target.id === "Login_Submit" ) {
			let data = { Email: this.state.Email, Pass: this.state.Password }
			axios.post(`/login/`, { data }).then((res) =>  {
				if ( res.data.details != "accepted" ){
					
				} else {
					this.props.parentCallback("Home");
				}
			});
		}

		if ( e.target.id === "Register_Login" ) {
			this.props.parentCallback("Login");
		}
		
	}
	
	render () {
		
		return (
			<>
				<div id="Login_Overlay">
					<div id="Login_Container">
						<div id="Login__Title_Container">
							{/* If exit button clicked exit out of login display */} 
							<span id="Login_Exit" className="exit" onClick={this.onClick.bind(this)} ></span>
							<span> Register </span>
						</div>
						<div id="Login_Info_Container">
							<input type="text" id="Email_Input" placeholder="E-mail" onChange={this.handleChange.bind(this)} ></input>
							<input type="text" id="Full Name" placeholder="Full Name" onChange={this.handleChange.bind(this)} ></input>
							<input type="text" id="Password_Input" placeholder="Password" onChange={this.handleChange.bind(this)} ></input>
							<input type="text" id="RePassword_Input" placeholder="Retype Password" onChange={this.handleChange.bind(this)} ></input>
						</div>
						<div id="Register__Button_Container">
							<button id="Register_Submit" onClick={this.onClick.bind(this)} > Enter </button>
							<button id="Register_Login" onClick={this.onClick.bind(this)}> Login </button>
						</div>
					</div>
				</div>
			</>
		);
		
	}
}
