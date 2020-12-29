/// <reference types="cypress" />

describe('Tickets', () => {
    beforeEach(() => cy.visit('https://ticket-box.s3.eu-central-1.amazonaws.com/index.html'));

    it('fills all the text input fields', () => {
        const firstName = 'Romilton';
        const lastName = 'Viana';

        cy.get('#first-name').type(firstName);
        cy.get('#last-name').type(lastName);
        cy.get('#email').type('rhom0909@gmail.com');
        cy.get('#requests').type('Corinthians');
        cy.get('#signature').type(firstName + ' ' + lastName);
    });

    it('select two tickets', () => {
        cy.get('#ticket-quantity').select('2');
    });

    it('select VIP ticket type', () => {
        cy.get('#vip').check();
    });

    it('selects SOCIAL MEDIA checkbox', () => {
        cy.get('#social-media').check();
    });

    it('selects FRIEND, and PUBLICATION, then uncheck FRIEND', () => {
        cy.get('#friend').check();
        cy.get('#publication').check();
        cy.get('#friend').uncheck();
    });

    it("has 'TICKETBOX' header's heading", () => {
        cy.get('header h1').should('contain.text', 'TICKETBOX')
    });

    it('alerts on invalid email', () => {
        cy.get('#email')
          .as('email')
          .type('rhom0909-gmail.com');

        cy.get('#email.invalid').should('exist');
        
        // Email valido  
        cy.get('@email')
          .clear()
          .type('rhom0909@gmail.com');
          
        cy.get('#email.invalid').should('not.exist');  
    });

    it('fills and reset the form', () => {
        const firstName = 'Romilton';
        const lastName = 'Viana';
        const fullName = `${firstName} ${lastName}`;

        cy.get('#first-name').type(firstName);
        cy.get('#last-name').type(lastName);
        cy.get('#email').type('rhom0909@gmail.com');
        cy.get('#ticket-quantity').select('2');
        cy.get('#vip').check();
        cy.get('#friend').check();
        cy.get('#requests').type('Corinthians');

        cy.get('.agreement p').should(
            'contain',
            `I, ${fullName}, wish to buy 2 VIP tickets.`
        );

        cy.get('#agree').click();
        cy.get('#signature').type(fullName);

        cy.get('button[type="submit"]')
          .as('submitButton')
          .should('not.be.disabled');

        cy.get('button[type="reset"]').click();
        
        cy.get('@submitButton').should('be.disabled');
    });

    it('fills mandatory fields using support command', () => {
        const customer = {
            firstName: 'John',
            lastName: 'Doe',
            email: 'johndoe@example.com'
        };

        cy.fillMandatoryFields(customer);

        cy.get('button[type="submit"]')
          .as('submitButton')
          .should('not.be.disabled');

        cy.get('#agree').uncheck();
        
        cy.get('@submitButton').should('be.disabled');
    });
});