import db from './db.js';

const resolvers = {
  Query: {
    reviews() {
      return db.reviews;
    },
    games() {
      return db.games;
    },
    creators() {
      return db.creators;
    },
    review(parent, args, context) {
      return db.reviews.find((review) => review.id === args.id);
    },
    game(parent, args, context) {
      return db.games.find((game) => game.id === args.id);
    },
    creator(parent, args, context) {
      return db.creators.find((creator) => creator.id === args.id);
    },
    platforms(parent, args, context) {
      const platformsMap = new Map();
      db.games.forEach(game => {
        game.platform.forEach(platform => {
          if (platformsMap.has(platform)) {
            platformsMap.set(platform, [...platformsMap.get(platform), game])
          } else {
            platformsMap.set(platform, [game])
          }
        })
      })
      return Array.from(platformsMap, ([name, value]) => ({ name, games: value }));
    }
  },
  Game: {
    reviews(parent, args, context) {
      return db.reviews.filter((review) => review.game_id === parent.id);
    },
  },
  Creator: {
    reviews(parent, args, context) {
      return db.reviews.filter((review) => review.creator_id === parent.id);
    },
    games(parent, args, context) {
      const games = db.reviews
        .filter((review) => review.creator_id === parent.id)
        .map((game) => game.game_id);
      return db.games.filter((game) => games.includes(game.id));
    },
  },
  Review: {
    game(parent, args, context) {
      return db.games.find((game) => game.id === parent.id);
    },
    creator(parent, args, context) {
      return db.creators.find((creator) => creator.id === parent.creator_id);
    },
  },
  Mutation: {
    deleteGame(parent, args, context) {
      const game = db.games.find((e) => e.id === args.id);
      db.games = db.games.filter((game) => game.id !== args.id);
      return game;
    },
    addGame(parent, args, context) {
      const newGame = { ...args.game, id: Date.now().toString(), reviews: [] };
      db.games.push(newGame);
      return newGame;
    },
    updateGame(parent, args, context) {
      const id = args.id;
      const payload = args.payload;
      const gameToUpdate = db.games.findIndex((game) => game.id === id);
      if (gameToUpdate === -1) return null;

      db.games[gameToUpdate] = { ...db.games[gameToUpdate], ...payload };
      return db.games[gameToUpdate]
    },
  },
};

export default resolvers;