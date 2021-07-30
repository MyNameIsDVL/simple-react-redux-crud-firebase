import React from 'react';

import { connect } from 'react-redux';

import { deleteStreamById } from '../../../actions';

import { Link } from 'react-router-dom';

class StreamList extends React.Component {

    removebyId = (id) => {
        this.props.deleteStreamById(id);
    }

    renderIfLogged() {
        if (this.props.uid) {
            return(
                <>
                <div className="dropdown mt-3 mb-3">
                    <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                        Narzędzia
                    </button>
                    <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                        <li><Link className="dropdown-item" to="/stream/new">Dodaj nowy stream</Link></li>
                    </ul>
                </div>
                <table className="table">
                    <thead>
                        <tr>
                        <th scope="col">Nazwa</th>
                        <th scope="col">Opis</th>
                        <th scope="col">Gra</th>
                        <th scope="col">Edytuj</th>
                        <th scope="col">Usuń</th>
                        </tr>
                    </thead>
                    <tbody>
                    { (this.props.streams) ? this.props.streams.filter(fillItem => fillItem.UserId === this.props.uid).map(item => (
                        <tr key={ item.KeyId }>
                            <td>{ item.StreamName }</td>
                            <td>{ item.StreamDesc }</td>
                            <td>{ item.StreamGame }</td>
                            <td><Link to={`/stream/edit/${ item.KeyId }`} className="btn btn-primary">Edytuj</Link></td>
                            <td><button onClick={ () => this.removebyId(item.KeyId) } className="btn btn-danger">Usuń</button></td>
                        </tr>
                    )) : null }             
                    </tbody>
                </table>
                </>
            );
        } else {
            return(
                <p>Zaloguj się aby otrzymać dostęp do zawartości.</p>
            );
        }
    }

    render() {
        return(
            <div className="streamList">
                <div className="card mt-5">
                    <div className="card-body">
                        <h1>Twoje streamy</h1>
                        { this.renderIfLogged() }
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return { 
        uid: state.auth.uid,
        streams: state.auth.streams
    }
};

export default connect(mapStateToProps, { deleteStreamById })(StreamList);