import { MongoClient } from "mongodb";

import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

const client = new MongoClient(process.env.MONGODB_URI!);
const db = client.db();

export const auth = betterAuth({
    database: mongodbAdapter(db, {
        client,
    }),
    emailAndPassword:{
        enabled: true,
    }
});

 // this function is used to get the current session of the user. It uses the auth.api.getSession method to retrieve the session information from the server. The headers() function is called to get the necessary headers for the request, which may include authentication tokens or other relevant information.
export const getSession = async () => {
    const res = await auth.api.getSession({
        headers: await headers()
    });

    return res;
}

export const signOut = async () => {
    const res = await auth.api.signOut({
        headers: await headers()
    });
    
    if(res.success) redirect("/sign-in");
}