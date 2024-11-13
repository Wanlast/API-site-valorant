import persoModel from "../models/persoModel.js";
import { defaultPersos } from "../data/defaultPersos.js";

export const getPersos = async (req, res) => {
  const persos = await persoModel.find({});
  res.send({ persos, defaultPersos });
};

export const getPerso = async (req, res) => {
  const perso = await persoModel.findOne({ name: req.params.name });
  if (!perso) {
    return res.status(404).send("Aucun agent trouvé.");
  }
  res.status(200).send(perso);
};

export const addPerso = async (req, res) => {
  const perso = new persoModel(req.body);
  await perso.save();
  res.send(perso);
};

export const updatePerso = async (req, res) => {
  const perso = await persoModel.findOneAndUpdate(
    { name: req.params.name },
    req.body,
    { new: true }
  );
  if (!perso) {
    return res.status(404).send("Aucun agent trouvé.");
  }
  res.status(200).send(perso);
};

export const deletePerso = async (req, res) => {
  const perso = await persoModel.findOneAndDelete({ name: req.params.name });
  if (!perso) {
    return res.status(404).send("Aucun agent trouvé.");
  }
  res.status(200).send("Agent supprimé avec succès.");
};
