import { getPostBySlug, getPostSlugs } from "@/lib/mdx";
import { ArticleJsonLd } from "next-seo";
import { MDXRemote } from "next-mdx-remote/rsc";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Metadata } from "next";

type Props = {
    params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
    const slugs = getPostSlugs();
    return slugs.map((slug) => ({
        slug: slug.replace(/\.mdx$/, ''),
    }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const post = getPostBySlug(slug);
    if (!post) {
        return {};
    }
    return {
        title: `${post.meta.title} - NextFlat Blog`,
        description: post.meta.summary,
    };
}

const components = {
    TOCInline: () => null,
    h1: (props: any) => <h1 className="text-3xl font-bold mt-8 mb-4 text-slate-900" {...props} />,
    h2: (props: any) => <h2 className="text-2xl font-semibold mt-8 mb-4 text-slate-900" {...props} />,
    h3: (props: any) => <h3 className="text-xl font-semibold mt-6 mb-3 text-slate-900" {...props} />,
    h4: (props: any) => <h4 className="text-lg font-semibold mt-6 mb-3 text-slate-900" {...props} />,
    p: (props: any) => <p className="mb-4 leading-relaxed text-slate-700" {...props} />,
    ul: (props: any) => <ul className="list-disc list-inside mb-4 space-y-2 text-slate-700 pl-4" {...props} />,
    ol: (props: any) => <ol className="list-decimal list-inside mb-4 space-y-2 text-slate-700 pl-4" {...props} />,
    li: (props: any) => <li className="" {...props} />,
    a: (props: any) => <Link href={props.href || "#"} className="text-indigo-600 hover:text-indigo-500 font-medium" {...props} />,
    blockquote: (props: any) => <blockquote className="border-l-4 border-slate-300 pl-4 italic text-slate-600 my-4" {...props} />,
    strong: (props: any) => <strong className="font-semibold text-slate-900" {...props} />,
    hr: (props: any) => <hr className="my-8 border-slate-200" {...props} />,
};

export default async function BlogPost({ params }: Props) {
    const { slug } = await params;
    const post = getPostBySlug(slug);

    if (!post) {
        notFound();
    }

    return (
        <article className="max-w-3xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
            <ArticleJsonLd
                url={`https://nextflat.in/blog/${post.slug}`}
                headline={post.meta.title}
                image={post.meta.image ? [post.meta.image] : []}
                datePublished={post.meta.date}
                author={[{
                    name: post.meta.author || 'NextFlat Team',
                    url: 'https://nextflat.in',
                }]}
                publisher={{
                    name: "NextFlat",
                    logo: {
                        url: "https://nextflat.in/static/images/logo.webp"
                    }
                }}
                description={post.meta.summary}
                isAccessibleForFree={true}
            />
            <div className="mb-8 block">
                <Link href="/blog" className="text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors">
                    &larr; Back to Blog
                </Link>
            </div>
            <div className="mb-8 text-center">
                <div className="flex items-center justify-center gap-x-4 text-xs mb-4">
                    <time dateTime={post.meta.date} className="text-slate-500">
                        {post.meta.date}
                    </time>
                </div>
                <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl mb-4 text-balance">{post.meta.title}</h1>
                {post.meta.tags && (
                    <div className="flex justify-center gap-2 mt-4 flex-wrap">
                        {post.meta.tags.map((tag: string) => (
                            <span key={tag} className="rounded-full bg-slate-100 px-3 py-1 text-sm font-medium text-slate-700">
                                {tag}
                            </span>
                        ))}
                    </div>
                )}
            </div>

            <div className="mt-8">
                <MDXRemote source={post.content} components={components} />
            </div>
        </article>
    );
}
