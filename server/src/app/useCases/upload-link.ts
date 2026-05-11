import { db } from "@/infra/db";
import { schema } from "@/infra/db/schemas";
import { makeRight } from "@/infra/shared/either";
import { uploadLinkToStorage } from "@/infra/storage/upload-link-to-storage";
import z from "zod";

const uploadLinkInput = z.object({
    originalLink: z.string(),
    shortLink: z.string()
})

type UploadLinkInput = z.input<typeof uploadLinkInput>

export async function uploadLink(input: UploadLinkInput) {
    const { originalLink, shortLink } = uploadLinkInput.parse(input)

    const { key, url } = await uploadLinkToStorage({
        originalLink,
        shortLink
    })

    await db.insert(schema.links).values({
        originalLink: originalLink,
        shortLink: shortLink,
        remoteKey: key,
        remoteUrl: url
    })

    return makeRight({ url })
}