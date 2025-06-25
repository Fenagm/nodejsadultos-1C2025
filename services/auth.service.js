import jwt from 'jsonwebtoken';

export const loginService = async (email, password) => {
  if (email === process.env.USER_EMAIL && password === process.env.USER_PASSWORD) {
    return jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '1h' });
  }
  throw new Error('Credenciales inválidas');
};