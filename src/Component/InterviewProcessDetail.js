import React, { Component } from 'react';
import axious from 'axios';

//import { BrowserRouter as con } from 'react-router-dom';
//import Container from 'react-bootstrap/Container'
//import Row from 'react-bootstrap/Row'

export default class InterviewProcessDetail extends Component {
    constructor() {
        super()
        this.state = {
            interviewprocesslist: [],
            isLoading: true,
            candidateName: " "
        }
    }
    
    componentDidMount() {
        const { match: {params}} = this.props;
        this.params = params;
        fetch('http://localhost:59599/api/InterviewProcess/',{
            method: 'post',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({
                'candidateId': this.params.candidateId
            })
        }).then(response => {
            this.setState({isLoading: false});
        });
      }
    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-6 col-md-offset-5">
                        {(!this.state.isLoading) ?
                            (<h1>Interview process has been initiated for {this.params.candidateName}</h1>) :
                            (<h1>Initiating interview process...</h1>)}
                    </div>
                </div>
            </div>

        );
    }

}


