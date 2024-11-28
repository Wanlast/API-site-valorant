import persoModel from "../models/persoModel.js";
import mongoose from "mongoose";
import { defaultPersos } from "../data/defaultPersos.js";

export const initDefaultPersos = async (req, res) => {
  for (const agent of defaultPersos) {
    const existingPerso = await persoModel.findOne({ name: agent.name });
    if (!existingPerso) {
      await persoModel.create(agent);
    }
  }
};

export const getPersos = async (req, res) => {
  const persos = await persoModel.find({});
  res.send(persos);
};

export const getPerso = async (req, res) => {
  const perso = await persoModel.findOne({ name: req.params.name });
  if (!perso) {
    return res.status(404).send("No Agent Found");
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
    return res.status(404).send("No Agent Found");
  }
  res.status(200).send({
    message: `The agent "${perso.name}" has been successfully updated`,
    updatedAgent: perso,
  });
};

export const deletePerso = async (req, res) => {
  const perso = await persoModel.findOneAndDelete({ name: req.params.name });
  if (!perso) {
    return res.status(404).send("No Agent Found");
  }
  res
    .status(200)
    .send(`The agent "${perso.name}" has been successfully deleted`);
};
