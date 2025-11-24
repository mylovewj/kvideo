/**
 * Utility to optimize images using images.weserv.nl
 * This service caches images and converts them to WebP, improving load times
 * and bypassing some referrer-based blocks.
 */
export function getOptimizedImageUrl(url: string, width?: number, quality: number = 80): string {
    if (!url) return '';

    // Skip optimization for local images or already optimized images
    if (url.startsWith('/') || url.includes('weserv.nl')) {
        return url;
    }

    // Remove protocol for weserv usage
    const cleanUrl = url.replace(/^https?:\/\//, '');

    // Construct weserv URL
    // url: source url (without protocol)
    // w: width
    // q: quality
    // output: webp (for better compression)
    // l: load (lazy load, though handled by next/image)
    // n: no-redirect (returns error image instead of redirecting)
    const baseUrl = `https://images.weserv.nl/?url=${encodeURIComponent(cleanUrl)}&output=webp&q=${quality}&n=-1`;

    if (width) {
        return `${baseUrl}&w=${width}`;
    }

    return baseUrl;
}
