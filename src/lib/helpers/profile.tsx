"use server"

import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import { auth } from "~/auth"
import { db } from "~/server/db";
import { profiles, users } from "~/server/db/schema";


export const getOrCreateProfile = async () => {
    const session = await auth(); 
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


export const updateProfile = async ( about: string) => {
    const session = await auth(); 
    if (!session) {
      return redirect("/api/auth/signin?callbackUrl=/c/" + session?.user?.id);
    }

    const profile = await getOrCreateProfile();
    
    const updatedProfile = await db.update(profiles)
    .set({ about: about })
    .where(eq(profiles.userId, profile?.userId ?? session?.user?.id))
    .returning()
    return updatedProfile;
}


export const profileWDomain = async(domain : string) => {
    const allProfiles = await db
    .select()
    .from(profiles)
    .where(eq(profiles.domain, domain))
    
    if(!allProfiles[0]) {
      return {
        status: false, 
        message: "No profile with this domain!"
      }
    }

    return {
      status: true,
      message: "Domain exists!", 
      profile: allProfiles[0]
    }
}