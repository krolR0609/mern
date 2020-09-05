function MapLink(link, baseUrl) {
    link.shortUrl = baseUrl + link.code; 
    return link;
}

module.exports = { MapLink };