import React from 'react';

export const LinkCard = ({ link }) => {
    return (
        <div>
            <h2>Link</h2>
            <p>Short link: <a href={link.code} target="_blank" rel="noopener noreferrer">{link.code}</a></p>
            <p>Original link: <a href={link.from} target="_blank" rel="noopener noreferrer">{link.from}</a></p>
            <p>Clicks: <strong>{link.clicks}</strong></p>
            <p>Creation date: <strong>{new Date(link.date).toLocaleDateString()}</strong></p>
        </div>
    );
}