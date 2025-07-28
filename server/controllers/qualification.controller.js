import Qualification from '../models/qualification.model.js';

export const create = async (req, res) => {
  try {
    const { title, institution } = req.body;

    if (!title || !institution) {
      return res.status(400).json({ error: 'Both title and institution are required.' });
    }

    const qualification = new Qualification({ title, institution });
    await qualification.save();
    res.status(201).json(qualification);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create qualification' });
  }
};




export const list = async (req, res) => {
  try {
    const qualifications = await Qualification.find();
    res.json(qualifications);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const read = async (req, res) => {
  try {
    const qualification = await Qualification.findById(req.params.id);
    res.json(qualification);
  } catch (err) {
    res.status(404).json({ error: 'Not Found' });
  }
};

export const update = async (req, res) => {
  try {
    const qualification = await Qualification.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(qualification);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const remove = async (req, res) => {
  try {
    await Qualification.findByIdAndDelete(req.params.id);
    res.json({ message: 'Qualification deleted' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const removeAll = async (req, res) => {
  try {
    await Qualification.deleteMany();
    res.json({ message: 'All qualifications deleted' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
