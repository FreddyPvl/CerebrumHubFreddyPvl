beforeEach(() => {
    cy.visit('cypress/fixtures/registration_form_2.html')
})

/*
Assignment 4: add content to the following tests
*/

describe('Section 1: Functional tests', () => {

    it('User can use only same both first and validation passwords', () => {
        cy.get('[data-testid="user"]').type('Assignment4')
        cy.get('#email').type('4thAssignment@email.com')
        cy.get('[data-cy="name"]').type('Cerebrum')
        cy.get('[data-testid="lastNameTestId"]').type('Hub')
        cy.get('[data-testid="phoneNumberTestId"]').type('44466644')
        cy.get('input[name="password"]').type('Assignment4')
        cy.get('input[name="confirm"]').type('4thAssignment')

        // Change the password so that it matches
        cy.get('input[name="confirm"]').scrollIntoView()
        cy.get('input[name="confirm"]').clear().type('Assignment4');
        cy.get('h2').contains('Password').click()
        cy.get('#password_error_message').should('not.be.visible')
        cy.get('.submit_button').should('be.enabled')
    })

    it.only('User can submit form with all fields added', () => {
        // Add test steps for filling in ALL fields
        cy.get('[data-testid="user"]').type('Assignment4')
        cy.get('#email').type('4thAssignment@gmail.com')
        cy.get('[data-cy="name"]').type('Cerebrum')
        cy.get('[data-testid="lastNameTestId"]').type('Hub')
        cy.get('[data-testid="phoneNumberTestId"]').type('44466446')
        cy.get('input[name="password"]').type('Assignment4')
        cy.get('input[name="confirm"]').type('Assignment4')
        cy.get('#javascriptFavLanguage').check()
        cy.get('input[type="checkbox"].vehicles#vehicle1').check();
        cy.get('#cars').select('Audi')
        cy.get('#animal').select('Dog')
        cy.get('.submit_button').click()
        cy.get('.submit_button').should('be.enabled')
        cy.get('.submit_button').click()
        cy.get('#success_message').should('be.visible')
        cy.get('#success_message').should('contain', 'User successfully submitted registration')
    })

    it('User can submit form with valid data and only mandatory fields added', () => {
        // Add test steps for filling in ONLY mandatory fields
        // Assert that submit button is enabled
        // Assert that after submitting the form system shows successful message

        // example, how to use function, which fills in all mandatory data
        // in order to see the content of the function, scroll to the end of the file
        inputValidData('JohnDoe')
    })

    // Add at least 1 test for checking some mandatory field's absence
    it('User can not submit form if mandatory field email is missing', () => {
        inputValidData('JohhPvl')
        cy.get('#email').scrollIntoView().clear()
    })

    it('User can not submit form if username is missing', () => {
        inputValidData('JohhPvl')
        cy.get('[data-testid="user"]').scrollIntoView().clear()
        cy.get('h2').contains('Password').click()
        cy.get('.submit_button').should('not.be.enabled')
        cy.get('#success_message').should('not.be.visible')
    })

    it('User can not submit form if last name is absent', () => {
        inputValidData('JohhPvl')
        cy.get('[data-testid="lastNameTestId"]').scrollIntoView().clear()
        cy.get('h2').contains('Password').click()
        cy.get('.submit_button').should('be.disabled')
        cy.get('#success_message').should('not.be.visible')
    })
})

/*
Assignment 5: create more visual tests
*/

describe('Section 2: Visual tests', () => {
    it('Check that logo is correct and has correct size', () => {
        cy.log('Will check logo source and size')
        cy.get('img').should('have.attr', 'src').should('include', 'cerebrum_hub_logo')
        // get element and check its parameter height
        // it should be less than 178 and greater than 100
        cy.get('img').invoke('height').should('be.lessThan', 178)
            .and('be.greaterThan', 100)
    })

    it('My test for second picture', () => {
        // Create similar test for checking the second picture
        cy.log('Will check that second picture is correct and has correct size')
        cy.get('[data-cy="cypress_logo"]').should('have.attr', 'src').should('include', 'cypress_logo.png')
        cy.get('[data-cy="cypress_logo"]').invoke('height').should('be.lessThan', 100)
            .and('be.greaterThan', 80)
    });

    it('Check navigation part', () => {
        cy.get('nav').children().should('have.length', 2)

        // Get navigation element, find siblings that contains h1 and check if it has Registration form in string
        cy.get('nav').siblings('h1').should('have.text', 'Registration form number 2')

        // Get navigation element, find its first child, check the link content and click it
        cy.get('nav').children().eq(0).should('be.visible')
            .and('have.attr', 'href', 'registration_form_1.html')
            .click()

        // Check that currently opened URL is correct
        cy.url().should('contain', '/registration_form_1.html')

        // Go back to previous page
        cy.go('back')
        cy.log('Back again in registration form 2')
    })

    // Create similar test for checking the second link
    
    it('Check navigation for Registration form 3', () => {
        cy.get('nav').children().should('have.length', 2)
        cy.get('nav').siblings('h1').should('have.text', 'Registration form number 2')
        cy.get('nav').children().eq(1).should('be.visible')
            .and('have.attr', 'href', 'registration_form_3.html')
            .click()
        cy.url().should('contain', '/registration_form_3.html')
        cy.go('back')
        cy.log('Back in the previous page')
    })

    it('Check that radio button list is correct', () => {
        // Array of found elements with given selector has 4 elements in total
        cy.get('input[type="radio"]').should('have.length', 4)

        // Verify labels of the radio buttons
        cy.get('input[type="radio"]').next().eq(0).should('have.text', 'HTML')
        cy.get('input[type="radio"]').next().eq(1).should('have.text', 'CSS')
        cy.get('input[type="radio"]').next().eq(2).should('have.text', 'JavaScript')
        cy.get('input[type="radio"]').next().eq(3).should('have.text', 'PHP')

        //Verify default state of radio buttons
        cy.get('input[type="radio"]').eq(0).should('not.be.checked')
        cy.get('input[type="radio"]').eq(1).should('not.be.checked')
        cy.get('input[type="radio"]').eq(2).should('not.be.checked')
        cy.get('input[type="radio"]').eq(3).should('not.be.checked')

        // Selecting one will remove selection from the other radio button
        cy.get('input[type="radio"]').eq(0).check().should('be.checked')
        cy.get('input[type="radio"]').eq(1).check().should('be.checked')
        cy.get('input[type="radio"]').eq(0).should('not.be.checked')
    })

    // Create test similar to previous one verifying check boxes
    it('Animal dropdown is correct', () => {
        cy.get('#animal').children().should('have.length', 6)
        cy.get('#animal').find('option').eq(0).should('have.text', 'Dog')
        cy.get('#animal').find('option').eq(1).should('have.text', 'Cat')
        cy.get('#animal').find('option').eq(2).should('have.text', 'Snake')
        cy.get('#animal').find('option').eq(3).should('have.text', 'Hippo')
        cy.get('#animal').find('option').eq(4).should('have.text', 'Cow')
        cy.get('#animal').find('option').eq(5).should('have.text', 'Horse')
    })

    it('Car dropdown is correct', () => {
        // Here is just an example how to explicitly create screenshot from the code
        // Select second element and create screenshot for this area or full page
        cy.get('#cars').select(1).screenshot('Cars drop-down')
        cy.screenshot('Full page screenshot')

        // Here are given different solutions how to get the length of array of elements in Cars dropdown
        // Next 2 lines of code do exactly the same!
        cy.get('#cars').children().should('have.length', 4)
        cy.get('#cars').find('option').should('have.length', 4)

        // Check  that first element in the dropdown has text Volvo
        cy.get('#cars').find('option').eq(0).should('have.text', 'Volvo')

        // Advanced level how to check the content of the Cars dropdown
        cy.get('#cars').find('option').then(options => {
            const actual = [...options].map(option => option.value)
            expect(actual).to.deep.eq(['volvo', 'saab', 'opel', 'audi'])
        })
    })
})

function inputValidData(JohhPvl) {
    cy.log('Username will be filled')
    cy.get('input[data-testid="user"]').type('HubsHub')
    cy.get('#email').type('ItWorks@gmail.com')
    cy.get('[data-cy="name"]').type('Freddy')
    cy.get('#lastName').type('Paavel')
    cy.get('[data-testid="phoneNumberTestId"]').type('55664466')
    cy.get('#password').type('Assignment4')
    cy.get('#confirm').type('Assignment4')
    cy.get('h2').contains('Password').click()
}