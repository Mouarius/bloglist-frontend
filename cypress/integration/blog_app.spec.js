/// <reference types="Cypress" />
describe('Blog App', () => {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3000/api/testing/reset')
    cy.login('mouarius', 'suirauom')
    cy.visit('http://localhost:3000')
  })
  it('login form is shown', function () {
    cy.contains('log in to the app')
  })
  describe('Login', function () {
    it('Login succeeds', function () {
      cy.get('input[name="Username"]').type('mouarius')
      cy.get('input[name="Password"]').type('suirauom')
      cy.get('button').click()
      cy.contains('blogs')
      cy.contains('Marius Menault is logged in.')
    })
    it('Login fails', function () {
      cy.get('input[name="Username"]').type('mouarius')
      cy.get('input[name="Password"]').type('wrong')
      cy.get('button').click()
      cy.get('.error.message')
        .should('contain.text', 'invalid username or password')
        .should('have.css', 'background-color', 'rgb(255, 0, 0)')
    })
  })
})
