  db.createUser(
    {
      user: "sammy",
      pwd: "your_password",
      roles: [
        {
          role: "readWrite",
          db: "river",
        },
      ],
    },
  );
