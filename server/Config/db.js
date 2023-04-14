import { MongoClient } from "mongodb";
const state = {
  db: null,
};
export const connectDb = async () => {
  const url = process.env.MONGO_URL;
  const dbname = process.env.DB_NAME;

  MongoClient.connect(url, { useUnifiedTopology: true }, (err, data) => {
    if (err) {
      console.log(err);
    } else {
      (state.db = data.db(dbname)), console.log("connected to databse");
    }
  });
};
export const db = () => {
  return state.db;
};