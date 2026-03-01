import { useState } from 'react';
import axios from 'axios';
import { Send, Copy, Check, Loader2, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const CreativeAssistant = () => {
    const [prompt, setPrompt] = useState('');
    const [result, setResult] = useState('');
    const [loading, setLoading] = useState(false);
    const [copied, setCopied] = useState(false);
    const [error, setError] = useState('');

    // Personas
    const [persona, setPersona] = useState('General');
    const personas = {
        'General': "You are a helpful creative assistant. Generate high-quality, engaging content.",
        'Marketer': "You are an expert digital marketer. Focus on SEO, conversion, compelling hooks, and call-to-actions.",
        'Writer': "You are a creative writer. Focus on storytelling, distinct voice, varied sentence structure, and evocative language.",
        'Designer': "You are a visual design consultant. Provide layout ideas, color palettes, typography suggestions, and visual concepts (describe them in text)."
    };

    const handleGenerate = async () => {
        if (!prompt.trim()) return;
        setLoading(true);
        setError('');

        try {
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/ai/generate`, {
                prompt,
                systemRole: personas[persona]
            });
            setResult(response.data.result);
        } catch (err) {
            setError('Something went wrong. Please check your connection or API key.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(result);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="max-w-5xl mx-auto h-[calc(100vh-8rem)] flex flex-col gap-6">
            <motion.header
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary mb-2 flex items-center gap-2">
                    <Sparkles className="text-primary" />
                    Creative Assistant
                </h1>
                <p className="text-[color:var(--color-text-muted)]">Generate articles, captions, and creative text in seconds.</p>
            </motion.header>

            <div className="flex-1 grid md:grid-cols-2 gap-6 min-h-0">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                    className="flex flex-col gap-4"
                >
                    {/* Persona Selector */}
                    <div className="flex gap-2 p-1 bg-card border border-[color:var(--color-border)] rounded-xl overflow-x-auto">
                        {Object.keys(personas).map((p) => (
                            <button
                                key={p}
                                onClick={() => setPersona(p)}
                                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${persona === p
                                    ? 'bg-primary text-white shadow-lg shadow-primary/20'
                                    : 'text-[color:var(--color-text-muted)] hover:bg-slate-800 hover:text-[color:var(--color-text)]'
                                    }`}
                            >
                                {p}
                            </button>
                        ))}
                    </div>

                    <textarea
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        placeholder={`Ask the ${persona} something...`}
                        className="w-full flex-1 bg-card border border-[color:var(--color-border)] rounded-2xl p-6 placeholder:text-slate-500 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary resize-none text-lg transition-all"
                    />
                    <motion.button
                        layout
                        onClick={handleGenerate}
                        disabled={loading || !prompt.trim()}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="bg-primary hover:bg-primary/90 text-white font-bold py-4 px-8 rounded-xl flex items-center justify-center gap-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-primary/25"
                    >
                        {loading ? <Loader2 className="animate-spin" /> : <Send size={20} />}
                        {loading ? 'Generating...' : 'Generate Content'}
                    </motion.button>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                    className="bg-card border border-[color:var(--color-border)] rounded-2xl p-6 relative overflow-y-auto custom-scrollbar"
                >
                    <AnimatePresence mode="wait">
                        {error && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                                className="text-red-400 bg-red-400/10 p-4 rounded-lg mb-4"
                            >
                                {error}
                            </motion.div>
                        )}

                        {!result && !loading && !error && (
                            <motion.div
                                key="empty"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="h-full flex flex-col items-center justify-center text-[color:var(--color-text-muted)] opacity-50"
                            >
                                <Sparkles size={48} className="mb-4" />
                                <p>Your generated content will appear here</p>
                            </motion.div>
                        )}

                        {loading && !result && (
                            <motion.div
                                key="loading"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="space-y-4"
                            >
                                <div className="h-4 bg-slate-700/50 rounded w-3/4 animate-pulse"></div>
                                <div className="h-4 bg-slate-700/50 rounded w-full animate-pulse"></div>
                                <div className="h-4 bg-slate-700/50 rounded w-5/6 animate-pulse"></div>
                                <div className="h-4 bg-slate-700/50 rounded w-1/2 animate-pulse"></div>
                            </motion.div>
                        )}

                        {result && (
                            <motion.div
                                key="result"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="prose prose-invert max-w-none whitespace-pre-wrap text-[color:var(--color-text)]"
                            >
                                {result}
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {result && (
                        <motion.button
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 1, scale: 1 }}
                            onClick={copyToClipboard}
                            className="absolute top-4 right-4 p-2 bg-slate-800 hover:bg-slate-700 rounded-lg text-slate-300 transition-colors"
                            title="Copy to clipboard"
                        >
                            {copied ? <Check size={18} className="text-green-400" /> : <Copy size={18} />}
                        </motion.button>
                    )}
                </motion.div>
            </div>
        </div>
    );
};

export default CreativeAssistant;
