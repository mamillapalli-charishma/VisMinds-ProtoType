import { ArrowRight, PenTool, Calendar, Sparkles, BarChart2, TrendingUp, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const container = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1
        }
    }
};

const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 50 } }
};

const Dashboard = () => {
    return (
        <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="max-w-4xl mx-auto"
        >
            <motion.header variants={item} className="mb-12">
                <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary mb-4">
                    Welcome to VisMinds
                </h1>
                <p className="text-lg text-[color:var(--color-text-muted)]">
                    Your real-time AI copilot for media, content, and digital experiences.
                </p>
            </motion.header>

            <div className="grid md:grid-cols-3 gap-6">
                <motion.div
                    variants={item}
                    whileHover={{ y: -5, transition: { duration: 0.2 } }}
                    className="bg-card p-6 rounded-2xl border border-[color:var(--color-border)] hover:border-primary/50 transition-all hover:shadow-xl hover:shadow-primary/5 group"
                >
                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                        <PenTool className="text-primary" size={24} />
                    </div>
                    <h2 className="text-2xl font-semibold mb-2">Creative Assistant</h2>
                    <p className="text-[color:var(--color-text-muted)] mb-6">
                        Generate blog posts, social media captions, and scripts instantly with AI.
                    </p>
                    <Link
                        to="/creative-assistant"
                        className="inline-flex items-center gap-2 text-primary font-medium hover:text-primary/80 transition-colors"
                    >
                        Start Creating <ArrowRight size={16} />
                    </Link>
                </motion.div>

                <motion.div
                    variants={item}
                    whileHover={{ y: -5, transition: { duration: 0.2 } }}
                    className="bg-card p-6 rounded-2xl border border-[color:var(--color-border)] hover:border-secondary/50 transition-all hover:shadow-xl hover:shadow-secondary/5 group"
                >
                    <div className="w-12 h-12 bg-secondary/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-secondary/20 transition-colors">
                        <Calendar className="text-secondary" size={24} />
                    </div>
                    <h2 className="text-2xl font-semibold mb-2">Content Strategist</h2>
                    <p className="text-[color:var(--color-text-muted)] mb-6">
                        Plan your content calendar and get strategic insights for your audience.
                    </p>
                    <Link
                        to="/content-strategist"
                        className="inline-flex items-center gap-2 text-secondary font-medium hover:text-secondary/80 transition-colors"
                    >
                        Open Strategist <ArrowRight size={16} />
                    </Link>
                </motion.div>

                <motion.div
                    variants={item}
                    whileHover={{ y: -5, transition: { duration: 0.2 } }}
                    className="bg-card p-6 rounded-2xl border border-[color:var(--color-border)] hover:border-green-400/50 transition-all hover:shadow-xl hover:shadow-green-400/5 group"
                >
                    <div className="w-12 h-12 bg-green-400/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-green-400/20 transition-colors">
                        <BarChart2 className="text-green-400" size={24} />
                    </div>
                    <h2 className="text-2xl font-semibold mb-2">Market Insights</h2>
                    <div className="space-y-3 mb-6">
                        <div className="flex items-center justify-between text-sm">
                            <span className="text-[color:var(--color-text)]">#AgenticAI</span>
                            <span className="text-green-400 flex items-center gap-1">+125% <ArrowUpRight size={12} /></span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                            <span className="text-[color:var(--color-text)]">Sustainable Design</span>
                            <span className="text-green-400 flex items-center gap-1">+84% <ArrowUpRight size={12} /></span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                            <span className="text-[color:var(--color-text-muted)] italic">...and more</span>
                        </div>
                    </div>
                    <Link
                        to="/insights"
                        className="inline-flex items-center gap-2 text-green-400 font-medium hover:text-green-300 transition-colors"
                    >
                        View Trends <ArrowRight size={16} />
                    </Link>
                </motion.div>
            </div>

            <motion.div
                variants={item}
                className="mt-12 p-8 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-3xl border border-white/5 relative overflow-hidden"
            >
                <Sparkles className="absolute top-4 right-4 text-yellow-400 opacity-50 animate-pulse" />
                <h3 className="text-xl font-bold text-white mb-2">Did you know?</h3>
                <p className="text-slate-300 max-w-2xl">
                    VisMinds optimizes your workflow by connecting directly to advanced language models, delivering agency-quality content in seconds.
                </p>
            </motion.div>
        </motion.div>
    );
};

export default Dashboard;
