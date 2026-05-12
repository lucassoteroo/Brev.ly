import { getLinks } from "@/app/useCases/get-links";
import { unwrapEither } from "@/infra/shared/either";
import { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import z from "zod";

export const GetLinksRoute: FastifyPluginAsyncZod = async server => {
    server.get("/links", {
        schema: {
            summary: "Get links",
            querystring: z.object({
                sortBy: z.enum(['createdAt']).optional().default('createdAt')
            }),
            response: {
                200: z.object({
                    links: z.array(z.object({
                       id: z.string(),
                       originalLink: z.string(),
                       shortLink: z.string(),
                       hits: z.number(),
                       remoteKey: z.string(),
                       remoteUrl: z.string(),
                       createdAt: z.date(),
                    }))
                })
            }
        }
    }, async (request, reply) => {
        const { sortBy } = request.query

        const result = await getLinks({ sortBy })

        const { links } = unwrapEither(result)

        return reply.status(200).send({ links })
    })
}