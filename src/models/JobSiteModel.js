const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let jobSiteSchema = new Schema(
  {
    jobSiteId: {
      type: Number,
      unique: true,
      required: true,
    },
    name: {
      type: String,
      unique: false,
      required: true,
    },
    url: {
      type: String,
      unique: false,
      required: false,
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
  //ret.createdAt = new Date(ret.createdAt).toString();
  //ret.updatedAt = new Date(ret.updatedAt).toString();

  let idObj = {id: ret._id};
  delete ret._id;

  return Object.assign({}, idObj, ret);
};

module.exports = mongoose.model('jobSite', jobSiteSchema);
