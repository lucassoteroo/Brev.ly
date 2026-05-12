import { exportLinks } from "@/app/useCases/export-links";
import { unwrapEither } from "@/infra/shared/either";
import { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import z from "zod";

export const ExportLinksRoute: FastifyPluginAsyncZod = async server => {
    server.post("/links/exports", {
        schema: {
            summary: "Export links",
            querystring: z.object({
                sortBy: z.enum(['createdAt']).optional().default('createdAt')
            }),
            response: {
                200: z.object({
                   reportUrl: z.string()
                })
            }
        }
    }, async (request, reply) => {
        const { sortBy } = request.query

        const result = await exportLinks({ sortBy })

        const { reportUrl } = unwrapEither(result)

        return reply.status(200).send({ reportUrl })
    })
}