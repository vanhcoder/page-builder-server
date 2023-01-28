const Header = require("../models/Header");
var ObjectId = require("mongodb").ObjectId;


const HeaderController = {
  create: async function (req, res) {
    try {
      const newHeader = new Header({ ...req.body });
      const saveHeader = await newHeader.save();
      res.status(200).send({ type: "success", text: "Tạo page thành công" });
    } catch (e) {
      res.status(500).send({
        type: "error",
        text: e.message,
      });
    }
  },
  updateHeader: async function (req, res) {
    try {
      console.log(req.body)
      const header = await Header.update({name: req.params.name} , req.body , { new: true });
      const headerData = await Header.find({name: req.params.name});
      res.status(200).send(headerData)
    } catch (e) {
      res.status(404).send(e.message);
    }
  },
  get: async function (req, res) {
    try {
      const pages = await Header.find();
      res.status(404).send(pages)
    } catch (e) {
      res.status(404).send(e.message);
    }
  },
  getByName: async function (req, res) {
    try {
      const pages = await Header.find({name: req.params.name});
      res.status(200).send(pages)
    } catch (e) {
      res.status(404).send(e.message);
    }
  },
};



module.exports = HeaderController;
