const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");
const adapter = new FileSync("db.json");
const db = low(adapter);

exports.createPlot = async (req, res, next) => {
  try {
    const plot = await db
      .get("plots")
      .push(req.body)
      .last()
      .assign({ id: Date.now().toString() })
      .write();
    res.send(plot);
  } catch (e) {
    console.log(e);
    res.send(e);
  }
};

exports.getPlots = async (req, res, next) => {
  try {
    const plots = await db.get("plots").filter({ colonyId: req.query.id });
    res.send(plots);
  } catch (e) {
    console.log(e);
    res.send(e);
  }
};
