/// <reference types="cypress" />

describe('test case sign in', () => {
    beforeEach(() => {
        cy.visit('https://community.idntimes.com/')      
    })
  
    it('skenario sign in sukses', () => {
        cy.get('#login > :nth-child(1) > .nav > :nth-child(1) > a').click()
        cy.get('#signin > :nth-child(1) > form > :nth-child(3) > .form-control').type('USER_EMAIL')
        cy.get('#signin > :nth-child(1) > form > :nth-child(4) > .form-control').type('USER_PASS')
        cy.get('#signin > :nth-child(1) > form > .btn').click()
        cy.url().should('include', '/dashboard')
    })

    it('skenario sign in menggunakan password salah', () => {
        cy.get('#login > :nth-child(1) > .nav > :nth-child(1) > a').click()
        cy.get('#signin > :nth-child(1) > form > :nth-child(3) > .form-control').type('USER_EMAIL')
        cy.get('#signin > :nth-child(1) > form > :nth-child(4) > .form-control').type('USER_PASS')
        cy.get('#signin > :nth-child(1) > form > .btn').click()
        cy.get('.notice').contains('Password kamu tidak sesuai, kamu lupa?').should('be.visible')
    })

    it('skenario sign in lupa password', () => {
        cy.get('.text-grey').should('have.text','Lupa Password?').click()
        cy.url().should('include', '/forgot-password')
        cy.get('#email').type('USER_EMAIL')
        cy.get('.form > .btn').click()
        cy.get(':nth-child(1) > h3').contains('please check your email to continue')
        .should('be.visible')
        cy.visit('https://community.idntimes.com/forgot-password/xvMrk49Sf0UDqZCfqZiwhl7FB9FXESAp2le6vbXv')
        cy.get('#email').type('putnadiyah@gmail.com')
        cy.get('#new_password').type('Birumuda1')
        cy.get('#new_password_confirmation').type('Birumuda1')
        cy.get('.form > .btn').click()
        cy.get('#new_password_confirmation').should('be.visible')
        .should('contain', 'Reset Password Success')
    })

    it('skenario sign in menggunakan email belum terdaftar', () => {
        cy.get('#signin > :nth-child(1) > form > :nth-child(3) > .form-control').type('USER_EMAIL')
        cy.get('#signin > :nth-child(1) > form > :nth-child(4) > .form-control').type('USER_PASS')
        cy.get('#signin > :nth-child(1) > form > .btn').click()
        cy.get('.notice').contains('Oops.. sorry email kamu belum terdaftar, nih!').should('be.visible')
    })

    it('skenario sign in format email salah (tanpa tanda titik)', () => {
        cy.get('#signin > :nth-child(1) > form > :nth-child(3) > .form-control').type('USER_EMAIL')
        cy.get('#signin > :nth-child(1) > form > :nth-child(4) > .form-control').type('USER_PASSWORD')
        cy.get('#signin > :nth-child(1) > form > .btn').click()
        cy.get('.notice').contains('The email must be a valid email address').should('be.visible')
    })

    it('skenario sign in menggunakan SSO google', () => {
        cy.get('#signin > :nth-child(1) > .button-google > img').click()
        cy.request({
            method: 'POST',
            url: 'https://www.googleapis.com/oauth2/v4/token',
            body: {
              grant_type: 'refresh_token',
              client_id: Cypress.env('googleClientId'),
              client_secret: Cypress.env('googleClientSecret'),
              refresh_token: Cypress.env('googleRefreshToken'),
            },
          }).then(({ body }) => {
            const { id_token } = body
          })
          
        cy.url().should('include', '/dashboard')
        
    })

    it.only('skenario sign in menggunakan akun facebook', () => {
        cy.get('#signin > :nth-child(1) > .button-facebook > img').click()
        cy.url().should('include', '/dashboard')
    })
    
  })
  