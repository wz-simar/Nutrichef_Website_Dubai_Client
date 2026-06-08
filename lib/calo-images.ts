/** api-blog.calo.app sets CORP: same-site; proxy via calo.app (same as CommunitySection). */
export function caloBlogImage(filename: string, width = 1200) {
    const source = `https://api-blog.calo.app/wp-content/uploads/2025/10/${filename}`;
    return `https://calo.app/_next/image?url=${encodeURIComponent(source)}&w=${width}&q=100`;
}
