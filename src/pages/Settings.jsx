import { motion } from 'framer-motion';
import { Moon, Sun, User, Bell, Save } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useSettings } from '../context/SettingsContext';
import { useState, useEffect } from 'react';

const Settings = () => {
    const { theme, toggleTheme } = useTheme();
    const { settings, updateSettings } = useSettings();

    // Local state for form handling before save
    const [formData, setFormData] = useState(settings.user);
    const [isSaved, setIsSaved] = useState(false);

    const handleUserChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setIsSaved(false);
    };

    const saveProfile = () => {
        updateSettings('user', formData);
        setIsSaved(true);
        setTimeout(() => setIsSaved(false), 2000);
    };

    const toggleNotification = (type) => {
        updateSettings('notifications', {
            [type]: !settings.notifications[type]
        });
    };

    const sections = [
        {
            title: "Appearance",
            icon: Moon,
            content: (
                <div className="flex items-center justify-between p-4 bg-card/50 rounded-xl border border-[color:var(--color-border)]">
                    <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-lg ${theme === 'dark' ? 'bg-indigo-500/10 text-indigo-400' : 'bg-orange-500/10 text-orange-400'}`}>
                            {theme === 'dark' ? <Moon size={20} /> : <Sun size={20} />}
                        </div>
                        <div>
                            <h3 className="font-medium text-[color:var(--color-text)]">Theme Mode</h3>
                            <p className="text-sm text-[color:var(--color-text-muted)]">Select your preferred interface theme</p>
                        </div>
                    </div>
                    <button
                        onClick={toggleTheme}
                        className="relative inline-flex h-8 w-14 items-center rounded-full bg-slate-700 transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-slate-900"
                    >
                        <span className={`transform transition-transform ${theme === 'light' ? 'translate-x-7' : 'translate-x-1'} inline-block h-6 w-6 transform rounded-full bg-white transition`} />
                    </button>
                </div>
            )
        },
        {
            title: "Account",
            icon: User,
            content: (
                <div className="p-4 bg-card/50 rounded-xl border border-[color:var(--color-border)] space-y-4">
                    <div className="grid gap-4 md:grid-cols-2">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-[color:var(--color-text-muted)]">Full Name</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleUserChange}
                                className="w-full bg-slate-800/50 border border-[color:var(--color-border)] rounded-lg px-4 py-2 text-[color:var(--color-text)] focus:outline-none focus:border-primary transition-colors"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-[color:var(--color-text-muted)]">Email Address</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleUserChange}
                                className="w-full bg-slate-800/50 border border-[color:var(--color-border)] rounded-lg px-4 py-2 text-[color:var(--color-text)] focus:outline-none focus:border-primary transition-colors"
                            />
                        </div>
                    </div>
                    <div className="flex justify-end">
                        <button
                            onClick={saveProfile}
                            className="bg-primary hover:bg-primary/90 text-white px-6 py-2 rounded-lg font-medium flex items-center gap-2 transition-colors"
                        >
                            <Save size={18} />
                            {isSaved ? 'Saved!' : 'Save Changes'}
                        </button>
                    </div>
                </div>
            )
        },
        {
            title: "Notifications",
            icon: Bell,
            content: (
                <div className="p-4 bg-card/50 rounded-xl border border-[color:var(--color-border)] space-y-4">
                    {['email', 'push'].map((type) => (
                        <div key={type} className="flex items-center justify-between">
                            <div>
                                <h3 className="font-medium text-[color:var(--color-text)] capitalize">{type} Notifications</h3>
                                <p className="text-sm text-[color:var(--color-text-muted)]">Receive updates via {type}</p>
                            </div>
                            <button
                                onClick={() => toggleNotification(type)}
                                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${settings.notifications[type] ? 'bg-primary' : 'bg-slate-700'}`}
                            >
                                <span className={`transform transition-transform ${settings.notifications[type] ? 'translate-x-6' : 'translate-x-1'} inline-block h-4 w-4 transform rounded-full bg-white transition`} />
                            </button>
                        </div>
                    ))}
                </div>
            )
        }
    ];

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="max-w-2xl mx-auto"
        >
            <header className="mb-8">
                <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary mb-2">
                    Settings
                </h1>
                <p className="text-[color:var(--color-text-muted)]">Manage your preferences and account settings.</p>
            </header>

            <div className="space-y-6">
                {sections.map((section, index) => (
                    <motion.div
                        key={section.title}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="bg-card rounded-2xl border border-[color:var(--color-border)] p-6 shadow-sm"
                    >
                        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2 text-[color:var(--color-text)]">
                            <section.icon className="text-primary" size={24} />
                            {section.title}
                        </h2>
                        {section.content}
                    </motion.div>
                ))}
            </div>
        </motion.div>
    );
};

export default Settings;
