const prisma = require('../prisma');

exports.getAll = async (req, res) => {
  const data = await prisma.championship.findMany({
    include: { season: true }
  });
  res.json(data);
};
