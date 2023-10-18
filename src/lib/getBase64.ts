import { getPlaiceholder } from "plaiceholder";
import type { Photo, ImagesResults } from "@/models/Images"

async function getBase64(imageUrl: string) {

    // const file = await fs.readFile("/path-to-your-image.jpg");
    // const { base64 } = await getPlaiceholder(file);
    // console.log(base64);

    try {
        const res = await fetch(imageUrl);

        if (!res.ok) {
            throw new Error('Failed to fetch image: ${res.status} ${res.statusText}')
        }

        const buffer = await res.arrayBuffer()
    }

}