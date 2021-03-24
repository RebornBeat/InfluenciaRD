import React, { Component } from 'react';
import './Dashboard.css';
import MarketplaceSearch from './MarketplaceSearch';
import Messages from './Messages';

export default class Dashboard extends Component {
	constructor(props) {
	super(props);
	this.state = {component: "Home"};
	}
	
	callbackFunction = (componentName) => {
		this.setState({component: componentName});

	}
	
	onClick (e) {
		this.setState({component: e.target.innerHTML })
	}
	
	render () {
		
		return (
			<>
			
				{/* Check if the user is an Influencer or  Business  */} 
				<div id="Dashboard_Container">
					<div id="Main_Panel_Container">
						<div id="Logo_Container">
						</div>
						<div id="Panel_Container">
							<div id="Panel_Wrapper">
								<div className="Panel_Content" onClick={this.onClick.bind(this)} >Home</div>
								<div className="Panel_Content" onClick={this.onClick.bind(this)} >Messages</div>
								<div className="Panel_Content">Projects</div>
								<div className="Panel_Content">Settings</div>
							</div>
						</div>
					</div>
					<div id="Main_Container">
						<div id="Main_User_Container">
							<div id="Main_User_Wrapper">
								<div id="Main_User_Name">Bienvenidos, Christian Liz-Fonts</div>
								<div id="Main_User_Photo_Container">
									<div id="Main_User_Photo">
									</div>
								</div>
							</div>
						</div>
						<div id="Main_Information_Container">
							<div className="Information_Container" id="Project_Information">
								Proyectos Activos
								<br></br>
								0
							</div>
							<div className="Information_Container" id="Payment_Information">
								Total de Proyectos
								<br></br>
								0
							</div>
						</div>
						<div id="Main_Content_Container">
							{ this.state.component == "Home" && <MarketplaceSearch parentCallback = {this.callbackFunction} /> }
							{ this.state.component == "Messages" && <Messages parentCallback = {this.callbackFunction} /> }
						</div>
					</div>
				</div>
			</>
		);
		
	}
}