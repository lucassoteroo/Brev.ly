import { db } from "@/infra/db";
import { schema } from "@/infra/db/schemas";
import { Either, makeRight, makeLeft } from "@/infra/shared/either";
import { asc } from "drizzle-orm";
import z from "zod";

const getLinksInput = z.object({
    sortBy: z.enum(['createdAt']).optional().default('createdAt')
})

type GetLinksInput = z.input<typeof getLinksInput>

type getLinksOutput = {
    links: {
        id: string,
        originalLink: string,
        shortLink: string,
        hits: number,
        remoteKey: string,
        remoteUrl: string,
        createdAt: Date,
    }[]
}

export async function getLinks(input: GetLinksInput): Promise<Either<never, getLinksOutput>> {
    const { sortBy } = getLinksInput.parse(input)

    const links = await db
       .select({
          id: schema.links.id,
          originalLink: schema.links.originalLink,
          shortLink: schema.links.shortLink,
          hits: schema.links.hits,
          remoteKey: schema.links.remoteKey,
          remoteUrl: schema.links.remoteUrl,
          createdAt: schema.links.createdAt,
       })
       .from(schema.links)
       .orderBy(fields => {
          if (sortBy) {
            return asc(fields[sortBy])
          }

          return asc(fields.createdAt)
       })

    return makeRight({ links })
}