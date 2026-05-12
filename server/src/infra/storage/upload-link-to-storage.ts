import { GetObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3";
import { randomUUID } from "node:crypto";
import z from "zod";
import { r2 } from "./client";
import { env } from "@/env";
import { ShortLinkAlreadyExists } from "@/app/erros/short-link-already-exists";

const uploadLinkToStorageInput = z.object({
    originalLink: z.string(),
    shortLink: z.string()
})

type UploadLinkToStorageInput = z.input<typeof uploadLinkToStorageInput>

export async function uploadLinkToStorage(input: UploadLinkToStorageInput) {
    const { originalLink, shortLink } = uploadLinkToStorageInput.parse(input)
    const uniqueShortLink = `${randomUUID()}-${shortLink}`
    const newLink = {
        id: uniqueShortLink,
        original_link: originalLink,
        short_link: shortLink,
        hits: 0,
        remote_key: uniqueShortLink,
        remote_url: new URL(uniqueShortLink, env.CLOUDFLARE_PUBLIC_URL).toString(),
        created_at: new Date().toISOString()
    }

    const linksKey = "links.json"
    let linksArray = []
    try {
        const getCmd = new GetObjectCommand({
            Bucket: env.CLOUDFLARE_BUCKET,
            Key: linksKey
        })
        const response: any = await r2.send(getCmd)
        const body = await response.Body.transformToString()
        linksArray = JSON.parse(body)
        if (!Array.isArray(linksArray)) linksArray = []
    } catch (err) {
        linksArray = []
    }
    
    linksArray.push(newLink)

    const putCmd = new PutObjectCommand({
        Bucket: env.CLOUDFLARE_BUCKET,
        Key: linksKey,
        Body: JSON.stringify(linksArray, null, 2),
        ContentType: "application/json"
    })
    await r2.send(putCmd)

    return {
        key: uniqueShortLink,
        url: newLink.remote_url
    }
}