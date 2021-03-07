import React, { Component } from 'react';
import axios from 'axios';
import './Login.css';

export default class Login extends Component {
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
					console.log(res.data.details)
				} else {
					this.props.parentCallback("Home");
				}
			});
		}
		
		if ( e.target.id === "Login_Register" ) {
			console.log("Register")
			this.props.parentCallback("Register");
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
							<span> Login </span>
						</div>
						<div id="Login_Info_Container">
							<input type="text" id="Email_Input" placeholder="E-mail" onChange={this.handleChange.bind(this)} ></input>
							<input type="text" id="Password_Input" placeholder="Password" onChange={this.handleChange.bind(this)} ></input>
						</div>
						<div id="Login_Links_Container">
							<span>Forgot Password?</span>
						</div>
						<div id="Login__Button_Container">
							<button id="Login_Submit" onClick={this.onClick.bind(this)} > Enter </button>
							<button id="Login_Register" onClick={this.onClick.bind(this)}> Register </button>
						</div>
					</div>
				</div>
			</>
		);
		
	}
}
