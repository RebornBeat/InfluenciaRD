import React, { Component } from 'react';
import './Dashboard.css';
import MarketplaceSearch from './MarketplaceSearch';
import Messages from './Messages';
import SocialAccounts from './SocialAccounts';

export default class Dashboard extends Component {
	constructor(props) {
	super(props);
	this.state = {component: "Home", convoID: "", componentDiv: ""};
	}
	
	componentDidMount() {
		{/* If false, setComponent to activateSocial and display steps for activation*/} 
		if ( this.props.socialActivated === false ) {
			this.setState({component: "activateSocial"});
		}
	}
	
	callbackFunction = (componentName, Extra) => {
		this.setState({component: componentName, convoID: Extra});

	}
	
	onClick (e) {
		
		console.log(e.target)
		
		if ( this.state.componentDiv !== e.target) {
			
			if ( this.state.componentDiv !== "" ) {
				this.state.componentDiv.style.background = "white"
				this.state.componentDiv.style.color = "black"
			}
			
			e.target.style.background = "#6C00F6"
			e.target.style.color = "white"
			
			this.setState({componentDiv: e.target})
			
		}
		
		this.setState({component: e.target.innerHTML, convoID: ""})
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
							{ this.state.component == "Messages" && <Messages parentCallback = {this.callbackFunction} convoID = {this.state.convoID} /> }
							{ this.state.component == "activateSocial" && <SocialAccounts parentCallback = {this.callbackFunction} /> }
						</div>
					</div>
				</div>
			</>
		);
		
	}
}