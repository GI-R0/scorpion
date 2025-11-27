import User from "../models/User.js";
import jwt from "jsonwebtoken";
import { validationResult } from "express-validator";

// Registro de nuevos usuarios
export const register = async (req, res) => {
  // Primero validamos que los datos vengan bien (email válido, pass larga, etc)
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { name, email, password } = req.body;

    // Comprobamos si ya existe alguien con ese email para no duplicar
    const userExist = await User.findOne({ email: email.toLowerCase().trim() });
    if (userExist)
      return res.status(400).json({ msg: "Este correo ya está registrado" });

    // Creamos el usuario en la base de datos
    const user = await User.create({
      name: name.trim(),
      email: email.toLowerCase().trim(),
      password,
    });

    // Generamos el token JWT para que pueda loguearse directamente
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    // Devolvemos el usuario limpio (sin password) y el token
    const { password: _, ...userWithoutPass } = user.toObject();
    res
      .status(201)
      .json({
        msg: "¡Bienvenido! Registro completado",
        token,
        user: userWithoutPass,
      });
  } catch (err) {
    console.error("Error en registro:", err);
    res
      .status(400)
      .json({ msg: "Hubo un problema al registrarte, intenta de nuevo" });
  }
};

// Inicio de sesión
export const login = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { email, password } = req.body;

    // Buscamos al usuario y pedimos explícitamente la contraseña (que suele estar oculta)
    const user = await User.findOne({
      email: email.toLowerCase().trim(),
    }).select("+password");

    // Verificamos si existe y si la contraseña coincide
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ msg: "Email o contraseña incorrectos" });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    const { password: _, ...userWithoutPass } = user.toObject();
    res.json({ token, user: userWithoutPass });
  } catch (err) {
    console.error("Error en login:", err);
    res
      .status(500)
      .json({ msg: "Error del servidor, por favor intenta más tarde" });
  }
};

// Obtener datos del usuario actual (perfil)
export const getMe = (req, res) => {
  // req.user ya viene inyectado desde el middleware 'protect'
  const { password: _, ...userWithoutPass } = req.user.toObject();
  res.json(userWithoutPass);
};
