"use server"

import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import { auth } from "~/auth"
import { db } from "~/server/db";
import { profiles } from "~/server/db/schema";


export const getOrCreateProfile = async () => {
    const session = await auth(); 
    console.log(session)
    if (!session) {
      return redirect("/api/auth/signin?callbackUrl=/c/" + session?.user?.id);
    }

    const profile = await db
      .select()
      .from(profiles)
      .where(eq(profiles.userId, session?.user?.id));

    if(!profile[0]) {
        // create profile
        const profile = await db.insert(profiles).values({
            // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
            userId : session.user.id! as string,
        }).returning()

        return profile[0];
    }
      
    return profile[0];
}


const updateProfile = async ( updateObject : Record<string, string>) => {
    // await db.update(profiles)
}