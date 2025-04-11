const { models } = require('mern-db-layer');
const { User } = models; // ✅ Correct way

const bcrypt = require('bcryptjs');

exports.signup = async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) return res.status(400).json({ error: "All fields are required" });

  email = email.toLowerCase();
  
  const existingUser = await User.findOne({ email });
  if (existingUser) return res.status(400).json({ error: "Email already registered" });

  const hashedPassword = await bcrypt.hash(password, 10);
  await User.create({ username, email, password: hashedPassword });
  res.status(201).json({ message: "User registered successfully" });
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ error: "Email and password are required" });

  email = email.toLowerCase();
  
  const user = await User.findOne({ email });
  if (!user || !(await bcrypt.compare(password, user.password)))
    return res.status(401).json({ error: "Invalid email or password" });

  res.json({ message: "Login successful", userId: user._id, username: user.username });
};
