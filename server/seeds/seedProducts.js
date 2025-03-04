const { Product, Category } = require('../models'); // Importera modeller

const seedProducts = async () => {
  try {
    const categories = await Category.findAll();
    const categoryMap = categories.reduce((acc, category) => {
      acc[category.name] = category.category_id;
      return acc;
    }, {});

    await Product.bulkCreate([
      { name: 'Superstar', description: 'Klassiska Adidas sneakers.', price: 1200, stock: 10, fk_categoryid: categoryMap['Adidas'] },
      { name: 'Stan Smith', description: 'Ikoniska vita sneakers från Adidas.', price: 1100, stock: 15, fk_categoryid: categoryMap['Adidas'] },
      { name: 'Ultraboost', description: 'Adidas löparskor med boost-dämpning.', price: 1600, stock: 8, fk_categoryid: categoryMap['Adidas'] },

      { name: 'Air Force 1', description: 'En av de mest populära Nike-skorna.', price: 1300, stock: 12, fk_categoryid: categoryMap['Nike'] },
      { name: 'Air Max 90', description: 'Nike Air Max med synlig luftdämpning.', price: 1400, stock: 10, fk_categoryid: categoryMap['Nike'] },
      { name: 'Dunk Low', description: 'Nike Dunk Low - klassiska basketskor.', price: 1200, stock: 5, fk_categoryid: categoryMap['Nike'] },

      { name: 'Suede Classic', description: 'Retro sneakers från Puma.', price: 900, stock: 20, fk_categoryid: categoryMap['Puma'] },
      { name: 'RS-X', description: 'Futuristiska sneakers från Puma.', price: 1200, stock: 10, fk_categoryid: categoryMap['Puma'] },
      { name: 'Cali', description: 'Puma lifestyle sneakers.', price: 1000, stock: 15, fk_categoryid: categoryMap['Puma'] },

      { name: 'Chuck Taylor All Star', description: 'Klassiska Converse skor.', price: 800, stock: 30, fk_categoryid: categoryMap['Converse'] },
      { name: 'One Star', description: 'Converse One Star - skateinspirerade sneakers.', price: 850, stock: 18, fk_categoryid: categoryMap['Converse'] },
      { name: 'Run Star Hike', description: 'Chunky sneakers från Converse.', price: 1200, stock: 7, fk_categoryid: categoryMap['Converse'] },

      { name: 'Old Skool', description: 'Ikoniska Vans med sidostrip.', price: 950, stock: 25, fk_categoryid: categoryMap['Vans'] },
      { name: 'Sk8-Hi', description: 'Höga Vans sneakers.', price: 1000, stock: 20, fk_categoryid: categoryMap['Vans'] },
      { name: 'Authentic', description: 'Originalmodellen från Vans.', price: 900, stock: 22, fk_categoryid: categoryMap['Vans'] },
    ]);

    console.log('Produkter har lagts till i databasen!');
    process.exit(); // Stänger av scriptet efter att det har körts
  } catch (error) {
    console.error('Fel vid seedning av produkter:', error);
  }
};

seedProducts();
