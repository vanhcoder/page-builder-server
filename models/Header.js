const mongoose = require("mongoose");

const HeadersSchema = new mongoose.Schema(
  {
    name:{
      type: 'string',
      required: true,
      unique: true,
    },
    color:{
      type: 'string',
    },
    height: {
      type: "string",
    },
    width: {
      type: "string",
    },
    backgroundColor: {
      type: "string",
    },
    boxShadow: {
      type: "string",
    },
    logo: {
      url: {
        type: "string",
      },
      height: {
        type: "string",
      },
      width: {
        type: "string",
      },
      alt: {
        type: "string",
      },
    },
    menu: {
      color: {
        type: "string",
      },
      fontSize: {
        type: "string",
      },
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("headers", HeadersSchema);
