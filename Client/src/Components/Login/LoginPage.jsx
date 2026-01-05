import { motion } from "framer-motion";
import { Eye, EyeOff, Loader, Lock, Mail, MessageCircle } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

const LoginPage = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setEmail("");
      setPassword("");
    }, 1200);
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4"
      style={{
        background: `linear-gradient(
          145deg,
          var(--color-background),
          var(--color-secondary),
          var(--color-background)
        )`,
      }}
    >
      {/* Auth container */}
      <div className="relative w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 bg-surface border border-theme rounded-3xl shadow-2xl overflow-hidden">

        {/* LEFT — FORM */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="p-8 sm:p-10 flex items-center justify-center"
        >
          <div className="w-full max-w-md space-y-6">

            {/* Brand */}
            <div className="flex items-center justify-center gap-2">
              <MessageCircle className="w-6 h-6 text-primary" />
              <span className="text-xl font-bold text-theme-1">
                Swift<span className="text-primary">Chat</span>
              </span>
            </div>

            {/* Context text */}
            <p className="text-center text-theme-2 text-sm">
              Secure access to your conversations
            </p>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Email */}
              <div className="flex items-center gap-3 border border-theme rounded-xl px-4 py-3 bg-theme">
                <Mail className="w-5 h-5 text-theme-2" />
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-transparent outline-none text-theme-1"
                  required
                />
              </div>

              {/* Password */}
              <div className="flex items-center gap-3 border border-theme rounded-xl px-4 py-3 bg-theme">
                <Lock className="w-5 h-5 text-theme-2" />
                <input
                  type={passwordVisible ? "text" : "password"}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-transparent outline-none text-theme-1"
                />
                {passwordVisible ? (
                  <Eye
                    className="w-5 h-5 cursor-pointer text-theme-2"
                    onClick={() => setPasswordVisible(false)}
                  />
                ) : (
                  <EyeOff
                    className="w-5 h-5 cursor-pointer text-theme-2"
                    onClick={() => setPasswordVisible(true)}
                  />
                )}
              </div>

              {/* Submit */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full py-3 rounded-xl bg-primary hover:bg-hover text-white font-semibold transition"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <Loader className="w-5 h-5 animate-spin" />
                    Signing in…
                  </span>
                ) : (
                  "Login"
                )}
              </motion.button>
            </form>

            {/* Links */}
            <div className="flex justify-between text-sm text-theme-2">
              <Link to="/forgot-password" className="hover:underline">
                Forgot password?
              </Link>
              <Link to="/signup" className="hover:underline">
                Create account
              </Link>
            </div>

            {/* Divider */}
            <div className="flex items-center gap-3">
              <div className="flex-1 h-px bg-border" />
              <span className="text-xs text-theme-2">OR</span>
              <div className="flex-1 h-px bg-border" />
            </div>

            {/* Google */}
            <button className="w-full flex items-center justify-center gap-2 py-3 border border-theme rounded-xl hover:bg-secondary transition">
              <img
                src="https://www.svgrepo.com/show/355037/google.svg"
                alt="Google"
                className="w-5 h-5"
              />
              <span className="text-sm text-theme-1 font-medium">
                Continue with Google
              </span>
            </button>
          </div>
        </motion.div>

        {/* RIGHT — DECORATIVE (CLEAN, QUIET) */}
        <div className="hidden md:flex relative items-center justify-center">
          {/* Soft gradient layer */}
          <div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(
                160deg,
                var(--color-primary),
                var(--color-secondary)
              )`,
            }}
          />

          {/* Soft glow */}
          <div className="absolute -top-24 -right-24 w-72 h-72 bg-accent/20 rounded-full blur-3xl" />

          {/* Minimal chat hint */}
          <div className="relative z-10 max-w-xs space-y-4 text-sm text-white/90">
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-4">
              <p className="opacity-80">Alex</p>
              <p>Are you free to talk?</p>
            </div>

            <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 ml-8">
              <p className="opacity-80">You</p>
              <p>Yes, give me a minute.</p>
            </div>

            <p className="text-xs text-white/60 mt-6">
              Messages sync instantly across devices
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default LoginPage;