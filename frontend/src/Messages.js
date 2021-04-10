import React, { Component } from 'react';
import './Messages.css';
import axios from 'axios';

export class ConvoDisplay extends Component {
	
	constructor(props) {
	super(props);
	this.state = {convoDiv: "", mountedID: "", topPOS: ""};
	}
	
	componentDidUpdate() {
		
		if ( this.props.mountedID !== undefined ) {

			if ( this.state.mountedID === "" ) {
				let mountedDiv = document.getElementById(this.props.mountedID);

				if ( mountedDiv !== null ) {
					let topPos = mountedDiv.offsetTop;
					this.setState({convoDiv: mountedDiv, mountedID: this.props.mountedID, topPOS: topPos})
				}
				
			}
			
		}
		
		if ( this.state.convoDiv !== "" ) {
			
			if ( this.state.topPOS !== "" ) {
				console.log(this.state.topPOS)
				let topValue = this.state.topPOS - 10
				document.getElementById('Message_Information_Container').scrollTop = topValue;
			}
			
			this.state.convoDiv.style.background = "#6C00F6"
			this.state.convoDiv.style.color = "white"
		}
	}
	
	onClick (e) {
		
		let convoID = undefined
		let parentDiv = undefined
		
		if ( e.target.parentElement.id === "" ) {
			convoID = e.target.parentElement.parentElement.id
			parentDiv = e.target.parentElement.parentElement
		} else {
			convoID = e.target.parentElement.id
			parentDiv = e.target.parentElement
		}
		
		if ( convoID !== this.props.convoID ) {
			
			if ( this.state.convoDiv !== "" ) {
				this.state.convoDiv.style.background = "white"
				this.state.convoDiv.style.color = "black"
			}
			
			this.setState({convoDiv: parentDiv, topPOS: ""})
			
			let data = { id: convoID }
			
			axios.post(`/messageFetch/`, data).then((res) =>  {
				this.props.parentCallback(res.data["data"], convoID)
			}) 
			
		}
		
	}
	
	render () {
		
		let convoList = []
		
		if ( Object.keys(this.props.Convos).length > 0 )  {
			
			for ( let i in this.props.Convos ) {
				
				let profileLink = 'http://127.0.0.1:8000/media/' + this.props.Convos[i].profilePic
				
				convoList.push(
					<div className="Message_Information_Wrapper" id={i} onClick={this.onClick.bind(this)}>
						<div className="Convo_Child">
							<img className="Convo_Pic" src={profileLink}></img>
						</div>
						<div className="Convo_Child">
							<div className="Convo_Child_Text">
								{this.props.Convos[i].messageContent}
							</div>
						</div>
						<div className="Convo_Child Last_Message_Time">{this.props.Convos[i].messageTime}</div>
					</div>
				)
				
			}
			
		} else {
			console.log(Object.keys(this.props.Convos).length)
		}
			
		
		return (
		
			<>
				{convoList}
			</>
			
		)
	}
	
}

export class MessageDisplay extends Component {
	
	constructor(props) {
	super(props);
	this.state = {ChatText: ""};
	}
	
	onClick (e) {
		let data = { UserID: this.props.userID, Chat: this.state.ChatText, convoID: this.props.convoID }
		
		axios.post(`/messageSend/`, data).then((res) =>  {
			
			let data = { id: this.props.convoID }
			
			axios.post(`/messageFetch/`, data).then((res) =>  {
				this.props.parentCallback(res.data["data"], this.props.convoID )
			}) 
			
		}) 
	}
	
	handleChange (e) {
		this.setState({ChatText: e.target.value})
	}
	
	render () {
		
		let msgList = []
		
		if ( Object.keys(this.props.Msgs).length > 0 )  {
			
			for ( let i in this.props.Msgs ) {
				
				if ( this.props.Msgs[i]["owner"] === this.props.userID ) {
				
					msgList.push(
						<div className="MessageWrapper MessageWrapper_Receiver">
							<div className="Message_Wrapper_Container">
								<div className="Message_Wrapper_Content">{this.props.Msgs[i]["msg_content"]}</div>
								<div className="Message_Time_Wrapper">{this.props.Msgs[i]["created_at"]}</div>
							</div>
						</div>
					)
					
				} else {
					
					msgList.push(
						<div className="MessageWrapper">
							<div className="Message_Wrapper_Container">
								<div className="Message_Time_Wrapper">{this.props.Msgs[i]["created_at"]}</div>
								<div className="Message_Wrapper_Content">{this.props.Msgs[i]["msg_content"]}</div>
							</div>
						</div>
					)
					
				}
			}
			
		}
		
		return (
			<>
				{msgList}
				<div id="Message_Chat_Wrapper">
					<input type="text" id="Chat_Input" placeholder="Send A Message" onChange={this.handleChange.bind(this)} ></input>
					<div id="Chat_Send" onClick={this.onClick.bind(this)} ></div>
				</div>
			</>
		)

	}
}

export default class Messages extends Component {
	constructor(props) {
	super(props);
	this.state = {Conversations: "", Messages: "", User: "", convoID: "", MountedID: ""};
	}
	
	componentDidMount() {
		
		{/* Fetech All Conversatins*/} 
		axios.post(`/conversationFetch/`).then((res) =>  {
			this.setState({User: res.data.convo["user"]})
			delete res.data.convo["user"]
			this.setState({Conversations: res.data.convo})
		}) 
		
		{/* if props isnt blank then highlight passed convoID */}  
		if ( this.props.convoID !== "" ) {
		
			let data = { id: this.props.convoID }
			
			axios.post(`/messageFetch/`, data).then((res) =>  {
				this.setState({Messages: res.data["data"], convoID: this.props.convoID, mountedID: this.props.convoID});
			}) 
			
		}
		
	}
	
	callbackFunction = (data, ID) => {
		this.setState({Messages: data, convoID: ID});
		
		axios.post(`/conversationFetch/`).then((res) =>  {
			delete res.data.convo["user"]
			this.setState({Conversations: res.data.convo})
		})
		
	}
	
	render () {
		
		return (
			<>
				<div id="Message_Information_Container">
					<ConvoDisplay Convos = {this.state.Conversations} parentCallback = {this.callbackFunction} mountedID = {this.state.mountedID} />
				</div>
				<div id="Message_Content_Container">
					<div id="Message_Outer_Wrapper">
						{ this.state.Messages !== "" && <MessageDisplay Msgs = {this.state.Messages} userID = {this.state.User} convoID = {this.state.convoID} parentCallback = {this.callbackFunction} /> }
						{ this.state.Messages === "" && <div id="Message_No_Selection">No Conversation Selected</div> }
					</div>
				</div>
			</>
		);
		
	}
}