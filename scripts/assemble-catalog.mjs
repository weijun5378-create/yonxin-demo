import { readdir, readFile, writeFile, mkdir } from 'node:fs/promises';
const folder = new URL('../catalog-parts/', import.meta.url);
const parts = (await readdir(folder)).filter(n => n.endsWith('.part')).sort();
await mkdir(new URL('../public/assets/', import.meta.url), {recursive:true});
await writeFile(new URL('../public/assets/yongxin-catalog-2026.pdf', import.meta.url), Buffer.concat(await Promise.all(parts.map(n => readFile(new URL(n,folder))))));
