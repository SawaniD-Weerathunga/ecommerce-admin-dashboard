const express = require('express');
const cors = require('cors');

require('dotenv').config();

const {sequelize, User} = require('./models');
const authRoutes = require('./routes/authRoutes');
const setupAdmin = require('./admin/adminSetup');

const app = express();

app.use(cors());

setupAdmin(app);

app.use(express.json());
app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));

app.use('/api', authRoutes);

app.get('/', (req, res) => {
  res.send('eCommerce Admin Backend is running!');
});

const PORT = process.env.PORT || 3000;

const startServer = async() => {
  try {
    await sequelize.authenticate();
    console.log('Database connected successfully.');

    await sequelize.sync({alter: true});
    console.log('Database Tables synchronized successfully.');

    await User.destroy({where: {email: 'admin@example.com'}});

    await User.create({
      email: 'admin@example.com',
      password: 'admin123',
      role: 'admin'
    });

    console.log('Admin account created successfully.');
    
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });

  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

startServer();


