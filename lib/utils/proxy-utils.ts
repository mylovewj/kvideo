
export async function processM3u8Content(
    content: string,
    baseUrl: string,
    origin: string
): Promise<string> {
    const lines = content.split('\n');
    const base = new URL(baseUrl);

    const processedLines = lines.map(line => {
        const trimmed = line.trim();

        // Handle EXT-X-KEY encryption keys
        if (trimmed.startsWith('#EXT-X-KEY:')) {
            // Extract URI from the key tag
            const uriMatch = trimmed.match(/URI="([^"]+)"/);
            if (uriMatch && uriMatch[1]) {
                const keyUri = uriMatch[1];
                try {
                    const absoluteUrl = new URL(keyUri, base).toString();
                    const proxiedUrl = `${origin}/api/proxy?url=${encodeURIComponent(absoluteUrl)}`;
                    return trimmed.replace(/URI="[^"]+"/, `URI="${proxiedUrl}"`);
                } catch {
                    return line;
                }
            }
        }

        // Skip other comments and empty lines
        if (trimmed.startsWith('#') || !trimmed) {
            return line;
        }

        // Resolve relative URLs for segments
        try {
            const absoluteUrl = new URL(trimmed, base).toString();
            return `${origin}/api/proxy?url=${encodeURIComponent(absoluteUrl)}`;
        } catch {
            return line;
        }
    });

    return processedLines.join('\n');
}
