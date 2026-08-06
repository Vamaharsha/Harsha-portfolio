/**
 * Batch convert all PNG images in src/assets/ to optimized WebP.
 * - Resizes images larger than 1200px wide down to 1200px (certificates, portraits)
 * - Skill icons (< 100KB) get resized to max 256px
 * - Uses quality 80 for photos, 85 for icons (good balance of quality/size)
 */

import sharp from 'sharp';
import { readdir, stat } from 'fs/promises';
import { join, extname, basename } from 'path';

const ASSETS_DIR = 'src/assets';

async function convertAll() {
    const files = await readdir(ASSETS_DIR);
    const pngs = files.filter(f => extname(f).toLowerCase() === '.png');
    
    console.log(`Found ${pngs.length} PNG files to convert\n`);
    
    let totalBefore = 0;
    let totalAfter = 0;
    
    for (const file of pngs) {
        const filePath = join(ASSETS_DIR, file);
        const webpPath = filePath.replace(/\.png$/i, '.webp');
        
        const info = await stat(filePath);
        const sizeBefore = info.size;
        totalBefore += sizeBefore;
        
        const isIcon = file.includes('_icon') || file.includes('_logo') || file.includes('projector');
        const maxWidth = isIcon ? 256 : 1200;
        const quality = isIcon ? 85 : 80;
        
        try {
            const metadata = await sharp(filePath).metadata();
            const needsResize = (metadata.width || 0) > maxWidth;
            
            let pipeline = sharp(filePath);
            
            if (needsResize) {
                pipeline = pipeline.resize({ width: maxWidth, withoutEnlargement: true });
            }
            
            await pipeline.webp({ quality, effort: 6 }).toFile(webpPath);
            
            const webpInfo = await stat(webpPath);
            totalAfter += webpInfo.size;
            
            const reduction = ((1 - webpInfo.size / sizeBefore) * 100).toFixed(1);
            console.log(`✓ ${file} → ${basename(webpPath)} | ${(sizeBefore/1024).toFixed(0)}KB → ${(webpInfo.size/1024).toFixed(0)}KB (${reduction}% smaller)${needsResize ? ' [resized]' : ''}`);
        } catch (err) {
            console.error(`✗ ${file}: ${err.message}`);
        }
    }
    
    console.log(`\n━━━ Summary ━━━`);
    console.log(`Before: ${(totalBefore / 1024 / 1024).toFixed(1)} MB`);
    console.log(`After:  ${(totalAfter / 1024 / 1024).toFixed(1)} MB`);
    console.log(`Saved:  ${((totalBefore - totalAfter) / 1024 / 1024).toFixed(1)} MB (${((1 - totalAfter/totalBefore) * 100).toFixed(0)}% reduction)`);
}

convertAll().catch(console.error);
