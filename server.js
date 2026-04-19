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
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>eCommerce Admin System</title>
      <style>
        body { 
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; 
          display: flex; 
          justify-content: center; 
          align-items: center; 
          height: 100vh; 
          background-color: #f4f7f6; 
          margin: 0; 
        }
        .container { 
          text-align: center; 
          background: white; 
          padding: 50px; 
          border-radius: 12px; 
          box-shadow: 0 4px 15px rgba(0,0,0,0.1); 
          max-width: 500px;
        }
        h1 { color: #333; margin-bottom: 10px; }
        p { color: #666; margin-bottom: 30px; line-height: 1.5; }
        .btn { 
          display: inline-block; 
          padding: 12px 25px; 
          margin: 10px; 
          text-decoration: none; 
          border-radius: 6px; 
          font-weight: bold; 
          transition: all 0.3s ease; 
        }
        .btn-login { 
          background-color: #4169E1; 
          color: white; 
          border: 2px solid #4169E1; 
        }
        .btn-login:hover { 
          background-color: #3154b3; 
        }
        .btn-register { 
          background-color: white; 
          color: #4169E1; 
          border: 2px solid #4169E1; 
        }
        .btn-register:hover { 
          background-color: #f0f4ff; 
        }
      </style>
    </head>
    <body>
      <div class="container">
        <h1>Welcome to eCommerce System</h1>
        <p>Manage your store, products, and orders efficiently. Please login to access your dashboard or register a new account.</p>
        <a href="/admin" class="btn btn-login">Login to Dashboard</a>
        <a href="/register.html" class="btn btn-register">Register New Account</a>
      </div>
    </body>
    </html>
  `);
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


