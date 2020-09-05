import React from 'react'
import { Link } from 'react-router-dom';

export const LinksList = ({ links }) => {
    if (!links.length) {
        return <p className="center">No links</p>
    }

    return (
        <table className="responsive-table">
            <thead>
                <tr>
                    <th>#</th>
                    <th>Origin</th>
                    <th>Destination</th>
                    <th>Open</th>
                </tr>
            </thead>
            <tbody>
            {
                links.map((link, index) => {
                    return (
                        <tr key={link._id}>
                            <td>{++index}</td>
                            <td>{link.from}</td>
                            <td>{link.shortUrl}</td>
                            <td>
                                <Link to={`/detail/${link._id}`}>Open</Link>
                            </td>
                        </tr>
                    )    
                })        
            }
            </tbody>
        </table>
    );
};