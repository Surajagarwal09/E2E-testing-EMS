describe('Home page test', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/');
    });

    it('should display navbar', () => {
        cy.get('[data-testid="test-navbar"]').should('be.visible');
    });

    it('should display the filter section', () => {
        cy.get('[data-testid="test-filter"]').should('be.visible');
    });

    it('should display the events', () => {
        cy.get('[data-testid="test-event-cards"]').should('be.visible');
    });
});
