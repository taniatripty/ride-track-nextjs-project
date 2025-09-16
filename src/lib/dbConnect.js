import { MongoClient, ServerApiVersion } from "mongodb";

export const collectionNames = {
  TEST_USER: "test-users",
  FOOD_DATA:"foods",
  RESTURANT:'resturant'
};

function dbconnet(collectionName) {
  const uri = process.env.MONGODB_URI;
  const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    },
  });
  return client.db(process.env.DB_NAME).collection(collectionName);
}

export default dbconnet;
