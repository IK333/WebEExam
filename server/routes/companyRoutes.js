const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Company = require('../models/Company');

// Get all companies
router.get('/', async(req, res) => {
    try {
        const { search } = req.query;
        let query = {};

        if (search) {
            query = {
                $or: [
                    { name: { $regex: search, $options: 'i' } },
                    { sector: { $regex: search, $options: 'i' } }
                ]
            };
        }

        const companies = await Company.find(query).sort({ name: 1 });
        res.json(companies);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// Add new company (admin only)
router.post('/', auth, async(req, res) => {
    try {
        const { name, sector, logo, headquarter, founded, description } = req.body;

        const newCompany = new Company({
            name,
            sector,
            logo,
            headquarter,
            founded,
            description
        });

        const company = await newCompany.save();
        res.json(company);
    } catch (err) {
        console.error(err.message);
        if (err.code === 11000) {
            return res.status(400).json({ msg: 'Company already exists' });
        }
        res.status(500).send('Server Error');
    }
});

// Update company (admin only)
router.put('/:id', auth, async(req, res) => {
    try {
        const { name, sector, logo, headquarter, founded, description } = req.body;

        const companyFields = {
            name,
            sector,
            logo,
            headquarter,
            founded,
            description
        };

        let company = await Company.findById(req.params.id);

        if (!company) {
            return res.status(404).json({ msg: 'Company not found' });
        }

        company = await Company.findByIdAndUpdate(
            req.params.id, { $set: companyFields }, { new: true }
        );

        res.json(company);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// Delete company (admin only)
router.delete('/:id', auth, async(req, res) => {
    try {
        const company = await Company.findById(req.params.id);

        if (!company) {
            return res.status(404).json({ msg: 'Company not found' });
        }

        await Company.findByIdAndRemove(req.params.id);
        res.json({ msg: 'Company removed' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;