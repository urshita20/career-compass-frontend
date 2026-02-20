import { useState } from "react";
import { Button } from "@/app/components/ui/button";
import { X, User, Mail, Lock, Eye, EyeOff, Loader2 } from "lucide-react";

const API_URL = import.meta.env.VITE_API_URL || "https://career-compass-backend-1-1fnz.onrender.com";

interface User {
    id: number;
    name: string;
    email: string;
}

interface AuthModalProps {
    onClose: () => void;
    onSuccess: (user: User, token: string) => void;
}

export function AuthModal({ onClose, onSuccess }: AuthModalProps) {
    const [mode, setMode] = useState<"login" | "signup">("login");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async () => {
        setError("");
        if (!email || !password) { setError("Please fill in all fields"); return; }
        if (mode === "signup" && !name) { setError("Please enter your name"); return; }
        if (password.length < 6) { setError("Password must be at least 6 characters"); return; }

        setLoading(true);
        try {
            const endpoint = mode === "login" ? "/api/auth/login" : "/api/auth/register";
            const body: any = { email, password };
            if (mode === "signup") body.name = name;

            const res = await fetch(`${API_URL}${endpoint}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body),
            });
            const data = await res.json();

            if (data.success) {
                localStorage.setItem("cc_token", data.token);
                localStorage.setItem("cc_user", JSON.stringify(data.user));
                onSuccess(data.user, data.token);
            } else {
                setError(data.error || "Something went wrong");
            }
        } catch {
            setError("Cannot connect to server. Try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4">
            <div className="bg-white dark:bg-zinc-900 rounded-3xl shadow-2xl w-full max-w-md p-8 relative">
                {/* Close */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors"
                >
                    <X className="h-5 w-5 text-gray-400" />
                </button>

                {/* Header */}
                <div className="text-center mb-8">
                    <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-orange-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                        <User className="h-8 w-8 text-white" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                        {mode === "login" ? "Welcome back! 👋" : "Join Career Compass 🚀"}
                    </h2>
                    <p className="text-gray-500 dark:text-gray-400 mt-1 text-sm">
                        {mode === "login" ? "Sign in to save your progress" : "Create an account to save your progress"}
                    </p>
                </div>

                {/* Fields */}
                <div className="space-y-4">
                    {mode === "signup" && (
                        <div className="relative">
                            <User className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Your name"
                                value={name}
                                onChange={e => setName(e.target.value)}
                                className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 dark:border-zinc-700 bg-gray-50 dark:bg-zinc-800 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-400 transition"
                            />
                        </div>
                    )}
                    <div className="relative">
                        <Mail className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                        <input
                            type="email"
                            placeholder="Email address"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            onKeyDown={e => e.key === "Enter" && handleSubmit()}
                            className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 dark:border-zinc-700 bg-gray-50 dark:bg-zinc-800 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-400 transition"
                        />
                    </div>
                    <div className="relative">
                        <Lock className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder="Password (min 6 characters)"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            onKeyDown={e => e.key === "Enter" && handleSubmit()}
                            className="w-full pl-10 pr-12 py-3 rounded-xl border border-gray-200 dark:border-zinc-700 bg-gray-50 dark:bg-zinc-800 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-400 transition"
                        />
                        <button
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-3.5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                        >
                            {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                        </button>
                    </div>
                </div>

                {error && (
                    <p className="mt-3 text-sm text-red-500 bg-red-50 dark:bg-red-900/20 rounded-lg px-3 py-2">{error}</p>
                )}

                <Button
                    onClick={handleSubmit}
                    disabled={loading}
                    className="w-full mt-6 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white rounded-xl py-3 text-base font-semibold shadow-md"
                >
                    {loading ? (
                        <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> {mode === "login" ? "Signing in…" : "Creating account…"}</>
                    ) : (
                        mode === "login" ? "Sign In" : "Create Account"
                    )}
                </Button>

                <p className="text-center mt-4 text-sm text-gray-500 dark:text-gray-400">
                    {mode === "login" ? (
                        <>Don't have an account?{" "}
                            <button onClick={() => { setMode("signup"); setError(""); }} className="text-orange-500 font-semibold hover:underline">Sign up free</button>
                        </>
                    ) : (
                        <>Already have an account?{" "}
                            <button onClick={() => { setMode("login"); setError(""); }} className="text-orange-500 font-semibold hover:underline">Sign in</button>
                        </>
                    )}
                </p>
            </div>
        </div>
    );
}
