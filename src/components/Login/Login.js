import React from 'react';
import { connect } from 'react-redux';
import { login } from '../../actions';
import { Link } from 'react-router-dom';

import { Field, reduxForm } from 'redux-form';

class Login extends React.Component {

    renderInput = ({ input, meta, label, type, id, htmlFor }) => {
        return(
            <div className="mb-3">
                <label htmlFor={ htmlFor } className="form-label">{ label }</label>
                <input { ...input } type={ type } className="form-control" id={ id } />
                { (meta.touched && meta.error) ? <div className="alert alert-danger">{ meta.error }</div> : null }
            </div>
        );
    }

    login = formValues => {
        console.log(formValues)
        this.props.login(formValues);
    }

    render() {
        return(
            <div className="login">
                <div className="card mt-5">
                    <div className="card-body">
                        <form onSubmit={ this.props.handleSubmit(this.login) }>
                            <h1>Logowanie</h1>
                            <Field name="email" type="email" id="exampleInputEmail1" htmlFor="exampleInputEmail1" label="Email" component={ this.renderInput } />
                            <Field name="password" type="password" id="exampleInputPassword1" htmlFor="exampleInputPassword1" label="Hasło" component={ this.renderInput } />
                            <button className="btn btn-primary" disabled={ (this.props.invalid || this.props.submitting || this.props.pristine) ? true : false }>Zaloguj się</button>
                        </form>
                        <div className="mt-3">
                            <Link className="text-secondary" to="/register">Nie masz konta?</Link>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const validate = (formValues) => {
    const errors = {};
    if (!formValues.email) errors.email = 'Wypełnij pole email';
    if (!formValues.password) errors.password = 'Wypełnij pole hasłem';
    return errors;
};

export default connect(null, { login })(reduxForm({
    form: 'loginForm',
    validate
})(Login));