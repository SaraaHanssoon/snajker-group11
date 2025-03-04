module.exports = (sequelize, DataTypes) => {
	const Review = sequelize.define('Review', {
	  review_id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true,
	  },
	  fk_userid: {
		type: DataTypes.INTEGER,
		allowNull: false,
	  },
	  rating: {
		type: DataTypes.INTEGER,
		allowNull: false,
	  },
	  comment: {
		type: DataTypes.TEXT,
		allowNull: true,
	  },
	  fk_productid: {
		type: DataTypes.INTEGER,
		allowNull: false,
	  },
	});
  
	Review.associate = (models) => {
	  // En recension tillhör en användare
	  Review.belongsTo(models.User, { foreignKey: 'fk_userid' });
	  // En recension tillhör en produkt
	  Review.belongsTo(models.Product, { foreignKey: 'fk_productid' });
	};
  
	return Review;
  };
  