import { Client, Databases } from "appwrite"
const client = new Client();

client
    .setEndpoint(process.env.NEXT_ENDPOINT!)
    .setProject(process.env.NEXT_PROJECT_ID!);

const databases = new Databases(client)

export {
    client,
    databases
}