import { GetObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3";
import { r2 } from "./client";
import { env } from "@/env";

export async function updateLinkHitsInStorage(shortLink: string, newHits: number) {
  const linksKey = "links.json";

  // 1. Obtém o arquivo atual
  const getCmd = new GetObjectCommand({
    Bucket: env.CLOUDFLARE_BUCKET,
    Key: linksKey
  });
  
  const response = await r2.send(getCmd);

  const body = await response.Body?.transformToString();
  
  if (!body) return;  

  let linksArray = JSON.parse(body);  
  // 2. Atualiza os hits no objeto correspondente dentro do array
  // Note que usamos 'short_link' para bater com o padrão do seu arquivo JSON
  const updatedLinks = linksArray.map((link: any) => {
    if (link.short_link === shortLink) {
      return { ...link, hits: newHits };
    }
    return link;
  });  

  // 3. Salva a versão atualizada de volta no R2
  const putCmd = new PutObjectCommand({
    Bucket: env.CLOUDFLARE_BUCKET,
    Key: linksKey,
    Body: JSON.stringify(updatedLinks, null, 2),
    ContentType: "application/json"
  });  
  
  await r2.send(putCmd);
}