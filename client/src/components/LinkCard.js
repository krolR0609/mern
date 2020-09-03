import React from 'react';

export const LinkCard = ({ link }) => {
    const shortLink = window.location.origin.toString() + '/t/' + link.code;
    return (
        <div>
            <h2>Link</h2>
            <p>Short link: <a href={shortLink} target="_blank" rel="noopener noreferrer">{shortLink}</a></p>
            <p>Original link: <a href={link.from} target="_blank" rel="noopener noreferrer">{link.from}</a></p>
            <p>Clicks: <strong>{link.clicks}</strong></p>
            <p>Creation date: <strong>{new Date(link.date).toLocaleDateString()}</strong></p>
        </div>
    );
}