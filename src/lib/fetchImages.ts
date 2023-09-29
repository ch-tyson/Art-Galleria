import type { ImageResults } from "@/models/Images"; 
import { ImagesSchemaWithPhotos } from "@/models/Images";
import { resolveSoa } from "dns";

export default async function fetchImages(url: string): 
Promise<ImageResults | undefined> { 
    try {
        const res = await fetch(url, {
            headers : {
                Authorization: process.env.PEXELS_API_KEY
            }
        })

        if (!res.ok) throw new Error ("Fetch Images error!\n")

        const imagesResults: ImageResults = await res.json();

        console.log(imagesResults)
        // Parse data with Zod schema
        const parsedData = ImagesSchemaWithPhotos.parse
        (imagesResults)

        if (parsedData.total_results === 0) return undefined
        return parsedData
    } catch (e) {
        // will show in terminal console
        if (e instanceof Error) console.log(e.stack)
    }
}