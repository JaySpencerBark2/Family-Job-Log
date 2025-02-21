const mongoose = require('mongoose');

const jobTypeSchema = new mongoose.Schema({
    jobType: {
        type: String,
        default: ""
    },
}, { collection: 'JobType' });

module.exports = mongoose.model('JobType', jobTypeSchema);