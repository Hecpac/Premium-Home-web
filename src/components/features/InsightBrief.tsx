import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const articles = [
    {
        title: "The True Cost of Luxury Custom Builds in 2026",
        category: "Market Analysis",
        readTime: "4 min read",
        slug: "/insights/cost-of-luxury-2026",
    },
    {
        title: "Smart Home Integration: Beyond the Gimmicks",
        category: "Technology",
        readTime: "6 min read",
        slug: "/insights/smart-home-integration",
    },
    {
        title: "Concrete & Light: The New Brutalist Aesthetic",
        category: "Design",
        readTime: "3 min read",
        slug: "/insights/concrete-and-light",
    },
];

export function InsightBrief() {
    return (
        <section className="section-spacing max-w-7xl mx-auto px-6">
            <div className="flex flex-col md:flex-row justify-between items-end mb-16 border-b border-white/10 pb-8">
                <h2 className="text-white mb-4 md:mb-0">
                    Editorial <span className="text-[hsl(var(--primary))]">Insights</span>
                </h2>
                <Link href="/insights" className="text-sm text-zinc-400 hover:text-white transition-colors flex items-center gap-2 group">
                    VIEW ALL ARTICLES
                    <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </Link>
            </div>

            <div className="flex flex-col gap-0">
                {articles.map((article, idx) => (
                    <Link
                        key={idx}
                        href={article.slug}
                        className="group flex flex-col md:flex-row md:items-center justify-between py-10 border-b border-white/10 hover:bg-white/5 transition-colors px-4 -mx-4 rounded-sm"
                    >
                        <div className="flex flex-col gap-2">
                            <span className="text-label text-[hsl(var(--primary))]">{article.category}</span>
                            <h3 className="font-[family-name:var(--font-playfair)] text-2xl md:text-3xl text-zinc-200 group-hover:text-white transition-colors">
                                {article.title}
                            </h3>
                        </div>
                        <div className="flex items-center gap-6 mt-4 md:mt-0">
                            <span className="text-numeral text-xs">{article.readTime}</span>
                            <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-white group-hover:border-white transition-all">
                                <ArrowUpRight className="w-4 h-4 text-zinc-400 group-hover:text-black transition-colors" />
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </section>
    );
}
