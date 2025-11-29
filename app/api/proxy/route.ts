import { NextRequest, NextResponse } from 'next/server';
import { processM3u8Content } from '@/lib/utils/proxy-utils';

export const runtime = 'nodejs';

// Disable SSL verification for video sources with invalid certificates
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

export async function GET(request: NextRequest) {
    const url = request.nextUrl.searchParams.get('url');

    if (!url) {
        return new NextResponse('Missing URL parameter', { status: 400 });
    }

    try {
        // Beijing IP address to simulate request from China
        const chinaIP = '202.108.22.5';
        const MAX_RETRIES = 5;
        let lastError = null;
        let response = null;

        for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
            try {
                response = await fetch(url, {
                    headers: {
                        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
                        'X-Forwarded-For': chinaIP,
                        'Client-IP': chinaIP,
                        'Referer': new URL(url).origin,
                    },
                });

                if (response.ok) {
                    console.log(`✓ Proxy success on attempt ${attempt}: ${url}`);
                    break;
                }

                if (response.status === 503 && attempt < MAX_RETRIES) {
                    console.warn(`⚠ Got 503 on attempt ${attempt}, retrying... (${url})`);
                    lastError = `503 on attempt ${attempt}`;
                    await new Promise(resolve => setTimeout(resolve, 100));
                    continue;
                }

                console.warn(`✗ Got ${response.status} on attempt ${attempt}: ${url}`);
                break;
            } catch (fetchError) {
                lastError = fetchError;
                if (attempt < MAX_RETRIES) {
                    console.warn(`⚠ Fetch error on attempt ${attempt}, retrying...`, fetchError);
                    await new Promise(resolve => setTimeout(resolve, 100));
                } else {
                    throw fetchError;
                }
            }
        }

        if (!response || !response.ok) {
            throw new Error(`Failed after ${MAX_RETRIES} attempts: ${response?.status || lastError}`);
        }

        const contentType = response.headers.get('Content-Type');

        // Handle m3u8 playlists
        if (contentType && (contentType.includes('application/vnd.apple.mpegurl') || contentType.includes('application/x-mpegurl') || url.endsWith('.m3u8'))) {
            const text = await response.text();
            const modifiedText = await processM3u8Content(text, url, request.nextUrl.origin);

            return new NextResponse(modifiedText, {
                status: response.status,
                statusText: response.statusText,
                headers: {
                    'Content-Type': contentType,
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': 'GET, OPTIONS',
                    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
                },
            });
        }

        // For non-m3u8 content
        const headers = new Headers();
        response.headers.forEach((value, key) => {
            const lowerKey = key.toLowerCase();
            if (!['content-encoding', 'content-length', 'transfer-encoding'].includes(lowerKey)) {
                headers.set(key, value);
            }
        });

        headers.set('Access-Control-Allow-Origin', '*');
        headers.set('Access-Control-Allow-Methods', 'GET, OPTIONS');
        headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');

        return new NextResponse(response.body, {
            status: response.status,
            statusText: response.statusText,
            headers: headers,
        });
    } catch (error) {
        console.error('Proxy error:', error);
        return new NextResponse(
            JSON.stringify({
                error: 'Proxy request failed',
                message: error instanceof Error ? error.message : 'Unknown error',
                url: url
            }),
            {
                status: 500,
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                }
            }
        );
    }
}

export async function OPTIONS(request: NextRequest) {
    return new NextResponse(null, {
        status: 204,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        },
    });
}
