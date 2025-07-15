describe('Event Filter Tests', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/');
    });

    it('should show filter component', () => {
        cy.get('[data-testid="test-filter"]').should('be.visible');
    });

    it('should search event by name', () => {
        cy.get('[data-testid="test-searchinput"]').type('workshop');
        cy.get('[data-testid="search-button"]').click();
        cy.get('[data-testid="test-event-cards"]').should('exist');
        cy.get('[data-testid="test-no-event"]').should('not.exist');
        cy.get('[data-testid="test-eventcardlink"]').first().click();
        cy.url().should('include', '/EventDetails/');
        cy.get('[data-testid="test-housebut"]').click();
    });

    it('should show no event for unknown search', () => {
        cy.get('[data-testid="test-searchinput"]').type('nonexistent');
        cy.get('[data-testid="search-button"]').click();
        cy.get('[data-testid="test-no-event"]').should('exist');
        cy.get('[data-testid="test-event-cards"]').should('not.exist');
    });

    it('should filter by location', () => {
        cy.get('[data-testid="location-select"]').select(1);
        cy.get('[data-testid="search-button"]').click();
        cy.get('[data-testid="test-event-cards"]').should('exist');
    });

    it('should show no events for empty location', () => {
        cy.get('[data-testid="location-select"]').select(9);
        cy.get('[data-testid="search-button"]').click();
        cy.get('[data-testid="test-no-event"]').should('exist');
    });

    it('should filter by date', () => {
        const date = '2025-07-26';
        cy.get('[data-testid="test-eventdate"]').then(($input) => {
            const nativeInput = $input[0];
            nativeInput.value = date;
            nativeInput.dispatchEvent(new Event('input', { bubbles: true }));
            nativeInput.dispatchEvent(new Event('change', { bubbles: true }));
        });

        cy.get('[data-testid="search-button"]').click();
        cy.get('[data-testid="test-event-cards"]').should('exist');
    });

    it.only('should show no events on unmatched date', () => {
        const date = '2025-07-26';
        cy.get('[data-testid="test-eventdate"]').then(($input) => {
            const nativeInput = $input[0];
            nativeInput.value = date;
            nativeInput.dispatchEvent(new Event('input', { bubbles: true }));
            nativeInput.dispatchEvent(new Event('change', { bubbles: true }));
        });
        cy.get('[data-testid="search-button"]').click().wait(500);
           cy.get('[data-testid="test-no-event"]').should('exist');
    });

    it('should work with all filters combined', () => {
        const date = '2025-07-26';
        cy.get('[data-testid="test-searchinput"]').type('velocity');

        cy.get('[data-testid="test-eventdate"]').then(($input) => {
            const nativeInput = $input[0];
            nativeInput.value = date;
            nativeInput.dispatchEvent(new Event('input', { bubbles: true }));
            nativeInput.dispatchEvent(new Event('change', { bubbles: true }));
        });

        cy.get('[data-testid="location-select"]').select(8);
        cy.get('[data-testid="search-button"]').click();

        cy.get('[data-testid="test-event-cards"]').should('exist');
        cy.get('[data-testid="test-eventcardlink"]').first().click();
        cy.url().should('include', '/EventDetails/');
    });

});
