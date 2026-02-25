import { motion } from 'framer-motion';
import { TrendingUp, BarChart2, Hash, ArrowUpRight, Globe, Users } from 'lucide-react';

const Insights = () => {
    // Mock Data for specific insights
    const trends = [
        { id: 1, topic: "#AgenticAI", growth: "+125%", volume: "125k", category: "Tech" },
        { id: 2, topic: "Sustainable Design", growth: "+84%", volume: "85k", category: "Design" },
        { id: 3, topic: "Micro-SaaS", growth: "+62%", volume: "42k", category: "Business" },
        { id: 4, topic: "Prompt Engineering", growth: "+45%", volume: "210k", category: "AI" },
    ];

    const platformStats = [
        { platform: "LinkedIn", engagement: "High", growth: 12, color: "bg-blue-500" },
        { platform: "Twitter/X", engagement: "Medium", growth: 8, color: "bg-sky-500" },
        { platform: "Instagram", engagement: "Very High", growth: 24, color: "bg-pink-500" },
    ];

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="max-w-6xl mx-auto space-y-8"
        >
            {/* Header */}
            <header className="mb-8">
                <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary mb-2 flex items-center gap-2">
                    <BarChart2 className="text-primary" />
                    Content Insights
                </h1>
                <p className="text-[color:var(--color-text-muted)]">Discover trending topics and analyze content performance.</p>
            </header>

            {/* Trending Section */}
            <section>
                <h2 className="text-xl font-semibold text-[color:var(--color-text)] mb-4 flex items-center gap-2">
                    <TrendingUp size={20} className="text-green-400" />
                    Trending Now
                </h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {trends.map((trend, index) => (
                        <motion.div
                            key={trend.id}
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: index * 0.1 }}
                            whileHover={{ y: -5 }}
                            className="bg-card border border-[color:var(--color-border)] p-5 rounded-xl shadow-lg hover:shadow-primary/10 transition-all cursor-pointer group"
                        >
                            <div className="flex justify-between items-start mb-3">
                                <span className="p-2 bg-slate-800 rounded-lg text-slate-400 group-hover:text-primary transition-colors">
                                    <Hash size={18} />
                                </span>
                                <span className="text-xs font-bold text-green-400 bg-green-400/10 px-2 py-1 rounded-full flex items-center gap-1">
                                    {trend.growth} <ArrowUpRight size={12} />
                                </span>
                            </div>
                            <h3 className="font-bold text-[color:var(--color-text)] mb-1">{trend.topic}</h3>
                            <div className="flex justify-between text-xs text-[color:var(--color-text-muted)]">
                                <span>{trend.category}</span>
                                <span>{trend.volume} posts</span>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Analytics Grid */}
            <div className="grid md:grid-cols-3 gap-6">

                {/* Platform Performance Card */}
                <motion.div
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="md:col-span-2 bg-card border border-[color:var(--color-border)] rounded-2xl p-6 shadow-xl"
                >
                    <h3 className="text-lg font-semibold text-[color:var(--color-text)] mb-6 flex items-center gap-2">
                        <Globe size={18} className="text-primary" />
                        Platform Performance
                    </h3>
                    <div className="space-y-6">
                        {platformStats.map((stat) => (
                            <div key={stat.platform} className="relative">
                                <div className="flex justify-between text-sm mb-2">
                                    <span className="text-[color:var(--color-text)] font-medium">{stat.platform}</span>
                                    <span className="text-green-400">+{stat.growth}% growth</span>
                                </div>
                                <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: `${stat.growth * 3}%` }}
                                        transition={{ duration: 1, delay: 0.5 }}
                                        className={`h-full ${stat.color} rounded-full`}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.div>

                {/* Audience Demographics Card */}
                <motion.div
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="bg-card border border-[color:var(--color-border)] rounded-2xl p-6 shadow-xl"
                >
                    <h3 className="text-lg font-semibold text-[color:var(--color-text)] mb-6 flex items-center gap-2">
                        <Users size={18} className="text-secondary" />
                        Audience Split
                    </h3>
                    <div className="flex flex-col items-center justify-center h-48 space-y-4">
                        <div className="flex items-center gap-2 text-sm text-[color:var(--color-text-muted)]">
                            <div className="w-3 h-3 rounded-full bg-primary" /> Founders (45%)
                        </div>
                        <div className="flex items-center gap-2 text-sm text-[color:var(--color-text-muted)]">
                            <div className="w-3 h-3 rounded-full bg-secondary" /> Creators (35%)
                        </div>
                        <div className="flex items-center gap-2 text-sm text-[color:var(--color-text-muted)]">
                            <div className="w-3 h-3 rounded-full bg-slate-600" /> Others (20%)
                        </div>
                        {/* CSS-only simple pie chart visual representation */}
                        <div className="w-24 h-24 rounded-full bg-[conic-gradient(var(--color-primary)_0deg_162deg,var(--color-secondary)_162deg_288deg,#475569_288deg_360deg)] relative mt-4 opacity-80" />
                    </div>
                </motion.div>
            </div>
        </motion.div>
    );
};

export default Insights;
