const { Sequelize } = require('sequelize');

// Skapa en enkel anslutning till databasen
const sequelize = new Sequelize('newdb', 'newuser', 'newpassword', {
  host: 'localhost',
  dialect: 'mysql',
  logging: console.log,
  port: 3307 // För att se SQL-loggar för felsökning
});

sequelize.authenticate()
  .then(() => {
    console.log("Anslutning lyckades!");
  })
  .catch((err) => {
    console.error("Kunde inte ansluta:", err);
  });
