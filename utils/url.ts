export function convertUrlWithEncodedJson(url: string): string {
    const [base, query] = url.split('?');
    if (!query) return url;

    const params = new URLSearchParams(query);

    for (const [key, value] of params.entries()) {
        try {
            // Chỉ parse nếu value là JSON chưa được encode
            const parsed = JSON.parse(value);
            const encoded = encodeURIComponent(JSON.stringify(parsed));
            params.set(key, encoded);
        } catch {
            // Nếu JSON.parse fail, thì giữ nguyên
        }
    }

    return `${base}?${params.toString()}`;
}
