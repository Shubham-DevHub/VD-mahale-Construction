import models from '../models/index.js';

export const getModelByName = (modelName) => {
  return models[modelName];
};

export const getAll = (modelName) => async (req, res) => {
  const Model = getModelByName(modelName);
  try {
    const data = await Model.findAll();
    res.json({ success: true, data });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const createResource = (modelName) => async (req, res) => {
  const Model = getModelByName(modelName);
  try {
    const data = await Model.create(req.body);
    res.json({ success: true, data });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const updateResource = (modelName) => async (req, res) => {
  const Model = getModelByName(modelName);
  try {
    const data = await Model.update(req.body, { where: { id: req.params.id } });
    res.json({ success: true, data });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const deleteResource = (modelName) => async (req, res) => {
  const Model = getModelByName(modelName);
  try {
    await Model.destroy({ where: { id: req.params.id } });
    res.json({ success: true, message: 'Deleted successfully' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
