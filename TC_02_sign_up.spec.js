/// <reference types="cypress" />

describe('test case sign up', () => {
    beforeEach(() => {
        cy.visit('https://community.idntimes.com/')  
    })
  
    it('skenario sign up berhasil', () => {
        cy.get('#login > :nth-child(1) > .nav > :nth-child(2) > a').click()
        cy.get(':nth-child(2) > .form-control').type('Nadiyah Putri')
        cy.get('#signup > :nth-child(1) > form > :nth-child(3) > .form-control').type('USER_EMAIL')
        cy.get('#signup > :nth-child(1) > form > :nth-child(4) > .form-control').type('USER_PASS')
        cy.get(':nth-child(5) > .form-control').type('idntimes.com')
        cy.get('#signup > :nth-child(1) > form > .btn').click()
        cy.get('.notice').contains('Register Success').should('be.visible')

    })
    it('skenario sign up dengan email sudah terdaftar', () => {
        cy.get('#login > :nth-child(1) > .nav > :nth-child(2) > a').click()
        cy.get(':nth-child(2) > .form-control').type('Putri Nadiyah')
        cy.get('#signup > :nth-child(1) > form > :nth-child(3) > .form-control').type('putnadiyah@gmail.com')
        cy.get('#signup > :nth-child(1) > form > :nth-child(4) > .form-control').type('idntimes.com')
        cy.get(':nth-child(5) > .form-control').type('idntimes.com')
        cy.get('#signup > :nth-child(1) > form > .btn').click()
        cy.get('.notice').contains('The email has already been taken').should('be.visible')

    })
  
    it('skenario sign up email non valid tanpa @', () => {
        cy.get('#login > :nth-child(1) > .nav > :nth-child(2) > a').click()
        cy.get(':nth-child(2) > .form-control').type('Nadiyah Putri')
        cy.get('#signup > :nth-child(1) > form > :nth-child(3) > .form-control').type('123gmail.com')
        cy.get('#signup > :nth-child(1) > form > :nth-child(4) > .form-control').type('idntimes.com')
        cy.get(':nth-child(5) > .form-control').type('idntimes.com')
        cy.get('#signup > :nth-child(1) > form > .btn').click()

    })

    it('skenario sign up email non valid tanpa titik', () => {
        cy.get('#login > :nth-child(1) > .nav > :nth-child(2) > a').click()
        cy.get(':nth-child(2) > .form-control').type('Nadiyah Putri')
        cy.get('#signup > :nth-child(1) > form > :nth-child(3) > .form-control').type('123@gmailcom')
        cy.get('#signup > :nth-child(1) > form > :nth-child(4) > .form-control').type('idntimes.com')
        cy.get(':nth-child(5) > .form-control').type('idntimes.com')
        cy.get('#signup > :nth-child(1) > form > .btn').click()

    })

    it('skenario sign up conf password tidak sama dgn pass', () => {
        cy.get('#login > :nth-child(1) > .nav > :nth-child(2) > a').click()
        cy.get(':nth-child(2) > .form-control').type('Nadiyah Putri')
        cy.get('#signup > :nth-child(1) > form > :nth-child(3) > .form-control').type('123@gmail.com')
        cy.get('#signup > :nth-child(1) > form > :nth-child(4) > .form-control').type('idntimes.com')
        cy.get(':nth-child(5) > .form-control').type('salah')
        cy.get('#signup > :nth-child(1) > form > .btn').click()
        cy.get('.notice').contains('The password conf and password must match.').should('be.visible')
    })   
    
  })
  