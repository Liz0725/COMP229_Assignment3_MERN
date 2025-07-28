describe('ProjectList Page', () => {
  it('visits login and accesses project list after login', () => {
    cy.visit('http://localhost:5173/login')  // ✅ Update if your port is different

    // Login (adjust selectors to match your HTML)
    cy.get('input[name=email]').type('admin@example.com')
    cy.get('input[name=password]').type('admin123')
    cy.get('button[type=submit]').click()

    // Wait for dashboard
    cy.url().should('include', '/dashboard')

    // Navigate to Projects
    cy.contains('Projects').click()

    // Check project list
    cy.contains('Projects').should('be.visible')
  })
})
