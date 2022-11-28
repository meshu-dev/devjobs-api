const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let jobSchema = new Schema(
  {
    jobId: {
      type: String,
      unique: true,
      required: true,
    },
    jobSiteId: {
      type: String,
      unique: false,
      required: true,
    },
    isFavourited: {
      type: Array,
      unique: false,
      required: false,
    },
    date: {
      type: Number,
      unique: false,
      required: false,
    },
    expirationDate: {
      type: Number,
      unique: false,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

jobSchema.set('toJSON', {
  versionKey: false,
});

jobSchema.options.toJSON.transform = (doc, ret) => {
  ret.createdAt = new Date(ret.createdAt).toString();
  ret.updatedAt = new Date(ret.updatedAt).toString();

  let idObj = {id: ret._id};
  delete ret._id;

  return Object.assign({}, idObj, ret);
};

module.exports = mongoose.model('job', jobSchema);
