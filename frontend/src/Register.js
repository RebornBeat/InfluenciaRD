import React, { Component } from 'react';
import axios from 'axios';
import './Register.css';
import Error from './Error';

export default class Register extends Component {
	constructor(props) {
	super(props);
	this.state = { Email: "", Account_Type: "", Password: "", RePassword: "", Error: ""};
	}
	
	
	handleChange (e) {
	
		if ( e.currentTarget.id === "Email_Input" ) {
			this.setState({Email: e.currentTarget.value})
		}
		
		if ( e.currentTarget.id === "Account_Type" ) {
			console.log(e.currentTarget.value)
			this.setState({Account_Type: e.currentTarget.value})
		}
		
		if ( e.currentTarget.id === "Password_Input" ) {
			this.setState({Password: e.currentTarget.value})
		}
		
		if ( e.currentTarget.id === "RePassword_Input" ) {
			this.setState({RePassword: e.currentTarget.value})
		}
		
	}
	
	onClick (e) {
		if ( e.target.id === "Register_Exit" ) {
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
				<div id="Register_Overlay">
					{ this.state.Error != "" && <Error ErrorMsg = {this.state.Error} /> }
					<div id="Register_Container">
						<div id="Register__Title_Container">
							{/* If exit button clicked exit out of Register display */} 
							<span id="Register_Exit" className="exit" onClick={this.onClick.bind(this)} ></span>
							<div id="Portal_Title_Wrapper">
								<span> Registrarse </span>
							</div>
						</div>
						<div id="Register_Info_Container">
							<input type="text" id="Email_Input" placeholder="Correo electrónico" onChange={this.handleChange.bind(this)} ></input>
							<select id="Account_Type" onChange={this.handleChange.bind(this)} >
								<option value="default">Tipo de Cuenta</option>
								<option value="influencer">Influencer</option>
								<option value="brand">Marca</option>
							</select>
							<input type="text" id="Password_Input" placeholder="Contraseña" onChange={this.handleChange.bind(this)} ></input>
							<input type="text" id="RePassword_Input" placeholder="Vuelva a escribir la contraseña" onChange={this.handleChange.bind(this)} ></input>
						</div>
						<div id="Register__Button_Container">
							<button id="Register_Submit" onClick={this.onClick.bind(this)} > Ingresar </button>
							<button id="Register_Login" onClick={this.onClick.bind(this)}> Acceso </button>
						</div>
					</div>
				</div>
			</>
		);
		
	}
}
