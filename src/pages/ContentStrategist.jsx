import { useState } from 'react';
import axios from 'axios';
import { Calendar, Plus, RefreshCw, Loader2, Sparkles, Trash2, Edit2, Eye, X, CheckSquare } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import API_BASE_URL from '../config';

const ContentStrategist = () => {
    const [strategy, setStrategy] = useState([
        { id: 1, date: '2025-02-10', platform: 'LinkedIn', topic: 'The Rise of Agentic AI', status: 'Planned' },
        { id: 2, date: '2025-02-12', platform: 'Twitter', topic: '5 Tips for Prompt Engineering', status: 'Draft' },
    ]);
    const [loading, setLoading] = useState(false);

    // Todo List Mode
    const [viewMode, setViewMode] = useState('strategy'); // 'strategy' or 'todo'
    const [todoList, setTodoList] = useState([]);

    // Modals
    const [showGenModal, setShowGenModal] = useState(false);
    const [showDetailModal, setShowDetailModal] = useState(null); // Item object or null
    const [isEditing, setIsEditing] = useState(false);

    // Generation Preferences
    const [genPrefs, setGenPrefs] = useState({
        topic: '',
        audience: '',
        platform: 'LinkedIn',
        contentType: 'Strategy Table', // or 'Todo List'
        count: 5
    });

    const handleGenerate = async () => {
        setLoading(true);
        setShowGenModal(false);
        try {
            const response = await axios.post(`${API_BASE_URL}/api/ai/generate`, {
                preferences: genPrefs
            });

            // Basic parsing attempt (OpenRouter sometimes wraps in markdown)
            let content = response.data.result;
            content = content.replace(/```json/g, '').replace(/```/g, '').trim();
            const parsed = JSON.parse(content);

            const itemsWithIds = parsed.map((item, index) => ({
                ...item,
                id: Date.now() + index
            }));

            if (genPrefs.contentType === 'Todo List') {
                setViewMode('todo');
                setTodoList([...itemsWithIds, ...todoList]);
            } else {
                setViewMode('strategy');
                setStrategy([...itemsWithIds, ...strategy]);
            }
        } catch (error) {
            console.error("Failed to generate:", error);
            alert("Failed to generate content. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = (id, type) => {
        if (type === 'todo') {
            setTodoList(todoList.filter(item => item.id !== id));
        } else {
            setStrategy(strategy.filter(item => item.id !== id));
        }
    };

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-6xl mx-auto relative">

            {/* Header */}
            <motion.header
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="flex items-center justify-between mb-8"
            >
                <div>
                    <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary mb-2 flex items-center gap-2">
                        {viewMode === 'todo' ? <CheckSquare className="text-secondary" /> : <Calendar className="text-secondary" />}
                        {viewMode === 'todo' ? 'Task Planner' : 'Content Strategist'}
                    </h1>
                    <p className="text-[color:var(--color-text-muted)]">
                        {viewMode === 'todo' ? 'Manage your AI-optimized todo list.' : 'Plan and organize your content pipeline.'}
                    </p>
                </div>
                <div className="flex gap-3">
                    <button
                        onClick={() => setViewMode(viewMode === 'strategy' ? 'todo' : 'strategy')}
                        className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 hover:bg-slate-700 transition-colors"
                    >
                        Switch to {viewMode === 'strategy' ? 'Todos' : 'Strategy'}
                    </button>
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setShowGenModal(true)}
                        disabled={loading}
                        className="bg-secondary hover:bg-secondary/90 text-white px-6 py-3 rounded-xl font-medium flex items-center gap-2 shadow-lg shadow-violet-500/20"
                    >
                        {loading ? <Loader2 className="animate-spin" size={20} /> : <Sparkles size={20} />}
                        {loading ? 'Generating...' : 'AI Generate Plan'}
                    </motion.button>
                </div>
            </motion.header>

            {/* Main Content Area */}
            <motion.div layout className="bg-card border border-[color:var(--color-border)] rounded-2xl overflow-hidden shadow-xl min-h-[400px]">
                {viewMode === 'strategy' ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
                        <AnimatePresence>
                            {strategy.map((item, index) => (
                                <motion.div
                                    key={item.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    transition={{ delay: index * 0.05 }}
                                    className="glass-panel p-6 rounded-2xl relative group hover:-translate-y-1 transition-transform duration-300 flex flex-col justify-between min-h-[200px]"
                                >
                                    <div>
                                        <div className="flex justify-between items-start mb-4">
                                            <span className="text-xs font-medium text-[color:var(--color-text-muted)] bg-slate-800/50 px-2 py-1 rounded inline-block">
                                                {item.date}
                                            </span>
                                            <div className={`px-2 py-1 rounded text-xs font-bold ${item.platform === 'LinkedIn' ? 'bg-blue-500/10 text-blue-400' :
                                                item.platform === 'Twitter' ? 'bg-sky-500/10 text-sky-400' :
                                                    'bg-orange-500/10 text-orange-400'
                                                }`}>
                                                {item.platform}
                                            </div>
                                        </div>

                                        <h3 className="text-lg font-bold text-[color:var(--color-text)] mb-2 leading-snug">
                                            {item.topic}
                                        </h3>
                                    </div>

                                    <div className="flex items-center justify-between mt-4 pt-4 border-t border-white/5">
                                        <span className={`text-xs px-2 py-1 rounded border ${item.status === 'Planned' ? 'border-emerald-500/30 text-emerald-400' :
                                            item.status === 'Draft' ? 'border-yellow-500/30 text-yellow-400' :
                                                'border-slate-600 text-slate-400'
                                            }`}>
                                            {item.status}
                                        </span>
                                        <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button onClick={() => { setShowDetailModal(item); setIsEditing(false); }} className="p-1.5 hover:bg-primary/20 text-primary rounded-lg transition-colors"><Eye size={16} /></button>
                                            <button onClick={() => { setShowDetailModal(item); setIsEditing(true); }} className="p-1.5 hover:bg-secondary/20 text-secondary rounded-lg transition-colors"><Edit2 size={16} /></button>
                                            <button onClick={() => handleDelete(item.id, 'strategy')} className="p-1.5 hover:bg-red-500/20 text-red-400 rounded-lg transition-colors"><Trash2 size={16} /></button>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>
                ) : (
                    <div className="p-6 space-y-4">
                        <AnimatePresence>
                            {todoList.length === 0 && <p className="text-center text-slate-500 py-10">No tasks generated yet. Click "AI Generate Plan".</p>}
                            {todoList.map((task) => (
                                <motion.div
                                    key={task.id}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    className="flex items-center justify-between p-4 bg-slate-800/20 rounded-xl border border-[color:var(--color-border)]"
                                >
                                    <div className="flex items-center gap-4">
                                        <div className={`w-3 h-3 rounded-full ${task.priority === 'High' ? 'bg-red-400' : task.priority === 'Medium' ? 'bg-yellow-400' : 'bg-green-400'}`} />
                                        <div>
                                            <h3 className="font-medium text-[color:var(--color-text)]">{task.task}</h3>
                                            <span className="text-xs text-[color:var(--color-text-muted)]">{task.status}</span>
                                        </div>
                                    </div>
                                    <div className="flex gap-2">
                                        <button onClick={() => handleDelete(task.id, 'todo')} className="p-2 hover:bg-red-500/10 text-red-400 rounded-lg"><Trash2 size={18} /></button>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>
                )}
            </motion.div>

            {/* Generation Modal */}
            <AnimatePresence>
                {showGenModal && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="bg-card w-full max-w-md rounded-2xl border border-[color:var(--color-border)] p-6 shadow-2xl"
                        >
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-xl font-bold text-[color:var(--color-text)]">AI Plan Generator</h2>
                                <button onClick={() => setShowGenModal(false)} className="text-slate-400 hover:text-white"><X size={20} /></button>
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium mb-1 text-[color:var(--color-text-muted)]">Format</label>
                                    <div className="grid grid-cols-2 gap-2">
                                        {['Strategy Table', 'Todo List'].map(type => (
                                            <button
                                                key={type}
                                                onClick={() => setGenPrefs({ ...genPrefs, contentType: type })}
                                                className={`p-2 rounded-lg text-sm border transition-all ${genPrefs.contentType === type ? 'bg-primary/20 border-primary text-primary' : 'border-slate-700 text-slate-400'}`}
                                            >
                                                {type}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-1 text-[color:var(--color-text-muted)]">Topic / Goal</label>
                                    <input
                                        type="text"
                                        value={genPrefs.topic}
                                        onChange={e => setGenPrefs({ ...genPrefs, topic: e.target.value })}
                                        className="w-full bg-slate-800/50 border border-slate-700 rounded-lg p-2.5 text-[color:var(--color-text)] focus:border-primary focus:outline-none"
                                        placeholder="e.g. Product Launch"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-1 text-[color:var(--color-text-muted)]">Target Audience</label>
                                    <input
                                        type="text"
                                        value={genPrefs.audience}
                                        onChange={e => setGenPrefs({ ...genPrefs, audience: e.target.value })}
                                        className="w-full bg-slate-800/50 border border-slate-700 rounded-lg p-2.5 text-[color:var(--color-text)] focus:border-primary focus:outline-none"
                                        placeholder="e.g. Tech Enthusiasts"
                                    />
                                </div>

                                {genPrefs.contentType === 'Strategy Table' && (
                                    <div>
                                        <label className="block text-sm font-medium mb-1 text-[color:var(--color-text-muted)]">Platform</label>
                                        <select
                                            value={genPrefs.platform}
                                            onChange={e => setGenPrefs({ ...genPrefs, platform: e.target.value })}
                                            className="w-full bg-slate-800/50 border border-slate-700 rounded-lg p-2.5 text-[color:var(--color-text)] focus:border-primary focus:outline-none"
                                        >
                                            <option>LinkedIn</option>
                                            <option>Twitter</option>
                                            <option>Instagram</option>
                                            <option>Blog</option>
                                        </select>
                                    </div>
                                )}

                                <button
                                    onClick={handleGenerate}
                                    disabled={!genPrefs.topic || loading}
                                    className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-3 rounded-xl mt-4 disabled:opacity-50 transition-colors"
                                >
                                    {loading ? 'Generating...' : 'Generate Plan'}
                                </button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            {/* Detail/Edit Modal */}
            <AnimatePresence>
                {showDetailModal && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="bg-card w-full max-w-lg rounded-2xl border border-[color:var(--color-border)] p-6 shadow-2xl"
                        >
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-xl font-bold text-[color:var(--color-text)]">{isEditing ? 'Edit Item' : 'Item Details'}</h2>
                                <button onClick={() => setShowDetailModal(null)} className="text-slate-400 hover:text-white"><X size={20} /></button>
                            </div>

                            <div className="space-y-4">
                                {isEditing ? (
                                    <>
                                        <div>
                                            <label className="text-sm text-slate-400">Topic</label>
                                            <input
                                                defaultValue={showDetailModal.topic}
                                                className="w-full bg-slate-800/50 border border-slate-700 rounded-lg p-2 text-white"
                                            />
                                        </div>
                                        <button className="w-full bg-secondary text-white py-2 rounded-lg mt-4">Save Changes</button>
                                    </>
                                ) : (
                                    <div className="space-y-4">
                                        <div>
                                            <h4 className="text-sm text-slate-400">Topic</h4>
                                            <p className="text-lg text-white">{showDetailModal.topic}</p>
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <h4 className="text-sm text-slate-400">Platform</h4>
                                                <p className="text-white">{showDetailModal.platform}</p>
                                            </div>
                                            <div>
                                                <h4 className="text-sm text-slate-400">Date</h4>
                                                <p className="text-white">{showDetailModal.date}</p>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

        </motion.div>
    );
};

export default ContentStrategist;
