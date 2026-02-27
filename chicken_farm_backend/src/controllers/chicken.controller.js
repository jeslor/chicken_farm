import {
  getChickensService,
  addChickenService,
  deleteChickenService,
} from '../services/chicken.service.js';

export async function getChickens(req, res) {
  try {
    const chickens = await getChickensService();

    res.json(chickens);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export async function addChicken(req, res) {
  try {
    const chicken = await addChickenService(req.body);
    res.status(201).json(chicken);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

export async function deleteChicken(req, res) {
  try {
    await deleteChickenService(req.params.id);
    res.status(204).end();
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
}
