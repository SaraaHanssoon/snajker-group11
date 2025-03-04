const { Sequelize, DataTypes } = require("sequelize");
const fs = require("fs");
const path = require("path");

// Skapa en instans av Sequelize och anslut till databasen
const sequelize = new Sequelize({
  dialect: "mysql", // eller "mariadb"
  host: "localhost", // din värd
  database: "newdb", // din databasnamn
  username: "newuser", // din användarnamn
  password: "newpassword",
  port: 3307, // din lösenord
  logging: console.log, // Slå av logging om du inte vill att SQL-loggar ska visas
});

// Kontrollera anslutningen
sequelize.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch((error) => {
    console.error('Unable to connect to the database:', error);
  });

// Importera alla modeller
const Cart = require("./cart")(sequelize, DataTypes);
const CartItem = require("./cartItem")(sequelize, DataTypes);
const Deal = require("./deal")(sequelize, DataTypes);
const Order = require("./order")(sequelize, DataTypes);
const OrderItem = require("./orderItem")(sequelize, DataTypes);
const Product = require("./product")(sequelize, DataTypes);
const Review = require("./review")(sequelize, DataTypes);
const User = require("./user")(sequelize, DataTypes);
const Category = require("./category")(sequelize, DataTypes);

// Definiera relationer mellan modellerna
User.hasMany(Cart, { foreignKey: "fk_userid" });
Cart.belongsTo(User, { foreignKey: "fk_userid" });

Cart.hasMany(CartItem, { foreignKey: "fk_cartid" });
CartItem.belongsTo(Cart, { foreignKey: "fk_cartid" });

Product.hasMany(CartItem, { foreignKey: "fk_productid" });
CartItem.belongsTo(Product, { foreignKey: "fk_productid" });

Product.hasMany(Deal, { foreignKey: "fk_productid" });
Deal.belongsTo(Product, { foreignKey: "fk_productid" });

Product.hasMany(Review, { foreignKey: "fk_productid" });
Review.belongsTo(Product, { foreignKey: "fk_productid" });

User.hasMany(Review, { foreignKey: "fk_userid" });
Review.belongsTo(User, { foreignKey: "fk_userid" });

Category.hasMany(Product, { foreignKey: "fk_categoryid" });
Product.belongsTo(Category, { foreignKey: "fk_categoryid" });

User.hasMany(Order, { foreignKey: "fk_userid" });
Order.belongsTo(User, { foreignKey: "fk_userid" });

Order.hasMany(OrderItem, { foreignKey: "fk_orderid" });
OrderItem.belongsTo(Order, { foreignKey: "fk_orderid" });

Product.hasMany(OrderItem, { foreignKey: "fk_productid" });
OrderItem.belongsTo(Product, { foreignKey: "fk_productid" });

// Synkronisera modellerna med databasen
sequelize.sync({ force: false }) // force: false förhindrar att tabeller raderas vid varje omstart
  .then(() => {
    console.log('Database synced successfully.');
  })
  .catch((err) => {
    console.error('Error syncing the database:', err);
  });

// Exportera sequelize-instansen och modellerna
module.exports = {
  sequelize,
  Cart,
  CartItem,
  Deal,
  Order,
  OrderItem,
  Product,
  Review,
  User,
  Category
};
