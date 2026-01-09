const prisma = require('../prisma');

exports.getPublished = async (req, res) => {
  try {
    const matches = await prisma.match.findMany({
      where: { stato: 'PUBLISHED' },
      include: { championship: true }
    });
    res.json(matches);
  } catch (error) {
    console.error('GET MATCHES ERROR:', error);
    res.status(500).json({ error: 'Errore nel recupero match' });
  }
};

exports.update = async (req, res) => {
  try {
    const { id } = req.params;
    const { youtubeUrl, stato } = req.body;

    // ✅ VALIDAZIONE STATO
    if (stato && !['DRAFT', 'PUBLISHED', 'REJECTED'].includes(stato)) {
      return res.status(400).json({ error: 'Stato non valido' });
    }

    const match = await prisma.match.update({
      where: { id: Number(id) },
      data: {
        youtubeUrl,
        stato
      }
    });

    res.json(match);
  } catch (error) {
    console.error('UPDATE MATCH ERROR:', error);
    res.status(500).json({ error: 'Errore aggiornamento match' });
  }
};
