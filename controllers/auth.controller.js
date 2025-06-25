import { loginService } from "../services/auth.service.js";

export const loginController = async (req, res) => {
  const { email, password } = req.body;
  try {
    const token = await loginService(email, password);
    res.status(200).json({ token });
  } catch (err) {
    res.status(401).json({ error: err.message });
  }
};