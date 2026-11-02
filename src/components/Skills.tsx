import React from "react";

import {
  FaReact,
  FaNodeJs,
  FaGitAlt,
  FaGithub,
  FaBootstrap,
  FaHtml5,
  FaCss3Alt,
  FaLinux,
  FaDocker,
  FaPython,
  FaPhp,
} from "react-icons/fa";

import {
  SiJavascript,
  SiMysql,
  SiTailwindcss,
  SiPostman,
  SiLaravel,
  SiDjango,
  SiAngular,
} from "react-icons/si";

import { VscVscode } from "react-icons/vsc";

import {
  Database,
  Briefcase,
  LayoutDashboard,
  Monitor,
  Settings,
  Code,
  Cpu,
  Cloud,
  Wrench,
  Sparkles,
  Bot,
  Server,
  Zap,
} from "lucide-react";

const skillCategories = [
  // ================= Programming =================

  {
    title: "Programming Languages",

    skills: [
      {
        name: "JavaScript",
        level: 90,
        icon: <SiJavascript className="text-yellow-400" />,
      },

      {
        name: "Python",
        level: 85,
        icon: <FaPython className="text-yellow-400" />,
      },

      {
        name: "PHP",
        level: 85,
        icon: <FaPhp className="text-indigo-400" />,
      },

      {
        name: "HTML5",
        level: 95,
        icon: <FaHtml5 className="text-orange-500" />,
      },

      {
        name: "CSS3",
        level: 90,
        icon: <FaCss3Alt className="text-blue-500" />,
      },

      {
        name: "SQL",
        level: 85,
        icon: <Database className="text-cyan-400" />,
      },
    ],
  },

  // ================= Frontend =================

  {
    title: "Frontend Development",

    skills: [
      {
        name: "React.js",
        level: 90,
        icon: <FaReact className="text-cyan-400" />,
      },

      {
        name: "Angular",
        level: 90,
        icon: <SiAngular className="text-red-600" />,
      },
      {
        name: "Bootstrap 5",
        level: 90,
        icon: <FaBootstrap className="text-purple-500" />,
      },

      {
        name: "Tailwind CSS",
        level: 90,
        icon: <SiTailwindcss className="text-cyan-400" />,
      },
    ],
  },

  // ================= Backend =================

  {
    title: "Backend Development",

    skills: [
      {
        name: "Node.js",
        level: 82,
        icon: <FaNodeJs className="text-green-500" />,
      },

      {
        name: "Laravel",
        level: 85,
        icon: <SiLaravel className="text-red-500" />,
      },

      {
        name: "Django",
        level: 80,
        icon: <SiDjango className="text-green-500" />,
      },

      {
        name: "MySQL",
        level: 90,
        icon: <SiMysql className="text-blue-400" />,
      },
    ],
  },

  // ================= Tools =================

  {
    title: "Tools & Technologies",

    skills: [
      {
        name: "Git",
        level: 90,
        icon: <FaGitAlt className="text-orange-500" />,
      },

      {
        name: "GitHub",
        level: 90,
        icon: <FaGithub className="text-white" />,
      },

      {
        name: "VS Code",
        level: 95,
        icon: <VscVscode className="text-blue-500" />,
      },

      {
        name: "Postman",
        level: 85,
        icon: <SiPostman className="text-orange-400" />,
      },

      {
        name: "Linux",
        level: 75,
        icon: <FaLinux className="text-yellow-300" />,
      },
    ],
  },

  // ================= Enterprise =================

  {
    title: "Business Systems",

    skills: [
      {
        name: "ERP",
        level: 90,
        icon: <Briefcase className="text-blue-400" />,
      },

      {
        name: "CRM",
        level: 85,
        icon: <LayoutDashboard className="text-indigo-400" />,
      },

      {
        name: "Website Administration",
        level: 95,
        icon: <Monitor className="text-cyan-400" />,
      },

      {
        name: "Software Implementation",
        level: 90,
        icon: <Code className="text-green-400" />,
      },

      {
        name: "Technical Support",
        level: 90,
        icon: <Wrench className="text-gray-400" />,
      },

      {
        name: "Web Hosting",
        level: 85,
        icon: <Cloud className="text-sky-400" />,
      },
    ],
  },

  // ================= AI =================

  {
    title: "AI-Assisted Development",

    skills: [
      {
        name: "AI-assisted Coding",
        level: 95,
        icon: <Bot className="text-green-400" />,
      },

      {
        name: "Prompt Engineering",
        level: 92,
        icon: <Sparkles className="text-yellow-400" />,
      },

      {
        name: "API Integration",
        level: 90,
        icon: <Server className="text-blue-400" />,
      },

      {
        name: "Code Debugging",
        level: 90,
        icon: <Code className="text-red-400" />,
      },

      {
        name: "Rapid Prototyping",
        level: 88,
        icon: <Cpu className="text-purple-400" />,
      },
    ],
  },
];

const Skills = () => {
  return (
    <section id="skills" className="py-20 bg-black/20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-cyan-400 to-green-400 bg-clip-text text-transparent">
            Skills & Expertise
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-cyan-500 to-green-500 mx-auto mt-5"></div>
          <p className="text-gray-400 mt-6 text-lg">
            A showcase of my technical skills and competencies
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillCategories.map((category, idx) => (
            <div
              key={idx}
              className="bg-gray-900/40 backdrop-blur-md rounded-2xl border border-gray-700 hover:border-cyan-500 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-cyan-500/10 p-6"
            >
              <h3 className="text-xl font-bold text-white mb-6 border-b border-gray-700 pb-4">
                {category.title}
              </h3>

              <div className="space-y-5">
                {category.skills.map((skill, sIdx) => (
                  <div key={sIdx}>
                    <div className="flex justify-between items-center mb-2">
                      <div className="flex items-center gap-3">
                        <span className="text-xl">{skill.icon}</span>
                        <span className="text-gray-300 font-medium">{skill.name}</span>
                      </div>
                      <span className="text-cyan-400 font-bold">{skill.level}%</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2 overflow-hidden">
                      <div
                        className="bg-gradient-to-r from-cyan-400 to-green-400 h-2 rounded-full"
                        style={{ width: `${skill.level}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;