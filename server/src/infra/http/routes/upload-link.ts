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
                201: z.object({
                    message: z.string(),
                    data: z.object({
                        originalLink: z.string(),
                        shortLink: z.string()
                    })
                }),
                400: z.object({
                    message: z.string().describe('Upload already exists'),
                })
            }
        }
    }, async (request, reply) => {
        return reply.status(201).send({
            message: "Link uploaded successfully",
            data: {
                originalLink: 'Link original', // TODO: Implementar lógica para salvar o link original
                shortLink: 'Link encurtado' // TODO: Implementar lógica para gerar o link curto
            }
        })
    })
}