import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '@database/postgres.database'; // adjust based on your setup
import User from '@models/sequelize/user.model'; // import User to define association

interface PostAttributes {
  id: number;
  title: string;
  body: string;
  userId: number;
  createdAt?: Date;
  updatedAt?: Date;
}

interface PostCreationAttributes extends Optional<PostAttributes, 'id'> {}

class Post extends Model<PostAttributes, PostCreationAttributes> implements PostAttributes {
  public id!: number;
  public title!: string;
  public body!: string;
  public userId!: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Post.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    body: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    userId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Post',
    tableName: 'posts',
    timestamps: true,
  }
);

// Define association
Post.belongsTo(User, { foreignKey: 'userId', as: 'user' });
User.hasMany(Post, { foreignKey: 'userId', as: 'posts' });

export default Post;
