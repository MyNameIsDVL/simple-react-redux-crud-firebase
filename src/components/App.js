import React from 'react';
import { Route, Router, Switch } from 'react-router-dom';

import StreamList from './Streams/SreamsList/StreamList';
import StreamCreate from './Streams/StreamCreate/StreamCreate';
import StreamEdit from './Streams/StreamEdit/StreamEdit';

import Login from './Login/Login';
import Register from './Register/Register';

import Nav from './Nav/Nav';

import history from '../history';
import { connect } from 'react-redux';

class App extends React.Component { 

    render() {
        return(
            <div>
                <Router history={ history }>
                <Nav />
                    <div className="container">
                        <Switch>
                            <Route path="/" exact component={ StreamList } />
                            <Route path="/login" exact component={ () => !this.props.uid ? <Login /> : <StreamList /> } />
                            <Route path="/register" exact component={ () => !this.props.uid ? <Register /> : <StreamList /> } />
                            <Route path="/stream/new" exact component={ () => this.props.uid ? <StreamCreate /> : <StreamList /> } />
                            <Route path="/stream/edit/:id" exact component={ () => this.props.uid ? <StreamEdit /> : <StreamList /> } />
                        </Switch>
                    </div>
                </Router>
            </div>
        );
    } 
}

const mapStateToProps = (state) => {
    return { 
        uid: state.auth.uid,
        userInfo: state.auth.userInfo
    }
};

export default connect(mapStateToProps)(App);