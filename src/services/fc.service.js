// Questo file simula EA FC.
// In futuro lo sostituiremo con API vere senza toccare altro codice.

exports.getLastMatches = async () => {
  return [
    {
      fcMatchId: 'FC_001',
      data: new Date(),
      avversario: 'Pro Club Team',
      golFatti: 3,
      golSubiti: 1,
      players: [
        {
          gamertag: 'TNT_Marco',
          voto: 7.8,
          gol: 2,
          assist: 0,
          tiri: 4,
          salvataggi: 0,
          golSubiti: 0
        }
      ]
    }
  ];
};
