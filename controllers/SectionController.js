const Section = require("../models/Sections")

const SectionController = {
  create: async function (req, res) {
    try {
      const newSection = new Section({ ...req.body });
      const saveSection = await newSection.save();
      res.status(200).send({type:'success',text:'Tạo page thành công'});
    } catch (e) {
      res.status(500).send({
        type:'error',
        text:e.message
      });
    }
  },
  delete: async function (req, res) {
    try {
      const deleteSection = await Section.deleteOne({id:req.params.id});
      const sections = await Section.find();
      res.status(200).send(sections);
    } catch (e) {
      res.status(500).send(e.message);
    }
  },
  get: async function (req, res) {
    try {
      const sections = await Section.find();
      res.status(200).send(sections);
    } catch (e) {
      res.status(500).send(e.message);
    }
  },
};


module.exports = SectionController