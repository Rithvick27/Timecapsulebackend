const express = require("express");
const router = express.Router();
const fetchuser = require("../middlewares/fetchuser");
const Data = require("../models/Data");
const { body, validationResult } = require("express-validator");
//GETING THE DATA OF THE USER
router.get("/getthedata", fetchuser, async (req, res) => {
  //getting the user from the miidleware and then passing it into this and getting the finding theuser user  using its id extracted from the webtoken
  try {
    const data = await Data.find({ user: req.user.id });

    res.json(data);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("INTERNAL SERVER ERROR");
  }
});
//ADDING THE DATA
router.post(
  "/addthedata",
  fetchuser,
  [
    body("text", "Enter a valid message").isLength({ min: 3 }),
    body("date", "Enter a valid date").trim().isDate(),
  ],
  async (req, res) => {
    const { text, date } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const daata = new Data({
        //jis name se define kroge
        text,
        date,
        user: req.user.id,
      });
      const savedata = await daata.save(); //wohi name is here used

      res.json(savedata);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("INTERNAL SERVER ERROR");
    }
  }
);
//DELETING THE DATA
router.delete(
  "/delthedata/:id",
  fetchuser,

  async (req, res) => {
    const { text, date } = req.body;
    try {
      let data = await Data.findById(req.params.id); //FINDING THE NODE BY ID RECEIVED FROM PARAMSS
      if (!data) {
        return res.status(404).send("NOT FOUND");
      }
      if (data.user.toString() !== req.user.id) {
        return res.status(401).send("NOT ALLOWED");
      }

      data = await Data.findByIdAndDelete(req.params.id);
      res.json({ SUCCESS: "Note has been deleted" });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("INTERNAL SERVER ERROR");
    }
  }
);
module.exports = router;
