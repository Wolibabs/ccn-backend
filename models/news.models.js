const mongoose = require('mongoose');


const newsSchema = new mongoose.Schema({
title: {
     type: String,
      required: true, 
    },
body: { 
    type: String,
     required: true,
     },
author: {
     type: mongoose.Schema.Types.ObjectId,
      ref: 'User', 
      required: true, 
    },
publishedAt: { 
    type: Date,
     default: Date.now,
     },
}, {
     timestamps: true,
     versionKey: false
    });

    const News = mongoose.model('News', newsSchema);    
    module.exports = News;
