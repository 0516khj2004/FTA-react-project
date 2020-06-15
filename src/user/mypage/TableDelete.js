import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import { faTrashAlt } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import OpenService from '../../Open/Open-service'



class TableDelete extends Component {
    constructor(props) {
        super(props);
        this.state = {
          open: false
        }
       
        this.handleClickOpen = this.handleClickOpen.bind(this)
        this.handleClose = this.handleClose.bind(this);
        this.tabledelete = this.tabledelete.bind(this);
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

    tabledelete(){
        // console.log(this.props.tablename + this.props.userkey)
        OpenService.opendelte(this.props.userport,this.props.tablename,this.props.userkey)
        window.location.reload()
    }

    render() {
        return (
            <div>
                <FontAwesomeIcon className="trash" icon={faTrashAlt} size="2x" onClick={this.handleClickOpen} />
                <Dialog 
                 Dialog onClose={this.handleClose} open={this.state.open}
                  aria-labelledby="alert-dialog-title"
                  aria-describedby="alert-dialog-description">
                  <DialogTitle id="alert-dialog-title" onClose={this.handleClose}>삭제 경고</DialogTitle>
                  <DialogContent >
                    <DialogContentText id="alert-dialog-description" >
                       "{this.props.tablename}"   API를 삭제됩니다.
                    </DialogContentText>
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={this.tabledelete} color="primary">
                      OK
                    </Button>
                    <Button onClick={this.handleClose} color="primary" autoFocus>
                      Cancle
                    </Button>
                  </DialogActions>
                </Dialog>
            </div>
        );
    }
}

export default withRouter(TableDelete);