import React from "react";
import { GraduationCap, Code, Lightbulb, Heart } from "lucide-react";
import {
  FaReact,
  FaNodeJs,
  FaPython,
  FaLaravel,
  FaPhp,
  FaJsSquare,
  FaDatabase,
  FaGitAlt
} from "react-icons/fa";


const About = () => {
  return (
    <section id="about" className="py-12 md:py-20 bg-black/20 overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 md:px-6">
        {/* Section Heading */}
        <div className="text-center mb-10 md:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-3 md:mb-4 bg-gradient-to-r from-cyan-400 to-green-400 bg-clip-text text-transparent">
            About Me
          </h2>

          <div className="w-20 md:w-24 h-1 bg-gradient-to-r from-cyan-500 to-green-500 mx-auto"></div>
        </div>

        <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-center">
          {/* Left Side - Profile Image */}
          <div className="flex justify-center order-1 md:order-none">
            <div className="relative w-[280px] h-[280px] sm:w-[340px] sm:h-[340px] md:w-[420px] md:h-[420px] lg:w-[520px] lg:h-[520px]">

              {/* Background Glow */}
              <div className="absolute inset-0 bg-cyan-500/20 blur-2xl md:blur-3xl rounded-full"></div>

              {/* Orbit Container */}
              <div className="absolute inset-0 orbit">

                <div className="relative w-full h-full">

                  <div className="absolute left-1/2 top-0 -translate-x-1/2">
                    <FaReact className="text-cyan-400 text-3xl sm:text-4xl lg:text-5xl" />
                  </div>

                  <div className="absolute right-0 top-1/2 -translate-y-1/2">
                    <FaNodeJs className="text-green-500 text-3xl sm:text-4xl lg:text-5xl" />
                  </div>

                  <div className="absolute left-1/2 bottom-0 -translate-x-1/2">
                    <FaLaravel className="text-red-500 text-3xl sm:text-4xl lg:text-5xl" />
                  </div>

                  <div className="absolute left-0 top-1/2 -translate-y-1/2">
                    <FaPython className="text-yellow-400 text-3xl sm:text-4xl lg:text-5xl" />
                  </div>

                  <div className="absolute top-[12%] left-[10%]">
                    <FaGitAlt className="text-orange-500 text-2xl sm:text-3xl lg:text-4xl" />
                  </div>

                  <div className="absolute bottom-[12%] right-[10%]">
                    <FaDatabase className="text-blue-500 text-2xl sm:text-3xl lg:text-4xl" />
                  </div>

                </div>

              </div>

              {/* Profile Image */}
              <div className="absolute left-1/2 top-1/2 w-44 h-44 sm:w-56 sm:h-56 md:w-60 md:h-60 lg:w-72 lg:h-72 -translate-x-1/2 -translate-y-1/2">

                <div className="animated-border p-[3px] md:p-[4px] rounded-full md:rounded-3xl h-full w-full">

                  <div className="rounded-full md:rounded-3xl overflow-hidden bg-gray-900 w-full h-full">

                    <img
                      src={`${import.meta.env.BASE_URL}image.png`}
                      alt="Vignesh"
                      className="w-full h-full rounded-full md:rounded-3xl object-cover transition-all duration-700 hover:scale-110"
                      style={{
                        objectPosition: "50% 10%"
                      }}
                    />

                  </div>

                </div>

              </div>

            </div>
          </div>


          {/* Right Side */}
          <div className="space-y-5 md:space-y-6 text-center md:text-left order-2 md:order-none">
            <div>
              <h3 className="text-2xl sm:text-3xl font-bold text-white mb-2 md:mb-3">
                Hello, I'm VIGNESH S
              </h3>

              <p className="text-sm sm:text-base md:text-lg text-cyan-400 font-semibold mb-4 leading-snug md:leading-normal">
                Software Developer | Full Stack Developer | AI-Assisted Developer | Digital Operations Engineer
              </p>

              <div className="flex flex-wrap justify-center md:justify-start gap-2 md:gap-3 mb-5 md:mb-6">

                {[
                  "React.js",
                  "Angular",
                  "Node.js",
                  "JavaScript",
                  "PHP",
                  "Laravel",
                  "Python",
                  "Django",
                  "VB.NET",
                  "MS SQL",
                  "MySQL",
                  "Tailwind CSS",
                  "Git",
                ].map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1.5 md:px-4 md:py-2 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs md:text-sm hover:bg-cyan-500 hover:text-black transition duration-300 whitespace-nowrap"
                  >
                    {skill}
                  </span>
                ))}

              </div>
              <p className="text-gray-300 text-sm sm:text-base leading-relaxed md:leading-8 text-center md:text-justify mb-4 md:mb-5">
                I am a{" "}
                <span className="text-white font-semibold">
                  B.Tech Information Technology
                </span>{" "}
                graduate from{" "}
                <span className="text-cyan-400">
                  Nandha College of Technology
                </span>{" "}
                with a {" "}
                <span className="text-green-400">
                  CGPA of{" "}
                </span>

                <span className="text-red-400 font-semibold">8.9</span>.
                Passionate about software development and creating scalable,
                responsive, and database-driven web applications.
              </p>

              <p className="text-gray-300 text-sm sm:text-base leading-relaxed md:leading-8 text-center md:text-justify mb-4 md:mb-5">
                I have worked as a{" "}
                <span className="text-red-400 font-semibold">
                  Software Developer
                </span>{" "}
                at{" "}
                <span className="text-cyan-400">
                  KGM Softwares Pvt. Ltd.
                </span>
                , where I developed and maintained ERP applications using{" "}
                <span className="text-green-400">
                  VB.NET and MS SQL Server
                </span>
                , focusing on business process automation, database management,
                reporting, and application support.
              </p>

              <p className="text-gray-300 text-sm sm:text-base leading-relaxed md:leading-8 text-center md:text-justify">
                Later, I worked as a{" "}
                <span className="text-red-400 font-semibold">
                  Full Stack Web Developer
                </span>{" "}
                at{" "}
                <span className="text-cyan-400">
                  Santhila Databot Pvt. Ltd.
                </span>
                , where I developed modern and responsive web applications using{" "}
                <span className="text-green-400">
                  React.js, Angular, Node.js, PHP, Laravel, Python, Django, JavaScript, MySQL,
                  and Tailwind CSS
                </span>
                . I worked on both frontend and backend development, REST API
                integration, database design and management, user authentication,
                form validation, CRUD operations, responsive UI development,
                debugging, testing, and application deployment. I also contributed
                to developing business-oriented web solutions, improving existing
                applications, integrating third-party services, and optimizing
                application performance.
              </p>

              <p className="text-gray-300 text-sm sm:text-base leading-relaxed md:leading-8 text-center md:text-justify">
                I enjoy solving real-world business problems through clean,
                efficient, and scalable code while continuously improving my skills
                in{" "}
                <span className="text-green-400">
                  full-stack development, cloud technologies, automation, and
                  AI-assisted software development
                </span>
                .
              </p>
            </div>

            {/* Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5 pt-4 md:pt-6 text-left">
              {/* Education */}
              <div className="bg-gray-800/50 p-4 md:p-5 rounded-xl border border-gray-700 hover:border-cyan-500 transition-all duration-300 hover:-translate-y-1 flex flex-col items-center md:items-start text-center md:text-left">
                <GraduationCap
                  className="text-cyan-400 mb-2 md:mb-3"
                  size={28}
                />

                <h4 className="text-white font-semibold mb-1 md:mb-2">
                  Education
                </h4>

                <p className="text-gray-300 text-xs md:text-sm">
                  B.Tech Information Technology
                </p>

                <p className="text-gray-400 text-[11px] md:text-xs mt-1">
                  Nandha College of Technology
                </p>

                <p className="text-green-400 text-[11px] md:text-xs mt-1">
                  CGPA: 8.9
                </p>
              </div>



              {/* Development */}
              <div className="bg-gray-800/50 p-4 md:p-5 rounded-xl border border-gray-700 hover:border-green-500 transition-all duration-300 hover:-translate-y-1 flex flex-col items-center md:items-start text-center md:text-left">
                <Code
                  className="text-green-400 mb-2 md:mb-3"
                  size={28}
                />

                <h4 className="text-white font-semibold mb-1 md:mb-2">
                  Development
                </h4>

                <p className="text-gray-300 text-xs md:text-sm">
                  Full Stack Development
                </p>

                <p className="text-gray-400 text-[11px] md:text-xs mt-1">
                  • Python • Django • Laravel • PHP             </p>
                <p className="text-gray-400 text-[11px] md:text-xs mt-1">
                  • React.js • Node.js • VB.NET • SQL
                </p>
              </div>

              {/* Innovation */}
              <div className="bg-gray-800/50 p-4 md:p-5 rounded-xl border border-gray-700 hover:border-cyan-500 transition-all duration-300 hover:-translate-y-1 flex flex-col items-center md:items-start text-center md:text-left">
                <Lightbulb
                  className="text-cyan-400 mb-2 md:mb-3"
                  size={28}
                />

                <h4 className="text-white font-semibold mb-1 md:mb-2">
                  Expertise
                </h4>

                <p className="text-gray-300 text-xs md:text-sm">
                  ERP & Web Solutions
                </p>

                <p className="text-gray-400 text-[11px] md:text-xs mt-1">
                  Automation • Problem Solving • Database Design
                </p>
              </div>

              {/* Interests */}
              <div className="bg-gray-800/50 p-4 md:p-5 rounded-xl border border-gray-700 hover:border-pink-500 transition-all duration-300 hover:-translate-y-1 flex flex-col items-center md:items-start text-center md:text-left">
                <Heart
                  className="text-pink-400 mb-2 md:mb-3"
                  size={28}
                />

                <h4 className="text-white font-semibold mb-1 md:mb-2">
                  Interests
                </h4>

                <p className="text-gray-300 text-xs md:text-sm">
                  Continuous Learning
                </p>

                <p className="text-gray-400 text-[11px] md:text-xs mt-1">
                  AI • Cloud • Photography • Chess
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;