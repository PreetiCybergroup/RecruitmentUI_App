import React, { Component } from 'react';
import axious from 'axios';

//import { BrowserRouter as con } from 'react-router-dom';
//import Container from 'react-bootstrap/Container'
//import Row from 'react-bootstrap/Row'

export default class GetFeedbackDetails extends Component {
    constructor() {
        super()
        this.state = {
            interviewRoundFeedback: [],
            isLoading: true
        }
    }

    componentDidMount() {
        const { match: { params } } = this.props;
        this.params = params;
        axious.get(`http://localhost:59599/api/InterviewRoundFeedback/${this.params.interviewProcessId}`)
            .then(response => this.setState(
                {
                    interviewRoundFeedback: response.data.interviewRoundFeedbackList,
                    isLoading: false
                }))
    }
    render() {
        return (
            <div className="container">
                 <h2>Feedback Details</h2>
                 <br/>
                <div className="row">
                    <div className="col-md-6 col-md-offset-5">
                        {(!this.state.isLoading) ?
                            (
                               
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Id</th>
                                            <th>TechnicalSkills</th>
                                            <th>NonTechnicalSkills</th>
                                            <th>Comments</th>
                                            <th>Area Of Concern</th>
                                            <th>Date</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.getInterviewRoundFeedbackList()}
                                    </tbody>
                                </table>
                            ) :
                            (<h1>Loading Feedback</h1>)}
                    </div>
                </div>
            </div>

        );
    }
    getInterviewRoundFeedbackList() {
        return this.state.interviewRoundFeedback.map(item => {
            return (
                <tr>
                    <td>{item.id}</td>
                    <td>{item.technicalSkills}</td>
                    <td>{item.nonTechnicalSkills}</td>
                    <td>{item.comments}</td>
                    <td>{item.areaOfConcern}</td>
                    <td>{item.date}</td>
                </tr>
            );
        }
        )
    }

}


