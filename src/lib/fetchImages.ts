// Import necessary types and schemas
import type { ImagesResults } from "@/models/Images"; 
import { ImagesSchemaWithPhotos } from "@/models/Images"
import env from "./env"

// Define an asynchronous function to fetch images from a given URL
export default async function fetchImages(url: string): 
Promise<ImagesResults | undefined> { 
    try {
        // Use the fetch API to make a request to the specified URL
        const res = await fetch(url, {
            headers : {
                Authorization: env.PEXELS_API_KEY
            }
        })

        // Check if the response is not OK, and throw an error if not
        if (!res.ok) throw new Error("Fetch Images error!\n")

        // Parse the JSON response into an object of type ImagesResults
        const imagesResults: ImagesResults = await res.json()

        // Log the parsed imagesResults to the console
        console.log(imagesResults)

        // Parse the data using the Zod schema (ImagesSchemaWithPhotos)
        const parsedData = ImagesSchemaWithPhotos.parse(imagesResults)

        // Check if the total number of results is 0, and return undefined if so
        if (parsedData.total_results === 0) return undefined

        // Return the parsed data
        return parsedData
    } catch (e) {
        // Catch any errors that occur during the try block
        // Log the error stack trace to the console
        if (e instanceof Error) console.log(e.stack)
    }
}
