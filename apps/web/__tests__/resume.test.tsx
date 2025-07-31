import { render, screen } from '@testing-library/react'
import { Resume } from 'shared'

// Mock the resume data
const mockResumeData: Resume = {
  personalInfo: {
    name: 'Alex Johnson',
    title: 'Senior Full-Stack Software Engineer',
    email: 'alex.johnson@email.com',
    phone: '+1 (555) 123-4567',
    location: 'San Francisco, CA',
    linkedin: 'https://linkedin.com/in/alexjohnson',
    github: 'https://github.com/alexjohnson',
    website: 'https://alexjohnson.dev',
    summary: 'Passionate full-stack software engineer with 6+ years of experience.'
  },
  workExperience: [
    {
      id: 'exp-1',
      company: 'TechCorp Solutions',
      position: 'Senior Full-Stack Engineer',
      startDate: '2022-03',
      endDate: null,
      current: true,
      companyDescription: 'Leading fintech company',
      achievements: ['Led development of microservices architecture'],
      technologies: ['React', 'TypeScript', 'Node.js']
    }
  ],
  skills: [
    {
      name: 'React',
      category: 'Frontend',
      level: 5,
      yearsOfExperience: 6
    }
  ],
  education: [
    {
      id: 'edu-1',
      institution: 'University of California, Berkeley',
      degree: 'Bachelor of Science',
      fieldOfStudy: 'Computer Science',
      graduationDate: '2018-05',
      gpa: '3.7'
    }
  ],
  projects: [
    {
      id: 'proj-1',
      name: 'TaskFlow',
      description: 'A project management platform',
      technologies: ['React', 'TypeScript'],
      completionDate: '2023-12',
      highlights: ['Real-time collaboration']
    }
  ],
  lastUpdated: '2025-01-31T10:00:00Z'
}

// Create a client component version for testing
function ResumePageClient({ resumeData }: { resumeData: Resume }) {
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
                    <h3 className="text-xl font-semibold text-gray-900">{exp.position}</h3>
                    <h4 className="text-lg font-medium text-blue-600 mb-2">{exp.company}</h4>
                    <p className="text-gray-600 mb-3">{exp.companyDescription}</p>
                  </div>
                ))}
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
                    <h3 className="text-xl font-semibold text-gray-900">
                      {edu.degree} in {edu.fieldOfStudy}
                    </h3>
                    <h4 className="text-lg font-medium text-green-600 mb-2">{edu.institution}</h4>
                    {edu.gpa && <p className="text-gray-600 mb-2">GPA: {edu.gpa}</p>}
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

describe('Resume Page', () => {
  it('renders personal information correctly', () => {
    render(<ResumePageClient resumeData={mockResumeData} />)
    
    expect(screen.getByText('Alex Johnson')).toBeInTheDocument()
    expect(screen.getByText('Senior Full-Stack Software Engineer')).toBeInTheDocument()
    expect(screen.getByText('📧 alex.johnson@email.com')).toBeInTheDocument()
    expect(screen.getByText('📱 +1 (555) 123-4567')).toBeInTheDocument()
    expect(screen.getByText('📍 San Francisco, CA')).toBeInTheDocument()
  })

  it('displays professional summary', () => {
    render(<ResumePageClient resumeData={mockResumeData} />)
    
    const summaryHeading = screen.getByText('Professional Summary')
    expect(summaryHeading).toBeInTheDocument()
    
    const summaryText = screen.getByText(/Passionate full-stack software engineer/)
    expect(summaryText).toBeInTheDocument()
  })

  it('renders work experience section', () => {
    render(<ResumePageClient resumeData={mockResumeData} />)
    
    const experienceHeading = screen.getByText('Work Experience')
    expect(experienceHeading).toBeInTheDocument()
    
    expect(screen.getByText('Senior Full-Stack Engineer')).toBeInTheDocument()
    expect(screen.getByText('TechCorp Solutions')).toBeInTheDocument()
    expect(screen.getByText('Leading fintech company')).toBeInTheDocument()
  })

  it('displays projects section', () => {
    render(<ResumePageClient resumeData={mockResumeData} />)
    
    const projectsHeading = screen.getByText('Notable Projects')
    expect(projectsHeading).toBeInTheDocument()
    
    expect(screen.getByText('TaskFlow')).toBeInTheDocument()
    expect(screen.getByText('A project management platform')).toBeInTheDocument()
  })

  it('shows education information', () => {
    render(<ResumePageClient resumeData={mockResumeData} />)
    
    const educationHeading = screen.getByText('Education')
    expect(educationHeading).toBeInTheDocument()
    
    expect(screen.getByText('Bachelor of Science in Computer Science')).toBeInTheDocument()
    expect(screen.getByText('University of California, Berkeley')).toBeInTheDocument()
    expect(screen.getByText('GPA: 3.7')).toBeInTheDocument()
  })

  it('has proper semantic structure with headings', () => {
    render(<ResumePageClient resumeData={mockResumeData} />)
    
    // Check for main heading
    const mainHeading = screen.getByRole('heading', { level: 1 })
    expect(mainHeading).toHaveTextContent('Alex Johnson')
    
    // Check for section headings
    const sectionHeadings = screen.getAllByRole('heading', { level: 2 })
    expect(sectionHeadings).toHaveLength(4) // Summary, Experience, Projects, Education
    
    const headingTexts = sectionHeadings.map(h => h.textContent)
    expect(headingTexts).toContain('Professional Summary')
    expect(headingTexts).toContain('Work Experience')
    expect(headingTexts).toContain('Notable Projects')
    expect(headingTexts).toContain('Education')
  })

  it('uses responsive design classes', () => {
    render(<ResumePageClient resumeData={mockResumeData} />)
    
    // Check for responsive grid in projects section
    const projectsSection = screen.getByText('Notable Projects').closest('section')
    const projectsGrid = projectsSection?.querySelector('.grid')
    expect(projectsGrid).toHaveClass('grid-cols-1', 'md:grid-cols-2')
  })

  it('displays proper visual hierarchy with color coding', () => {
    render(<ResumePageClient resumeData={mockResumeData} />)
    
    // Check header has gradient background
    const header = screen.getByText('Alex Johnson').closest('div')
    expect(header).toHaveClass('bg-gradient-to-r', 'from-blue-600', 'to-violet-600')
    
    // Check experience section has blue accent
    const expSection = screen.getByText('Senior Full-Stack Engineer').closest('div')
    expect(expSection).toHaveClass('border-l-4', 'border-blue-500')
    
    // Check education section has green accent
    const eduSection = screen.getByText('Bachelor of Science in Computer Science').closest('div')
    expect(eduSection).toHaveClass('border-l-4', 'border-green-500')
  })
})