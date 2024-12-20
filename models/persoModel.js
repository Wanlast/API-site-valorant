import mongoose from "mongoose";

const persoSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "The name is a required property."],
    unique: [true, "The name is already taken."],
    trim: true,
    set: (value) =>
      value.charAt(0).toUpperCase() + value.slice(1).toLowerCase(),
  },
  role: {
    type: String,
    required: [true, "The role is a required property."],
    enum: {
      values: ["duelist", "controller", "sentinel", "initiator"],
      message:
        "You need to select a role from this list: duelist, controller, sentinel, initiator.",
    },
    trim: true,
    set: (value) => value.toLowerCase(), // Convertit la valeur en minuscule avant validation
  },
  ultimate: {
    type: String,
    required: [true, "The ultimate is a required property"],
    trim: true,
    set: (value) =>
      value.charAt(0).toUpperCase() + value.slice(1).toLowerCase(),
  },
  picture: {
    type: String,
    required: [true, "The picture is a required property"],
    validate: {
      validator: function (url) {
        const urlRegex =
          /^(https?:\/\/)?([a-z0-9-]+\.)+[a-z]{2,6}(\/[^\s]*)?$/i;
        return urlRegex.test(url);
      },
      message: (props) =>
        `${props.value} n'est pas une URL valide. Utilisez uniquement une URL valide pour l'image.`,
    },
  },
});

const persoModel = mongoose.model("persoModel", persoSchema);

export default persoModel;
