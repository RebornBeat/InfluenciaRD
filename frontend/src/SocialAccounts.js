import React, { Component } from 'react';
import axios from 'axios';
import './SocialAccounts.css';

export class SocialAccountsMain extends Component {
	
	constructor(props) {
	super(props);
	this.state = {activationCode: undefined};
	}
	
	
	copyBoard (e) {
		let textElement = e.target.parentElement.querySelector(".socialActivation_Link_Wrapper").innerHTML
		navigator.clipboard.writeText(textElement)
	}
	
	onClick (e) {
		this.props.parentCallback(e.target.innerHTML )
	}
	
	
	componentDidMount() {
		axios.post(`/socialActivation/`).then((res) =>  {
			this.setState({activationCode: res.data.activationCode})
		})
	}
	
	render () {
		
		return (
			<>
			
				{ this.props.component == "Home" && 
					<>
						<div id="socialAccounts_Title">Activa una Cuenta Social para Proceder</div>
						<div id="socialAccounts_Wrapper">
							<div className="socialAccounts_Platform_Container">
								<div className="socialAccounts_Platform_Wrapper" onClick={this.onClick.bind(this)}>
								Instagram
								</div>
								<div className="socialAccounts_Platform_Wrapper" onClick={this.onClick.bind(this)}>
								TikTok
								</div>
							</div>
							<div className="socialAccounts_Platform_Container">
								<div className="socialAccounts_Platform_Wrapper" onClick={this.onClick.bind(this)}>
								Youtube
								</div>
								<div className="socialAccounts_Platform_Wrapper" onClick={this.onClick.bind(this)}>
								Facebook
								</div>
							</div>
						</div>
					</>
				}
				
				{ this.props.component == "Instagram" && 
					<>
						<div id="socialAccounts_Title">Envie el Codigo de Verification a Nuestra Pagina</div>
						<div id="socialActivation_Wrapper">
							<div className="socialActivation_Content_Wrapper">
								<div className="socialActivation_Title_Wrapper">Link:</div>
								<div className="socialActivation_Link_Wrapper">https://www.instagram.com/</div>
								<div className="socialActivation_Copy_Wrapper" onClick={this.copyBoard.bind(this)}>Copiar</div>
							</div>
							<div className="socialActivation_Content_Wrapper">
								<div className="socialActivation_Title_Wrapper">Codigo:</div>
								<div className="socialActivation_Link_Wrapper">{this.state.activationCode}</div>
								<div className="socialActivation_Copy_Wrapper" onClick={this.copyBoard.bind(this)}>Copiar</div>
							</div>
						</div>
					</>
				}
				
				{ this.props.component == "TikTok" && 
					<>
						<div id="socialAccounts_Title">Envie el Codigo de Verification a Nuestra Pagina</div>
						<div id="socialActivation_Wrapper">
							<div className="socialActivation_Content_Wrapper">
								<div className="socialActivation_Title_Wrapper">Link:</div>
								<div className="socialActivation_Link_Wrapper">https://www.instagram.com/</div>
								<div className="socialActivation_Copy_Wrapper" onClick={this.copyBoard.bind(this)}>Copiar</div>
							</div>
							<div className="socialActivation_Content_Wrapper">
								<div className="socialActivation_Title_Wrapper">Codigo:</div>
								<div className="socialActivation_Link_Wrapper">{this.state.activationCode}</div>
								<div className="socialActivation_Copy_Wrapper" onClick={this.copyBoard.bind(this)}>Copiar</div>
							</div>
						</div>
					</>
				}
				
				{ this.props.component == "Youtube" && 
					<>
						<div id="socialAccounts_Title">Envie el Codigo de Verification a Nuestra Pagina</div>
						<div id="socialActivation_Wrapper">
							<div className="socialActivation_Content_Wrapper">
								<div className="socialActivation_Title_Wrapper">Link:</div>
								<div className="socialActivation_Link_Wrapper">https://www.instagram.com/</div>
								<div className="socialActivation_Copy_Wrapper" onClick={this.copyBoard.bind(this)}>Copiar</div>
							</div>
							<div className="socialActivation_Content_Wrapper">
								<div className="socialActivation_Title_Wrapper">Codigo:</div>
								<div className="socialActivation_Link_Wrapper" >{this.state.activationCode}</div>
								<div className="socialActivation_Copy_Wrapper" onClick={this.copyBoard.bind(this)}>Copiar</div>
							</div>
						</div>
					</>
				}
				
				{ this.props.component == "Facebook" && 
					<>
						<div id="socialAccounts_Title">Envie el Codigo de Verification a Nuestra Pagina</div>
						<div id="socialActivation_Wrapper">
							<div className="socialActivation_Content_Wrapper">
								<div className="socialActivation_Title_Wrapper">Link:</div>
								<div className="socialActivation_Link_Wrapper">https://www.instagram.com/</div>
								<div className="socialActivation_Copy_Wrapper" onClick={this.copyBoard.bind(this)}>Copiar</div>
							</div>
							<div className="socialActivation_Content_Wrapper">
								<div className="socialActivation_Title_Wrapper">Codigo:</div>
								<div className="socialActivation_Link_Wrapper">{this.state.activationCode}</div>
								<div className="socialActivation_Copy_Wrapper" onClick={this.copyBoard.bind(this)}>Copiar</div>
							</div>
						</div>
					</>
				}
				
			</>
		)
		
	}
	
	
}

export default class SocialAccounts extends Component {
	
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
				<div id="socialAccounts_Container">
					<SocialAccountsMain component = {this.state.component} parentCallback = {this.callbackFunction} />
				</div>
			</>
		);
		
	}
}