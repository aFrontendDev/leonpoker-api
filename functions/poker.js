const makePack = () => {
  const pack = [];
  const suits = ['h', 's', 'c', 'd'];
  suits.forEach(suit => {
    for (var i = 1; i < 14; i++) {
      pack.push(`${suit}${i}`);
    }
  });
  return pack;
}

module.exports = {
  makePack
};
