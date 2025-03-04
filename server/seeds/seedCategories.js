const { Category } = require('../models'); // Importera Category-modellen

const seedCategories = async () => {
  try {
    await Category.bulkCreate([
      { name: 'Adidas' },
      { name: 'Nike' },
      { name: 'Puma' },
      { name: 'Converse' },
      { name: 'Vans' }
    ]);
    
    console.log('Kategorier har lagts till i databasen!');
    process.exit(); // Stänger av scriptet efter att det har körts
  } catch (error) {
    console.error('Fel vid seedning av kategorier:', error);
  }
};

seedCategories();
