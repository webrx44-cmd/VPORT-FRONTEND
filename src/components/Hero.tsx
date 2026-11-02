import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Github, Mail, Linkedin, Download, Lock } from "lucide-react";
import { apiRequest, getFullImageUrl } from "@/lib/api";

interface ProfileSettings {
  image: string;
  posX: number;
  posY: number;
  zoom: number;
}

const DEFAULT_SETTINGS: ProfileSettings = {
  image: "/VIGNESH_INFO.png",
  posX: 50,
  posY: 0,
  zoom: 1.0,
};

const Hero: React.FC = () => {
  const [displayText, setDisplayText] = useState("");
  const fullText = "Software Developer | Full Stack Developer | AI-Assisted Developer | Digital Operations Engineer ";
  const [settings, setSettings] = useState<ProfileSettings>(DEFAULT_SETTINGS);

  // Load server-persisted profile image and adjustment settings
  useEffect(() => {
    apiRequest<{ success: boolean; settings: ProfileSettings }>("/api/profile")
      .then((res) => {
        if (res.success && res.settings) {
          setSettings(res.settings);
        }
      })
      .catch((err) => {
        // Fallback to defaults when server is offline
        console.warn("Backend unavailable, using default profile image settings:", err.message);
      });
  }, []);

  useEffect(() => {
    let i = 0;
    const timer = setInterval(() => {
      if (i < fullText.length) {
        setDisplayText(fullText.slice(0, i + 1));
        i++;
      } else {
        clearInterval(timer);
      }
    }, 100);
    return () => clearInterval(timer);
  }, []);

  const handleDownloadResume = () => {
    const pdfUrl = `${import.meta.env.BASE_URL}VIGNESHS-RESUME2026.pdf`;

    // Open PDF in a new tab
    window.open(pdfUrl, "_blank", "noopener,noreferrer");

    // Trigger download
    const link = document.createElement("a");
    link.href = pdfUrl;
    link.download = "VIGNESHS-RESUME2026.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section
      id="home"
      className="min-h-screen flex flex-col-reverse md:flex-row items-center justify-center gap-12 md:gap-20 px-6 sm:px-10 md:px-16 lg:px-24 py-16 md:py-0"
    >
      {/* Left Side - Text */}
      <div className="flex-1 text-center md:text-left space-y-6">
        <h1 className="md:hidden text-4xl sm:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-cyan-400 via-green-400 to-cyan-400 bg-clip-text text-transparent">
          VIGNESH S
        </h1>

        <div className="text-lg sm:text-xl lg:text-2xl text-gray-300 min-h-[60px] mb-8">
          <span className="border-r-2 border-cyan-400 animate-pulse">
            {displayText}
          </span>
        </div>

        <p className="text-base sm:text-lg text-gray-400 leading-relaxed max-w-xl mx-auto md:mx-0">
          Software Developer with practical experience in backend and full-stack development. Proficient in React.js, Node.js, VB.NET, and MS SQL Server, with hands-on experience in PHP, Laravel, Python, Django, MySQL, and Tailwind CSS. Passionate about building scalable, responsive, and user-friendly web applications while writing clean, maintainable, and efficient code.
        </p>

        {/* Social Links */}
        <div className="flex justify-center md:justify-start gap-4 flex-wrap">
          <a
            href="https://github.com/vigneshs372003"
            target="_blank"
            rel="noopener noreferrer"
            className="group p-3 bg-gray-800/50 rounded-full hover:bg-cyan-500/20 transition-all duration-300 border border-gray-700 hover:border-cyan-500"
          >
            <Github
              size={22}
              className="text-gray-300 group-hover:text-cyan-400 transition-colors duration-300"
            />
          </a>

          <a
            href="https://www.linkedin.com/in/vignesh-s-2003-vp37"
            target="_blank"
            rel="noopener noreferrer"
            className="group p-3 bg-gray-800/50 rounded-full hover:bg-blue-500/20 transition-all duration-300 border border-gray-700 hover:border-blue-500"
          >
            <Linkedin
              size={22}
              className="text-gray-300 group-hover:text-blue-400 transition-colors duration-300"
            />
          </a>

          <a
            href="https://mail.google.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="group p-3 bg-gray-800/50 rounded-full hover:bg-green-500/20 transition-all duration-300 border border-gray-700 hover:border-green-500"
          >
            <Mail
              size={22}
              className="text-gray-300 group-hover:text-green-400 transition-colors duration-300"
            />
          </a>
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
          <button
            onClick={() =>
              document
                .getElementById("about")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            className="group bg-gradient-to-r from-cyan-500 to-green-500 text-black px-8 py-3 rounded-full font-semibold hover:shadow-lg hover:shadow-cyan-500/25 transition-all duration-300 transform hover:scale-105"
          >
            Explore My Work
            <span className="ml-2 group-hover:translate-x-1 inline-block transition-transform duration-300">
              →
            </span>
          </button>

          <button
            onClick={handleDownloadResume}
            className="group bg-gray-800/50 border border-gray-700 hover:border-purple-500 text-white px-8 py-3 rounded-full font-semibold hover:bg-purple-500/20 transition-all duration-300 transform hover:scale-105 flex items-center justify-center"
          >
            <Download size={20} className="mr-2" />
            Download Resume
          </button>
        </div>
      </div>

      {/* Right Side - Profile Image */}
      <div className="flex-1 flex flex-col justify-center items-center gap-6">
        <div className="relative w-48 h-48 sm:w-56 sm:h-56 md:w-72 md:h-72 lg:w-80 lg:h-80 aspect-square group">
          {/* Soft Glow */}
          <div className="absolute -inset-3 bg-gradient-to-tr from-cyan-500 to-green-400 opacity-20 blur-2xl pointer-events-none -z-10"></div>
          {/* Gradient Border */}
          <div className="absolute inset-0 bg-gradient-to-tr from-cyan-400 via-green-400 to-blue-500 p-[3px] shadow-[0_0_25px_rgba(34,211,238,0.3)]">
            <div className="w-full h-full bg-gray-900 overflow-hidden">
              <img
                src={getFullImageUrl(settings.image)}
                alt="VIGNESH S"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  objectPosition: `${settings.posX}% ${settings.posY}%`,
                  transform: `scale(${settings.zoom})`,
                  transformOrigin: `${settings.posX}% ${settings.posY}%`,
                }}
              />
            </div>
          </div>

          {/* Discreet Admin Login & Edit Link */}
          <Link
            to="/edit"
            className="absolute bottom-2 right-2 p-2 rounded-lg bg-gray-900/80 hover:bg-cyan-500 text-gray-400 hover:text-black border border-gray-700/60 hover:border-cyan-400 shadow-lg backdrop-blur-md transition-all duration-300 hover:scale-110 z-20 group/btn opacity-60 hover:opacity-100"
            title="Admin Login & Photo Customization"
            aria-label="Admin Login & Photo Customization"
          >
            <Lock size={15} />
          </Link>
        </div>

        {/* Desktop Name below image */}
        <h1 className="hidden md:block text-4xl sm:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-cyan-400 via-green-400 to-cyan-400 bg-clip-text text-transparent text-center">
          VIGNESH S
        </h1>
      </div>
    </section>
  );
};

export default Hero;
