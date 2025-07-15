describe('My Registration button should not be visible before login', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/')
  });

  it('should show disabled my registration link when not logged in', () => {
    cy.get('[data-testid="hamburger-button"]').click();
    cy.get('[data-testid="registeration-button"]').should('have.class', 'disabled-link');
    cy.get('[data-testid="registeration-button"]').click({ force: true });
    cy.url().should('not.include', '/myregistrations');
    cy.get('[data-testid="close-sidebar"]').wait(500).click();
  });
});

describe('Login functionality', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/');
    cy.intercept('POST', 'https://event-management-system-iyn7.onrender.com/api/users/login').as('loginRequest');
    cy.get('[data-testid="signin-button"]').click();
  });

  it('should close the login modal', () => {
    cy.get('[data-testid="close-button"]').wait(500).click();
  });

  it.only('should login successfully and navigate to My Registrations', () => {
    cy.get('#email').type('surajagarwal396@gmail.com');
    cy.get('[data-testid="login-password"]').type('Suraj@9620');
    cy.get('[data-testid="login-button"]').click();
    +
      cy.wait('@loginRequest').its('response.statusCode').should('eq', 200);
    cy.reload();
    cy.get('[data-testid="profile-butt"]').should('be.visible');
    cy.get('[data-testid="hamburger-button"]').should('not.exist');

    cy.get('[data-testid="profile-butt"]').click();
    cy.get('[data-testid="registeration-button"]').click();
    cy.url().should('include', '/myregistrations');
  });

  it('should show toast error on invalid credentials', () => {
    cy.get('#email').type('surajagarwal396@gmail.com');
    cy.get('[data-testid="login-password"]').type('WrongPassword');
    cy.get('[data-testid="login-button"]').click();

    cy.wait('@loginRequest').then((interception) => {
      expect([400, 404]).to.include(interception.response.statusCode);
    });


    cy.get('.Toastify__toast--error').should('exist');
  });

  it('should keep my registrations disabled after failed login and close sidebar', () => {
    cy.get('[data-testid="close-button"]').click();
    cy.get('[data-testid="hamburger-button"]').click();
    cy.get('[data-testid="registeration-button"]').should('have.class', 'disabled-link');
    cy.get('[data-testid="registeration-button"]').click({ force: true });
    cy.url().should('not.include', '/myregistrations');
    cy.get('[data-testid="close-sidebar"]').click();
  });
});
