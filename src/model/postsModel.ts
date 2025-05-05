import { DataTypes } from "sequelize";
import { sequelize } from "../config/dbConnect.js";
import { nanoid } from "nanoid";
import Users from "./usersModel.js";
import logger from "../utils/logger.js";

const Posts = sequelize.define(
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
    logger.info("Posts created successfully");
  })
  .catch((error) => {
    logger.error("Error creating table", error);
  });

export default Posts;
