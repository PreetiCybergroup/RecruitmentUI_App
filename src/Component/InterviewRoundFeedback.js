import React, { Component } from 'react';


export default class InterviewRoundFeedback extends Component {
    constructor() {
        super()
        {
            this.state = {
                "InterviewRoundId": "",
                "technicalSkills": "",
                "nonTechnicalSkills": "",
                "comments": "",
                "areaOfConcern": ""
            }

        }
    }
    addFeedback = (event) => {
        event.preventDefault();
        this.postData();
    }
    onChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    }
    async postData() {
        const { match: { params } } = this.props;
        this.params = params;
        fetch("http://localhost:59599/api/InterviewRoundFeedback", {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                'interviewRoundId': this.params.interviewRoundId,
                'technicalSkills': this.state.technicalSkills,
                'nonTechnicalSkills': this.state.nonTechnicalSkills,
                'comments': this.state.comments,
                'areaOfConcern': this.state.areaOfConcern,
            })
        });
    }
    render() {
        return (
            <form>
                <label>Technical Skills</label>
                <input type="text" name="technicalSkills" onChange={this.onChange} ></input>
                <label>Non Technical Skills</label>
                <input type="text" name="nonTechnicalSkills" onChange={this.onChange}></input>
                <label>Comments</label>
                <input type="text" name="comments" onChange={this.onChange}></input>
                <label>Area of Concerns</label>
                <input type="text" name="areaOfConcern" onChange={this.onChange}></input>
                <button onClick={this.addFeedback}>Submit Feedback</button>
            </form>
        );
    }
}

