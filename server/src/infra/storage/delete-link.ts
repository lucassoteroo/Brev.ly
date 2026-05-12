import { GetObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3";
import { r2 } from "./client";
import { env } from "@/env";

export async function deleteLinkFromStorage(shortLink: string) {
    const linksKey = "links.json";
   
    const getCmd = new GetObjectCommand({
      Bucket: env.CLOUDFLARE_BUCKET,
      Key: linksKey
    });
    
    const response = await r2.send(getCmd);
    const body = await response.Body?.transformToString();
    
    if (!body) return;
    
    let linksArray = JSON.parse(body);
    
    const updatedLinks = linksArray.filter((link: any) => link.short_link !== shortLink);
    
    const putCmd = new PutObjectCommand({
      Bucket: env.CLOUDFLARE_BUCKET,
      Key: linksKey,
      Body: JSON.stringify(updatedLinks, null, 2),
      ContentType: "application/json"
    });
    
    await r2.send(putCmd);
}