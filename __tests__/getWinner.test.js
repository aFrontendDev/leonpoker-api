const { getWinner } = require("../functions/poker");

test("player A wins with royal flush", () => {
  const tableCardsA = ["h2", "c10", "c12", "d5", "c13"];
  const playerA = { user: "playerA", hand: ["c14", "c11"] }; // royal flush
  const playerB = { user: "playerB", hand: ["c9", "d11"] }; // straight
  const playerC = { user: "playerC", hand: ["c2", "d4"] }; // pair
  const playerD = { user: "playerD", hand: ["c5", "s5"] }; // three of a kind
  const hands = [playerA, playerB, playerC, playerD];

  expect(getWinner(tableCardsA, hands)).toEqual(
    {
      hand: [
        {
          user: "playerA",
          hand: ["c14", "c11"],
          score: {
            score: 1000,
            topHand: {
              royalFlush: true,
              straightFlush: false,
              fourOfAKind: false,
              fullHouse: false,
              flush: false,
              straight: false,
              threeOfAKind: false,
              twoPair: false,
              pair: false,
              highestCard: 14,
            },
            highestCard: 14,
          },
          highestPlayerCard: 14,
          kickerCard: 11,
          totalScore: 1000,
        }
      ],
      outrightWinner: true
    }
  );
});

test("player B wins with straight", () => {
  const tableCardsA = ["h2", "c10", "c12", "d5", "c13"];
  const playerA = { user: "playerA", hand: ["c4", "s3"] }; // high card
  const playerB = { user: "playerB", hand: ["c9", "d11"] }; // straight
  const playerC = { user: "playerC", hand: ["c2", "d4"] }; // pair
  const playerD = { user: "playerD", hand: ["c5", "s5"] }; // three of a kind
  const hands = [playerA, playerB, playerC, playerD];

  expect(getWinner(tableCardsA, hands)).toEqual(
    {
      hand: [
        {
          user: "playerB",
          hand: ["c9", "d11"],
          score: {
            score: 191,
            topHand: {
              royalFlush: false,
              straightFlush: false,
              fourOfAKind: false,
              fullHouse: false,
              flush: false,
              straight: true,
              threeOfAKind: false,
              twoPair: false,
              pair: false,
              highestCard: 13,
            },
            highestCard: 13,
          },
          highestPlayerCard: 11,
          kickerCard: 9,
          totalScore: 191,
        }
      ],
      outrightWinner: true
    }
  );
});

test("player B wins with flush", () => {
  const tableCardsA = ["h2", "c10", "c12", "d5", "c13"];
  const playerA = { user: "playerA", hand: ["c4", "s3"] }; // high card
  const playerB = { user: "playerB", hand: ["c9", "c3"] }; // flush
  const playerC = { user: "playerC", hand: ["c2", "d4"] }; // pair
  const playerD = { user: "playerD", hand: ["c5", "s5"] }; // three of a kind
  const hands = [playerA, playerB, playerC, playerD];

  expect(getWinner(tableCardsA, hands)).toEqual(
    {
      hand: [
        {
          user: "playerB",
          hand: ["c9", "c3"],
          score: {
            score: 243,
            topHand: {
              royalFlush: false,
              straightFlush: false,
              fourOfAKind: false,
              fullHouse: false,
              flush: true,
              straight: false,
              threeOfAKind: false,
              twoPair: false,
              pair: false,
              highestCard: 13,
            },
            highestCard: 13,
          },
          highestPlayerCard: 9,
          kickerCard: 3,
          totalScore: 243,
        }
      ],
      outrightWinner: true
    }
  );
});

test("player B wins with full house", () => {
  const tableCardsA = ["h2", "c10", "c12", "d5", "s2"];
  const playerA = { user: "playerA", hand: ["c4", "s3"] }; // high card
  const playerB = { user: "playerB", hand: ["s12", "d2"] }; // full house
  const playerC = { user: "playerC", hand: ["c5", "s5"] }; // three of a kind
  const playerD = { user: "playerD", hand: ["d10", "s7"] }; // pair
  const hands = [playerA, playerB, playerC, playerD];

  expect(getWinner(tableCardsA, hands)).toEqual(
    {
      hand: [
        {
          user: "playerB",
          hand: ["s12", "d2"],
          score: {
            score: 286,
            topHand: {
              royalFlush: false,
              straightFlush: false,
              fourOfAKind: false,
              fullHouse: true,
              flush: false,
              straight: false,
              threeOfAKind: false,
              twoPair: false,
              pair: false,
              highestCard: 12,
            },
            highestCard: 12,
          },
          highestPlayerCard: 12,
          kickerCard: 2,
          totalScore: 286,
        }
      ],
      outrightWinner: true
    }
  );
});

test("player C wins with three of a kind", () => {
  const tableCardsA = ["h2", "c10", "c12", "d5", "c13"];
  const playerA = { user: "playerA", hand: ["c4", "s3"] }; // high card
  const playerB = { user: "playerB", hand: ["c9", "d7"] }; // high card
  const playerC = { user: "playerC", hand: ["c5", "s5"] }; // three of a kind
  const playerD = { user: "playerD", hand: ["d10", "s7"] }; // pair
  const hands = [playerA, playerB, playerC, playerD];

  expect(getWinner(tableCardsA, hands)).toEqual(
    {
      hand: [
        {
          user: "playerC",
          hand: ["c5", "s5"],
          score: {
            score: 109,
            topHand: {
              royalFlush: false,
              straightFlush: false,
              fourOfAKind: false,
              fullHouse: false,
              flush: false,
              straight: false,
              threeOfAKind: true,
              twoPair: false,
              pair: false,
              highestCard: 13,
            },
            highestCard: 13,
          },
          highestPlayerCard: 5,
          kickerCard: 5,
          totalScore: 109,
        }
      ],
      outrightWinner: true
    }
  );
});

test("player D wins with best pair", () => {
  const tableCardsA = ["h2", "c10", "c12", "d5", "c13"];
  const playerA = { user: "playerA", hand: ["c4", "s3"] }; // high card
  const playerB = { user: "playerB", hand: ["c9", "d7"] }; // high card
  const playerC = { user: "playerC", hand: ["c5", "s6"] }; // pair
  const playerD = { user: "playerD", hand: ["d10", "s7"] }; // pair
  const hands = [playerA, playerB, playerC, playerD];

  expect(getWinner(tableCardsA, hands)).toEqual(
    {
      hand: [{
        hand: ["d10", "s7"],
        highestPlayerCard: 10,
        kickerCard: 7,
        score: {
          score: 34,
          topHand: {
            royalFlush: false,
            straightFlush: false,
            fourOfAKind: false,
            fullHouse: false,
            flush: false,
            straight: false,
            threeOfAKind: false,
            twoPair: false,
            pair: true,
            highestCard: 13,
          },
          highestCard: 13,
        },
        totalScore: 34,
        user: "playerD"
      }],
      outrightWinner: true
    }
  );
});

test("player D wins, highest card", () => {
  const tableCardsA = ["h2", "c10", "c12", "d5", "c13"];
  const playerA = { user: "playerA", hand: ["c4", "s3"] };
  const playerB = { user: "playerB", hand: ["c8", "d7"] };
  const playerC = { user: "playerC", hand: ["c7", "s6"] };
  const playerD = { user: "playerD", hand: ["d9", "s7"] };
  const hands = [playerA, playerB, playerC, playerD];

  expect(getWinner(tableCardsA, hands)).toEqual(
    {
      hand: [{
        hand: ["d9", "s7"],
        highestPlayerCard: 9,
        kickerCard: 7,
        score: {
          score: 13,
          topHand: {
            royalFlush: false,
            straightFlush: false,
            fourOfAKind: false,
            fullHouse: false,
            flush: false,
            straight: false,
            threeOfAKind: false,
            twoPair: false,
            pair: false,
            highestCard: 13,
          },
          highestCard: 13,
        },
        totalScore: 13,
        user: "playerD"
      }],
      highcardWinner: true
    }
  );
});

test("player D wins, highest kicker card", () => {
  const tableCardsA = ["h2", "c10", "c12", "d5", "c13"];
  const playerA = { user: "playerA", hand: ["h9", "s3"] };
  const playerB = { user: "playerB", hand: ["s9", "d7"] };
  const playerC = { user: "playerC", hand: ["c9", "s6"] };
  const playerD = { user: "playerD", hand: ["d9", "s8"] };
  const hands = [playerA, playerB, playerC, playerD];

  expect(getWinner(tableCardsA, hands)).toEqual(
    {
      hand: [{
        hand: ["d9", "s8"],
        highestPlayerCard: 9,
        kickerCard: 8,
        score: {
          highestCard: 13,
          score: 13,
          topHand: {
            flush: false,
            fourOfAKind: false,
            fullHouse: false,
            highestCard: 13,
            pair: false,
            royalFlush: false,
            straight: false,
            straightFlush: false,
            threeOfAKind: false,
            twoPair: false
          }
        },
        totalScore: 13,
        user: "playerD"
      }],
      kickerWinner: true
    }
  );
});

test("draw between player D & B, same overall score, higcard and kicker", () => {
  const tableCardsA = ["h2", "c10", "c12", "d5", "c13"];
  const playerA = { user: "playerA", hand: ["h9", "s3"] };
  const playerB = { user: "playerB", hand: ["s9", "d8"] };
  const playerC = { user: "playerC", hand: ["c9", "s6"] };
  const playerD = { user: "playerD", hand: ["d9", "s8"] };
  const hands = [playerA, playerB, playerC, playerD];

  expect(getWinner(tableCardsA, hands)).toEqual(
    {
      hand: [
        {
          hand: ["s9", "d8"],
          highestPlayerCard: 9,
          kickerCard: 8,
          score: {
            highestCard: 13,
            score: 13,
            topHand: {
              flush: false,
              fourOfAKind: false,
              fullHouse: false,
              highestCard: 13,
              pair: false,
              royalFlush: false,
              straight: false,
              straightFlush: false,
              threeOfAKind: false,
              twoPair: false
            }
          },
          totalScore: 13,
          user: "playerB"
        },
        {
          hand: ["d9", "s8"],
          highestPlayerCard: 9,
          kickerCard: 8,
          score: {
            highestCard: 13,
            score: 13,
            topHand: {
              flush: false,
              fourOfAKind: false,
              fullHouse: false,
              highestCard: 13,
              pair: false,
              royalFlush: false,
              straight: false,
              straightFlush: false,
              threeOfAKind: false,
              twoPair: false
            }
          },
          totalScore: 13,
          user: "playerD"
        }
      ],
      draw: true
    }
  );
});