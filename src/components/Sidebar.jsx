import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, PenTool, Calendar, Settings, Zap, BarChart2, Users } from 'lucide-react';
import { motion } from 'framer-motion';

const Sidebar = () => {
    const location = useLocation();

    const menuItems = [
        { icon: LayoutDashboard, label: 'Dashboard', path: '/' },
        { icon: PenTool, label: 'Creative Assistant', path: '/creative-assistant' },
        { icon: Calendar, label: 'Content Strategist', path: '/content-strategist' },
        { icon: BarChart2, label: 'Insights', path: '/insights' },
        { icon: Users, label: 'The Council', path: '/the-council' },
    ];

    return (
        <motion.div
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5, ease: "circOut" }}
            className="w-64 bg-card h-screen border-r border-[color:var(--color-border)] flex flex-col fixed left-0 top-0 z-50 backdrop-blur-xl bg-opacity-90"
        >
            <div className="p-6 border-b border-[color:var(--color-border)] flex items-center gap-3">
                <motion.div
                    whileHover={{ rotate: 180, scale: 1.1 }}
                    transition={{ duration: 0.5 }}
                    className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center shadow-lg shadow-primary/20"
                >
                    <Zap className="text-white w-5 h-5" />
                </motion.div>
                <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary tracking-tight">
                    VisMinds
                </h1>
            </div>

            <nav className="flex-1 p-4 space-y-2">
                {menuItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = location.pathname === item.path;
                    return (
                        <Link
                            key={item.path}
                            to={item.path}
                        >
                            <motion.div
                                whileHover={{ scale: 1.02, x: 5 }}
                                whileTap={{ scale: 0.98 }}
                                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 relative overflow-hidden group ${isActive
                                    ? 'bg-primary/20 text-primary border border-primary/20 shadow-lg shadow-primary/10'
                                    : 'text-[color:var(--color-text-muted)] hover:bg-[color:var(--color-border)] hover:text-[color:var(--color-text)]'
                                    }`}
                            >
                                {isActive && (
                                    <motion.div
                                        layoutId="activeTab"
                                        className="absolute inset-0 bg-primary/10 rounded-xl"
                                        initial={false}
                                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                    />
                                )}
                                <Icon size={20} className={`relative z-10 transition-colors ${isActive ? 'text-primary' : 'text-slate-500 group-hover:text-[color:var(--color-text)]'}`} />
                                <span className="font-medium relative z-10">{item.label}</span>
                            </motion.div>
                        </Link>
                    );
                })}
            </nav>

            <div className="p-4 border-t border-[color:var(--color-border)]">
                <Link to="/settings">
                    <button className="flex items-center gap-3 px-4 py-3 text-[color:var(--color-text-muted)] hover:text-[color:var(--color-text)] w-full rounded-xl hover:bg-[color:var(--color-border)] transition-all duration-200 group">
                        <Settings size={20} className="group-hover:rotate-90 transition-transform duration-500" />
                        <span>Settings</span>
                    </button>
                </Link>
            </div>
        </motion.div>
    );
};

export default Sidebar;
