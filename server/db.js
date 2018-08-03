// @ts-check
const { MongoClient, ObjectID } = require('mongodb');
const mongoose = require('mongoose');
const { Schema } = mongoose;
const url = `mongodb://localhost:27017/keyf`;

mongoose.connect(url);
mongoose.Promise = global.Promise;

const db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// ------------------------------

const UserSchema = new Schema({
  email: String,
  username: String,
  providers: {
    google: Schema.Types.Mixed
  },
  subscription: {
    start: Date,
    end: Date
  }
});

const UserModel = mongoose.model('User', UserSchema);

function createUser(provider, data) {
  const userInstance = new UserModel({
    email: data.emails[0].value,
    username: '',
    providers: {
      [provider]: data
    },
    subscription: {
      start: Date.now(),
      end: Date.now()
    }
  });

  userInstance.save(err => {
    if (err) throw err;

    console.log('saved');
  });
}

export async function findUser(email) {
  await new Promise((res, rej) => {
    UserModel.find({ email }, (err, users) => {
      if (err) throw err;

      return res(users[0]);
    });
  });
}

MongoClient.connect(
  url,
  (err, client) => {
    if (err) throw err;

    const db = client.db('keyf');

    db.collection('users')
      .find()
      .toArray((err, result) => {
        if (err) throw err;

        console.log(result);
      });
  }
);

module.exports = {
  createUser
};
