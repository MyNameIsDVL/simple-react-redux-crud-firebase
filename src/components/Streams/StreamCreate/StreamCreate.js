import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { Field, reduxForm } from 'redux-form';
import { addNewStream } from '../../../actions';

class StreamCreate extends React.Component {

    renderInput = ({ input, meta, label, type, id, htmlFor }) => {
        return(
            <div className="mb-3">
                <label htmlFor={ htmlFor } className="form-label">{ label }</label>
                <input { ...input } type={ type } className="form-control" id={ id } />
                { (meta.touched && meta.error) ? <div className="alert alert-danger">{ meta.error }</div> : null }
            </div>
        );
    }

    renderTextArea = ({ input, meta, label, type, id, htmlFor }) => {
        return(
            <div className="mb-3">
                <label htmlFor={ htmlFor } className="form-label">{ label }</label>
                <textarea { ...input } type={ type } className="form-control" id={ id } />
                { (meta.touched && meta.error) ? <div className="alert alert-danger">{ meta.error }</div> : null }
            </div>
        );
    }

    renderSelect = ({ input, meta, label, type, id, htmlFor }) => {
        return(
            <div className="mb-3">
                <label htmlFor={ htmlFor } className="form-label">{ label }</label>
                <select { ...input } className="form-select" aria-label="Default select example" id={ id }>
                    <option defaultValue>Wybierz grę z listy...</option>
                    <option value="Counter-Strike GO">Counter-Strike GO</option>
                    <option value="New world">New world</option>
                    <option value="Quake Champions">Quake Champions</option>
                    <option value="GTA 5">GTA 5</option>
                    <option value="Arma 3">Arma 3</option>
                    <option value="Dota 2">Dota 2</option>
                    <option value="League of legends">League of legends</option>
                </select>
                { (meta.touched && meta.error) ? <div className="alert alert-danger">{ meta.error }</div> : null }
            </div>
        );
    }

    addNewStream = (formValues) => {
        this.props.addNewStream(formValues, this.props.uid);
    }

    render() {
        return(
            <div className="streamCreate">
                <div className="card mt-5">
                    <div className="card-body">
                        <h1>Dodaj nowy stream</h1>
                        <form onSubmit={ this.props.handleSubmit(this.addNewStream) }>
                            <Field name="name" type="text" id="exampleInputname" htmlFor="exampleInputname" label="Nazwa" component={ this.renderInput } />
                            <Field name="desc" id="exampleInputdesc" htmlFor="exampleInputdesc" label="Opis" component={ this.renderTextArea } />
                            <Field name="game" id="exampleInputgame" htmlFor="exampleInputgame" label="Nazwa gry" component={ this.renderSelect } />
                            <button className="btn btn-primary" disabled={ (this.props.invalid || this.props.submitting || this.props.pristine) ? true : false }>Dodaj</button>
                            <Link to="/" className="btn btn-danger">Anuluj</Link>
                        </form>
                    </div>
                </div>        
            </div>
        );
    }
}

const validate = (formValues) => {
    const errors = {};
    if (!formValues.name) errors.name = 'Wypełnij pole Nazwa streama';
    if (!formValues.desc) errors.desc = 'Wypełnij pole Opis streama';
    if (!formValues.game) errors.game = 'Wybierz grę z listy';
    return errors;
};

const mapStateToProps = (state) => {
    return { 
        uid: state.auth.uid,
        userInfo: state.auth.userInfo
    }
};

export default connect(mapStateToProps, { addNewStream })(reduxForm({
    form: 'streamCreateForm',
    validate
})(StreamCreate));