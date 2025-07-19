import mongoose from 'mongoose'

const ProjectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Title is required']
    },
    technologies: {
      type: String,
      required: [true, 'Technologies are required']
    },
    firstname: String,
    lastname: String,
    email: String,
    completion: Date,
    description: String
  },
  { timestamps: true }
)

export default mongoose.model('Project', ProjectSchema)
