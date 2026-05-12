import { deleteLink } from "@/app/useCases/delete-link";
import { isLeft, isRight, unwrapEither } from "@/infra/shared/either";
import { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import z from "zod";

export const DeleteLinkRoute: FastifyPluginAsyncZod = async server => {
    server.post("/links/delete/:short_link", {
        schema: {
            summary: "Delete link",
            response: {
                201: z.object({ message: z.string() }),
                400: z.object({ message: z.string() }),
                409: z.object({ message: z.string() })
            }
        }
    }, async (request: any, reply) => {
        const { short_link } = request.params

        const result = await deleteLink({ short_link })

        if (isRight(result)) {
            return reply.status(201).send({ message: result.right.message })
        }

        if (isLeft(result)) {
            return reply.status(409).send({ message: result.left.message })
        }

        return reply.status(400).send({ message: "Erro deletar link" })
    })
}