import React, { Component } from 'react';


export default class InterviewRoundFeedback extends Component {
    constructor() {
        super()
        {
            this.state = {
                "InterviewRoundId": "",
                "TechnicalSkills": "",
                "NonTechnicalSkills": "",
                "Comments": "",
                "AreaOfConcern": ""

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
        console.log(this.state);
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
                <input type="text" name="technicalSkills" onChange={this.handleChange} ></input>
                <label>Non Technical Skills</label>
                <input type="text" name="nonTechnicalSkills" onChange={this.handleChange}></input>
                <label>Comments</label>
                <input type="text" name="comments" onChange={this.handleChange}></input>
                <label>Area of Concerns</label>
                <input type="text" name="areaofConcerns" onChange={this.handleChange}></input>
                <button onClick={this.addFeedback}>Submit Feedback</button>

            </form>
        );
    }
}

