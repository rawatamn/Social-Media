import { DataTypes } from "sequelize";
import dbConnect from "../config/dbConnect.js";
import { nanoid } from "nanoid";
import Users from "./usersModel.js";

const Posts = dbConnect.define(
  "Posts",
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      defaultValue: () => nanoid(6),
    },

    user_id: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: Users,
        key: "id",
      },
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    caption: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    isDelete: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    timestamps: true,
    createdAt: "createdAt",
    updatedAt: "updatedAt",
  },
);

Users.hasMany(Posts, { foreignKey: "user_id" });
Posts.belongsTo(Users, { foreignKey: "user_id" });

Posts.sync()
  .then(() => {
    console.log("Posts created successfully");
  })
  .catch((error) => {
    console.log("Error creating table", error);
  });

export default Posts;
