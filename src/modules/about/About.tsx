
export default function About() {
  const experience = [
    {
      role: "Senior React Developer",
      company: "TechCorp Inc.",
      period: "2022 - Present",
      description: "Leading frontend architecture and mentoring junior developers"
    },
    {
      role: "Frontend Developer",
      company: "StartupXYZ",
      period: "2020 - 2022",
      description: "Built scalable React applications with modern tooling"
    },
    {
      role: "Junior Developer",
      company: "WebAgency",
      period: "2018 - 2020",
      description: "Developed responsive websites and SPAs"
    }
  ];

  const interests = ["Open Source", "UI/UX Design", "Performance Optimization", "Web Accessibility"];
  const values = ["Clean Code", "User Experience", "Continuous Learning", "Team Collaboration"];

  return (
    <>
  

      {/* About Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 md:px-8 py-16 pb-24">
        <h1 className="text-5xl md:text-7xl font-bold mb-16">About Me</h1>

        <div className="grid md:grid-cols-2 gap-12 items-start mb-16">
          {/* Profile Card */}
          <div className="flex justify-center">
            <div className="w-[350px] bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 text-center">
              <div className="w-32 h-32 mx-auto mb-6 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-4xl font-bold">
                MH
              </div>
              <h3 className="text-2xl font-semibold mb-2">Muhammed Hussain</h3>
              <p className="text-gray-300">React.js Developer</p>
            </div>
          </div>

          {/* Bio */}
          <div className="space-y-6">
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
              <h2 className="text-2xl font-semibold mb-4">My Story</h2>
              <p className="text-gray-300 leading-relaxed">
                I'm a passionate React.js developer dedicated to building exceptional
                web experiences. With expertise in modern JavaScript, TypeScript, and
                the React ecosystem, I create scalable, performant applications that
                solve real-world problems. I love exploring new technologies and
                implementing cutting-edge solutions that push the boundaries of web development.
              </p>
            </div>

            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
              <h2 className="text-2xl font-semibold mb-4">Skills</h2>
              <div className="flex flex-wrap gap-2">
                {["React", "TypeScript", "Next.js", "Redux", "React Query", "Tailwind CSS", "Node.js", "Jest"].map(
                  (skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1 bg-white/10 rounded-full text-sm"
                    >
                      {skill}
                    </span>
                  )
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Experience Section */}
        <div className="mb-16">
          <h2 className="text-4xl font-bold mb-8">Experience</h2>
          <div className="space-y-6">
            {experience.map((exp, index) => (
              <div
                key={index}
                className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6"
              >
                <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-2">
                  <div>
                    <h3 className="text-xl font-bold">{exp.role}</h3>
                    <p className="text-purple-400">{exp.company}</p>
                  </div>
                  <span className="text-gray-400 text-sm mt-2 md:mt-0">{exp.period}</span>
                </div>
                <p className="text-gray-300">{exp.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Education Section */}
        <div className="mb-16">
          <h2 className="text-4xl font-bold mb-8">Education</h2>
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
            <h3 className="text-xl font-bold mb-2">Bachelor of Computer Science</h3>
            <p className="text-purple-400 mb-2">University Name</p>
            <p className="text-gray-400 text-sm mb-3">2014 - 2018</p>
            <p className="text-gray-300">
              Focused on software engineering, web development, and computer science fundamentals.
              Graduated with honors.
            </p>
          </div>
        </div>

        {/* Interests & Values */}
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-4xl font-bold mb-8">Interests</h2>
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
              <div className="flex flex-wrap gap-2">
                {interests.map((interest) => (
                  <span
                    key={interest}
                    className="px-4 py-2 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full text-sm border border-purple-500/30"
                  >
                    {interest}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-4xl font-bold mb-8">Values</h2>
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
              <div className="flex flex-wrap gap-2">
                {values.map((value) => (
                  <span
                    key={value}
                    className="px-4 py-2 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full text-sm border border-purple-500/30"
                  >
                    {value}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
