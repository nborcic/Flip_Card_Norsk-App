import { MangoClient, ServerApiVersion } from "mangodb"


const uri = process.env.MONGO_URI || "";
const client = new MangoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        depricationError: true,
    },

});

try {
    await client.connect();
    await client.db("admin").command({ ping: 1 });
    console.log(
        "Pinged your deployment. You successfully connected to MongoDB!"
    );
} catch (err) {
    console.error(err);

}

