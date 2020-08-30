import React, { useState, useEffect, useContext } from 'react';
import { useHttp } from '../hooks/http.hook';
import { useMessage } from '../hooks/message.hook';
import { AuthContext } from '../context/AuthContext'

export const AuthPage = () => {
    const auth = useContext(AuthContext);
    const message = useMessage();
    const { loading,  request, error, clearError } = useHttp();
    const [form, setForm] = useState({
        email: '', password: ''
    });

    useEffect(() => {
        window.M.updateTextFields();
    });

    useEffect(() => {
        message(error);
        clearError();
    }, [error, message, clearError]);

    const changeHandler = event => {
        setForm({ ...form, [event.target.name]: event.target.value });
    };

    const registerHandler = async () => {
        try {
            const data = await request('/api/auth/register', 'POST', { ...form });
            message(data.message);
        } catch (err) {}
    };

    const loginHandler = async () => {
        try {
            console.log({ ...form });
            const data = await request('/api/auth/login', 'POST', { ...form });
            auth.login(data.token, data.userId);
        } catch (err) { }
    };

    return (
        <div className="row">
            <div className="col s6 offset-s3">
                <h1>Link shorter</h1>
                <div className="card blue darken-1">
                    <div className="card-content white-text">
                        <span className="card-title">Authentication</span>
                        <div>
                            <div className="input-field">
                                <input
                                    type="text"
                                    id="email"
                                    name="email"
                                    placeholder="Enter email"
                                    className="yellow-input"
                                    value={form.email}
                                    onChange={changeHandler}
                                />
                                <label htmlFor="email">Email</label>
                            </div>
                            <div className="input-field">
                                <input
                                    type="password"
                                    id="password"
                                    name="password"
                                    placeholder="Enter password"
                                    className="yellow-input"
                                    onChange={changeHandler}
                                    value={form.password}
                                />
                                <label htmlFor="password">Password</label>
                            </div>
                        </div>
                        <div className="card-action">
                            <button
                                className="btn yellow darken-4"
                                style={{ marginRight: 10 }}
                                onClick={loginHandler}
                                disabled={loading}
                            >
                                Login</button>
                            <button
                                className="btn grey darken-4"
                                onClick={registerHandler}
                                disabled={loading}
                            >
                                Register</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}