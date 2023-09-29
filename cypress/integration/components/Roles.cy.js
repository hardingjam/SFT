import Roles from '../../../src/routes/Roles.svelte'


describe('Roles', () => {

    beforeEach(() => {
        cy.mount(Roles);
    });

    it(`Shows info text`, () => {
        cy.get('.info').should('contain', 'Roles are granted to specific addresses to control certain duties of a token. Every role has admins control who has the role, and admin for that role. Admins need to grant themselves their role to perform those duties.');
    });

});