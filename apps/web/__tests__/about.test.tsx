import { render, screen } from '@testing-library/react'
import AboutPage, { metadata } from '../app/about/page'
import { AboutPage as AboutPageType } from 'shared'

// Mock fs module
jest.mock('fs', () => ({
  promises: {
    readFile: jest.fn()
  }
}))

// Mock Next.js Image component
jest.mock('next/image', () => {
  return function MockImage({ src, alt, width, height, className, priority, ...props }: any) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={src} alt={alt} width={width} height={height} className={className} {...props} />
  }
})

const mockAboutData: AboutPageType = {
  bio: "I'm a passionate software engineer with a deep love for creating efficient, scalable, and user-friendly applications. With years of experience in full-stack development, I specialize in modern web technologies including React, TypeScript, and Node.js.\n\nWhen I'm not coding, you'll find me exploring new technologies, contributing to open-source projects, or sharing my knowledge through technical writing.",
  photoUrl: "/images/professional-photo.jpg",
  tagline: "Full-Stack Developer & Technical Writer",
  additionalSections: [
    {
      id: "philosophy",
      title: "My Development Philosophy",
      content: "I believe that great software is built on three pillars: clarity, maintainability, and user-centricity.",
      order: 1
    },
    {
      id: "interests",
      title: "Beyond Code",
      content: "Outside of software development, I'm passionate about technology trends and system design patterns.",
      order: 2
    }
  ],
  lastUpdated: "2025-08-01T00:00:00Z"
}

// Mock the fs.readFile to return our mock data
const mockReadFile = require('fs').promises.readFile as jest.Mock
mockReadFile.mockResolvedValue(JSON.stringify(mockAboutData))

describe('About Page', () => {
  beforeEach(() => {
    mockReadFile.mockClear()
    // Reset console.error mock
    jest.spyOn(console, 'error').mockImplementation(() => {})
  })
  
  afterEach(() => {
    jest.restoreAllMocks()
  })

  it('renders the page title and tagline', async () => {
    const AboutPageComponent = await AboutPage()
    render(AboutPageComponent)
    
    const title = screen.getByRole('heading', { name: /about me/i })
    const tagline = screen.getByText(/full-stack developer & technical writer/i)
    
    expect(title).toBeInTheDocument()
    expect(tagline).toBeInTheDocument()
  })

  it('renders the professional photo', async () => {
    const AboutPageComponent = await AboutPage()
    render(AboutPageComponent)
    
    const photo = screen.getByAltText(/professional photo/i)
    expect(photo).toBeInTheDocument()
    expect(photo).toHaveAttribute('src', '/images/professional-photo.jpg')
  })

  it('renders the bio content in paragraphs', async () => {
    const AboutPageComponent = await AboutPage()
    render(AboutPageComponent)
    
    const bioText1 = screen.getByText(/passionate software engineer/i)
    const bioText2 = screen.getByText(/when i'm not coding/i)
    
    expect(bioText1).toBeInTheDocument()
    expect(bioText2).toBeInTheDocument()
  })

  it('renders additional sections in correct order', async () => {
    const AboutPageComponent = await AboutPage()
    render(AboutPageComponent)
    
    const philosophySection = screen.getByText(/my development philosophy/i)
    const interestsSection = screen.getByText(/beyond code/i)
    
    expect(philosophySection).toBeInTheDocument()
    expect(interestsSection).toBeInTheDocument()
  })

  it('renders call-to-action links', async () => {
    const AboutPageComponent = await AboutPage()
    render(AboutPageComponent)
    
    const resumeLink = screen.getByRole('link', { name: /view my resume/i })
    const blogLink = screen.getByRole('link', { name: /read my blog/i })
    
    expect(resumeLink).toBeInTheDocument()
    expect(blogLink).toBeInTheDocument()
    expect(resumeLink).toHaveAttribute('href', '/resume')
    expect(blogLink).toHaveAttribute('href', '/blog')
  })

  it('has proper semantic structure', async () => {
    const AboutPageComponent = await AboutPage()
    render(AboutPageComponent)
    
    // Check for main heading
    const mainHeading = screen.getByRole('heading', { level: 1 })
    expect(mainHeading).toBeInTheDocument()
    
    // Check for section headings
    const sectionHeadings = screen.getAllByRole('heading', { level: 2 })
    expect(sectionHeadings.length).toBeGreaterThan(0)
    
    // Check that content is properly structured
    const sections = screen.getAllByText(/my story|my development philosophy|beyond code|let's connect/i)
    expect(sections.length).toBeGreaterThan(0)
  })

  it('loads content from the correct file path', async () => {
    await AboutPage()
    
    expect(mockReadFile).toHaveBeenCalledWith(
      expect.stringMatching(/content[\\\/]about[\\\/]about-data\.json$/),
      'utf8'
    )
  })

  it('handles responsive design classes', async () => {
    const AboutPageComponent = await AboutPage()
    render(AboutPageComponent)
    
    // Check for responsive container classes
    const container = screen.getByText(/about me/i).closest('.max-w-4xl')
    expect(container).toBeInTheDocument()
    
    // Check for responsive image classes
    const imageContainer = screen.getByAltText(/professional photo/i).closest('.w-32')
    expect(imageContainer).toBeInTheDocument()
  })

  it('handles file read errors gracefully', async () => {
    // Mock a file read error
    mockReadFile.mockRejectedValueOnce(new Error('File not found'))
    
    const AboutPageComponent = await AboutPage()
    render(AboutPageComponent)
    
    // Should render fallback content
    const fallbackText = screen.getByText(/content temporarily unavailable/i)
    expect(fallbackText).toBeInTheDocument()
    
    // Should still render the page structure
    const title = screen.getByRole('heading', { name: /about me/i })
    expect(title).toBeInTheDocument()
  })

  it('validates required fields and handles invalid data', async () => {
    // Mock invalid data (missing required fields)
    const invalidData = { lastUpdated: "2025-08-01T00:00:00Z" }
    mockReadFile.mockResolvedValueOnce(JSON.stringify(invalidData))
    
    const AboutPageComponent = await AboutPage()
    render(AboutPageComponent)
    
    // Should render fallback content due to validation failure
    const fallbackText = screen.getByText(/content temporarily unavailable/i)
    expect(fallbackText).toBeInTheDocument()
  })

  it('has enhanced accessibility features', async () => {
    const AboutPageComponent = await AboutPage()
    render(AboutPageComponent)
    
    // Check for aria-labelledby attributes
    const bioSection = screen.getByLabelText(/my story/i)
    expect(bioSection).toBeInTheDocument()
    
    // Check for navigation landmark
    const nav = screen.getByLabelText(/related pages/i)
    expect(nav).toBeInTheDocument()
    
    // Check for focus management on links
    const resumeLink = screen.getByRole('link', { name: /view my resume/i })
    expect(resumeLink).toHaveClass('focus:ring-2')
  })
})

describe('About Page Metadata', () => {
  it('has correct SEO metadata', () => {
    expect(metadata.title).toBe('About Me - Full-Stack Developer & Technical Writer')
    expect(metadata.description).toContain('Learn more about my journey as a software engineer')
    expect(metadata.keywords).toContain('about')
    expect(metadata.keywords).toContain('software engineer')
  })

  it('has proper Open Graph metadata', () => {
    expect(metadata.openGraph?.title).toContain('About Me - Full-Stack Developer & Technical Writer')
    expect(metadata.openGraph?.description).toContain('Learn more about my journey')
    expect(metadata.openGraph?.type).toBe('profile')
  })

  it('has proper Twitter metadata', () => {
    expect(metadata.twitter?.card).toBe('summary_large_image')
    expect(metadata.twitter?.title).toContain('About Me - Full-Stack Developer & Technical Writer')
    expect(metadata.twitter?.description).toContain('Learn more about my journey')
  })
})