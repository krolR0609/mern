import React from 'react';

export const LinkCard = ({ link }) => {
    return (
        <div>
            <h2>Link</h2>
            <p>Short link: <a href={'/t/' + link.code} target="_blank" rel="noopener noreferrer">{'/t/' + link.code}</a></p>
            <p>Original link: <a href={link.from} target="_blank" rel="noopener noreferrer">{link.from}</a></p>
            <p>Clicks: <strong>{link.clicks}</strong></p>
            <p>Creation date: <strong>{new Date(link.date).toLocaleDateString()}</strong></p>
        </div>
    );
}