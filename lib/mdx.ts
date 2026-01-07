import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const postsDirectory = path.join(process.cwd(), 'data/blog');

export type Post = {
    slug: string;
    meta: {
        title: string;
        date: string;
        tags?: string[];
        draft?: boolean;
        summary?: string;
        [key: string]: any;
    };
    content: string;
};

export function getPostSlugs() {
    if (!fs.existsSync(postsDirectory)) {
        return [];
    }
    return fs.readdirSync(postsDirectory).filter((file) => file.endsWith('.mdx'));
}

export function getPostBySlug(slug: string): Post | undefined {
    const realSlug = slug.replace(/\.mdx$/, '');
    const fullPath = path.join(postsDirectory, `${realSlug}.mdx`);

    try {
        const fileContents = fs.readFileSync(fullPath, 'utf8');
        const { data, content } = matter(fileContents);

        return {
            slug: realSlug,
            meta: {
                title: data.title,
                date: data.date,
                tags: data.tags,
                draft: data.draft,
                summary: data.summary,
                ...data,
            },
            content,
        };
    } catch (error) {
        return undefined;
    }
}

export function getAllPosts(): Post[] {
    const slugs = getPostSlugs();
    const posts = slugs
        .map((slug) => getPostBySlug(slug))
        .filter((post): post is Post => post !== undefined && !post.meta.draft)
        // Sort posts by date in descending order
        .sort((post1, post2) => (post1.meta.date > post2.meta.date ? -1 : 1));
    return posts;
}
