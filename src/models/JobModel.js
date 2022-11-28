const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

let jobSchema = new Schema(
  {
    jobSiteId: {
      type: String,
      unique: false,
      required: true,
    },
    jobParams: {
      type: Array,
      unique: false,
      required: true
    }
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

  let idObj = { id: ret._id };
  delete ret._id;

  return Object.assign({}, idObj, ret);
};

module.exports = mongoose.model('job', jobSchema);
