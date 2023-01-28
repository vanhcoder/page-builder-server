const Pages = require("../models/Pages");
const Sections = require("../models/Sections");
var ObjectId = require("mongodb").ObjectId;
const PageController = {
  create: async function (req, res) {
    try {
      const newPage = new Pages({ ...req.body });
      const savePage = await newPage.save();
      res.status(200).send({ type: "success", text: "Tạo page thành công" });
    } catch (e) {
      res.status(500).send({
        type: "error",
        text: e.message,
      });
    }
  },
  updatePage: async function (req, res) {
    try {
      const { slug } = req.body;
      const { sections , _id, ...other } = req.body;
      const updatePage = await Pages.update(
        { slug: req.params.slug },
        {
          $set: {
            ...other
          },
        },
        { new: true }
      );
      await superUpdatePage(
        sections,
        slug,
        (sectionNew, sectionsUpdate, sectionDelete) => {
          try {
            Promise.all([
              deleteSections(sectionDelete, slug),
              createSections(sectionNew, slug),
              updateSections(sectionsUpdate, slug),
            ]).then((values) => {
              res.status(200).send("update thành công");
            });
          } catch (error) {console.log(error)}
        }
      );
    } catch (e) {
      res.status(500).send({
        type: "error",
        text: e.message,
      });
    }
  },
  delete: async function (req, res) {
    try {
      const pages = await Pages.find({ slug: req.params.slug });
      console.log(pages[0].sectionId)
      const listSection = pages[0].sectionId;
      const deletepages = await Pages.deleteOne({ slug: req.params.slug }); 
      deleteSections(listSection, req.params.slug);
      const newPages = await Pages.find();
      res.status(200).send(newPages);
    } catch (e) {
      res.status(500).send(e.message);
    }
  },
  get: async function (req, res) {
    try {
      const pages = await Pages.find();
      getPage(pages, (data) => {
        res.status(200).send(data);
      });
    } catch (e) {
      res.status(404).send(e.message);
    }
  },
  getBySlug: async function (req, res) {
    try {
      const page = await Pages.findOne({ slug: req.params.slug });
      let dataRes = {};
      if(page) {
        getSections(page.sectionId, (data) => {
          const { name, slug, _id , container} = page._doc;
          dataRes = {
            _id,
            name,
            slug,
            container,
            sections: [...data],
          };2
          res.status(200).send(dataRes);
        });
      }else{
        res.status(404).json({ code : 404, message:"Couldn't find page"})
      }
    } catch (e) {
      res.status(500).send(e.message);
    }
  },
};

async function getPage(list, callback) {
  const pages = [];
  for (let i = 0; i < list.length; i++) {
    const page = {
      ...list[i]._doc,
      sectionId: [],
    };
    for (let j = 0; j < list[i].sectionId.length; j++) {
      const result = await Sections.findById([list[i].sectionId[j]]);
      page.sectionId.push(result);
    }
    pages.push(page);
  }
  callback(pages);
}

async function getSections(list, callback) {
  const sectionsList = [];
  for (let i = 0; i < list.length; i++) {
    const result = await Sections.findById([list[i]]);
    sectionsList.push(result);
  }
  callback(sectionsList);
}


async function superUpdatePage(sectionsRequest, slug, callback) {
  try {
    const sectionsUpdate = [];
    let sectionsOld = [];
    const sectionsRequestId = [];
    const section = await Pages.find({ slug: slug });
    sectionsOld = [...section[0].sectionId];
    for (let i = 0; i < sectionsRequest.length; i++) {
      sectionsRequestId.push(sectionsRequest[i]._id);
      for (let j = 0; j < sectionsOld.length; j++) {
        if (sectionsRequest[i]._id === sectionsOld[j]) {
          sectionsUpdate.push(sectionsRequest[i]);
        }
      }
    }
    const sectionNew = sectionsRequest.filter(
      (x) => !sectionsOld.includes(x._id)
    );
    const sectionDelete = sectionsOld.filter(
      (x) => !sectionsRequestId.includes(x)
    );
    callback(sectionNew, sectionsUpdate, sectionDelete);
  } catch (e) {
    console.log(e);
  }
}

async function createSections(sections , slug) {
  try {
    for (let i = 0; i < sections.length; i++) {
      const update = await new Sections({ ...sections[i] });
      const saveSection = await update.save();
      const updatePage = await Pages.update(
        { slug: slug },
        { $push: { sectionId: saveSection._id.toString() } },
        { new: true }
      );
    }
  } catch (error) {
    console.log(error);
  }
}
async function deleteSections(sections, slug) {
  try {
    const deleteSection = await Sections.deleteMany({
      _id: { $in: [...sections] },
    });
    const updatePage = await Pages.updateMany(
      { slug: slug },
      { $pull: { sectionId: { $in: [...sections] } } },
      { new: true }
    );
  } catch (error) {
    console.log(error);
  }
}
async function updateSections(sections,slug) {
  try {
    for (let i = 0; i < sections.length; i++) {
      const { _id, ...other } = sections[i];
      const update = await Sections.findByIdAndUpdate(
        _id,
        {
          $set: {
            ...other,
          },
        },
        { new: true }
      );
    }
  } catch (error) {
    console.log(error);
  }
  
}









/* async function updateSections212(sections, slug) {
  try {
    for (let i = 0; i < sections.length; i++) {
      const section = await Sections.find({ _id: sections[i]._id });
      if (section.length > 0) {
        const { _id, ...other } = sections[i];
        const update = await Sections.findByIdAndUpdate(
          _id,
          {
            $set: {
              ...other,
            },
          },
          { new: true }
        );
      } else {
        const update = await new Sections({ ...sections[i] });
        const saveSection = await update.save();
        const updatePage = await Pages.update(
          { slug: slug },
          { $push: { sectionId: saveSection._id.toString() } },
          { new: true }
        );
        console.log(updatePage);
      }
    }
  } catch (err) {
    console.log(err);
  }
} */

module.exports = PageController;
