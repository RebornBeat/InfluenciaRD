import React, { Component } from 'react';
import './Dashboard.css';
import MarketplaceSearch from './MarketplaceSearch';

export default class Dashboard extends Component {
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
			
				{/* Check if the user is an Influencer or  Business  */} 
				<div id="Dashboard_Container">
					<div id="Panel_Container">
					</div>
					<div id="Main_Container">
						<div id="Main_User_Container">
						</div>
						<div id="Main_Information_Container">
							<div className="Information_Container" id="Project_Information">
								Proyectos
								<br></br>
								0
							</div>
							<div className="Information_Container" id="Payment_Information">
								Proyectos
								<br></br>
								0
							</div>
						</div>
						<div id="Main_Content_Container">
							<MarketplaceSearch />
						</div>
					</div>
				</div>
			</>
		);
		
	}
}