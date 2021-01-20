const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");
const adapter = new FileSync("db.json");
const db = low(adapter);
const fs = require("fs");
const { promisify } = require("util");
const pipeline = promisify(require("stream").pipeline);
const path = "./uploads/material/";

exports.createColony = async (req, res, next) => {
  try {
    const colony = await db
      .get("colonies")
      .push(req.body)
      .last()
      .assign({ id: Date.now().toString() })
      .write();
    res.send(colony);
  } catch (e) {
    console.log(e);
    res.send(e);
  }
};

exports.getColonies = async (req, res, next) => {
  try {
    const colonies = await db.get("colonies");
    res.send(colonies);
  } catch (e) {
    console.log(e);
    res.send(e);
  }
};

exports.uploadMap = async (req, res, next) => {
  const file = req.file;
  try {
    if (file) {
      const name = `map.${req.query.id}.${file.originalname.split(".").pop()}`;
      fs.writeFile(
        `${__dirname}/../../uploads/maps/${name}`,
        file.buffer,
        async () => {
          const colony = await db
            .get("colonies")
            .find({ id: req.query.id })
            .assign({ map: name })
            .write();
          res.send(colony);
        }
      );
    }
  } catch (e) {
    console.log(e);
    res.send(e);
  }
};
