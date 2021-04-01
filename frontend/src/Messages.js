import React, { Component } from 'react';
import './Messages.css';
import axios from 'axios';

export default class Messages extends Component {
	constructor(props) {
	super(props);
	this.state = {Conversations: "", Messages: "", User: ""};
	}
	
	componentDidMount() {
		
		{/* Fetech All Conversatins*/} 
		axios.post(`/conversationFetch/`).then((res) =>  {
			this.setState({User: res.data.convo["user"]})
			delete res.data.convo["user"]
			this.setState({Conversations: res.data.convo})
		}) 
		
	}
	
	render () {
		
		return (
			<>
				<div id="Message_Information_Container">
					<div className="Message_Information_Wrapper"></div>
					<div className="Message_Information_Wrapper"></div>
					<div className="Message_Information_Wrapper"></div>
					<div className="Message_Information_Wrapper"></div>
					<div className="Message_Information_Wrapper"></div>
					<div className="Message_Information_Wrapper"></div>
				</div>
				<div id="Message_Content_Container">
					<div className="MessageWrapper"></div>
					<div className="MessageWrapper"></div>
					<div className="MessageWrapper"></div>
					<div className="MessageWrapper"></div>
					<div className="MessageWrapper"></div>
					<div className="MessageWrapper"></div>
					<div className="MessageWrapper"></div>
					<div className="MessageWrapper"></div>
				</div>
			</>
		);
		
	}
}