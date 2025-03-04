module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define('Category', {
    category_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.TEXT,
      allowNull: false,
      unique: true,
    },
  });

  Category.associate = (models) => {
    // En kategori kan ha många produkter
    Category.hasMany(models.Product, { foreignKey: 'fk_categoryid', onDelete: 'CASCADE' });
  };

  return Category;
};
