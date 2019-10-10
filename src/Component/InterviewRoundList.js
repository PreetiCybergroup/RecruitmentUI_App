import React, { Component } from 'react';
import axious from 'axios';
import { Link } from 'react-router-dom';

export default class InterviewRoundList extends Component {
    constructor() {
        super()
        this.state = {
            interviewRoundList: [],
            isLoading: true,
            candidateName: " "
        }
    }

    componentDidMount() {
        const { match: { params } } = this.props;
        this.params = params;
        if(this.params.interviewProcessId == null)
        {
            axious.get(`http://localhost:59599/api/interviewRound`)
            .then(response => this.setState(
                {
                    interviewRoundList: response.data.interviewRoundList,
                    isLoading: false
                }))
        }
        else
        {
        axious.get(`http://localhost:59599/api/interviewRound/interviewProcess/${this.params.interviewProcessId}`)
            .then(response => this.setState(
                {
                    interviewRoundList: response.data.interviewRoundList,
                    isLoading: false
                }))
        }
    }
    render() {
        return (
            <div className="container">
                <h2>Interview Round</h2>
                <div className="row">
                    <div className="col-md-6 col-md-offset-5">
                        
                        {(!this.state.isLoading) ?
                            (
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Interview Round Type</th>
                                            <th>interviewer Name</th>
                                            <th>Feedback</th>
                                            <th>Add Feedback</th>
                                            <th>View Feedback</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.getProcessList()}
                                    </tbody>
                                </table>
                            ) :
                            (<h1>Fetching interview processes...</h1>)}
                        <p>{this.props.value}</p>
                    </div>
                </div>
            </div>

        );
    }

    getProcessList() {
        return this.state.interviewRoundList.map(item => {
            return (
                <tr>
                    <td>{item.interviewRoundTypeId}</td>
                    <td>{item.interviewerName}</td>
                    <td>{item.feedbackId}</td>
                    <td><button><Link to={`/InterviewRoundFeedback/${item.id}`} className="nav-link"> Add Feedback </Link></button>
                    </td>
                    <td><button><Link to={`/GetFeedbackDetails/${item.interviewProcessId}`} className="nav-link"> View Feedback </Link></button>
                    </td>
                </tr>
            );
        }
        )
    }
}