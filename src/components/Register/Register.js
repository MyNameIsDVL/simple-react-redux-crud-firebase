import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { register } from '../../actions';

class Register extends React.Component {

    renderInput = ({ input, meta, label, type, id, htmlFor }) => {
        return(
            <div className="mb-3">
                <label htmlFor={ htmlFor } className="form-label">{ label }</label>
                <input { ...input } type={ type } className="form-control" id={ id } />
                { (meta.touched && meta.error) ? <div className="alert alert-danger">{ meta.error }</div> : null }
            </div>
        );
    }

    register = formValues => {
        this.props.register(formValues);
    }

    render() {
        return(
            <div className="register">
                <div className="card mt-5">
                    <div className="card-body">
                        <form onSubmit={ this.props.handleSubmit(this.register) }>
                            <h1>Rejestracja</h1>
                            <Field name="username" type="text" id="exampleInputuser" htmlFor="exampleInputuser" label="Nazwa użytkownika" component={ this.renderInput } />
                            <Field name="phone" type="number" id="exampleInputphone" htmlFor="exampleInputphone" label="Telefin kontaktowy" component={ this.renderInput } />
                            <Field name="email" type="email" id="exampleInputemail" htmlFor="exampleInputemail" label="Email" component={ this.renderInput } />
                            <Field name="password" type="password" id="exampleInputpass" htmlFor="exampleInputpass" label="Hasło" component={ this.renderInput } />
                            <button className="btn btn-primary" disabled={ (this.props.invalid || this.props.submitting || this.props.pristine) ? true : false }>Zapisz mnie</button>
                        </form>
                        <div className="mt-3">
                            <Link className="text-secondary" to="/login">Masz już konto?</Link>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const validate = (formValues) => {
    const errors = {};
    if (!formValues.username) errors.username = 'Wypełnij pole nazwa użytkownika';
    if (!formValues.phone) errors.phone = 'Wypełnij pole telefon kontaktowy';
    if (!formValues.email) errors.email = 'Wypełnij pole email';
    if (!formValues.password) errors.password = 'Wypełnij pole hasłem';
    if (formValues.password !== undefined && formValues.password.length < 6) errors.password = 'Hasło musi składać się z 6 znaków';
    return errors;
};

export default connect(null, { register })(reduxForm({
    form: 'registerForm',
    validate
})(Register));