const express = require("express");
const router = express.Router();
const Users = require("../Models/User");

router.get("/count", (req, res) => {
  Users.countDocuments({}, function (err, count) {
    if (err) {
      console.log(err);
    } else {
      res.json(count);
    }
  });
});

router.get("/", (req, res) => {
  Users.find({})
    .sort({ created_date: "desc" })
    .limit(10)
    .exec((err, users) => {
      if (err) {
        res.send("Couldn't fetch users.");
      } else {
        res.status(201).send(users);
      }
    });
});

router.post("/add", (req, res) => {
  const newUser = req.body;
  console.log(newUser);
  Users.create(newUser, (err) => {
    if (err) {
      res.send("Couldn't add New User.");
    } else {
      res.status(201).send("User added!");
    }
  });
});

router.get("/filter/text", (req, res) => {
  const columnToFilter = req.query.column;
  const dataToMatch = req.query.data;
  const recordsPerPage = parseInt(req.query.recordsPerPage);
  const currentTablePage = parseInt(req.query.pageNumber);
  const orderAscOrDec = req.query.order;
  const columnToOrderBy = req.query.orderBy;

  console.log(req.query);
  console.log(dataToMatch);
  console.log(recordsPerPage);
  console.log(currentTablePage);

  Users.find({ [columnToFilter]: { $regex: `^${dataToMatch}` } })
    .sort({ [columnToOrderBy]: orderAscOrDec })
    .skip(recordsPerPage * currentTablePage)
    .limit(recordsPerPage)
    .exec((err, users) => {
      if (err) {
        res.send("Not Filtered :(");
      } else {
        console.log(users);
        res.send("Filtered!");
      }
    });
});

router.get("/filter/date", (req, res) => {
  const columnToFilter = req.query.column;
  const dataToMatch = req.query.data;
  const recordsPerPage = parseInt(req.query.recordsPerPage);
  const currentTablePage = parseInt(req.query.pageNumber);
  const orderAscOrDec = req.query.order;
  const columnToOrderBy = req.query.orderBy;

  console.log(req.query);
  console.log(dataToMatch);
  console.log(recordsPerPage);
  console.log(currentTablePage);

  Users.find({ [columnToFilter]: dataToMatch })
    .sort({ [columnToOrderBy]: orderAscOrDec })
    .skip(recordsPerPage * currentTablePage)
    .limit(recordsPerPage)
    .exec((err, users) => {
      if (err) {
        res.send("Not Filtered :(");
      } else {
        console.log(users);
        res.send("Filtered!");
      }
    });
});

router.get("/paginate", (req, res) => {
  const columnToOrderBy = req.query.column;
  const orderAscOrDec = req.query.orderBy;
  const recordsPerPage = req.query.recordsNumber;
  const currentTablePage = req.query.pageNumber;
  const recordsToSkip = recordsPerPage * currentTablePage;

  Users.find({})
    .sort({ [columnToOrderBy]: [orderAscOrDec] })
    .skip(recordsToSkip)
    .limit(2)
    .exec((err, users) => {
      if (err) {
        res.send("Pagination Failed");
      } else {
        res.status(201).send(users);
      }
    });
});

router.get("/sort", () => {
  a;
});

router.put("/:id/edit", (req, res) => {
  let userToEdit = req.params.id;
  const newUser = req.body.params.userData;
  console.log(newUser);

  Users.findOneAndUpdate(
    { _id: userToEdit },
    newUser,
    { upsert: true, setDefaultsOnInsert: true },
    function (err, users) {
      if (err) {
        res.send("Edit Failed");
      } else {
        res.status(201).send("User Edited Successfully!");
      }
    }
  );
});

router.delete("/:id/delete", (req, res) => {
  const userToDelete = req.params.id;

  Users.deleteOne({ _id: userToDelete }, (err, data) => {
    if (err) {
      res.send("Delete Failed");
    } else {
      res.send("User Deleted");
    }
  });
});

module.exports = router;
