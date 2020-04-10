const { checkHands } = require("../functions/poker");

// test("player A wins", () => {
//   const tableCardsA = ["h2", "c10", "c12", "d5", "c13"];
//   const playerA = { user: "playerA", hand: ["c14", "c11"] }; // royal flush
//   const playerB = { user: "playerB", hand: ["c9", "d11"] }; // straight
//   const playerC = { user: "playerC", hand: ["c2", "d4"] }; // pair
//   const playerD = { user: "playerD", hand: ["c5", "s5"] }; // three of a kind
//   const hands = [playerA, playerB, playerC, playerD];

//   expect(checkHands(tableCardsA, hands)).toEqual([
//     {
//       user: "playerA",
//       hand: ["c14", "c11"],
//       score: {
//         score: 1000,
//         topHand: {
//           royalFlush: true,
//           straightFlush: false,
//           fourOfAKind: false,
//           fullHouse: false,
//           flush: false,
//           straight: false,
//           threeOfAKind: false,
//           twoPair: false,
//           pair: false,
//           highestCard: 14,
//         },
//         highestCard: 14,
//       },
//       highestPlayerCard: 14,
//       kickerCard: 11,
//     },
//     {
//       user: "playerB",
//       hand: ["c9", "d11"],
//       score: {
//         score: 191,
//         topHand: {
//           royalFlush: false,
//           straightFlush: false,
//           fourOfAKind: false,
//           fullHouse: false,
//           flush: false,
//           straight: true,
//           threeOfAKind: false,
//           twoPair: false,
//           pair: false,
//           highestCard: 13,
//         },
//         highestCard: 13,
//       },
//       highestPlayerCard: 11,
//       kickerCard: 9,
//     },
//     {
//       user: "playerD",
//       hand: ["c5", "s5"],
//       score: {
//         score: 109,
//         topHand: {
//           royalFlush: false,
//           straightFlush: false,
//           fourOfAKind: false,
//           fullHouse: false,
//           flush: false,
//           straight: false,
//           threeOfAKind: true,
//           twoPair: false,
//           pair: false,
//           highestCard: 13,
//         },
//         highestCard: 13,
//       },
//       highestPlayerCard: 5,
//       kickerCard: 5,
//     },
//     {
//       user: "playerC",
//       hand: ["c2", "d4"],
//       score: {
//         score: 18,
//         topHand: {
//           royalFlush: false,
//           straightFlush: false,
//           fourOfAKind: false,
//           fullHouse: false,
//           flush: false,
//           straight: false,
//           threeOfAKind: false,
//           twoPair: false,
//           pair: true,
//           highestCard: 13,
//         },
//         highestCard: 13,
//       },
//       highestPlayerCard: 4,
//       kickerCard: 2,
//     },
//   ]);
// });

// test("player B wins", () => {
//   const tableCardsA = ["h2", "c10", "c12", "d5", "c13"];
//   const playerA = { user: "playerA", hand: ["c4", "s3"] }; // high card
//   const playerB = { user: "playerB", hand: ["c9", "d11"] }; // straight
//   const playerC = { user: "playerC", hand: ["c2", "d4"] }; // pair
//   const playerD = { user: "playerD", hand: ["c5", "s5"] }; // three of a kind
//   const hands = [playerA, playerB, playerC, playerD];

//   expect(checkHands(tableCardsA, hands)).toEqual([
//     {
//       user: "playerB",
//       hand: ["c9", "d11"],
//       score: {
//         score: 191,
//         topHand: {
//           royalFlush: false,
//           straightFlush: false,
//           fourOfAKind: false,
//           fullHouse: false,
//           flush: false,
//           straight: true,
//           threeOfAKind: false,
//           twoPair: false,
//           pair: false,
//           highestCard: 13,
//         },
//         highestCard: 13,
//       },
//       highestPlayerCard: 11,
//       kickerCard: 9,
//     },
//     {
//       user: "playerD",
//       hand: ["c5", "s5"],
//       score: {
//         score: 109,
//         topHand: {
//           royalFlush: false,
//           straightFlush: false,
//           fourOfAKind: false,
//           fullHouse: false,
//           flush: false,
//           straight: false,
//           threeOfAKind: true,
//           twoPair: false,
//           pair: false,
//           highestCard: 13,
//         },
//         highestCard: 13,
//       },
//       highestPlayerCard: 5,
//       kickerCard: 9,
//     },
//     {
//       user: "playerC",
//       hand: ["c2", "d4"],
//       score: {
//         score: 18,
//         topHand: {
//           royalFlush: false,
//           straightFlush: false,
//           fourOfAKind: false,
//           fullHouse: false,
//           flush: false,
//           straight: false,
//           threeOfAKind: false,
//           twoPair: false,
//           pair: true,
//           highestCard: 13,
//         },
//         highestCard: 13,
//       },
//       highestPlayerCard: 4,
//       kickerCard: 2,
//     },
//     {
//       user: "playerA",
//       hand: ["c4", "s3"],
//       score: {
//         score: 13,
//         topHand: {
//           royalFlush: false,
//           straightFlush: false,
//           fourOfAKind: false,
//           fullHouse: false,
//           flush: false,
//           straight: false,
//           threeOfAKind: false,
//           twoPair: false,
//           pair: false,
//           highestCard: 13,
//         },
//         highestCard: 13,
//       },
//       highestPlayerCard: 4,
//       kickerCard: 3,
//     },
//   ]);
// });

// test("player C wins", () => {
//   const tableCardsA = ["h2", "c10", "c12", "d5", "c13"];
//   const playerA = { user: "playerA", hand: ["c4", "s3"] }; // high card
//   const playerB = { user: "playerB", hand: ["c9", "d7"] }; // high card
//   const playerC = { user: "playerC", hand: ["c5", "s5"] }; // three of a kind
//   const playerD = { user: "playerD", hand: ["d10", "s7"] }; // pair
//   const hands = [playerA, playerB, playerC, playerD];

//   expect(checkHands(tableCardsA, hands)).toEqual([
//     {
//       user: "playerC",
//       hand: ["c5", "s5"],
//       score: {
//         score: 109,
//         topHand: {
//           royalFlush: false,
//           straightFlush: false,
//           fourOfAKind: false,
//           fullHouse: false,
//           flush: false,
//           straight: false,
//           threeOfAKind: true,
//           twoPair: false,
//           pair: false,
//           highestCard: 13,
//         },
//         highestCard: 13,
//       },
//       highestPlayerCard: 5,
//       kickerCard: 5,
//     },
//     {
//       user: "playerD",
//       hand: ["d10", "s7"],
//       score: {
//         score: 34,
//         topHand: {
//           royalFlush: false,
//           straightFlush: false,
//           fourOfAKind: false,
//           fullHouse: false,
//           flush: false,
//           straight: false,
//           threeOfAKind: false,
//           twoPair: false,
//           pair: true,
//           highestCard: 13,
//         },
//         highestCard: 13,
//       },
//       highestPlayerCard: 10,
//       kickerCard: 7,
//     },
//     {
//       user: "playerA",
//       hand: ["c4", "s3"],
//       score: {
//         score: 13,
//         topHand: {
//           royalFlush: false,
//           straightFlush: false,
//           fourOfAKind: false,
//           fullHouse: false,
//           flush: false,
//           straight: false,
//           threeOfAKind: false,
//           twoPair: false,
//           pair: false,
//           highestCard: 13,
//         },
//         highestCard: 13,
//       },
//       highestPlayerCard: 4,
//       kickerCard: 3,
//     },
//     {
//       user: "playerB",
//       hand: ["c9", "d7"],
//       score: {
//         score: 13,
//         topHand: {
//           royalFlush: false,
//           straightFlush: false,
//           fourOfAKind: false,
//           fullHouse: false,
//           flush: false,
//           straight: false,
//           threeOfAKind: false,
//           twoPair: false,
//           pair: false,
//           highestCard: 13,
//         },
//         highestCard: 13,
//       },
//       highestPlayerCard: 9,
//       kickerCard: 7,
//     },
//   ]);
// });

// test("player D wins", () => {
//   const tableCardsA = ["h2", "c10", "c12", "d5", "c13"];
//   const playerA = { user: "playerA", hand: ["c4", "s3"] }; // high card
//   const playerB = { user: "playerB", hand: ["c9", "d7"] }; // high card
//   const playerC = { user: "playerC", hand: ["c5", "s6"] }; // pair
//   const playerD = { user: "playerD", hand: ["d10", "s7"] }; // pair
//   const hands = [playerA, playerB, playerC, playerD];

//   expect(checkHands(tableCardsA, hands)).toEqual([
//     {
//       user: "playerD",
//       hand: ["d10", "s7"],
//       score: {
//         score: 34,
//         topHand: {
//           royalFlush: false,
//           straightFlush: false,
//           fourOfAKind: false,
//           fullHouse: false,
//           flush: false,
//           straight: false,
//           threeOfAKind: false,
//           twoPair: false,
//           pair: true,
//           highestCard: 13,
//         },
//         highestCard: 13,
//       },
//       highestPlayerCard: 10,
//       kickerCard: 7,
//     },
//     {
//       user: "playerC",
//       hand: ["c5", "s6"],
//       score: {
//         score: 24,
//         topHand: {
//           royalFlush: false,
//           straightFlush: false,
//           fourOfAKind: false,
//           fullHouse: false,
//           flush: false,
//           straight: false,
//           threeOfAKind: false,
//           twoPair: false,
//           pair: true,
//           highestCard: 13,
//         },
//         highestCard: 13,
//       },
//       highestPlayerCard: 6,
//       kickerCard: 5,
//     },
//     {
//       user: "playerA",
//       hand: ["c4", "s3"],
//       score: {
//         score: 13,
//         topHand: {
//           royalFlush: false,
//           straightFlush: false,
//           fourOfAKind: false,
//           fullHouse: false,
//           flush: false,
//           straight: false,
//           threeOfAKind: false,
//           twoPair: false,
//           pair: false,
//           highestCard: 13,
//         },
//         highestCard: 13,
//       },
//       highestPlayerCard: 4,
//       kickerCard: 3,
//     },
//     {
//       user: "playerB",
//       hand: ["c9", "d7"],
//       score: {
//         score: 13,
//         topHand: {
//           royalFlush: false,
//           straightFlush: false,
//           fourOfAKind: false,
//           fullHouse: false,
//           flush: false,
//           straight: false,
//           threeOfAKind: false,
//           twoPair: false,
//           pair: false,
//           highestCard: 13,
//         },
//         highestCard: 13,
//       },
//       highestPlayerCard: 9,
//       kickerCard: 7,
//     },
//   ]);
// });

// test("player D wins, highest card", () => {
//   const tableCardsA = ["h2", "c10", "c12", "d5", "c13"];
//   const playerA = { user: "playerA", hand: ["c4", "s3"] };
//   const playerB = { user: "playerB", hand: ["c8", "d7"] };
//   const playerC = { user: "playerC", hand: ["c7", "s6"] };
//   const playerD = { user: "playerD", hand: ["d9", "s7"] };
//   const hands = [playerA, playerB, playerC, playerD];

//   expect(checkHands(tableCardsA, hands)).toEqual([
//     {
//       user: "playerD",
//       hand: ["d9", "s7"],
//       score: {
//         score: 13,
//         topHand: {
//           royalFlush: false,
//           straightFlush: false,
//           fourOfAKind: false,
//           fullHouse: false,
//           flush: false,
//           straight: false,
//           threeOfAKind: false,
//           twoPair: false,
//           pair: false,
//           highestCard: 13,
//         },
//         highestCard: 13,
//       },
//       highestPlayerCard: 9,
//       kickerCard: 7,
//     },
//     {
//       user: "playerB",
//       hand: ["c8", "d7"],
//       score: {
//         score: 13,
//         topHand: {
//           royalFlush: false,
//           straightFlush: false,
//           fourOfAKind: false,
//           fullHouse: false,
//           flush: false,
//           straight: false,
//           threeOfAKind: false,
//           twoPair: false,
//           pair: false,
//           highestCard: 13,
//         },
//         highestCard: 13,
//       },
//       highestPlayerCard: 8,
//       kickerCard: 7,
//     },
//     {
//       user: "playerC",
//       hand: ["c7", "s6"],
//       score: {
//         score: 13,
//         topHand: {
//           royalFlush: false,
//           straightFlush: false,
//           fourOfAKind: false,
//           fullHouse: false,
//           flush: false,
//           straight: false,
//           threeOfAKind: false,
//           twoPair: false,
//           pair: false,
//           highestCard: 13,
//         },
//         highestCard: 13,
//       },
//       highestPlayerCard: 7,
//       kickerCard: 6,
//     },
//     {
//       user: "playerA",
//       hand: ["c4", "s3"],
//       score: {
//         score: 13,
//         topHand: {
//           royalFlush: false,
//           straightFlush: false,
//           fourOfAKind: false,
//           fullHouse: false,
//           flush: false,
//           straight: false,
//           threeOfAKind: false,
//           twoPair: false,
//           pair: false,
//           highestCard: 13,
//         },
//         highestCard: 13,
//       },
//       highestPlayerCard: 4,
//       kickerCard: 3,
//     },
//   ]);
// });


test("player D wins, highest kicker card", () => {
  const tableCardsA = ["h2", "c10", "c12", "d5", "c13"];
  const playerA = { user: "playerA", hand: ["h9", "s3"] };
  const playerB = { user: "playerB", hand: ["s9", "d7"] };
  const playerC = { user: "playerC", hand: ["c9", "s6"] };
  const playerD = { user: "playerD", hand: ["d9", "s8"] };
  const hands = [playerA, playerB, playerC, playerD];

  expect(checkHands(tableCardsA, hands)).toEqual([
    {
      user: "playerD",
      hand: ["d9", "s8"],
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
      highestPlayerCard: 9,
      kickerCard: 8,
    },
    {
      user: "playerB",
      hand: ["s9", "d7"],
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
      highestPlayerCard: 9,
      kickerCard: 7,
    },
    {
      user: "playerC",
      hand: ["c9", "s6"],
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
      highestPlayerCard: 9,
      kickerCard: 6,
    },
    {
      user: "playerA",
      hand: ["h9", "s3"],
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
      highestPlayerCard: 9,
      kickerCard: 3,
    },
  ]);
});
