import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, Send, MessageSquare, Loader2, Gavel, User, AlertCircle, TrendingUp, Shield, BarChart3 } from 'lucide-react';
import axios from 'axios';

const TheCouncil = () => {
    const [topic, setTopic] = useState('');
    const [selectedPersonas, setSelectedPersonas] = useState(['The Visionary', 'The Skeptic', 'The Strategist']);
    const [loading, setLoading] = useState(false);
    const [discussion, setDiscussion] = useState(null);
    const [error, setError] = useState(null);

    // Persona definitions with icons and colors
    const availablePersonas = [
        { id: 'The Visionary', label: 'The Visionary', icon: TrendingUp, color: 'text-purple-400', bg: 'bg-purple-400/10', border: 'border-purple-400/20' },
        { id: 'The Skeptic', label: 'The Skeptic', icon: Shield, color: 'text-red-400', bg: 'bg-red-400/10', border: 'border-red-400/20' },
        { id: 'The Strategist', label: 'The Strategist', icon: BarChart3, color: 'text-blue-400', bg: 'bg-blue-400/10', border: 'border-blue-400/20' },
        { id: 'The User Advocate', label: 'User Advocate', icon: User, color: 'text-green-400', bg: 'bg-green-400/10', border: 'border-green-400/20' },
        { id: 'The Data Scientist', label: 'Data Scientist', icon: MessageSquare, color: 'text-orange-400', bg: 'bg-orange-400/10', border: 'border-orange-400/20' },
    ];

    const togglePersona = (id) => {
        if (selectedPersonas.includes(id)) {
            setSelectedPersonas(selectedPersonas.filter(p => p !== id));
        } else {
            if (selectedPersonas.length < 3) {
                setSelectedPersonas([...selectedPersonas, id]);
            }
        }
    };

    const conveneCouncil = async () => {
        if (!topic.trim()) return;
        if (selectedPersonas.length === 0) return;

        setLoading(true);
        setError(null);
        setDiscussion(null);

        try {
            const response = await axios.post('http://localhost:5000/api/ai/council', {
                topic,
                personas: selectedPersonas
            });

            setDiscussion(response.data.result);
        } catch (err) {
            console.error(err);
            setError('The Council is currently unavailable. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="max-w-6xl mx-auto space-y-8 min-h-screen"
        >
            {/* Header */}
            <header className="mb-8 text-center space-y-4">
                <motion.div
                    initial={{ scale: 0.9 }}
                    animate={{ scale: 1 }}
                    className="inline-flex p-3 rounded-full bg-primary/10 mb-2"
                >
                    <Gavel className="w-8 h-8 text-primary" />
                </motion.div>
                <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
                    The Council
                </h1>
                <p className="text-[color:var(--color-text-muted)] max-w-xl mx-auto text-lg">
                    Summon your personal Board of Advisors. Select personas to debate your ideas and expose blind spots.
                </p>
            </header>

            {/* Input Section */}
            <section className="bg-card border border-[color:var(--color-border)] rounded-2xl p-8 shadow-xl relative overflow-hidden">
                <div className="relative z-10 space-y-6">
                    {/* Persona Selection */}
                    <div className="space-y-3">
                        <label className="text-sm font-medium text-[color:var(--color-text)] flex items-center justify-between">
                            <span>Select Your Board (Max 3)</span>
                            <span className="text-[color:var(--color-text-muted)] text-xs">{selectedPersonas.length}/3 selected</span>
                        </label>
                        <div className="flex flex-wrap gap-3">
                            {availablePersonas.map((persona) => {
                                const isSelected = selectedPersonas.includes(persona.id);
                                const Icon = persona.icon;
                                return (
                                    <motion.button
                                        key={persona.id}
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={() => togglePersona(persona.id)}
                                        className={`flex items-center gap-2 px-4 py-3 rounded-xl border transition-all duration-200 ${isSelected
                                            ? `${persona.bg} ${persona.border} ${persona.color} ring-1 ring-offset-0 ring-${persona.color.split('-')[1]}-400`
                                            : 'bg-slate-900/50 border-slate-700 text-slate-400 hover:border-slate-600'
                                            }`}
                                    >
                                        <Icon size={16} />
                                        <span className="font-medium text-sm">{persona.label}</span>
                                    </motion.button>
                                );
                            })}
                        </div>
                    </div>

                    {/* Topic Input */}
                    <div className="space-y-3">
                        <label className="text-sm font-medium text-[color:var(--color-text)]">Topic for Discussion</label>
                        <div className="relative">
                            <textarea
                                value={topic}
                                onChange={(e) => setTopic(e.target.value)}
                                placeholder="E.g., Should I pivot my SaaS to target enterprise customers instead of SMBs?"
                                className="w-full bg-slate-900/50 border border-[color:var(--color-border)] rounded-xl p-4 text-[color:var(--color-text)] focus:ring-2 focus:ring-primary focus:border-transparent outline-none min-h-[120px] resize-none placeholder-slate-500"
                            />
                            <div className="absolute bottom-4 right-4">
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={conveneCouncil}
                                    disabled={loading || !topic.trim() || selectedPersonas.length === 0}
                                    className="bg-primary text-white px-6 py-2 rounded-lg font-medium shadow-lg shadow-primary/20 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {loading ? (
                                        <>
                                            <Loader2 size={18} className="animate-spin" />
                                            Convening...
                                        </>
                                    ) : (
                                        <>
                                            <Users size={18} />
                                            Convene Council
                                        </>
                                    )}
                                </motion.button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Decorative Background */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
            </section>

            {/* Discussion Section */}
            <AnimatePresence>
                {error && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="bg-red-500/10 border border-red-500/20 text-red-500 p-4 rounded-xl flex items-center gap-3"
                    >
                        <AlertCircle size={20} />
                        {error}
                    </motion.div>
                )}

                {discussion && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-6"
                    >
                        <h2 className="text-2xl font-bold text-[color:var(--color-text)] flex items-center gap-3">
                            <MessageSquare className="text-secondary" />
                            Meeting Minutes
                        </h2>

                        <div className="space-y-4">
                            {discussion.map((entry, index) => {
                                const persona = availablePersonas.find(p => p.id === entry.speaker) || availablePersonas[0];
                                const isPositive = entry.sentiment === 'positive';
                                const isNegative = entry.sentiment === 'negative';

                                return (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: index * 0.1 }}
                                        className={`bg-card border border-[color:var(--color-border)] p-6 rounded-2xl shadow-lg relative overflow-hidden ${isPositive ? 'border-l-4 border-l-green-500' : isNegative ? 'border-l-4 border-l-red-500' : 'border-l-4 border-l-blue-500'}`}
                                    >
                                        <div className="flex items-start gap-4 relatie z-10">
                                            <div className={`p-3 rounded-full ${persona.bg} ${persona.color}`}>
                                                <persona.icon size={20} />
                                            </div>
                                            <div className="flex-1 space-y-1">
                                                <div className="flex items-center justify-between">
                                                    <h3 className={`font-bold ${persona.color}`}>{entry.speaker}</h3>
                                                    {entry.sentiment && (
                                                        <span className={`text-xs px-2 py-1 rounded-full uppercase font-bold tracking-wider ${isPositive ? 'bg-green-500/10 text-green-500' : isNegative ? 'bg-red-500/10 text-red-500' : 'bg-blue-500/10 text-blue-500'}`}>
                                                            {entry.sentiment}
                                                        </span>
                                                    )}
                                                </div>
                                                <p className="text-[color:var(--color-text)] leading-relaxed text-lg">
                                                    "{entry.content}"
                                                </p>
                                            </div>
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};

export default TheCouncil;
