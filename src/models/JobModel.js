const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// TODO: Change when integrating another job site
const defaultThumb = `${process.env.APP_URL}/images/reed-logo.png`;

let jobSchema = new Schema(
  {
    jobId: {
      type: Schema.Types.Mixed,
      required: true
    },
    jobSiteId: {
      type: String,
      required: true
    },
    params: {
      type: Schema.Types.Mixed,
      required: true
    },
    thumb: {
      type: String,
      default: defaultThumb
    },
    date: Date,
    isFavourited: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true,
  }
);

jobSchema.index({ jobId: 1, jobSiteId: 1 }, { unique: true });

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
