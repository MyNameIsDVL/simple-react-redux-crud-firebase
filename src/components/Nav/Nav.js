import React from 'react';
import { connect } from 'react-redux';
import { logout } from '../../actions';
import { Link } from 'react-router-dom';

import './Nav.css';

class Nav extends React.Component {

    logout = () => {
        this.props.logout();
    }

    renderUserName() {
        if (this.props.uid && this.props.userInfo) {
            return(
                <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Witaj { this.props.userInfo.UserName }
                </a> 
                <ul className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                    <li><button onClick={ this.logout } className="dropdown-item">Wyloguj</button></li>
                </ul>
                </li>
            );
        } else {
            return(
                <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Witaj
                </a> 
                <ul className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                    <li><button onClick={ this.logout } className="dropdown-item">Wyloguj</button></li>
                </ul>
                </li>
            );
        }
    }

    renderIfLogged() {
        if (this.props.uid) {
            return(
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <Link className="nav-link active" aria-current="page" to="/">Strona główna</Link>
                    </li>
                    { this.renderUserName() }
                </ul>
            );
        } else {
            return(
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <Link className="nav-link active" aria-current="page" to="/">Strona główna</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/login" type="button" className="btn btn-light">Zaloguj się</Link>
                    </li>
                </ul>
            );
        }
    }

    render() {
        return(
            <div className="nav">
                <nav className="navbar navbar-expand-lg navbar-dark bg-dark w100">
                    <div className="container-fluid">
                        <Link className="navbar-brand" to="/">Simple CRUID React-redux app</Link>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarNavDropdown">
                        { this.renderIfLogged() }
                        </div>
                    </div>
                </nav>
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

export default connect(mapStateToProps, { logout })(Nav);