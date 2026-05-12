import { db } from "@/infra/db";
import { schema } from "@/infra/db/schemas";
import { Either, makeRight, makeLeft } from "@/infra/shared/either";
import { uploadLinkToStorage } from "@/infra/storage/upload-link-to-storage";
import z from "zod";
import { ShortLinkAlreadyExists } from "../erros/short-link-already-exists";

const uploadLinkInput = z.object({
    originalLink: z.string(),
    shortLink: z.string()
})

type UploadLinkInput = z.input<typeof uploadLinkInput>

export async function uploadLink(input: UploadLinkInput): Promise<Either<ShortLinkAlreadyExists, { url: string }>> {
    const { originalLink, shortLink } = uploadLinkInput.parse(input)

    // Verifica se já existe shortLink no banco
    const existing = await db.query.links.findFirst({
        where: (links, { eq }) => eq(links.shortLink, shortLink)
    })
    
    if (existing) {
        return makeLeft(new ShortLinkAlreadyExists())
    }

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