import { db } from "@/infra/db";
import { schema } from "@/infra/db/schemas";
import { Either, makeLeft, makeRight } from "@/infra/shared/either";
import { eq, ilike } from "drizzle-orm";
import z from "zod";
import { ShortLinkNotFounded } from "../erros/short-link-not-founded";
import { updateLinkHitsInStorage } from "@/infra/storage/update-hits";

const updateHitsInput = z.object({
    shortLink: z.string(),
})

type UpdateHitsInput = z.input<typeof updateHitsInput>

export async function updateHits(input: UpdateHitsInput): Promise<Either<ShortLinkNotFounded, { message: string }>> {
    const { shortLink } = updateHitsInput.parse(input)

    const result = await db
       .select()
       .from(schema.links)
       .where(
          shortLink ? ilike(schema.links.shortLink, `%${shortLink}%`) : undefined
       )

    if (result.length === 0) {
        return makeLeft(new ShortLinkNotFounded());
    }

    await updateLinkHitsInStorage(result[0].shortLink, result[0].hits + 1)

    await db
        .update(schema.links)
        .set({
            hits: result[0].hits + 1
        })
        .where(eq(schema.links.id, result[0].id));

    return makeRight({ message: 'Link updated successfully' })
}