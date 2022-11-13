"use strict";

var express = require("express");

var router = express.Router();

var cribData = require("../../data/apiData");

var redis = require("redis");

var client = redis.createClient({
  port: 6379
});

var cribInputValidate = require("../../validation/cribInputValidate");

client.connect().then(function () {
  return console.log("Successfully connected to the redis client");
})["catch"](function (err) {
  return console.error("Error connecting to the client.");
}); //Get all cribs

router.get("/cribs", function _callee(req, res) {
  var cribs;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(client.get("Cribs"));

        case 2:
          cribs = _context.sent;

          if (!cribs) {
            _context.next = 7;
            break;
          }

          return _context.abrupt("return", res.status(200).json(JSON.parse(cribs)));

        case 7:
          _context.next = 9;
          return regeneratorRuntime.awrap(client.setEx("Cribs", 5, JSON.stringify(cribData)));

        case 9:
          return _context.abrupt("return", res.status(200).json(cribData));

        case 10:
        case "end":
          return _context.stop();
      }
    }
  });
}); //Gets crib with the id passed as parameter

router.get("/cribs/:id", function _callee2(req, res) {
  var cribId, cribWithId;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return regeneratorRuntime.awrap(client.get("Cribs" + req.params.id));

        case 2:
          cribId = _context2.sent;

          if (!cribId) {
            _context2.next = 5;
            break;
          }

          return _context2.abrupt("return", res.status(200).json(JSON.parse(cribId)));

        case 5:
          //Check if crib with the id exists
          cribWithId = cribData.filter(function (e) {
            return e.id === Number(req.params.id);
          });

          if (!(cribWithId.length > 0)) {
            _context2.next = 10;
            break;
          }

          _context2.next = 9;
          return regeneratorRuntime.awrap(client.setEx("Cribs" + req.params.id, 120, JSON.stringify(cribWithId)));

        case 9:
          return _context2.abrupt("return", res.status(200).json(cribWithId));

        case 10:
          return _context2.abrupt("return", res.status(404).json("Crib with id ".concat(req.params.id, " not found")));

        case 11:
        case "end":
          return _context2.stop();
      }
    }
  });
}); //Add a crib to cribData

router.post("/cribs", function _callee3(req, res) {
  var _cribInputValidate, errors, isValid, newCrib;

  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          //Validate request body if there is any null value
          _cribInputValidate = cribInputValidate(req.body), errors = _cribInputValidate.errors, isValid = _cribInputValidate.isValid;

          if (isValid) {
            _context3.next = 3;
            break;
          }

          return _context3.abrupt("return", res.status(400).json(errors));

        case 3:
          newCrib = {
            id: cribData.length + 1,
            name: req.body.name,
            img: req.body.img,
            location: req.body.location
          };
          cribData.push(newCrib);
          return _context3.abrupt("return", res.status(201).json(cribData));

        case 6:
        case "end":
          return _context3.stop();
      }
    }
  });
}); //Updates crib with id

router.put("/cribs/:id", function _callee4(req, res) {
  var cribWithId, _cribInputValidate2, errors, isValid;

  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          //Check if crib with the id exists
          cribWithId = cribData.findIndex(function (e) {
            return e.id === Number(req.params.id);
          });

          if (!(cribWithId >= 0)) {
            _context4.next = 9;
            break;
          }

          //Validate request body if there is any null value
          _cribInputValidate2 = cribInputValidate(req.body), errors = _cribInputValidate2.errors, isValid = _cribInputValidate2.isValid;

          if (isValid) {
            _context4.next = 5;
            break;
          }

          return _context4.abrupt("return", res.status(400).json(errors));

        case 5:
          cribData[cribWithId].name = req.body.name;
          cribData[cribWithId].img = req.body.img;
          cribData[cribWithId].location = req.body.location;
          return _context4.abrupt("return", res.status(200).json(cribData));

        case 9:
          return _context4.abrupt("return", res.status(404).json("Crib with id ".concat(req.params.id, " not found")));

        case 10:
        case "end":
          return _context4.stop();
      }
    }
  });
}); //Deletes crib with id

router["delete"]("/cribs/:id", function _callee5(req, res) {
  var cribId, cribWithId;
  return regeneratorRuntime.async(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.next = 2;
          return regeneratorRuntime.awrap(client.get("Cribs" + req.params.id));

        case 2:
          cribId = _context5.sent;

          if (!cribId) {
            _context5.next = 6;
            break;
          }

          _context5.next = 6;
          return regeneratorRuntime.awrap(client.del("Cribs" + req.params.id));

        case 6:
          //Check whether the crib with id exists
          cribWithId = cribData.findIndex(function (e) {
            return e.id === Number(req.params.id);
          });

          if (!(cribWithId >= 0)) {
            _context5.next = 10;
            break;
          }

          cribData.splice(cribWithId, 1);
          return _context5.abrupt("return", res.status(200).json(cribData));

        case 10:
          return _context5.abrupt("return", res.status(404).json("Crib with id ".concat(req.params.id, " not found")));

        case 11:
        case "end":
          return _context5.stop();
      }
    }
  });
});
module.exports = router;