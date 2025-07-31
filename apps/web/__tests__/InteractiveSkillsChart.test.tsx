import { render, screen, fireEvent } from '@testing-library/react'
import { Skill } from 'shared'
import InteractiveSkillsChart from '../components/InteractiveSkillsChart'

const mockSkills: Skill[] = [
  {
    name: 'React',
    category: 'Frontend',
    level: 5,
    yearsOfExperience: 6
  },
  {
    name: 'TypeScript',
    category: 'Frontend',
    level: 4,
    yearsOfExperience: 4
  },
  {
    name: 'Node.js',
    category: 'Backend',
    level: 5,
    yearsOfExperience: 5
  },
  {
    name: 'PostgreSQL',
    category: 'Database',
    level: 4,
    yearsOfExperience: 4
  },
  {
    name: 'AWS',
    category: 'Cloud',
    level: 3,
    yearsOfExperience: 3
  }
]

describe('InteractiveSkillsChart', () => {
  it('renders the component with title and skills', () => {
    render(<InteractiveSkillsChart skills={mockSkills} />)
    
    const title = screen.getByText('Interactive Skills Overview')
    expect(title).toBeInTheDocument()
    
    // Check that all skills are rendered initially
    expect(screen.getByText('React')).toBeInTheDocument()
    expect(screen.getByText('TypeScript')).toBeInTheDocument()
    expect(screen.getByText('Node.js')).toBeInTheDocument()
    expect(screen.getByText('PostgreSQL')).toBeInTheDocument()
    expect(screen.getByText('AWS')).toBeInTheDocument()
  })

  it('displays correct skills count initially', () => {
    render(<InteractiveSkillsChart skills={mockSkills} />)
    
    const skillsCount = screen.getByText('Showing 5 of 5 skills')
    expect(skillsCount).toBeInTheDocument()
  })

  it('filters skills by category', () => {
    render(<InteractiveSkillsChart skills={mockSkills} />)
    
    const categorySelect = screen.getByLabelText('Filter by Category')
    fireEvent.change(categorySelect, { target: { value: 'Frontend' } })
    
    // Should show only Frontend skills
    expect(screen.getByText('React')).toBeInTheDocument()
    expect(screen.getByText('TypeScript')).toBeInTheDocument()
    expect(screen.queryByText('Node.js')).not.toBeInTheDocument()
    expect(screen.queryByText('PostgreSQL')).not.toBeInTheDocument()
    expect(screen.queryByText('AWS')).not.toBeInTheDocument()
    
    const skillsCount = screen.getByText('Showing 2 of 5 skills')
    expect(skillsCount).toBeInTheDocument()
  })

  it('filters skills by minimum level', () => {
    render(<InteractiveSkillsChart skills={mockSkills} />)
    
    const levelSelect = screen.getByLabelText('Minimum Skill Level')
    fireEvent.change(levelSelect, { target: { value: '5' } })
    
    // Should show only Expert level skills (React and Node.js)
    expect(screen.getByText('React')).toBeInTheDocument()
    expect(screen.getByText('Node.js')).toBeInTheDocument()
    expect(screen.queryByText('TypeScript')).not.toBeInTheDocument()
    expect(screen.queryByText('PostgreSQL')).not.toBeInTheDocument()
    expect(screen.queryByText('AWS')).not.toBeInTheDocument()
    
    const skillsCount = screen.getByText('Showing 2 of 5 skills')
    expect(skillsCount).toBeInTheDocument()
  })

  it('combines category and level filters', () => {
    render(<InteractiveSkillsChart skills={mockSkills} />)
    
    const categorySelect = screen.getByLabelText('Filter by Category')
    const levelSelect = screen.getByLabelText('Minimum Skill Level')
    
    fireEvent.change(categorySelect, { target: { value: 'Frontend' } })
    fireEvent.change(levelSelect, { target: { value: '5' } })
    
    // Should show only Expert level Frontend skills (React only)
    expect(screen.getByText('React')).toBeInTheDocument()
    expect(screen.queryByText('TypeScript')).not.toBeInTheDocument()
    expect(screen.queryByText('Node.js')).not.toBeInTheDocument()
    
    const skillsCount = screen.getByText('Showing 1 of 5 skills')
    expect(skillsCount).toBeInTheDocument()
  })

  it('shows no results message when filters match no skills', () => {
    render(<InteractiveSkillsChart skills={mockSkills} />)
    
    const categorySelect = screen.getByLabelText('Filter by Category')
    const levelSelect = screen.getByLabelText('Minimum Skill Level')
    
    fireEvent.change(categorySelect, { target: { value: 'DevOps' } })
    fireEvent.change(levelSelect, { target: { value: '4' } })
    
    const noResultsMessage = screen.getByText('No skills match the current filters.')
    expect(noResultsMessage).toBeInTheDocument()
    
    const skillsCount = screen.getByText('Showing 0 of 5 skills')
    expect(skillsCount).toBeInTheDocument()
  })

  it('displays skill levels and years of experience', () => {
    render(<InteractiveSkillsChart skills={mockSkills} />)
    
    // Check for React skill details (Expert level appears in both skill display and legend)
    const expertElements = screen.getAllByText('Expert')
    expect(expertElements.length).toBeGreaterThan(0)
    expect(screen.getByText('6 years')).toBeInTheDocument()
    
    // Check for AWS skill details
    expect(screen.getByText('Intermediate')).toBeInTheDocument()
    expect(screen.getByText('3 years')).toBeInTheDocument()
  })

  it('includes skill level legend', () => {
    render(<InteractiveSkillsChart skills={mockSkills} />)
    
    expect(screen.getByText('Skill Level Legend:')).toBeInTheDocument()
    // Check that legend section exists by looking for multiple skill level indicators
    const beginnerElements = screen.getAllByText(/Beginner \(1\/5\)/)
    const expertElements = screen.getAllByText(/Expert \(5\/5\)/)
    
    // Should appear in both dropdown and legend
    expect(beginnerElements.length).toBeGreaterThanOrEqual(2)
    expect(expertElements.length).toBeGreaterThanOrEqual(2)
  })

  it('has accessible form controls', () => {
    render(<InteractiveSkillsChart skills={mockSkills} />)
    
    const categorySelect = screen.getByLabelText('Filter by Category')
    const levelSelect = screen.getByLabelText('Minimum Skill Level')
    
    expect(categorySelect).toBeInTheDocument()
    expect(levelSelect).toBeInTheDocument()
    expect(categorySelect).toHaveAttribute('id', 'category-filter')
    expect(levelSelect).toHaveAttribute('id', 'level-filter')
  })
})