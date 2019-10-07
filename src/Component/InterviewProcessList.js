import React, { Component } from 'react';
import axious from 'axios';
import {  Link} from 'react-router-dom';
//import { BrowserRouter as con } from 'react-router-dom';
//import Container from 'react-bootstrap/Container'
//import Row from 'react-bootstrap/Row'

export default class InterviewProcessList extends Component {
    constructor() {
        super()
        this.state = {
            interviewprocesslist: [],
            isLoading: true,
            candidateName: " "
        }
    }
    
    componentDidMount() {
        axious.get('http://localhost:59599/api/InterviewProcess/')
            .then(response => this.setState(
                {
                    interviewprocesslist: response.data.interviewprocesslist,
                    isLoading: false
                }))
      }
    render() {
        console.log("Hello", this.props);
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-6 col-md-offset-5">
                        {/* <input type="button" value="Check List" onClick={this.handleSubmit}></input> */}
                        
                        {(!this.state.isLoading) ?
                            (
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Id</th>
                                            <th>Date</th>
                                            <th>Candidate Name</th>
                                            <th>Feedback</th>
                                            <th>Start Interview Round</th>
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
        return this.state.interviewprocesslist.map(item => {
            return (
                <tr>
                    <td>{item.id}</td>
                    <td>{item.endDate}</td>
                    <td>{item.candidateName}</td>
                    <td>{item.feedbackStatus}</td>
                    <td><button><Link to={`/InterviewRound/${item.id}`} className="nav-link"> Start Interview Round </Link></button>
                    </td>
                </tr>
            );
        }
        )
    }

}


