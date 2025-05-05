import { DataTypes } from "sequelize";
import { sequelize } from "../config/dbConnect.js";
import { nanoid } from "nanoid";
import Posts from "./postsModel.js";
import Users from "./usersModel.js";
import logger from "../utils/logger.js";
const Comments = sequelize.define(
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
    logger.info("Comments created successfully");
  })
  .catch((error) => {
    logger.error("Error creating comment", error);
  });
export default Comments;
