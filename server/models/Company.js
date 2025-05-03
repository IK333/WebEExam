const mongoose = require('mongoose');

const CompanySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    sector: {
        type: String,
        required: true
    },
    logo: {
        type: String,
        default: 'https://via.placeholder.com/150'
    },
    headquarter: {
        type: String,
        required: true
    },
    founded: {
        type: Number,
        required: true
    },
    description: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Company', CompanySchema);