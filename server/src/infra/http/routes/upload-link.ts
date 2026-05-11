import { uploadLink } from "@/app/useCases/upload-link";
import { db } from "@/infra/db";
import { schema } from "@/infra/db/schemas";
import { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import z from "zod";

export const UploadLinkRoute: FastifyPluginAsyncZod = async server => {
    server.post("/upload-link", {
        schema: {
            summary: "Upload a link",
            body: z.object({
                originalLink: z.string(),
                shortLink: z.string()
            }),
            response: {
                201: z.object({ message: z.string() }),
                400: z.object({ message: z.string() }),
                409: z.object({
                    message: z.string().describe('Link already exists'),
                })
            }
        }
    }, async (request, reply) => {
        const originalLink = request.body.originalLink
        const shortLink = request.body.shortLink

        if (!originalLink) {
            return reply.status(400).send({ message: 'Original Link is required' })
        }
        
        if (!shortLink) {
            return reply.status(400).send({ message: 'Short Link is required' })
        }

        await uploadLink({
            originalLink: request.body.originalLink,
            shortLink:request.body.shortLink
        })

        return reply.status(201).send({ message: "Link uploaded successfully" })
    })
}