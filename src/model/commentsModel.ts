import { DataTypes } from "sequelize";
import dbConnect from "../config/dbConnect.js";
import { nanoid } from "nanoid";
import Posts from "./postsModel.js";
import Users from "./usersModel.js";
const Comments = dbConnect.define(
  "Comments",
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      defaultValue: () => nanoid(6),
    },
    post_id: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: Posts,
        key: "id",
      },
    },
    user_id: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: Users,
        key: "id",
      },
    },
    comment: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    parentId: {
      type: DataTypes.STRING,
      defaultValue: null,
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
Posts.hasMany(Comments, { foreignKey: "post_id" });
Comments.belongsTo(Posts, { foreignKey: "post_id" });

Users.hasMany(Comments, { foreignKey: "user_id" });
Comments.belongsTo(Users, { foreignKey: "user_id" });

Comments.hasMany(Comments, { foreignKey: "parentId", as: "replies" });
Comments.belongsTo(Comments, { foreignKey: "parentId", as: "parentComment" });

Comments.sync()
  .then(() => {
    console.log("Comments created successfully");
  })
  .catch((error) => {
    console.log("Error creating comment", error);
  });
export default Comments;
