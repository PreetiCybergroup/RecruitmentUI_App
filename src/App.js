import React from 'react';
import { BrowserRouter as Router, Route, Switch, Link, Redirect } from 'react-router-dom';
import AddCandidate from './Component/AddCandidate';
import GetCandidate from './Component/GetCandidate';
import InterviewProcessList from './Component/InterviewProcessList';
import InterviewProcessDetail from './Component/InterviewProcessDetail';
import InterviewRoundDetail from './Component/InterviewRoundDetail';
import InterviewRoundList from './Component/InterviewRoundList';
import InterviewRoundFeedback from './Component/InterviewRoundFeedback';
import Login from './Component/Login';

export default class RecruitmentApp extends React.Component {
  render() {
    return (
       <Router basename={process.env.PUBLIC_URL}>
        <div className="App">
          <header className="App-header">
            <h1 className="App-title">Recruitment App</h1>
          </header>
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <ul className="navbar-nav mr-auto">
              <li><Link to={"/AddCandidate"} className="nav-link"> Add Candidate </Link></li>
              <li><Link to={"/GetCandidate"} className="nav-link">Get Candidate</Link></li>
              <li><Link to={"/InterviewProcess"} className="nav-link">Get Interview Process</Link></li>
              <li><Link to={"/InterviewRound"} className="nav-link">Get Interview Round</Link></li>
              <li><Link to={"/InterviewRoundFeedback"} className="nav-link">Get Interview Round Feedback</Link></li>
            </ul>
          </nav>
          <hr />
          <Switch>
            <Route exact path='/Login' component={Login} />
            <Route exact path='/AddCandidate' component={AddCandidate} />
            <Route exact path='/GetCandidate' component={GetCandidate} />
            <Route exact path='/InterviewProcess' component={InterviewProcessList} />
            <Route exact path='/InterviewRound' component={InterviewRoundList} />
            <Route exact path='/InterviewRoundFeedback/:interviewRoundId' component={InterviewRoundFeedback} />
            <Route exact path='/InterviewRound/:interviewProcessId'  component={InterviewRoundDetail} />
            <Route exact path='/InterviewProcess/:candidateName/:candidateId'  component={InterviewProcessDetail} />
          </Switch>
        </div>
      </Router>
    );
  }
}




