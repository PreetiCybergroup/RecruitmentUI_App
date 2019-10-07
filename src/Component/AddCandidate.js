import React, { Component } from 'react';


export default class AddCandidate extends Component {
    constructor() {
        super()
        this.state = {
            name: "",
            email: "",
            mobile: "",
            keyword: "",
            resume: Blob,
            base64_file: "",
            dateofbirth: "",
            filename: ""
           // file: Blob
        }
    }


      onHandleSubmit = (e) => {
        e.preventDefault();
        
        this.postData();

    }

        getBase64(file) {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = () => {
            resolve(reader.result);
          };
          reader.onerror = error => reject(error);
        });
      }

     async postData()
      {
        this.state.base64_file = await this.getBase64(this.state.resume)
        
        fetch('http://localhost:59599/api/resume/',{
            method: 'post',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify( {'name': this.state.name,
            'email': this.state.email,
            'mobile': this.state.mobile,
            'dateofbirth': this.state.dateofbirth,
            'keyword': this.state.keyword,
            'resume': this.state.base64_file,
            'filename': this.state.resume.name})
            
        });
      }
    onHandleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    }
    onHandleUpload = (event) => {
        let file = event.target.files[0];
        this.setState({ resume: file })
    }
    render() {
        return (
            <div>
                <form>
                <label className="Name"> Name</label>
                <input type="text" name="name" onChange={this.onHandleChange}></input>
                <label className="Email">Email</label>
                <input type="text" name="email" onChange={this.onHandleChange}></input>
                <label className="Mobile">Mobile</label>
                <input type="text" name="mobile" onChange={this.onHandleChange}></input>
                <label className="DateofBirth">Date of Birth</label>
                <input type="text" name="dateofbirth" onChange={this.onHandleChange}></input>
                <label className="Keyword">Keyword</label>
                <input type="text" name="keyword" onChange={this.onHandleChange}></input>
                <label className="Resume">Select Resume</label>
                <br />
                <input type="file" name="resume" onChange={this.onHandleUpload}></input>
                <br />
                <input type="button" value="submit" onClick={this.onHandleSubmit}></input>
                </form>
            </div>
        );
    }
}