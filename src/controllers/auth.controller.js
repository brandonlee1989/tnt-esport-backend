const prisma = require('../prisma');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.login = async (req, res) => {
  const { username, password } = req.body;

  const admin = await prisma.admin.findUnique({
    where: { username }
  });

  if (!admin) {
    return res.status(401).json({ error: 'Credenziali errate' });
  }

  const valid = await bcrypt.compare(password, admin.passwordHash);

  if (!valid) {
    return res.status(401).json({ error: 'Credenziali errate' });
  }

  const token = jwt.sign(
    { id: admin.id, username: admin.username },
    process.env.JWT_SECRET,
    { expiresIn: '8h' }
  );

  res.json({ token });
};
