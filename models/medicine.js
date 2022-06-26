const mongoose = require('mongoose');
const MedicineSchema = new mongoose.Schema({
    Name: { 
        type: String, 
        required: true, 
        trim: true 
    },
    Price: { 
        type: Number, 
        required: true 
    },
    Quantity: {
        type: Number,
        required: true
    },
    Description: {
        type: String,
        required: true,
        trim: true
    },
    Offer: { type: Number },
    ProductPictures: [
        { img: { type: String } }
    ],
    Reviews: [
        {
            userId: {type: mongoose.Schema.Types.ObjectId, ref: 'client'},
            review: String
        }
    ],
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'client', required: true },
    updatedAt: Date,

}, { timestamps: true });


module.exports = mongoose.model('Medicine', MedicineSchema );