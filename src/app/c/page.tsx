"use client"

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useToast } from "~/components/ui/use-toast";

const Page = () => {

    const { toast } = useToast();
    const router = useRouter()

    useEffect(() => {
        toast({
            title: "Go to specific creator",
            description: "You can go to a specific creator by going to /c/creatorId. Redirecting you to home page.",
        })

        return  router.push("/")
    }, [])
    
    
}

export default Page;