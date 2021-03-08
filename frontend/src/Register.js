import React, { Component } from 'react';
import axios from 'axios';
import './Login.css';
import Error from './Error';

export default class Register extends Component {
	constructor(props) {
	super(props);
	this.state = { Email: "", FName: "", Password: "", RePassword: "", Error: ""};
	}
	
	
	handleChange (e) {
	
		if ( e.target.id === "Email_Input" ) {
			this.setState({Email: e.target.value})
		}
		
		if ( e.target.id === "FName" ) {
			this.setState({FName: e.target.value})
		}
		
		if ( e.target.id === "Password_Input" ) {
			this.setState({Password: e.target.value})
		}
		
		if ( e.target.id === "RePassword_Input" ) {
			this.setState({RePassword: e.target.value})
		}
		
	}
	
	onClick (e) {
		if ( e.target.id === "Login_Exit" ) {
			this.props.parentCallback("Home");
		}
		
		if ( e.target.id === "Register_Submit" ) {
			let data = { Email: this.state.Email, Pass: this.state.Password, rePass: this.state.RePassword}
			axios.post(`/register/`, { data }).then((res) =>  {
				if ( res.data.details != "accepted" ){
					this.setState({Error: res.data.details})
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
					{ this.state.Error != "" && <Error ErrorMsg = {this.state.Error} /> }
					<div id="Login_Container">
						<div id="Login__Title_Container">
							{/* If exit button clicked exit out of login display */} 
							<span id="Login_Exit" className="exit" onClick={this.onClick.bind(this)} ></span>
							<span> Register </span>
						</div>
						<div id="Login_Info_Container">
							<input type="text" id="Email_Input" placeholder="E-mail" onChange={this.handleChange.bind(this)} ></input>
							<input type="text" id="FName" placeholder="Full Name" onChange={this.handleChange.bind(this)} ></input>
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
