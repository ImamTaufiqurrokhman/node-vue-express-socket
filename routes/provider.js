const express = require("express");
const router = express.Router();
const Provider = require("../models").Provider;
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

router.get("/", function(req, res) {
  Provider.findAll()
    .then(providers => {
      if (providers.length) {
        res.status(200).send({
          success: true,
          msg: providers
        });
      } else {
        res.status(404).send({
          success: false,
          msg: providers
        });
      }
    })
    .catch(async error =>
      res.status(400).send({
        success: false,
        msg: error
      })
    );
});

module.exports = router;
