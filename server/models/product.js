module.exports = (sequelize, DataTypes) => {
	const Product = sequelize.define('Product', {
	  product_id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true,
	  },
	  name: {
		type: DataTypes.TEXT,
		allowNull: false,
	  },
	  description: {
		type: DataTypes.TEXT,
		allowNull: true,
	  },
	  price: {
		type: DataTypes.DOUBLE,
		allowNull: false,
	  },
	  stock: {
		type: DataTypes.INTEGER,
		allowNull: false,
	  },
	  fk_categoryid: {
		type: DataTypes.INTEGER,
		allowNull: false, // Nu måste varje produkt ha en kategori
		references: {
		  model: 'Categories', // Tabellen heter "Categories" i databasen
		  key: 'category_id',
		},
		onDelete: 'CASCADE',
	  },
	  imageUrl: {
		type: DataTypes.STRING(255),
		allowNull: true, // 
	},
	}, {
	  timestamps: true,
	  createdAt: 'createdAt',
	  updatedAt: 'updatedAt',
	});
  
	Product.associate = (models) => {
	  Product.belongsTo(models.Category, { foreignKey: 'fk_categoryid' });
	};
  
	return Product;
  };
  