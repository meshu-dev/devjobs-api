const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let jobSiteSchema = new Schema(
  {
    name: {
      type: String,
      unique: true,
      required: true,
    },
    url: {
      type: String,
      unique: true,
      required: true,
    },
    searchParams: {
      type: Array,
      unique: false,
      required: false,
    }
  },
  {
    timestamps: false
  }
);

jobSiteSchema.set('toJSON', {
  versionKey: false,
});

jobSiteSchema.options.toJSON.transform = (doc, ret) => {
  let idObj = {id: ret._id};
  delete ret._id;

  return Object.assign({}, idObj, ret);
};

module.exports = mongoose.model('jobSite', jobSiteSchema);
