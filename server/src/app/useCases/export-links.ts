import { db, pg } from "@/infra/db";
import { schema } from "@/infra/db/schemas";
import { Either, makeRight } from "@/infra/shared/either";
import { stringify } from "csv-stringify";
import { pipeline } from "node:stream/promises";
import { randomUUID } from "node:crypto";
import { env } from "@/env";
import z from "zod";
import { uploadCsv } from "@/infra/storage/upload-csv";

const exportLinksInput = z.object({
  sortBy: z.enum(['createdAt']).optional().default('createdAt')
})

type ExportLinksInput = z.input<typeof exportLinksInput>

type ExportLinksOutput = {
  reportUrl: string
}

export async function exportLinks(input: ExportLinksInput): Promise<Either<never, ExportLinksOutput>> {
  const { sortBy } = exportLinksInput.parse(input);

  const { sql, params } = db
    .select({
      id: schema.links.id,
      originalLink: schema.links.originalLink,
      shortLink: schema.links.shortLink,
      hits: schema.links.hits,
      createdAt: schema.links.createdAt,
    })
    .from(schema.links)
    .orderBy(schema.links[sortBy])
    .toSQL();

  const cursor = pg.unsafe(sql, params as any[]).cursor(10);

  const csvTransformer = stringify({
    header: true,
    columns: [
      { key: 'id', header: 'ID' },
      { key: 'original_link', header: 'Original URL' },
      { key: 'short_link', header: 'Short URL' },
      { key: 'hits', header: 'Access Count' },
      { key: 'created_at', header: 'Created At' },
    ],
    bom: true 
  });

  const chunks: Buffer[] = [];
  
  await pipeline(
    cursor,
    async function* (source) {
      for await (const rows of source) {
        for (const row of rows) {
          yield row; 
        }
      }
    },
    csvTransformer,
    async function* (source) {
      for await (const chunk of source) {
        chunks.push(Buffer.from(chunk));
      }
    }
  );

  const fullCsvBuffer = Buffer.concat(chunks);

  const reportKey = `${new Date().toISOString()}-links.csv`;
  
  await uploadCsv({
    key: reportKey,
    body: fullCsvBuffer,
    contentType: "text/csv"
  });

  const reportUrl = new URL(reportKey, env.CLOUDFLARE_PUBLIC_URL).toString();

  return makeRight({ reportUrl });
}