const { Router } = require('express');
const shortid = require('shortid');
const Link = require('../models/Link');
const { MapLink } = require('../helpers/LinkHelper');
const auth = require('../middleware/auth.middleware');
const config = require('config');

const router = Router();

router.post('/generate', auth, async (req, res) => {
    try {
        const { from } = req.body;
        
        const code = shortid.generate();

        const existing = await Link.findOne({ from });
        if (existing) {
            return res.json({ link: existing });
        }

        const link = new Link({
            code, from, owner: req.user.userId
        })

        await link.save();

        res.status(201).json({ link });

    } catch (err) {
        res.status(500).json({ message: 'Something went wrong, try again' });
    }
});

router.get('/', auth, async (req, res) => {
    try {
        var baseUrl = req.protocol + '://' + req.get('host') + "/t/";
        const links = await Link.find({ owner: req.user.userId });
        res.status(200).json(links.map(link => {
            return MapLink(link, baseUrl)
        }));        
    } catch (err) {
        res.status(500).json({ message: 'Something went wrong, try again' });
    }
});

router.get('/:id', auth, async (req, res) => {
    try {
        var baseUrl = req.protocol + '://' + req.get('host') + "/t/";
        const link = await Link.findById(req.params.id);
        const mappedLink = MapLink(link, baseUrl);
        res.status(200).json(mappedLink);        
    } catch (err) {
        res.status(500).json({ message: 'Something went wrong, try again' });
    }
});

module.exports = router;