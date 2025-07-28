import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import ProjectList from '../components/ProjectList'
import '@testing-library/jest-dom'

// ✅ Mock fetch functions
vi.mock('../api/projects', () => ({
  getProjects: vi.fn(() =>
    Promise.resolve([{ _id: '1', title: 'Mock Project', technologies: 'React' }])
  ),
  createProject: vi.fn(() =>
    Promise.resolve({ _id: '2', title: 'New Project', technologies: 'Node.js' })
  ),
  deleteProject: vi.fn(() => Promise.resolve({ success: true })),
}))

describe('ProjectList Component', () => {
  beforeEach(() => {
    // ✅ Simulate logged-in admin
    localStorage.setItem(
      'jwt',
      JSON.stringify({
        token: 'fake-token',
        user: { role: 'admin' },
      })
    )
  })

  afterEach(() => {
    localStorage.clear()
    vi.clearAllMocks()
  })

  it('renders heading and form fields', async () => {
    render(
      <BrowserRouter>
        <ProjectList />
      </BrowserRouter>
    )

    expect(await screen.findByText('Projects')).toBeInTheDocument()
    expect(screen.getByText('Add New Project')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Project Title')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Technologies')).toBeInTheDocument()
  })

  it('shows mock project from API', async () => {
    render(
      <BrowserRouter>
        <ProjectList />
      </BrowserRouter>
    )

    const projectItem = await screen.findByText('Mock Project')
    expect(projectItem).toBeInTheDocument()
  })

  it('allows input and add', async () => {
    render(
      <BrowserRouter>
        <ProjectList />
      </BrowserRouter>
    )

    const titleInput = screen.getByPlaceholderText('Project Title')
    const techInput = screen.getByPlaceholderText('Technologies')
    const addButton = screen.getByRole('button', { name: /add/i })

    fireEvent.change(titleInput, { target: { value: 'New Project' } })
    fireEvent.change(techInput, { target: { value: 'Node.js' } })
    fireEvent.click(addButton)

    await waitFor(() => {
      expect(titleInput.value).toBe('')
      expect(techInput.value).toBe('')
    })
  })
})
