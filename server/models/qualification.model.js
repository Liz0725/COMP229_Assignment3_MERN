import mongoose from 'mongoose';

const QualificationSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  institution: {
    type: String,
    required: true
  }
});

const Qualification = mongoose.model('Qualification', QualificationSchema);
export default Qualification;
