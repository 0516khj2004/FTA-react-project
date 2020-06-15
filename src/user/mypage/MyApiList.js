import React, { Component } from 'react';
import { getApis } from '../../util/APIUtils';
import "./MyApiList.css"
import TableDelete from './TableDelete'
import ServerStart from "../../Open/ServerStart"
import { Button } from 'reactstrap';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
export default class MyApiList extends Component {

  constructor(props) {
    super(props);
    this.state = {
      apilistinfo: [],
    }
    this.loadApilist = this.loadApilist.bind(this);
    this.apiDown = this.apiDown.bind(this);
    this.handleClickOpen = this.handleClickOpen.bind(this)
    this.handleClose = this.handleClose.bind(this);
  }

  apiDown() {
    const username = this.props.username;
    ServerStart.serverDown(username);
    console.log(username)
    window.location.reload()
  }

  loadApilist() {
    // console.log(this.props.username)
    let test = getApis(this.props.username, this.props.userport);
    // console.log(test)
    // console.log(this.props.userport)
    return test;
  }

  handleClickOpen() {
    this.setState({
      open: true
    });
  }

  handleClose() {
    this.setState({
      open: false
    })
  }
  componentDidMount() {
    this.loadApilist().then(res => {
      // console.log(res);
      this.setState({
        apilistinfo: res
      })
    })
  }

  render() {
    // console.log("REDERING.........", this.state.apilistinfo);
    const apilistinfo = this.state.apilistinfo;
    const userkey = this.props.userkey;
    // console.log(userkey)
    return (
      <div className="container ftco-animate ">
        {apilistinfo && apilistinfo.map((table, index) => (
          <div className="container job-post-item p-4 d-block d-lg-flex align-items-center" key={index}>
            <div className="one-third mb-4 mb-md-0">
              <div>
                <TableDelete
                  tablename={table.tableName}
                  userkey={userkey}
                  userport={this.props.userport}
                >
                </TableDelete>
              </div>
              <div className="job-post-item-header align-items-center">
                <span className="subadge">Open api table</span>
                <h2 className="mr-3 text-black"><a href={'http://' + table.url + '?key=' + userkey}>{table.tableName}</a></h2>
              </div>
              <div className="job-post-item-body d-block d-md-flex">
                <div className="mr-3"><span className="icon-layers" />등록일:{table.createTableTime} </div>
              </div>
              {/* <div class="one-forth ml-auto d-flex align-items-center mt-4 md-md-0">
            <a href="new-post.html" class="btn btn-primary py-3">상세보기</a>
        </div> */}
            </div>
          </div>
        ))}
        <Button onClick={this.handleClickOpen} className=" user-api-button" color="danger">나만의 API SERVER 종료</Button>
        <Dialog
          Dialog onClose={this.handleClose} open={this.state.open}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description">
          <DialogTitle id="alert-dialog-title" onClose={this.handleClose}>삭제 경고</DialogTitle>
          <DialogContent >
            <DialogContentText id="alert-dialog-description" >
              API 서버가 종료됩니다.
                    </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.apiDown} color="primary">
              OK
                    </Button>
            <Button onClick={this.handleClose} color="primary" autoFocus>
              Cancle
                    </Button>
          </DialogActions>
        </Dialog>
      </div >
    );
  }
}

