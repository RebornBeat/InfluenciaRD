import React, { Component } from 'react';
import './Error.css';

export default class Error extends Component {
	
	render () {
		
		return (
			<>
					<div id="Error_Container">
						<span>{this.props.ErrorMsg}</span>
					</div>
			</>
		);
		
	}
}
