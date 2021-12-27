const express = require("express");
const router = express.Router();
const AddText = require("../models/textModel");
const CountText = require("../models/countModel");

router.get("/", async (req, res) => {
  try {
    const textList = await AddText.find();
    res.json(textList);
  } catch (err) {
    res.send("Error " + err);
  }
});

router.post("/add", async (req, res) => {
  const alien = new AddText({
    text: req.body.text,
    textId: req.body.textId,
    windowName: req.body.windowName,
  });
  try {
    const a1 = await alien.save();

    const countText = await CountText.find();
    const filteredArr = []
    for(let obj in countText) {
      if(countText[obj]["windowName"] === req.body.windowName){
        filteredArr.push(obj)
        break;
      }
    }
    if(countText.length === 0 || filteredArr.length === 0){
      let countTextObj = new CountText({
        addCount: 1,
        updateCount: 0,
        windowName: req.body.windowName,
      });
      const newElem = await countTextObj.save();

    }
    else {
      const elem = await CountText.findOne({ windowName: req.body.windowName });
      elem.addCount = elem.addCount + 1;
      const elemRes = await elem.save();
    }

    res.json(a1);
  } catch (err) {
    res.send(err);
  }
});

router.patch("/update", async (req, res) => {
  try {
    const textList = await AddText.find();
    let toUpdateText = {};
    for (let obj in textList) {
      if (
        textList[obj].windowName == req.body.windowName &&
        textList[obj].textId == req.body.textId
      ) {
        toUpdateText = textList[obj];
      }
    }
    if (toUpdateText === {}) res.send("No Entry Present");
    toUpdateText["text"] = req.body.text;
    const a1 = await toUpdateText.save();
    const elem = await CountText.findOne({ windowName: req.body.windowName });
    elem.updateCount = elem.updateCount + 1;
    const elemRes = await elem.save();
    res.json(a1);
  } catch (err) {
    res.send(err);
  }
});

module.exports = router;
