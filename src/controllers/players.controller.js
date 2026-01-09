const prisma = require('../prisma');

exports.getAll = async (req, res) => {
  const players = await prisma.player.findMany();
  res.json(players);
};

exports.create = async (req, res) => {
  const player = await prisma.player.create({ data: req.body });
  res.json(player);
};

exports.getOneWithStats = async (req, res) => {
  try {
    const { id } = req.params;

    const player = await prisma.player.findUnique({
      where: { id: Number(id) },
      include: {
        stats: {
          include: {
            match: true
          }
        }
      }
    });

    if (!player) {
      return res.status(404).json({ error: 'Giocatore non trovato' });
    }

    const stats = player.stats;

    const aggregate = {
      presenze: stats.length,
      gol: stats.reduce((a, s) => a + s.gol, 0),
      assist: stats.reduce((a, s) => a + s.assist, 0),
      tiri: stats.reduce((a, s) => a + s.tiri, 0),
      salvataggi: stats.reduce((a, s) => a + s.salvataggi, 0),
      golSubiti: stats.reduce((a, s) => a + s.golSubiti, 0),
      mediaVoto:
        stats.length > 0
          ? (
              stats.reduce((a, s) => a + s.voto, 0) /
              stats.length
            ).toFixed(2)
          : 0
    };

    const matches = stats.map(s => ({
      id: s.match.id,
      data: s.match.data,
      avversario: s.match.avversario,
      golFatti: s.match.golFatti,
      golSubiti: s.match.golSubiti,
      youtubeUrl: s.match.youtubeUrl,
      voto: s.voto,
      gol: s.gol,
      assist: s.assist
    }));

    res.json({
      player: {
        id: player.id,
        nome: player.nome,
        cognome: player.cognome,
        numeroMaglia: player.numeroMaglia,
        gamertag: player.gamertag,
        posizione: player.posizione
      },
      stats: aggregate,
      matches
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Errore stats giocatore' });
  }
};