const express = require("express");
const router = express.Router();
const PhoneNumber = require("../models").PhoneNumber;
const Provider = require("../models").Provider;
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

router.get("/", function(req, res) {
  PhoneNumber.findAll({
    include: [{
      association: "provider"
    }],
    order: [['id', 'ASC']]
  })
    .then(phone_numbers => {
      if (phone_numbers.length) {
        res.status(200).send({
          success: true,
          msg: phone_numbers
        });
      } else {
        res.status(200).send({
          success: false,
          msg: phone_numbers
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

router.post("/", function(req, res) {
  PhoneNumber.create({
    number: req.body.number,
    provider_id: req.body.provider_id
  })
    .then(phone_number =>
      res.status(201).send({
        success: true,
        msg: phone_number
      })
    )
    .catch(async error => {
      res.status(400).send({
        success: false,
        msg: error
      });
    });
});


router.post("/auto", async function(req, res) {
  const providers = await Provider.findAll();
  const provider_id_array = await providers.map(provider => {
    return provider.id;
  })
  try {
    for (let i = 1; i < 501; i++) {
      const newDAta = {
        number: Math.floor(Math.random() * (89999999999 - 81000000000) ) + 81000000000,
        provider_id: await provider_id_array[Math.floor(Math.random() * provider_id_array.length)]
      }
      PhoneNumber.create(newDAta).then(() => {
        if(i == 500) {
          res.status(200).send({
            success: true
          });
        }
      })
    }
  } catch (error) {
    res.status(400).send({
      success: false,
      msg: error
    });
  }

});

router.get("/:id", function(req, res) {
  PhoneNumber.findByPk(req.params.id, { include: "provider" })
    .then(phone_number => {
      if (phone_number) {
        res.status(200).send({
          success: true,
          msg: phone_number
        });
      } else {
        res.status(404).send({
          success: false,
          msg: phone_number
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

router.put("/:id", function(req, res) {
  PhoneNumber.findByPk(req.params.id)
    .then(phone_number => {
      if (phone_number) {
        phone_number.number = req.body.number;
        phone_number.provider_id = req.body.provider_id;
        phone_number
          .save()
          .then(phone_number => {
            res.status(200).send({
              success: true,
              msg: phone_number
            });
          })
          .catch(error => {
            res.status(400).send({
              success: false,
              msg: error
            });
          });
      } else {
        res.status(404).send({
          success: false,
          msg: phone_number
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

router.delete("/all", function(req, res) {
  PhoneNumber.destroy({
    where: {},
    truncate: true
  })
    .then(phone_number => {
      res.status(200).send({
        success: true,
        msg: "Data nomor telefon telah dihapus"
      });
    })
    .catch(async error =>
      res.status(400).send({
        success: false,
        msg: error
      })
    );
});

router.delete("/:id", function(req, res) {
  PhoneNumber.findByPk(req.params.id)
    .then(phone_number => {
      if (phone_number) {
        phone_number.destroy().then(() => {
          res.status(200).send({
            success: true,
            msg: "Data nomor telefon telah dihapus"
          });
        });
      } else {
        res.status(404).send({
          success: false,
          msg: "Tidak ditemukan nomor telefon dengan id" + req.params.id
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
