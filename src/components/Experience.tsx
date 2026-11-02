import React from "react";
import {
  Briefcase,
  Calendar,
  MapPin,
  CheckCircle2,
} from "lucide-react";

const experiences = [
  {
    company: "Focus Academy for Career Enhancement (FACE Prep)",
    role: "Technical Trainee – Python Programming",
    duration: "2023 – 2024",
    location: "Coimbatore, Tamil Nadu",
    color: "cyan",
    responsibilities: [
      "Conducted Python programming training sessions.",
      "Prepared technical documentation and learning materials.",
      "Assisted students with coding and debugging.",
      "Developed Python practice programs and mini projects.",
      "Supported trainers during technical workshops.",
      "Strengthened programming and analytical skills.",
    ],
    technologies: [
      "Python",
      "MySQL",
      "Git",
      "VS Code",
      "HackerRank",
      "W3Schools",
      "Programiz",
    ],
  },

  {
    company: "KGM Softwares Pvt. Ltd.",
    role: "Software Developer",
    duration: "2024 – 2025",
    location: "Erode, Tamil Nadu",
    color: "green",
    responsibilities: [
      "Developed ERP software using VB.NET.",
      "Designed and maintained MS SQL Server databases.",
      "Built business management modules.",
      "Fixed software bugs and improved performance.",
      "Implemented new ERP features.",
      "Provided software maintenance and client support.",
    ],
    technologies: [
      "VB.NET",
      "MS SQL Server",
      "Crystal Reports",
      "Windows Forms",
      "ERP",
      "Git",
    ],
  },

  {
    company: "Santhila Databot Pvt. Ltd.",
    role: "Full Stack Web Developer",
    duration: "2025 – 2026",
    location: "Erode, Tamil Nadu",
    color: "purple",
    responsibilities: [
      "Developed responsive web applications.",
      "Built UI using React.js & Tailwind CSS.",
      "Developed backend using PHP & Laravel.",
      "Worked with Python & Django.",
      "Managed MySQL databases.",
      "Integrated REST APIs.",
      "Deployment & software testing.",
      "Optimized application performance.",
    ],
    technologies: [
      "React.js",
      "Node.js",
      "JavaScript",
      "PHP",
      "Laravel",
      "Python",
      "Django",
      "MySQL",
      "Tailwind CSS",
      "Git",
    ],
  },

  // {
  //   company: "Swastiks Engineers",
  //   role: "Digital Operations Executive",
  //   duration: "2026 – Present",
  //   location: "Erode, Tamil Nadu",
  //   color: "orange",
  //   current: true,
  //   responsibilities: [
  //     "Website Administration",
  //     "Website Development",
  //     "Software Development",
  //     "ERP & CRM Management",
  //     "Software Implementation",
  //     "Web Hosting",
  //     "Software Testing",
  //     "Technical Support",
  //     "Business Process Automation",
  //     "Database Management",
  //     "API Integration",
  //     "Workflow Improvements",
  //     "Digital Operations",
  //     "System Monitoring & Troubleshooting",
  //   ],
  //   technologies: [
  //     "HTML5",
  //     "CSS3",
  //     "Bootstrap 5",
  //     "React.js",
  //     "Node.js",
  //     "JavaScript",
  //     "Python",
  //     "Django",
  //     "PHP",
  //     "Laravel",
  //     "MySQL",
  //     "ERP",
  //     "CRM",
  //     "AWS",
  //     "Hostinger",
  //     "Git",
  //   ],
  // },
];

const Experience = () => {
  return (
    <section
      id="experience"
      className="py-20 bg-black/20"
    >
      <div className="max-w-7xl mx-auto px-6">

        <div className="text-center mb-16">

          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-cyan-400 to-green-400 bg-clip-text text-transparent">

            Experience

          </h2>

          <div className="w-24 h-1 bg-gradient-to-r from-cyan-500 to-green-500 mx-auto mt-5"></div>

          <p className="text-gray-400 mt-6 text-lg">

            My Professional Journey

          </p>

        </div>

        <div className="space-y-10">

          {experiences.map((exp, index) => (

            <div
              key={index}
              className="bg-gray-900/40 backdrop-blur-md rounded-2xl border border-gray-700 hover:border-cyan-500 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-cyan-500/10 p-8"
            >

              <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-5">

                <div>

                  <div className="flex items-center gap-3 flex-wrap">

                    <div className="bg-cyan-500/20 p-3 rounded-xl">

                      <Briefcase className="text-cyan-400" />

                    </div>

                    <div>

                      <h3 className="text-2xl font-bold text-white">

                        {exp.role}

                      </h3>

                      <p className="text-cyan-400 text-lg font-medium">

                        {exp.company}

                      </p>

                    </div>

                    {exp.current && (

                      <span className="bg-green-500 text-black text-sm px-4 py-1 rounded-full font-bold">

                        CURRENT

                      </span>

                    )}

                  </div>

                </div>

                <div className="flex flex-col gap-2 text-gray-300">

                  <div className="flex items-center gap-2">

                    <Calendar size={18} />

                    {exp.duration}

                  </div>

                  <div className="flex items-center gap-2">

                    <MapPin size={18} />

                    {exp.location}

                  </div>

                </div>

              </div>

              <hr className="border-gray-700 my-8" />

              <h4 className="text-white text-xl font-semibold mb-5">

                Responsibilities

              </h4>

              <div className="grid md:grid-cols-2 gap-4">
                {exp.responsibilities.map((item, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-3 bg-gray-800/40 p-3 rounded-lg hover:bg-gray-800 transition-all duration-300"
                  >
                    <CheckCircle2
                      className="text-green-400 mt-1 flex-shrink-0"
                      size={18}
                    />

                    <span className="text-gray-300 text-sm leading-6">
                      {item}
                    </span>
                  </div>
                ))}
              </div>

              {/* Technologies */}

              <div className="mt-8">

                <h4 className="text-white text-xl font-semibold mb-5">
                  Technologies Used
                </h4>

                <div className="flex flex-wrap gap-3">

                  {exp.technologies.map((tech, index) => (

                    <span
                      key={index}
                      className="px-4 py-2 rounded-full bg-gradient-to-r from-cyan-500/20 to-green-500/20 border border-cyan-500/40 text-cyan-300 text-sm font-medium hover:scale-105 hover:border-cyan-400 transition-all duration-300 cursor-default"
                    >
                      {tech}
                    </span>

                  ))}

                </div>

              </div>

            </div>

          ))}

        </div>

      </div>

    </section>
  );
};

export default Experience;