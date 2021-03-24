import React, { Component } from 'react';
import './Messages.css';

export default class Messages extends Component {
	
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