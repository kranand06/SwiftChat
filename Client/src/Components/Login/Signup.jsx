import { motion } from "framer-motion";
import { Mail, Lock, User, Eye, EyeOff, Loader } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    console.log("Form submitted:", form);
    // Simulate an API call
    setTimeout(() => {
      setLoading(false);
      setForm({ name: "", email: "", password: "" });
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
      {/* Container */}
      <div className="relative w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 bg-surface border border-theme rounded-3xl shadow-2xl overflow-hidden">

        {/* LEFT — FORM */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="p-8 sm:p-10 flex items-center justify-center"
        >
          <div className="w-full max-w-md space-y-6">

            {/* Title */}
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-bold text-theme-1">
                Create your account
              </h2>
              <p className="text-sm text-theme-2">
                Start private, real-time conversations
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name */}
              <div className="flex items-center gap-3 border border-theme rounded-xl px-4 py-3 bg-theme">
                <User className="w-5 h-5 text-theme-2" />
                <input
                  type="text"
                  name="name"
                  placeholder="Full name"
                  value={form.name}
                  onChange={handleChange}
                  className="w-full bg-transparent outline-none text-theme-1"
                  required
                />
              </div>

              {/* Email */}
              <div className="flex items-center gap-3 border border-theme rounded-xl px-4 py-3 bg-theme">
                <Mail className="w-5 h-5 text-theme-2" />
                <input
                  type="email"
                  name="email"
                  placeholder="Email address"
                  value={form.email}
                  onChange={handleChange}
                  className="w-full bg-transparent outline-none text-theme-1"
                  required
                />
              </div>

              {/* Password */}
              <div className="flex items-center gap-3 border border-theme rounded-xl px-4 py-3 bg-theme">
                <Lock className="w-5 h-5 text-theme-2" />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Password"
                  value={form.password}
                  onChange={handleChange}
                  className="w-full bg-transparent outline-none text-theme-1"
                  required
                />
                {showPassword ? (
                  <Eye
                    className="w-5 h-5 cursor-pointer text-theme-2"
                    onClick={() => setShowPassword(false)}
                  />
                ) : (
                  <EyeOff
                    className="w-5 h-5 cursor-pointer text-theme-2"
                    onClick={() => setShowPassword(true)}
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
                    Creating account…
                  </span>
                ) : (
                  "Create account"
                )}
              </motion.button>
            </form>

            {/* Login link */}
            <p className="text-center text-sm text-theme-2">
              Already have an account?{" "}
              <Link to="/login" className="hover:underline text-theme-1">
                Login
              </Link>
            </p>
          </div>
        </motion.div>

        {/* RIGHT — DECORATIVE */}
        <div className="hidden md:flex relative items-center justify-center">
          {/* Gradient */}
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

          {/* Glow */}
          <div className="absolute -top-24 -right-24 w-72 h-72 bg-accent/20 rounded-full blur-3xl" />

          {/* Visual hints */}
          <div className="relative z-10 max-w-xs space-y-4 text-sm text-white/90">
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-4">
              <p className="opacity-80">Private by default</p>
              <p>Your messages are visible only to participants.</p>
            </div>

            <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 ml-6">
              <p className="opacity-80">Realtime sync</p>
              <p>Conversations update instantly across devices.</p>
            </div>

            <p className="text-xs text-white/60 mt-6">
              End-to-end encrypted communication
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Signup;