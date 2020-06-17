
import React, { Component } from "react";
import UploadService from "./Upload-service";
import Openapi from './Openapi';
import "bootstrap/dist/css//bootstrap.min.css"
import "./open.css"
import '../index.css';
import Footer from '../common/Footer'
import { faUpload } from '@fortawesome/free-solid-svg-icons';
import { faCloudUploadAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Spinner } from 'reactstrap';


export default class UploadFiles extends Component {
  constructor(props) {
    super(props);
    this.selectFile = this.selectFile.bind(this);
    this.upload = this.upload.bind(this);
    this.delete = this.delete.bind(this);

    this.state = {
      selectedFiles: undefined,
      currentFile: undefined,
      progress: 0,
      message: "",
      filename: "",
      fileInfos: [],
      names: [],
      user: null,
    };
  }


  componentDidMount() {
    let username = this.props.currentUser.username;

    UploadService.delete(username);

    // UploadService.getFiles(username).then((files) => {

    //   this.setState({
    //     message: files.data.message,
    //     fileInfos: files.date
    //   });
    //   return UploadService.getFiles(username)
    // });

    // UploadService.getFiles(username).then((response) => {

    //   this.setState({
    //     fileInfos: response.data,    
    //   });
    // });

  }

  selectFile(event) {
    this.setState({
      selectedFiles: event.target.files,
    });
  }

  upload() {
    let currentFile = this.state.selectedFiles[0];
    let username = this.props.currentUser.username;
    let userkey = this.props.currentUser.userkey;

    this.setState({
      progress: 0,
      currentFile: currentFile,
    });
    // console.log(userport);
    UploadService.upload(userkey, username, currentFile, (event) => {

      this.setState({
        progress: Math.round((100 * event.loaded) / event.total),
      });
    })
      .then((response) => {
        this.setState({
          message: response.data.message,
          filename: response.data.filename
        });
        // return UploadService.getFiles(username, console.log("<<<" + username));
      })
      .then((files) => {
        this.setState({
          fileInfos: files.data

        });
      })
      .catch(() => {
        this.setState({
          progress: 0,
          message: "Could not upload the file!",
          currentFile: undefined,
        });
      });

    this.setState({
      selectedFiles: undefined,
    })
      ;
  }

  delete() {
    let username = this.props.currentUser.username;
    UploadService.delete(username);

    // UploadService.getFiles(username).then((files) => {

    //   this.setState({
    //     message: files.data.message,
    //     fileInfos: files.date
    //   });
    //   return UploadService.getFiles(username)
    // });
  }


  render() {

    const {
      selectedFiles,
      currentFile,
      progress,
      message,
      filename,
      names
    } = this.state;


    names.push(filename);
    const set = Array.from(new Set(names));
    const uploadfilename = set.filter(function (el) {
      return el != "";
    })
    console.log(uploadfilename);

    return (
      <div className="wrap">
        <div class="hero-wrap-detail img">
          <div class="overlay"></div>
          <div class="container">
            <div class="row d-md-flex no-gutters slider-text align-items-center justify-content-center">
              <div class="col-md-10 d-flex align-items-center ftco-animate">
                <div class="text text-center pt-5 mt-md-5">
                  <p class="mb-4">HOME > Open API</p>
                  <h1 class="mb-5">Open API</h1>
                  <h1 class="mb-5">원하는 파일을 업로드 하세요</h1>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='container'>
          <div class='container'>
            {currentFile && (
              <div className="progress slider">
                <div
                  className="progress-bar progress-bar-info progress-bar-striped"
                  role="progressbar"
                  aria-valuenow={progress}
                  aria-valuemin="0"
                  aria-valuemax="100"
                  style={{ width: progress + "%" }}
                >
                  {progress}%
                        </div>
              </div>
            )}
            <div class="row">
              <div class="col file-container">
                <div class="file-wrapper">
                  <input class="file-input" type="file" onChange={this.selectFile} />
                  <div class="file-content">
                    <div class="file-infos">
                      <p class="file-icon"><FontAwesomeIcon className="t1" icon={faUpload} size="8x" /></p>
                    </div>
                    <p className="file-name"><span class="has-drag">Click to browse<span class="has-drag">or drop file here</span></span></p>
                  </div>
                </div>
                <div className="wrapper">
                  <button className="btn btn-primary upload-btn" disabled={!selectedFiles} onClick={this.upload}>
                    Upload
                  </button>
                  <div className="alert alert-light" role="alert">
                    {message}
                  </div>
                </div>
              </div>
              <div class="col">
                <div class="card">
                  <div className="card-header">List of Files</div>
                  <ul className="list-group list-group-flush">
                    {uploadfilename &&
                      uploadfilename.map((filename, index) => (
                        <li className="list-group-item" key={index}>
                          <Spinner type="grow" color="warning" /><span className="filename">{filename}</span>
                        </li>
                      ))}
                  </ul>
                </div>
              </div>
            </div>
            <Openapi
              userfiles={uploadfilename &&
                uploadfilename.map((filename, index) => (
                  <li className="list-group-item" key={index}>
                    {filename}
                  </li>
                ))}
              username={this.props.currentUser.username}
              userkey={this.props.currentUser.userkey}
              userport={10010 + this.props.currentUser.id}>
            </Openapi>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}
