const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');
require('dotenv').config();

const {sequelize, User} = require('./models');
const authRoutes = require('./routes/authRoutes');
const setupAdmin = require('./admin/adminSetup');

const app = express();

app.use(cors());

setupAdmin(app);

app.use(express.json());
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

    const adminExists = await User.findOne({where: {email: 'admin@example.com'}});
    if (!adminExists) {
      const hashedPassword = await bcrypt.hash('admin123', 10);
      await User.create({
        email: 'admin@example.com',
        password: hashedPassword,
        role: 'admin'
      });

      console.log('Default admin user created: admin@example.com / admin123');

    }
    
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

startServer();


