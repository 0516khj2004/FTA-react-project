import React, { Component } from 'react';
import './App.css';
import {
  Route,
  withRouter,
  Switch
} from 'react-router-dom';

import { getCurrentUser } from '../util/APIUtils';
import { ACCESS_TOKEN } from '../constants';

// import Data from '../data/Data';
// import Detail from '../data/Detail';
import Login from '../user/login/Login';
// import Open from '../Open/Open'; 
import Upload from '../Open/Upload-file'
import Signup from '../user/signup/Signup';
import Profile from '../user/profile/Profile';
import AppHeader from '../common/AppHeader';
import NotFound from '../common/NotFound';
import LoadingIndicator from '../common/LoadingIndicator';
import PrivateRoute from '../common/PrivateRoute';
// import Main from '../data/Main';
import Detailggdata from '../search/categorySite/Detailggdata';
import Detailseouldata from '../search/categorySite/Detailseouldata';
import Detailpublicdata from '../search/categorySite/Detailpublicdata';
import Test from '../main/Test'
import Search from '../search/Search'
import { Layout, notification } from 'antd';
import '../search/Search.css';
const { Content } = Layout;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: null,
      isAuthenticated: false,
      isLoading: false
    }
    this.handleLogout = this.handleLogout.bind(this);
    this.loadCurrentUser = this.loadCurrentUser.bind(this);
    this.handleLogin = this.handleLogin.bind(this);

    notification.config({
      placement: 'topRight',
      top: 70,
      duration: 3,
    });    
  }

  loadCurrentUser() {
    this.setState({
      isLoading: true
    });
    getCurrentUser()
    .then(response => {
      this.setState({
        currentUser: response,
        isAuthenticated: true,
        isLoading: false
      });
    }).catch(error => {
      this.setState({
        isLoading: false
      });  
    });
  }

  componentDidMount() {
    this.loadCurrentUser();
  }

  handleLogout(redirectTo="/", notificationType="success", description="You're successfully logged out.") {
    localStorage.removeItem(ACCESS_TOKEN);

    this.setState({
      currentUser: null,
      isAuthenticated: false
    });

    this.props.history.push(redirectTo);
    
    notification[notificationType]({
      message: 'file to api',
      description: description,
    });
  }

  handleLogin() {
    notification.success({
      message: 'file to api',
      description: "로그인에 성공 했습니다",
    });
    this.loadCurrentUser();
    this.props.history.push("/");
  }

  render() {
    if(this.state.isLoading) {
      return <LoadingIndicator />
    }
    return (
        <Layout className="app-container">
          <AppHeader isAuthenticated={this.state.isAuthenticated} 
            currentUser={this.state.currentUser} 
            onLogout={this.handleLogout} />

          <Content className="app-content">
            
            <div className="container111">
              <Switch>      
              <Route exact path="/" >
                    <Test />
                </Route>
                
                <Route path="/detailggdata" component={Detailggdata}>/</Route>
                <Route path="/detailseouldata" component={Detailseouldata}>/</Route>
                <Route path="/Detailspublicdata" component={Detailpublicdata}>/</Route>
              
                <Route path="/data" component={Search}></Route>
                {/* <Route path="/detail" component={Detail}></Route>
                <Route path="/detail/:usersId" component={Detail}></Route> */}
                {/* <Route path="/open" component={Open}></Route> */}
                
                {/* <Route path="/upload" component={Upload}></Route> */}
                <Route path="/login" 
                  render={(props) => <Login onLogin={this.handleLogin} {...props} />}></Route>
                <Route path="/signup" component={Signup}></Route>
                <Route path="/users/:username" 
                  render={(props) => <Profile isAuthenticated={this.state.isAuthenticated} currentUser={this.state.currentUser} {...props}  />}>
                </Route>
                <PrivateRoute authenticated={this.state.isAuthenticated} path="/upload"  component={Upload}  currentUser={this.state.currentUser} ></PrivateRoute>
                {/* handleLogout={this.handleLogout} */}
                <Route component={NotFound}></Route>
              </Switch>
            </div>
          </Content>
        </Layout>
    );
  }
}

export default withRouter(App);
