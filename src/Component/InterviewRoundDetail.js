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
            'interviewRoundTypeId': this.state.interviewRound,
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
                    <option value= "None">None</option>
                    <option value= "Telephonic">Telephonic</option>
                    <option value= "GroupDiscussion">GroupDiscussion</option>
                    <option value= "1-Technical">1-Technical</option>
                    <option value= "2-Technical">2-Technical</option>
                    <option value= "HR">HR</option>
                    <option value= "Additional">Additional</option>
                </select>
                <br />
                <br />
                <label className="Select Feedback">Select Feedback </label>
                <select className="custom-select" name="feedback" onChange={this.onRoundChanged}>
                    <option value= "None">None </option>
                    <option value= "2-Technical">2-Technical</option>
                    <option value= "3-Technical">3-Technical</option>
                    <option value= "Selected">Selected</option>
                    <option value= "Rejected">Rejected</option>
                    <option value= "Additional">Additional</option>
                </select>
                <br />
                <br />
                <button className="StartInterviewRound" onClick={this.addInterviewRound}>Start Interview Round</button>

            </div>
        );
    }
}