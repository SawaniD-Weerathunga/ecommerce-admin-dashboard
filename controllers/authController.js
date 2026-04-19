const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User } = require('../models');

const login = async (req, res) => {
  try {
    const {email, password} = req.body;

    const user = await User.findOne({where: {email} });
    if (!user) {
      return res.status(401).json({message: 'Invalid email or password'});
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({message: 'Invalid email or password'});
    }

    const token = jwt.sign(
      {id: user.id, email: user.email, role: user.role},
      process.env.JWT_SECRET,
      {expiresIn: '1d'} 
    );

    res.status(200).json({
      message: 'Login successful',
      token,
      user: {id: user.id, email: user.email, role: user.role}
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({message: 'Internal server error'});
  }
};

const register = async (req, res) => {
  try{
    const {email, password} = req.body;

    const userExists = await User.findOne({where: {email}});
    if(userExists){
      return res.status(400).json({message: 'This email is already registered'});
    }
    
    await User.create({
      email, 
      password,
      role: 'user'
    });

    res.status(201).json({message: 'Registration successful.'});
  } catch (error) {
    console.error(error);
    res.status(500).json({message: 'Error registering user'});
  }
};

module.exports = {login, register};
