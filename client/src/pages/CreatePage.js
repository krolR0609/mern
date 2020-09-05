import React, { useState, useEffect, useContext } from 'react';
import { useHttp } from './../hooks/http.hook';
import { AuthContext } from './../context/AuthContext';
import { useHistory } from 'react-router-dom';

export const CreatePage = () => {
    const history = useHistory();
    const auth = useContext(AuthContext);
    const { request } = useHttp();
    const [link, setLink] = useState('');
    
    useEffect(() => {
        window.M.updateTextFields();
    });

    const pressHandler = async event => {
        if (event.key === 'Enter') {
            await generate();
        }
    };

    const clickHandler = async event => {
        event.preventDefault();
        await generate();
    };
    
    const generate = async () => {
        try {
            const data = await request('/api/link/generate', 'POST', { from: link }, {
                Authorization: 'Bearer ' + auth.token
            });
            history.push(`/detail/${data.link._id}`);
        } catch(e) {}
    };

    return (
        <div className="row">
            <div className="col m6 offset-m3 s12" style={{ paddingTop: '2rem'}}>
                <div className="input-field">
                    <input
                        type="text"
                        id="link"
                        name="link"
                        placeholder="Put yours url link"
                        onChange={e => setLink(e.target.value)}
                        onKeyPress={pressHandler}
                        value={link}
                    />
                    <label htmlFor="link">URL</label>
                </div>
            </div>
            <div className="col m2 s12" style={{ paddingTop: '2rem'}}>
                <div className="input-field">
                <button
                    className="btn"
                    style={{ marginRight: 10 }}
                    onClick={clickHandler}
                    >
                    Create
                </button>
                </div>
            </div>
        </div>
    );
}