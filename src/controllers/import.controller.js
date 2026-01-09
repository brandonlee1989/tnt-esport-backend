const prisma = require('../prisma');
const fcService = require('../services/fc.service');

exports.importMatches = async (req, res) => {
  try {
    const fcMatches = await fcService.getLastMatches();

    const imported = [];

    for (const fcMatch of fcMatches) {
      // evita duplicati
      const exists = await prisma.match.findUnique({
        where: { fcMatchId: fcMatch.fcMatchId }
      });

      if (exists) continue;

      // crea match in BOZZA
      const match = await prisma.match.create({
        data: {
          fcMatchId: fcMatch.fcMatchId,
          data: fcMatch.data,
          avversario: fcMatch.avversario,
          golFatti: fcMatch.golFatti,
          golSubiti: fcMatch.golSubiti,
          stato: 'DRAFT'
        }
      });

      // stats giocatori
      for (const stat of fcMatch.players) {
        const player = await prisma.player.findUnique({
          where: { gamertag: stat.gamertag }
        });

        if (!player) continue;

        await prisma.playerStat.create({
          data: {
            playerId: player.id,
            matchId: match.id,
            voto: stat.voto,
            gol: stat.gol,
            assist: stat.assist,
            tiri: stat.tiri,
            salvataggi: stat.salvataggi,
            golSubiti: stat.golSubiti
          }
        });
      }

      imported.push(match);
    }

    res.json({
      imported: imported.length,
      matches: imported
    });
  } catch (error) {
    console.error('IMPORT FC ERROR:', error);
    res.status(500).json({ error: 'Errore import FC' });
  }
};
