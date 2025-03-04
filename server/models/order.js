module.exports = (sequelize, DataTypes) => {
	const Order = sequelize.define('Order', {
	  order_id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true,
	  },
	  fk_userid: {
		type: DataTypes.INTEGER,
		allowNull: false,
	  },
	  total_price: {
		type: DataTypes.DOUBLE,
		allowNull: false,
	  },
	  status: {
		type: DataTypes.TEXT,
		allowNull: false,
	  },
	}, {
	  // Konfigurera Sequelize för att hantera timestamps automatiskt
	  timestamps: true,  // Hantera 'createdAt' och 'updatedAt' automatiskt
	  createdAt: 'created_at', // Om du vill ha 'created_at' istället för 'createdAt'
	  updatedAt: 'updated_at', // Om du vill ha 'updated_at' istället för 'updatedAt'
	  // Om du vill definiera 'created_at' och 'updated_at' med särskilda standardvärden
	  defaultScope: {
		attributes: { exclude: ['createdAt', 'updatedAt'] },
	  },
	});
  
	Order.associate = (models) => {
	  // En order tillhör en användare
	  Order.belongsTo(models.User, { foreignKey: 'fk_userid' });
	  // En order kan ha många order items
	  Order.hasMany(models.OrderItem, { foreignKey: 'fk_orderid' });
	};
  
	return Order;
  };
  