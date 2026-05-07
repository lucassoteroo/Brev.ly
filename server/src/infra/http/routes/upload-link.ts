import { FastifyPluginAsyncZod } from "fastify-type-provider-zod";

export const UploadLinkRoute: FastifyPluginAsyncZod = async server => {
    server.post("/upload-link", () => {
        return 'Hello World'
    })
}