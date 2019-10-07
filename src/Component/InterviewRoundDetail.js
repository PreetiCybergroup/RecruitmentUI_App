import React, { Component } from 'react';
import axious from 'axios'



export default class InterviewRound extends Component {
    constructor() {
        super()
        this.state = {
            value: "",
            selected: "",
            interviewerList: [],
            isLoading: true,
            feedback: "",
            interviewer: "",
            interviewRound: ""
        };
    }


    onRoundChanged = (event) => 
    {
        this.setState({ [event.target.name]: event.target.value });
    }

    addInterviewRound = (event) => 
    {
        event.preventDefault();
        this.postData();
    }

    async postData()
      {
        fetch('http://localhost:59599/api/InterviewRound/',{
            method: 'post',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify( {'interviewProcessId': this.params.interviewProcessId,
            'interviewerId': this.state.interviewer,
            'interviewRoundId': this.state.interviewRound,
            'feedbackId': this.state.feedback,
            })
        });
      }

   componentDidMount() {
        const { match: { params } } = this.props;
        this.params = params;
        axious.get('http://localhost:59599/api/Interviewer')
            .then(response => this.setState(
                {
                    interviewerList: response.data.interviewerlist,
                    isLoading: false,
                    body: JSON.stringify({
                        'interviewProcessId': this.params.interviewProcessId
                    })
                }));
    }


    render() {
        //this.getInterviewer();
        return (
            <div>
                <label className="Select Interviewer">Select Interviewer</label>
                {(!this.state.isLoading) ? (
                    <select className="custom-select" name="interviewer" onChange={this.onRoundChanged}>
                        <option value=" 0">None</option>
                        {this.state.interviewerList.map((e, key) => {
                            return <option key={key} value={e.id}>{e.name}</option>;
                        })}
                    </select>) : (<p></p>)}
                <label className="Select Interview Round">Select Interview Round </label>
                <select className="custom-select" name="interviewRound" onChange={this.onRoundChanged}>
                    <option value= "0">None</option>
                    <option value= "1">Telephonic</option>
                    <option value= "2">GroupDiscussion</option>
                    <option value= "3">1-Technical</option>
                    <option value= "4">2-Technical</option>
                    <option value= "5">HR</option>
                    <option value= "6">Additional</option>
                </select>
                <br />
                <br />
                <label className="Select Feedback">Select Feedback </label>
                <select className="custom-select" name="feedback" onChange={this.onRoundChanged}>
                    <option value= "1">None </option>
                    <option value= "2">2-Technical</option>
                    <option value= "3">3-Technical</option>
                    <option value= "4">Selected</option>
                    <option value= "5">Rejected</option>
                    <option value= "6">Additional</option>
                </select>
                <br />
                <br />
                <button className="StartInterviewRound" onClick={this.addInterviewRound}>Start Interview Round</button>

            </div>
        );
    }
}