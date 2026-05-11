import { db } from "@/infra/db";
import { schema } from "@/infra/db/schemas";
import z from "zod";

const uploadLinkInput = z.object({
    originalLink: z.string(),
    shortLink: z.string()
})

type UploadLinkInput = z.input<typeof uploadLinkInput>

export async function uploadLink(input: UploadLinkInput) {
    const { originalLink, shortLink } = uploadLinkInput.parse(input)

    await db.insert(schema.links).values({
        originalLink: originalLink,
        shortLink: shortLink,
        remoteKey: shortLink,
        remoteUrl: originalLink
    })
}