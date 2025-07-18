import Project from '../models/project.model.js';

export const create = async (req, res) => {
  
  try {
     console.log("🛠️ Received:", req.body);
    const { title, technologies } = req.body;

    if (!title || !technologies) {
      return res.status(400).json({ error: "Title and technologies are required." });
    }

    const project = new Project({ title, technologies });
    await project.save();
    res.status(201).json(project);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};



export const list = async (req, res) => {
  try {
    const projects = await Project.find();
    res.json(projects);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const read = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    res.json(project);
  } catch (err) {
    res.status(404).json({ error: 'Not Found' });
  }
};

export const update = async (req, res) => {
  try {
    const project = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(project);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const remove = async (req, res) => {
  try {
    await Project.findByIdAndDelete(req.params.id);
    res.json({ message: 'Project deleted' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const removeAll = async (req, res) => {
  try {
    await Project.deleteMany();
    res.json({ message: 'All projects deleted' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
