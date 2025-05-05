import { DataTypes } from "sequelize";
import { sequelize } from "../config/dbConnect.js";
import { nanoid } from "nanoid";
import Posts from "./postsModel.js";
import Users from "./usersModel.js";
import Comments from "./commentsModel.js";
import logger from "../utils/logger.js";

const Likes = sequelize.define(
  "Likes",
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
    post_id: {
      type: DataTypes.STRING,
      allowNull: true,
      references: {
        model: Posts,
        key: "id",
      },
    },
    comment_id: {
      type: DataTypes.STRING,
      allowNull: true,
      references: {
        model: Comments,
        key: "id",
      },
    },
    likeType: {
      type: DataTypes.ENUM("Post", "Comment"),
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM("like"),
      allowNull: false,
    },
    isDeleted: {
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

Users.hasMany(Likes, { foreignKey: "user_id", as: "likes" });
Likes.belongsTo(Users, { foreignKey: "user_id", as: "user" });

Posts.hasMany(Likes, { foreignKey: "post_id", as: "likes" });
Likes.belongsTo(Posts, { foreignKey: "post_id", as: "post" });

Comments.hasMany(Likes, { foreignKey: "comment_id", as: "likes" });
Likes.belongsTo(Comments, { foreignKey: "comment_id", as: "comment" });

Likes.sync()
  .then(() => {
    logger.info("Likes table created successfully");
  })
  .catch((error) => {
    logger.error("Error creating Likes table", error);
  });

export default Likes;
