module.exports = (sequelize, DataTypes) => {
	const Cart = sequelize.define("Cart", {
	  cart_id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true,
	  },
	  fk_userid: {
		type: DataTypes.INTEGER,
		allowNull: false,
	  },
	});
  
	// Här definierar vi alla relationer för Cart
	Cart.associate = (models) => {
	  // En cart tillhör en användare
	  Cart.belongsTo(models.User, { foreignKey: "fk_userid" });
	  // En cart kan ha många cart items
	  Cart.hasMany(models.CartItem, { foreignKey: "fk_cartid" });
	};
  
	return Cart;
  };
  