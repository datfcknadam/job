const { MONGO_DB,
  MONGO_USERNAME,
  MONGO_PASSWORD} = require('./env/index');
  db.createUser(
    {
      user: MONGO_USERNAME,
      pwd: MONGO_PASSWORD,
      roles: [
        {
          role: "readWrite",
          db: MONGO_DB,
        },
      ],
    },
  );