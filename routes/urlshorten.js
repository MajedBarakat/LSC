const mongoose = require('mongoose');
const express = require('express');
const validUrl = require('valid-url');
const UrlShorten = mongoose.model('UrlShorten');
const constants = require('../config/constants');
const shortCode = require('../middlewares/uniqueUrlCode');
const path = require("path");

module.exports = app => {
  app.get('/api/item/:code', async (req, res) => {
    const urlCode = req.params.code;
    const item = await UrlShorten.findOne({ urlCode: urlCode });
    if (item) {
      return res.redirect(item.originalUrl);
    } else {
      return res.redirect(constants.errorUrl);
    }
  });

  app.get('/:code', async (req, res) => {
    const urlCode = req.params.code;
    const item = await UrlShorten.findOne({ urlCode: urlCode });
    if (item) {
      return res.redirect(item.originalUrl);
    } else {
      return res.redirect(constants.errorUrl);
    }
  });

  app.post('/api/item', async (req, res) => {
    const { shortBaseUrl, originalUrl } = req.body;
    if (validUrl.isUri(shortBaseUrl)) {
    } else {
      return res.status(404).json('Invalid Base Url format');
    }

    const updatedAt = new Date();
    const queryOptions = { originalUrl };
    if (validUrl.isUri(originalUrl)) {
      let urlData;
      
      try {

        if (!urlData) {
          // Find the item is in the database
          urlData = await UrlShorten.findOne(queryOptions).exec();
        }
        if (urlData) {
          res.status(200).json(urlData);
        } else {
          const urlCode = shortCode.generate();
          shortUrl = shortBaseUrl + '/' + urlCode;
          const itemToBeSaved = { originalUrl, shortUrl, urlCode, updatedAt };

          // Add the item to db
          const item = new UrlShorten(itemToBeSaved);
          await item.save();

          res.status(200).json(itemToBeSaved);
        }
      } catch (err) {
        res.status(401).json('Invalid User Id');
      }
    } else {
      return res.status(401).json('Invalid Original Url.');
    }
  });

  // Serve static assets if in production
  if (process.env.NODE_ENV === 'production') {
    // Set static folder
    app.use(express.static('front/build'));

    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'front', 'build', 'index.html'));
    });
  }
};