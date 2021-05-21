import React, { Component } from 'react';
import './Options.css';
import axios from 'axios';

export default class OptionsController extends Component {
	
	constructor(props) {
		super(props);
		this.state = {Function: ""};
	}
	
	callbackFunction = (action) => {
		
		this.setState({Function:action})
		
	}
	
	onClick (e) {
		this.props.parentCallback(undefined, undefined, undefined)
	}
	
	
	render () {
		
		return (
		
			<div id="Message_Information_Overlay">
				<span id="Login_Exit" className="exit" onClick={this.onClick.bind(this)} ></span>
				{ this.state.Function === "" && <OptionsDisplay parentCallback = {this.callbackFunction} />}
				{ this.state.Function === "Order" && <OrderDisplay parentCallback = {this.callbackFunction} />}
				
			</div> 
			
		)

	}
}

export class OptionsDisplay extends Component {
	
	constructor(props) {
		super(props);
		this.state = {};
	}
	
	onClick (e) {
		
		if ( e.currentTarget.id === "Message_Order_Container" ) {
			this.props.parentCallback("Order")
		}

	}
	
	
	render () {
		
		return (
			<>
				<div id="Message_Order_Container" className="Message_Information_Overlay_Container" onClick={this.onClick.bind(this)}> 
					<span> Crear Orden </span>
				</div>
				<div className="Message_Information_Overlay_Container"> 
					<span> Reportar </span>
				</div>
			</> 
			
		)

	}
}

export class OrderDisplay extends Component {
	
	constructor(props) {
		super(props);
		this.state = {Function: ""};
	}
	
	callbackFunction = (action) => {
		
		this.setState({Function:action})
		
	}
	
	
	render () {
		
		return (
		
			<>
				<div id="OrderDisplay_Container">
					{ this.state.Function === "" && <OrderRequirements parentCallback = {this.callbackFunction} />}
				</div>
			</> 
			
		)

	}
}

export class OrderRequirements extends Component {
	
	constructor(props) {
		super(props);
		this.state = {Details: ""};
		this.fileUpload = React.createRef();
	}
	
	onClick (e) {
		
		if ( e.currentTarget.id === "file_wrapper" ) {
			this.fileUpload.current.click();
		}
	}
	
	handleKeyPress (e) {
		
		if ( e.key === 'Enter') {
			
			if ( e.currentTarget.id === "hashtag_input" ) {
				this.state.Hashtags.push(e.currentTarget.value)
				e.currentTarget.value = "";
			}
			
		}
	}
	
	handleChange (e) {
		
		if ( e.currentTarget.id === "details_text") {
			this.setState({Details: e.currentTarget.value})
		}
		
		
		console.log(this.state.Hashtags)
		
	}
	
	render () {
		
		return (
		
			<>
				<div className="Options_Title_Wrapper"> 
					<span>Presentar requisitos </span>
				</div>
				<div id="detail_container" className="Option_Information_Container" >
					<span> Detalles del proyecto: </span>
					<textarea id="details_text"placeholder="Describe el contenido que el influencer va a presentar , sea lo más claro posible." onChange={this.handleChange.bind(this)} />
				</div>
				<div id="file_container" className="Option_Information_Container" >
					<div id="file_wrapper" onClick={this.onClick.bind(this)}>
						<input type="file" multiple ref={this.fileUpload}/>
						<span> Subir archivos </span>
					</div>
					<span id="file_link"> Mostrar archivos </span>
				</div>
				<div id="Options_Next_Button"> 
					<span> Siguiente </span>
				</div>
			</> 
			
		)

	}
}