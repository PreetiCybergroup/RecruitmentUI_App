import React, { Component } from 'react';
import axious from 'axios';
import { Link } from 'react-router-dom';
import InterviewProcess from './InterviewProcessList';
import { withRouter } from 'react-router-dom'
import { BrowserRouter } from 'react-router-dom';


export default class GetCandidate extends React.Component {
  constructor(Props) {
    super(Props)
    this.state = {
      value: '',
      candidate_info: {},
      isLoading: true,
      isRedirect: false,
      selectedCandidate: "",
      candidateName: "",
      resumeFile: ""
    };
  }

  navigatelink = (e) => {
    //history.pushState()
    this.context.history.push("/InterviewProcess")
    // this.setState({isRedirect: true});
    // BrowserRouter.push("/InterviewProcess");

    //<Route exact path='/InterviewProcess'  component={InterviewProcess} />
    //return <InterviewProcess val={this.state.selectedCandidate} />
  }

  handleChange = (e) => {
    this.setState({ value: e.target.value });
    //var val = this.state.value;
  }

  handleDownload = (e) => {
    if (this.state.candidate_info.resumePath != null) {
      //this.fileImageName = this.state.candidate_info.resumePath;
      var filepath = this.state.candidate_info.resumePath;
      var _filenameIndex = filepath.lastIndexOf("\\") + 1;
      var fileImageName = filepath.substring(_filenameIndex).trim();
      let fileType = fileImageName.split(".")[1];
      var fileImageBase64 =
        "data:application/" +
        fileType +
        ";base64," +
        this.state.candidate_info.resume_base64;
      this.urltoFile(
        fileImageBase64,
        fileImageName,
        "application/octet-stream"
      ).then(file => {
        this.setState({ resumeFile: file })
      });
    }
    let fileType = fileImageName.split(".")[1];
    const blob = new Blob([this.state.resumeFile], { type: "application/" + fileType });

    var a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = fileImageName;
    a.click();
  }

  urltoFile(url, filename, mimeType) {
    return fetch(url)
      .then(res => {
        return res.arrayBuffer();
      })
      .then(buf => {
        return new File([buf], filename, { type: mimeType });
      });
  }

  handleSubmit = (e) => {
    const name = this.state.value;
    if (name) {
      axious.get('http://localhost:59599/api/resume/' + name)
        .then(response => this.setState(
          {
            candidate_info: response.data,
            isLoading: false,
            value: name
          }))
    }
    else {
      axious.get('http://localhost:59599/api/resume/')
        .then(response => this.setState(
          {
            candidate_info: response.data.candidates,
            isLoading: false
          }))
    }

  }
  render() {

    return (<div>
      <label className="Name">Enter your Name </label>
      <input type="text" value={this.state.value} onChange={this.handleChange}></input>
      <input type="button" value="submit" onClick={this.handleSubmit}></input>
      <input type="button" value="Download" onClick={this.handleDownload}></input>
      <ul>
        {!this.state.isLoading ? (
          !this.state.value ? (
            this.displayCandidates()
          ) : (this.displaySingleCandidate())

        ) : (<h3> </h3>)}
      </ul>

    </div>);
  }

  displayCandidates() {
    return this.state.candidate_info.map(candidate => {
      return (
        <div className="item-card" key={candidate.id}>
          <div className="info">
            <div className="Name">Name: {candidate.name}</div>
            <div className="Email">Email: {candidate.email}</div>
            <div className="Experience">Experience: {candidate.experience}</div>
            <div className="Technical Skills">Technical Skills: {candidate.technicalskills}</div>
            <div className="Button">
              <button><Link to={`/InterviewProcess/${candidate.name}/${candidate.id}`} className="nav-link"> Get Inverview Process </Link>
                <p>{this.state.value}</p>
              </button>
            </div>
            <div className="col-md-6">

            </div>
          </div>
        </div>
      );
    })
  }
  displaySingleCandidate() {
    const candidate = this.state.candidate_info;
    return (
      <div className="item-card" key={candidate.id}>
        <div className="info">
          <div className="Name">Name: {candidate.name}</div>
          <div className="Email">Email: {candidate.email}</div>
          <div className="Experience">Experience: {candidate.experience}</div>
          <div className="Technical Skills">Technical Skills: {candidate.technicalskills}</div>
          <div className="Button">
            <button><Link to={`/InterviewProcess/${candidate.name}/${candidate.id}`} className="nav-link"> Get Inverview Process </Link>
            </button>
          </div>
        </div>
      </div>
    );


  }

}