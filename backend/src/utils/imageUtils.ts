import * as fs from 'fs';
import * as path from 'path';
import * as crypto from 'crypto';

export class ImageUtils {
    private static readonly UPLOAD_DIR = path.join(process.cwd(), 'uploads', 'profiles');

    /**
     * Ensures the upload directory exists
     */
    private static ensureUploadDir(): void {
        if (!fs.existsSync(this.UPLOAD_DIR)) {
            fs.mkdirSync(this.UPLOAD_DIR, { recursive: true });
        }
    }

    /**
     * Saves a base64 image to disk and returns the filename
     * @param base64Image - Base64 encoded image string (data:image/jpeg;base64,... or just base64 string)
     * @returns The filename of the saved image
     */
    static saveBase64Image(base64Image: string): string {
        if (!base64Image) {
            throw new Error('Image data is required');
        }

        // Extract base64 data and mime type
        let imageData = base64Image;
        let extension = 'jpg'; // default

        // Check if it's a data URL (data:image/...;base64,...)
        if (base64Image.includes('data:image')) {
            const matches = base64Image.match(/data:image\/(\w+);base64,(.+)/);
            if (matches) {
                extension = matches[1] === 'png' ? 'png' : matches[1] === 'gif' ? 'gif' : matches[1] === 'webp' ? 'webp' : 'jpg';
                imageData = matches[2];
            } else {
                // Fallback: try to extract just the base64 part
                const base64Match = base64Image.split(',');
                if (base64Match.length > 1) {
                    imageData = base64Match[1];
                }
            }
        }

        // Decode base64 to buffer
        const buffer = Buffer.from(imageData, 'base64');

        // Generate unique filename using crypto
        const uniqueId = crypto.randomBytes(16).toString('hex');
        const filename = `${uniqueId}.${extension}`;
        const filepath = path.join(this.UPLOAD_DIR, filename);

        // Ensure directory exists
        this.ensureUploadDir();

        // Write file to disk
        fs.writeFileSync(filepath, buffer);

        // Return only the filename (not the full path)
        return filename;
    }
}

