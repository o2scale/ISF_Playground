const mongoose = require("mongoose");

const roleSchema = new mongoose.Schema(
  {
    roleName: { type: String, required: true, unique: true },
    permissions: [
      {
        module: { type: String, required: true }, // Module name (e.g., User Management, shop)
        actions: [
          { type: String, enum: ["Create", "Read", "Update", "Delete", "Manage"] }, // Allowed actions (Manage added for shop module)
        ],
      },
    ],
  },
  { timestamps: true }
);

const Role = mongoose.model("Role", roleSchema);

module.exports = Role;
