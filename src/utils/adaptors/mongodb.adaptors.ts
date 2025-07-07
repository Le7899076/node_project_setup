// import { Server } from "socket.io";
// import { createAdapter } from "@socket.io/mongo-adapter";
// import { MongoClient } from "mongodb";

// const DB = "mydb";
// const COLLECTION = "socket.io-adapter-events";

// const io = new Server();

// const mongoClient = new MongoClient("mongodb://localhost:27017/?replicaSet=rs0");

// await mongoClient.connect();

// try {
//   await mongoClient.db(DB).createCollection(COLLECTION, {
//     capped: true,
//     size: 1e6
//   });
// } catch (e) {
//   // collection already exists
// }
// const mongoCollection = mongoClient.db(DB).collection(COLLECTION);

// export default mongoCollection;
