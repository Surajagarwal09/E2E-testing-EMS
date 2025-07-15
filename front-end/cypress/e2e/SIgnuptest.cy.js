describe('Sign up functionality', () => {

  beforeEach(() => {
    cy.visit('http://localhost:3000/');
  });

  it('should navigate to signup and back to login', () => {
    cy.get('[data-testid="signin-button"]').click();
    cy.get('[data-testid="signup-button"]').click();
    cy.get('[data-testid="sign-link"]').wait(1000).click();
  });
});

describe('Signup validations and success', () => {

  beforeEach(() => {
    cy.visit('http://localhost:3000/');
    cy.intercept('POST', 'https://event-management-system-iyn7.onrender.com/api/users/signup').as('signupRequest');
    cy.get('[data-testid="signin-button"]').click();
    cy.get('[data-testid="signup-button"]').click();
  });

  it('should sign up successfully with a new email', () => {
    const uniqueEmail = `testuser${Date.now()}${Math.floor(Math.random() * 1000)}@gmail.com`;

    cy.get('#fullname').type('Test User');
    cy.get('[data-testid="signupemail"]').type(uniqueEmail);
    cy.get('[data-testid="test-password"]').type('Suraj@9620');
    cy.get('[data-testid="signuphone"]').type('9876789021');
    cy.get('[data-testid="sign-button"]').wait(1000).click();

    cy.wait('@signupRequest').its('response.statusCode').should('eq', 201);
  });

  it('should show "user already exists" error', () => {
    cy.get('#fullname').type('Suraj Agri');
    cy.get('[data-testid="signupemail"]').type('surajagarwal396@gmail.com');
    cy.get('[data-testid="test-password"]').type('Suraj@9620');
    cy.get('[data-testid="signuphone"]').type('9620925352');
    cy.get('[data-testid="sign-button"]').wait(1000).click();

    cy.wait('@signupRequest').its('response.statusCode').should('eq', 400);
    cy.get('.Toastify__toast--error').should('exist');
  });
});
