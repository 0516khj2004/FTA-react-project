import React, { Component } from 'react';
// import PollList from '../../poll/PollList';
import { getUserProfile } from '../../util/APIUtils';
import { Avatar, Tabs } from 'antd';
import { getAvatarColor } from '../../util/Colors';
import { formatDate } from '../../util/Helpers';
import LoadingIndicator  from '../../common/LoadingIndicator';
import './Profile.css';
import NotFound from '../../common/NotFound';
import ServerError from '../../common/ServerError';
import MyApiList from '../mypage/MyApiList';
import { UncontrolledCollapse, Button, CardBody, Card } from 'reactstrap';
import ServerStart from "../../Open/ServerStart"

import Footer from '../../common/Footer'

const TabPane = Tabs.TabPane;

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: null,
            isLoading: false
        }
        this.loadUserProfile = this.loadUserProfile.bind(this);
        this.apiDown = this.apiDown.bind(this);
    }

    loadUserProfile(username) {
        this.setState({
            isLoading: true
        });

        getUserProfile(username)
        .then(response => {
            this.setState({
                user: response,
                isLoading: false
            });
        }).catch(error => {
            if(error.status === 404) {
                this.setState({
                    notFound: true,
                    isLoading: false
                });
            } else {
                this.setState({
                    serverError: true,
                    isLoading: false
                });        
            }
        });        
    }
    apiDown(){
        const username = this.props.match.params.username;
        ServerStart.serverDown(username);
        console.log(username)
    }
      
    componentDidMount() {
        const username = this.props.match.params.username;
        this.loadUserProfile(username);
    }

    componentDidUpdate(nextProps) {
        if(this.props.match.params.username !== nextProps.match.params.username) {
            this.loadUserProfile(nextProps.match.params.username);
        }        
    }

    render() {
        if(this.state.isLoading) {
            return <LoadingIndicator />;
        }

        if(this.state.notFound) {
            return <NotFound />;
        }

        if(this.state.serverError) {
            return <ServerError />;
        }

        const tabBarStyle = {
            textAlign: 'center'
        };

        return (
            <div className="profile">
                { 
                    this.state.user ? (
                        <div className="user-profile">
                            <div className="user-details">
                                <div className="user-avatar">
                                    <Avatar className="user-avatar-circle" style={{ backgroundColor: getAvatarColor(this.state.user.name)}}>
                                        {this.state.user.name[1].toUpperCase()}{this.state.user.name[2].toUpperCase()}
                                    </Avatar>
                                   
                                </div>
                            </div>
                            <div className="user-poll-details">    
                                <Tabs defaultActiveKey="1" 
                                    animated={false}
                                    tabBarStyle={tabBarStyle}
                                    size="large"
                                    className="profile-tabs">
                                    <TabPane tab="OPEN API 목록" key="1">
                                        <MyApiList username={this.props.match.params.username} userkey = {this.state.user.userkey} userport= {10010+ this.state.user.id } type="USER_CREATED_POLLS" />
                                    </TabPane>
                                    <TabPane tab="회원 정보" key="2">
                                        <div className="container">
                                            <h4>Name</h4>
                                            <div className="alert alert-primary">{this.state.user.name}</div>
                                            <h4>ID</h4>
                                            <div className="alert alert-primary">{this.state.user.username}</div>
                                            <h4>Joined</h4>
                                            <div className="alert alert-primary">
                                                {formatDate(this.state.user.joinedAt)}
                                            </div>
                                            <h4>key</h4>
                                            <div>
                                                <Button color="primary" id="toggler" style={{ marginBottom: '1rem' }}>
                                                Key를 확인하세요
                                                </Button>
                                                <UncontrolledCollapse toggler="#toggler">
                                                <Card>
                                                    <CardBody>
                                                    {this.state.user.userkey}
                                                    </CardBody>
                                                </Card>
                                                </UncontrolledCollapse>
                                            </div>
                                        </div>
                                    </TabPane>
                                </Tabs>
                            </div>  
                            <Footer />
                        </div>  
                    ): null               
                }
            </div>
        );
    }
}

export default Profile;