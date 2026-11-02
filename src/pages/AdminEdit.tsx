import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import {
  Lock,
  User,
  Eye,
  EyeOff,
  LogOut,
  Upload,
  RotateCcw,
  Check,
  ChevronUp,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  ZoomOut,
  Sliders,
  ArrowLeft,
  ShieldCheck,
  AlertCircle,
  ExternalLink,
} from "lucide-react";
import { apiRequest, getFullImageUrl } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";

interface ProfileSettings {
  image: string;
  posX: number;
  posY: number;
  zoom: number;
  public_id?: string;
  updatedAt?: string;
}

const DEFAULT_SETTINGS: ProfileSettings = {
  image: "/VIGNESH_INFO.png",
  posX: 50,
  posY: 0,
  zoom: 1.0,
};

const AdminEdit: React.FC = () => {
  const { toast } = useToast();

  // Authentication State
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [adminUsername, setAdminUsername] = useState<string | null>(null);

  // Login Form State
  const [loginUser, setLoginUser] = useState("");
  const [loginPass, setLoginPass] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Editor State
  const [settings, setSettings] = useState<ProfileSettings>(DEFAULT_SETTINGS);
  const [draftSettings, setDraftSettings] = useState<ProfileSettings>(DEFAULT_SETTINGS);
  const [isUploading, setIsUploading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Check auth status on component mount
  useEffect(() => {
    checkAuthStatus();
    loadProfileSettings();
  }, []);

  const checkAuthStatus = async () => {
    setCheckingAuth(true);
    try {
      const res = await apiRequest<{ isAuthenticated: boolean; username: string | null }>(
        "/api/auth/status"
      );
      setIsAuthenticated(res.isAuthenticated);
      setAdminUsername(res.username);
    } catch {
      setIsAuthenticated(false);
      setAdminUsername(null);
    } finally {
      setCheckingAuth(false);
    }
  };

  const loadProfileSettings = async () => {
    try {
      const res = await apiRequest<{ success: boolean; settings: ProfileSettings }>(
        "/api/profile"
      );
      if (res.success && res.settings) {
        setSettings(res.settings);
        setDraftSettings(res.settings);
      }
    } catch (err) {
      console.warn("Could not load backend profile settings, using default:", err);
    }
  };

  // Handle Login
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError(null);
    setIsSubmitting(true);

    try {
      const res = await apiRequest<{ success: boolean; message?: string; username: string }>(
        "/api/auth/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            username: loginUser.trim(),
            password: loginPass,
          }),
        }
      );

      if (res.success) {
        setIsAuthenticated(true);
        setAdminUsername(res.username || "admin");
        setLoginPass("");
        toast({
          title: "Login Successful",
          description: `Welcome back, ${res.username || "Admin"}!`,
        });
        // Reload fresh settings
        loadProfileSettings();
      }
    } catch (err: any) {
      setLoginError(err.message || "Failed to log in. Please check credentials.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle Logout
  const handleLogout = async () => {
    try {
      await apiRequest("/api/auth/logout", { method: "POST" });
    } catch {
      // Ignore network errors on logout
    } finally {
      setIsAuthenticated(false);
      setAdminUsername(null);
      toast({
        title: "Logged Out",
        description: "Your admin session has ended.",
      });
    }
  };

  // Handle Image Upload
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast({
        title: "Invalid file type",
        description: "Please select an image file (PNG, JPG, WEBP, GIF).",
      });
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: "File too large",
        description: "Image size must be less than 5MB.",
      });
      return;
    }

    const formData = new FormData();
    formData.append("photo", file);

    setIsUploading(true);
    try {
      const res = await apiRequest<{
        success: boolean;
        imageUrl?: string;
        secure_url?: string;
        publicId?: string;
        public_id?: string;
        message: string;
      }>(
        "/api/profile/upload",
        {
          method: "POST",
          body: formData,
        }
      );

      const uploadedUrl = res.imageUrl || res.secure_url;
      const uploadedPublicId = res.publicId || res.public_id;

      if (res.success && uploadedUrl) {
        setDraftSettings((prev) => ({
          ...prev,
          image: uploadedUrl,
          ...(uploadedPublicId ? { public_id: uploadedPublicId } : {}),
        }));
        toast({
          title: "Image Uploaded",
          description: "New image uploaded successfully. Adjust position and click Apply.",
        });
      }
    } catch (err: any) {
      toast({
        title: "Upload Failed",
        description: err.message || "Could not upload image to server.",
      });
    } finally {
      setIsUploading(false);
      e.target.value = "";
    }
  };

  // Adjustments & Nudges
  const nudgeX = (delta: number) => {
    setDraftSettings((prev) => ({
      ...prev,
      posX: Math.min(100, Math.max(0, prev.posX + delta)),
    }));
  };

  const nudgeY = (delta: number) => {
    setDraftSettings((prev) => ({
      ...prev,
      posY: Math.min(100, Math.max(0, prev.posY + delta)),
    }));
  };

  const nudgeZoom = (delta: number) => {
    setDraftSettings((prev) => ({
      ...prev,
      zoom: Math.min(3, Math.max(1, +(prev.zoom + delta).toFixed(2))),
    }));
  };

  // Apply & Save to Server
  const handleApply = async () => {
    setIsSaving(true);
    try {
      const res = await apiRequest<{ success: boolean; settings: ProfileSettings; message: string }>(
        "/api/profile",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(draftSettings),
        }
      );

      if (res.success && res.settings) {
        setSettings(res.settings);
        setDraftSettings(res.settings);
        toast({
          title: "Changes Saved Successfully!",
          description: "Profile photo and positioning updated on your live portfolio.",
        });
      }
    } catch (err: any) {
      toast({
        title: "Save Failed",
        description: err.message || "Could not save settings to server.",
      });
    } finally {
      setIsSaving(false);
    }
  };

  // Reset to Default
  const handleReset = async () => {
    setIsSaving(true);
    try {
      const res = await apiRequest<{ success: boolean; settings: ProfileSettings; message: string }>(
        "/api/profile/reset",
        {
          method: "POST",
        }
      );

      if (res.success && res.settings) {
        setSettings(res.settings);
        setDraftSettings(res.settings);
        toast({
          title: "Reset to Default",
          description: "Default photo and positioning restored successfully.",
        });
      }
    } catch (err: any) {
      // Local fallback reset if server fails
      setDraftSettings(DEFAULT_SETTINGS);
      setSettings(DEFAULT_SETTINGS);
      toast({
        title: "Reset",
        description: err.message || "Reset to local defaults.",
      });
    } finally {
      setIsSaving(false);
    }
  };

  // Loading Screen
  if (checkingAuth) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-black text-white flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-cyan-400 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-400 text-sm">Verifying secure session...</p>
        </div>
      </div>
    );
  }

  // --- 1. LOGIN VIEW ---
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-black text-white flex flex-col justify-center items-center px-4 py-12 relative overflow-hidden">
        {/* Ambient background glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="w-full max-w-md relative z-10">
          {/* Header Card */}
          <div className="text-center mb-8">
            <div className="inline-flex p-3 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 mb-4 shadow-lg shadow-cyan-500/10">
              <ShieldCheck size={36} />
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 via-green-400 to-cyan-400 bg-clip-text text-transparent">
              Admin Portal
            </h1>
            <p className="text-gray-400 text-sm mt-2">
              Sign in to customize portfolio images and settings
            </p>
          </div>

          {/* Login Card */}
          <div className="bg-gray-900/80 backdrop-blur-xl border border-gray-800 hover:border-cyan-500/40 rounded-2xl p-6 sm:p-8 shadow-2xl transition duration-300">
            {loginError && (
              <div className="mb-6 p-3.5 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400 text-sm flex items-start gap-2.5">
                <AlertCircle size={18} className="mt-0.5 flex-shrink-0" />
                <span>{loginError}</span>
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-5">
              {/* Username Field */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-gray-300 mb-2">
                  Username
                </label>
                <div className="relative">
                  <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                    <User size={18} />
                  </div>
                  <input
                    type="text"
                    required
                    value={loginUser}
                    onChange={(e) => setLoginUser(e.target.value)}
                    placeholder="Enter admin username"
                    className="w-full pl-11 pr-4 py-3 bg-gray-800/60 border border-gray-700 rounded-xl text-white placeholder-gray-500 text-sm focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition"
                    autoComplete="username"
                  />
                </div>
              </div>

              {/* Password Field */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-gray-300 mb-2">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                    <Lock size={18} />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    value={loginPass}
                    onChange={(e) => setLoginPass(e.target.value)}
                    placeholder="Enter admin password"
                    className="w-full pl-11 pr-11 py-3 bg-gray-800/60 border border-gray-700 rounded-xl text-white placeholder-gray-500 text-sm focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition"
                    autoComplete="current-password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-cyan-400 transition"
                    title={showPassword ? "Hide Password" : "Show Password"}
                    aria-label={showPassword ? "Hide Password" : "Show Password"}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full mt-2 py-3 px-4 rounded-xl font-semibold text-sm bg-gradient-to-r from-cyan-500 to-green-500 text-black hover:shadow-lg hover:shadow-cyan-500/25 transition duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                    <span>Authenticating...</span>
                  </>
                ) : (
                  <span>Sign In as Admin</span>
                )}
              </button>
            </form>

            {/* Back to Site */}
            <div className="mt-6 pt-5 border-t border-gray-800 text-center">
              <Link
                to="/"
                className="inline-flex items-center gap-2 text-xs sm:text-sm text-gray-400 hover:text-cyan-400 transition"
              >
                <ArrowLeft size={16} />
                Back to Portfolio
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // --- 2. LOGGED-IN PHOTO CUSTOMIZER VIEW ---
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-black text-white">
      {/* Top Navigation Bar */}
      <header className="border-b border-gray-800 bg-gray-900/60 backdrop-blur-md sticky top-0 z-30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link
              to="/"
              className="p-2 rounded-xl bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white transition"
              title="Return to Home"
            >
              <ArrowLeft size={18} />
            </Link>
            <div>
              <h2 className="text-base sm:text-lg font-bold bg-gradient-to-r from-cyan-400 to-green-400 bg-clip-text text-transparent">
                Photo Customization Admin
              </h2>
              <span className="text-[11px] text-gray-400 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-green-400 inline-block"></span>
                Logged in as <strong className="text-gray-200">{adminUsername || "Admin"}</strong>
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <Link
              to="/"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-cyan-400 border border-gray-700 transition"
            >
              <span>View Portfolio</span>
              <ExternalLink size={13} />
            </Link>

            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-medium bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/30 transition"
              title="Log out of admin session"
            >
              <LogOut size={16} />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <div className="grid lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Live Preview Card */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <div className="w-full bg-gray-900/60 backdrop-blur-md border border-gray-800 rounded-2xl p-6 sm:p-8 flex flex-col items-center shadow-xl">
              <div className="flex items-center justify-between w-full mb-6 pb-3 border-b border-gray-800">
                <span className="text-xs uppercase tracking-wider text-gray-400 font-semibold flex items-center gap-1.5">
                  <Sliders size={14} className="text-cyan-400" />
                  Live Square Preview
                </span>
                <span className="text-xs text-cyan-400 font-mono">1:1 Aspect Ratio</span>
              </div>

              {/* The 1:1 Square Profile Container */}
              <div className="relative w-56 h-56 sm:w-64 sm:h-64 aspect-square my-2">
                {/* Ambient Soft Glow */}
                <div className="absolute -inset-3 bg-gradient-to-tr from-cyan-500 to-green-400 opacity-20 blur-2xl pointer-events-none -z-10"></div>

                {/* Gradient Border Frame */}
                <div className="absolute inset-0 bg-gradient-to-tr from-cyan-400 via-green-400 to-blue-500 p-[3px] shadow-[0_0_25px_rgba(34,211,238,0.3)]">
                  <div className="w-full h-full bg-gray-900 overflow-hidden">
                    <img
                      src={getFullImageUrl(draftSettings.image)}
                      alt="Profile Preview"
                      className="w-full h-full object-cover transition-transform duration-200"
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        objectPosition: `${draftSettings.posX}% ${draftSettings.posY}%`,
                        transform: `scale(${draftSettings.zoom})`,
                        transformOrigin: `${draftSettings.posX}% ${draftSettings.posY}%`,
                      }}
                    />
                  </div>
                </div>
              </div>

              <p className="text-xs text-gray-400 text-center mt-6">
                This shows the exact appearance displayed on your portfolio Home page.
              </p>
            </div>
          </div>

          {/* Right Column: Customization Controls */}
          <div className="lg:col-span-7 space-y-6">
            {/* Upload Section */}
            <div className="bg-gray-900/60 backdrop-blur-md border border-gray-800 rounded-2xl p-6 shadow-xl">
              <h3 className="text-base font-semibold text-white mb-2 flex items-center gap-2">
                <Upload size={18} className="text-cyan-400" />
                Select / Upload Profile Image
              </h3>
              <p className="text-xs text-gray-400 mb-4">
                Choose an image from your computer (PNG, JPG, WEBP, up to 5MB).
              </p>

              <input
                type="file"
                ref={fileInputRef}
                accept="image/*"
                className="hidden"
                onChange={handleFileUpload}
              />

              <div className="flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  disabled={isUploading}
                  onClick={() => fileInputRef.current?.click()}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-cyan-500/10 hover:bg-cyan-500 text-cyan-300 hover:text-black border border-cyan-500/40 text-sm font-semibold transition hover:scale-105 disabled:opacity-50"
                >
                  <Upload size={16} />
                  <span>{isUploading ? "Uploading..." : "Upload from Computer"}</span>
                </button>

                <button
                  type="button"
                  onClick={() =>
                    setDraftSettings((prev) => ({ ...prev, image: "/VIGNESH_INFO.png", public_id: undefined }))
                  }
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gray-800 hover:bg-gray-700 text-gray-300 text-sm font-medium border border-gray-700 transition"
                >
                  <span>Use Default Photo</span>
                </button>
              </div>

              <div className="mt-3 text-[11px] text-gray-500 truncate">
                Current source: {draftSettings.image}
              </div>
            </div>

            {/* Position & Zoom Controls */}
            <div className="bg-gray-900/60 backdrop-blur-md border border-gray-800 rounded-2xl p-6 shadow-xl space-y-6">
              <h3 className="text-base font-semibold text-white mb-4 flex items-center gap-2">
                <Sliders size={18} className="text-cyan-400" />
                Position & Zoom Fine-Tuning
              </h3>

              {/* Vertical Position */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs sm:text-sm font-medium text-gray-300">
                  <span>Vertical Position (Up / Down)</span>
                  <span className="text-cyan-400 font-mono bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/20">
                    {draftSettings.posY}%
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => nudgeY(-5)}
                    className="p-2 rounded-xl bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-cyan-400 border border-gray-700 transition"
                    title="Nudge Up 5%"
                  >
                    <ChevronUp size={18} />
                  </button>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={draftSettings.posY}
                    onChange={(e) =>
                      setDraftSettings((s) => ({ ...s, posY: Number(e.target.value) }))
                    }
                    className="flex-1 h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-cyan-400"
                  />
                  <button
                    type="button"
                    onClick={() => nudgeY(5)}
                    className="p-2 rounded-xl bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-cyan-400 border border-gray-700 transition"
                    title="Nudge Down 5%"
                  >
                    <ChevronDown size={18} />
                  </button>
                </div>
              </div>

              {/* Horizontal Position */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs sm:text-sm font-medium text-gray-300">
                  <span>Horizontal Position (Left / Right)</span>
                  <span className="text-cyan-400 font-mono bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/20">
                    {draftSettings.posX}%
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => nudgeX(-5)}
                    className="p-2 rounded-xl bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-cyan-400 border border-gray-700 transition"
                    title="Nudge Left 5%"
                  >
                    <ChevronLeft size={18} />
                  </button>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={draftSettings.posX}
                    onChange={(e) =>
                      setDraftSettings((s) => ({ ...s, posX: Number(e.target.value) }))
                    }
                    className="flex-1 h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-cyan-400"
                  />
                  <button
                    type="button"
                    onClick={() => nudgeX(5)}
                    className="p-2 rounded-xl bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-cyan-400 border border-gray-700 transition"
                    title="Nudge Right 5%"
                  >
                    <ChevronRight size={18} />
                  </button>
                </div>
              </div>

              {/* Zoom */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs sm:text-sm font-medium text-gray-300">
                  <span>Zoom (Image Scale & Crop)</span>
                  <span className="text-cyan-400 font-mono bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/20">
                    {draftSettings.zoom.toFixed(2)}x
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => nudgeZoom(-0.1)}
                    className="p-2 rounded-xl bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-cyan-400 border border-gray-700 transition"
                    title="Zoom Out 0.1x"
                  >
                    <ZoomOut size={18} />
                  </button>
                  <input
                    type="range"
                    min="1"
                    max="3"
                    step="0.05"
                    value={draftSettings.zoom}
                    onChange={(e) =>
                      setDraftSettings((s) => ({ ...s, zoom: Number(e.target.value) }))
                    }
                    className="flex-1 h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-cyan-400"
                  />
                  <button
                    type="button"
                    onClick={() => nudgeZoom(0.1)}
                    className="p-2 rounded-xl bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-cyan-400 border border-gray-700 transition"
                    title="Zoom In 0.1x"
                  >
                    <ZoomIn size={18} />
                  </button>
                </div>
              </div>
            </div>

            {/* Action Buttons: Reset & Apply */}
            <div className="bg-gray-900/60 backdrop-blur-md border border-gray-800 rounded-2xl p-6 shadow-xl flex flex-wrap items-center justify-between gap-4">
              <button
                type="button"
                disabled={isSaving}
                onClick={handleReset}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white border border-gray-700 text-sm font-medium transition disabled:opacity-50"
              >
                <RotateCcw size={16} />
                <span>Reset to Default</span>
              </button>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  disabled={isSaving}
                  onClick={() => setDraftSettings(settings)}
                  className="px-4 py-3 rounded-xl bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white text-sm font-medium transition"
                >
                  Discard Changes
                </button>

                <button
                  type="button"
                  disabled={isSaving}
                  onClick={handleApply}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-green-500 text-black text-sm font-bold shadow-lg hover:shadow-cyan-500/25 transition transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSaving ? (
                    <>
                      <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                      <span>Saving to Server...</span>
                    </>
                  ) : (
                    <>
                      <Check size={18} />
                      <span>Apply & Save Changes</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminEdit;
