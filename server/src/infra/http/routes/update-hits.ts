import { updateHits } from "@/app/useCases/update-hits";
import { isLeft, isRight } from "@/infra/shared/either";
import { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import z from "zod";

export const UpdateHitsRoute: FastifyPluginAsyncZod = async server => {
    server.put("/links/update", {
        schema: {
            summary: "Update link",
            body: z.object({
                shortLink: z.string().optional(),
            }),
            response: {
                201: z.object({ message: z.string() }),
                400: z.object({ message: z.string() }),
                409: z.object({ message: z.string() })
            }
        }
    }, async (request: any, reply) => {
        const shortLink = request.body.shortLink
        
        const result = await updateHits({ shortLink })

        if (isRight(result)) {
            return reply.status(201).send({ message: result.right.message })
        }

        if (isLeft(result)) {
            return reply.status(409).send({ message: result.left.message })
        }

        return reply.status(400).send({ message: "Erro atualizar link" })
    })
}