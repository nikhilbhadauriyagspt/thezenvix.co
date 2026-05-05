import { promises as fs } from 'fs';
import path from 'path';
import sharp from 'sharp';

const folders = [
  'public/products',
  'public/category',
  'public/newproimges',
  'public/about',
  'public/midbanner',
  'public/banner',
  'public/banner/category-imges',
  'public/productsgrid',
  'public/logo'
];

export default function imageApiPlugin() {
  return {
    name: 'image-api-plugin',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        if (req.url === '/api/images' && req.method === 'GET') {
          try {
            const allImages = [];
            for (const folder of folders) {
              const absolutePath = path.resolve(folder);
              try {
                await fs.access(absolutePath);
                const files = await fs.readdir(absolutePath);

                // Get only original images (not already converted versions)
                const originalImages = files.filter(f =>
                  f.match(/\.(jpg|jpeg|png)$/i) &&
                  !f.includes('_thumb') &&
                  !f.includes('_med') &&
                  !f.endsWith('.webp') &&
                  !f.endsWith('.avif')
                );

                for (const file of originalImages) {
                  const baseName = path.basename(file, path.extname(file));
                  allImages.push({
                    name: file,
                    folder: folder,
                    path: `/${folder.replace('public/', '')}/${file}`,
                    hasWebp: files.includes(`${baseName}.webp`),
                    hasAvif: files.includes(`${baseName}.avif`),
                    hasThumb: files.includes(`${baseName}_thumb.webp`),
                  });
                }
              } catch (e) {
                // Folder might not exist
              }
            }
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(allImages));
          } catch (err) {
            res.statusCode = 500;
            res.end(JSON.stringify({ error: err.message }));
          }
          return;
        }

        if (req.url === '/api/convert-images' && req.method === 'POST') {
          let body = '';
          req.on('data', chunk => { body += chunk; });
          req.on('end', async () => {
            try {
              const { images } = JSON.parse(body);
              const results = [];

              for (const img of images) {
                const fullPath = path.join(path.resolve(img.folder), img.name);
                const folderPath = path.resolve(img.folder);
                const ext = path.extname(img.name);
                const baseName = path.basename(img.name, ext);
                const buffer = await fs.readFile(fullPath);

                // Thumbnail (300px)
                await sharp(buffer).resize(300).avif({ quality: 60 }).toFile(path.join(folderPath, `${baseName}_thumb.avif`));
                await sharp(buffer).resize(300).webp({ quality: 60 }).toFile(path.join(folderPath, `${baseName}_thumb.webp`));

                // Medium (600px)
                await sharp(buffer).resize(600).avif({ quality: 60 }).toFile(path.join(folderPath, `${baseName}_med.avif`));
                await sharp(buffer).resize(600).webp({ quality: 60 }).toFile(path.join(folderPath, `${baseName}_med.webp`));

                // Standard AVIF & WebP
                await sharp(buffer).avif({ quality: 60 }).toFile(path.join(folderPath, `${baseName}.avif`));
                await sharp(buffer).webp({ quality: 60 }).toFile(path.join(folderPath, `${baseName}.webp`));

                results.push({ name: img.name, status: 'success' });
              }

              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ results }));
            } catch (err) {
              res.statusCode = 500;
              res.end(JSON.stringify({ error: err.message }));
            }
          });
          return;
        }

        next();
      });
    }
  };
}
