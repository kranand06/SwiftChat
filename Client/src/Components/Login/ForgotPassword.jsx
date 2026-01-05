import { motion } from "framer-motion";
import { Mail, ArrowLeft, Loader } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setSent(true);
      setEmail("");
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
                Password recovery
              </h2>
              <p className="text-sm text-theme-2">
                We’ll email you a secure reset link
              </p>
            </div>

            {/* Form / Success */}
            {!sent ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="flex items-center gap-3 border border-theme rounded-xl px-4 py-3 bg-theme">
                  <Mail className="w-5 h-5 text-theme-2" />
                  <input
                    type="email"
                    placeholder="Email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-transparent outline-none text-theme-1"
                    required
                  />
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="w-full py-3 rounded-xl bg-primary hover:bg-hover text-white font-semibold transition"
                >
                  {loading ? (
                    <span className="flex items-center justify-center gap-2">
                      <Loader className="w-5 h-5 animate-spin" />
                      Sending…
                    </span>
                  ) : (
                    "Send reset link"
                  )}
                </motion.button>
              </form>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center space-y-3"
              >
                <p className="text-theme-1 font-medium">
                  Check your inbox
                </p>
                <p className="text-theme-2 text-sm">
                  If an account exists for this email, you’ll receive a reset
                  link shortly.
                </p>
              </motion.div>
            )}

            {/* Back */}
            <div className="flex justify-center pt-2">
              <Link
                to="/login"
                className="flex items-center gap-2 text-sm text-theme-2 hover:text-theme-1 hover:underline"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to login
              </Link>
            </div>
          </div>
        </motion.div>

        {/* RIGHT — DECORATIVE */}
        <div className="hidden md:flex relative items-center justify-center">
          {/* Gradient layer */}
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

          {/* Minimal guidance */}
          <div className="relative z-10 max-w-xs space-y-4 text-sm text-white/90">
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-4">
              <p className="opacity-80">Security note</p>
              <p>
                Reset links expire quickly and can only be used once.
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 ml-6">
              <p className="opacity-80">Tip</p>
              <p>
                Use a password you haven’t used elsewhere.
              </p>
            </div>

            <p className="text-xs text-white/60 mt-6">
              Your conversations stay private and encrypted
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ForgotPassword;