import { getAllPosts } from "@/lib/mdx";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Blog - NextFlat",
    description: "Read our latest articles about flat hunting, shared living, and more.",
};

export default async function BlogIndex() {
    const posts = getAllPosts();

    return (
        <div className="bg-slate-50 py-24 sm:py-32">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto max-w-2xl text-center">
                    <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">From the blog</h2>
                    <p className="mt-2 text-lg leading-8 text-slate-600">
                        Learn how to find the perfect flatmate and manage your shared living space.
                    </p>
                </div>
                <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
                    {posts.map((post) => (
                        <article key={post.slug} className="flex flex-col items-start justify-between bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300">
                            <div className="flex items-center gap-x-4 text-xs">
                                <time dateTime={post.meta.date} className="text-slate-500">
                                    {post.meta.date}
                                </time>
                                {post.meta.tags && post.meta.tags.map((tag) => (
                                    <span key={tag} className="relative z-10 rounded-full bg-slate-100 px-3 py-1.5 font-medium text-slate-600 hover:bg-slate-200">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                            <div className="group relative">
                                <h3 className="mt-3 text-lg font-semibold leading-6 text-slate-900 group-hover:text-slate-600">
                                    <Link href={`/blog/${post.slug}`}>
                                        <span className="absolute inset-0" />
                                        {post.meta.title}
                                    </Link>
                                </h3>
                                <p className="mt-5 line-clamp-3 text-sm leading-6 text-slate-600">{post.meta.summary}</p>
                            </div>
                            <div className="relative mt-auto flex items-center gap-x-4 pt-4">
                                <div className="text-sm leading-6">
                                    <p className="font-semibold text-slate-900">
                                        <span className="absolute inset-0" />
                                        NextFlat Team
                                    </p>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </div>
    );
}
