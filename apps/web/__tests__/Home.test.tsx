import { render, screen } from '@testing-library/react'
import Home from '../app/page'

describe('Home', () => {
  it('renders the main heading', () => {
    render(<Home />)
    
    const heading = screen.getByRole('heading', {
      name: /welcome to blogclaude/i,
    })
    
    expect(heading).toBeInTheDocument()
  })

  it('renders the description text', () => {
    render(<Home />)
    
    const description = screen.getByText(/a modern tech blog and resume showcase/i)
    
    expect(description).toBeInTheDocument()
  })

  it('renders navigation links to blog and resume', () => {
    render(<Home />)
    
    const blogLink = screen.getByRole('link', { name: /explore blog posts/i })
    const resumeLink = screen.getByRole('link', { name: /view resume/i })
    
    expect(blogLink).toBeInTheDocument()
    expect(resumeLink).toBeInTheDocument()
    expect(blogLink).toHaveAttribute('href', '/blog')
    expect(resumeLink).toHaveAttribute('href', '/resume')
  })

  it('has proper semantic structure', () => {
    render(<Home />)
    
    // Check for main content structure
    const heading = screen.getByRole('heading', { level: 1 })
    expect(heading).toBeInTheDocument()
    
    // Check for call-to-action buttons
    const links = screen.getAllByRole('link')
    expect(links).toHaveLength(2)
  })
})