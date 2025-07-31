import type { Metadata } from 'next';
import { promises as fs } from 'fs';
import path from 'path';
import { Resume } from 'shared';
import InteractiveSkillsChart from '@/components/InteractiveSkillsChart';

export const metadata: Metadata = {
  title: 'Resume - Software Engineer',
  description: 'Professional resume showcasing full-stack development experience, technical skills, and career achievements.',
  keywords: ['resume', 'software engineer', 'full-stack developer', 'react', 'typescript', 'next.js'],
  openGraph: {
    title: 'Resume - Software Engineer | BlogClaude',
    description: 'Professional resume showcasing full-stack development experience, technical skills, and career achievements.',
    type: 'profile',
  },
  twitter: {
    card: 'summary',
    title: 'Resume - Software Engineer | BlogClaude',
    description: 'Professional resume showcasing full-stack development experience, technical skills, and career achievements.',
  }
};

async function getResumeData(): Promise<Resume> {
  const filePath = path.join(process.cwd(), '..', '..', 'content', 'resume', 'resume-data.json');
  const fileContents = await fs.readFile(filePath, 'utf8');
  return JSON.parse(fileContents);
}

export default async function ResumePage() {
  const resumeData = await getResumeData();
  const { personalInfo, workExperience, skills, education, projects } = resumeData;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          {/* Header Section */}
          <div className="bg-gradient-to-r from-blue-600 to-violet-600 px-6 py-8 text-white">
            <h1 className="text-4xl font-bold mb-2">{personalInfo.name}</h1>
            <p className="text-xl text-blue-100 mb-4">{personalInfo.title}</p>
            <div className="flex flex-wrap gap-4 text-sm">
              <span>📧 {personalInfo.email}</span>
              <span>📱 {personalInfo.phone}</span>
              <span>📍 {personalInfo.location}</span>
              {personalInfo.linkedin && (
                <a href={personalInfo.linkedin} className="hover:text-blue-200 underline">
                  LinkedIn
                </a>
              )}
              {personalInfo.github && (
                <a href={personalInfo.github} className="hover:text-blue-200 underline">
                  GitHub
                </a>
              )}
              {personalInfo.website && (
                <a href={personalInfo.website} className="hover:text-blue-200 underline">
                  Website
                </a>
              )}
            </div>
          </div>

          <div className="px-6 py-8 space-y-8">
            {/* Summary Section */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Professional Summary</h2>
              <p className="text-gray-700 leading-relaxed">{personalInfo.summary}</p>
            </section>

            {/* Experience Section */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Work Experience</h2>
              <div className="space-y-6">
                {workExperience.map((exp) => (
                  <div key={exp.id} className="border-l-4 border-blue-500 pl-6">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                      <h3 className="text-xl font-semibold text-gray-900">{exp.position}</h3>
                      <span className="text-sm text-gray-500">
                        {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                      </span>
                    </div>
                    <h4 className="text-lg font-medium text-blue-600 mb-2">{exp.company}</h4>
                    <p className="text-gray-600 mb-3">{exp.companyDescription}</p>
                    <ul className="list-disc list-inside space-y-1 mb-3">
                      {exp.achievements.map((achievement, index) => (
                        <li key={index} className="text-gray-700">{achievement}</li>
                      ))}
                    </ul>
                    <div className="flex flex-wrap gap-2">
                      {exp.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-1 bg-gray-100 text-gray-700 rounded-md text-sm"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Interactive Skills Section */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Technical Skills</h2>
              <InteractiveSkillsChart skills={skills} />
            </section>

            {/* Skills Overview Grid */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Skills at a Glance</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {['Frontend', 'Backend', 'Database', 'Cloud', 'DevOps'].map((category) => {
                  const categorySkills = skills.filter(skill => skill.category === category);
                  if (categorySkills.length === 0) return null;
                  
                  return (
                    <div key={category} className="bg-gray-50 rounded-lg p-4">
                      <h3 className="font-semibold text-gray-900 mb-3">{category}</h3>
                      <div className="space-y-2">
                        {categorySkills.map((skill) => (
                          <div key={skill.name} className="flex items-center justify-between">
                            <span className="text-gray-700">{skill.name}</span>
                            <div className="flex">
                              {[1, 2, 3, 4, 5].map((level) => (
                                <div
                                  key={level}
                                  className={`w-2 h-2 rounded-full mr-1 ${
                                    level <= skill.level ? 'bg-blue-500' : 'bg-gray-300'
                                  }`}
                                />
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>

            {/* Projects Section */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Notable Projects</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {projects.map((project) => (
                  <div key={project.id} className="border border-gray-200 rounded-lg p-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{project.name}</h3>
                    <p className="text-gray-600 mb-3">{project.description}</p>
                    <ul className="list-disc list-inside space-y-1 mb-3 text-sm">
                      {project.highlights.map((highlight, index) => (
                        <li key={index} className="text-gray-700">{highlight}</li>
                      ))}
                    </ul>
                    <div className="flex flex-wrap gap-2 mb-3">
                      {project.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-1 bg-blue-100 text-blue-700 rounded-md text-sm"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                    <div className="flex gap-3 text-sm">
                      {project.url && (
                        <a href={project.url} className="text-blue-600 hover:text-blue-800 underline">
                          Live Demo
                        </a>
                      )}
                      {project.githubUrl && (
                        <a href={project.githubUrl} className="text-blue-600 hover:text-blue-800 underline">
                          GitHub
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Education Section */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Education</h2>
              <div className="space-y-4">
                {education.map((edu) => (
                  <div key={edu.id} className="border-l-4 border-green-500 pl-6">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                      <h3 className="text-xl font-semibold text-gray-900">
                        {edu.degree} in {edu.fieldOfStudy}
                      </h3>
                      <span className="text-sm text-gray-500">{edu.graduationDate}</span>
                    </div>
                    <h4 className="text-lg font-medium text-green-600 mb-2">{edu.institution}</h4>
                    {edu.gpa && <p className="text-gray-600 mb-2">GPA: {edu.gpa}</p>}
                    {edu.achievements && (
                      <ul className="list-disc list-inside space-y-1">
                        {edu.achievements.map((achievement, index) => (
                          <li key={index} className="text-gray-700">{achievement}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}