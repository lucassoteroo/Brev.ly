import { PutObjectCommand } from "@aws-sdk/client-s3";
import { r2 } from "./client";
import { env } from "@/env";

interface UploadCsvInput {
    key: string;
    body: string | Buffer | Uint8Array | any; // O S3 aceita streams aqui
    contentType: string;
}

export async function uploadCsv({ key, body, contentType }: UploadCsvInput) {
    const putCmd = new PutObjectCommand({
        Bucket: env.CLOUDFLARE_BUCKET,
        Key: key,
        Body: body,
        ContentType: contentType,
    });

    await r2.send(putCmd);

    return {
        key,
        url: new URL(key, env.CLOUDFLARE_PUBLIC_URL).toString(),
    };
}