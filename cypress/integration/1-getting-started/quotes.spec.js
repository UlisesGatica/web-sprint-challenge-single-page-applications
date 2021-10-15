


describe('Quotes App', () =>{
    beforeEach(() =>{
        cy.visit('http://localhost:3000/pizza');
    })

    const nameInput = () => cy.get('input[name=name]');
    const dropDown = () => cy.get('select[name=size]')
    const checkBox1 = () => cy.get('input[name=sausage]')
    const checkBox2 = () => cy.get('input[name=pepperoni]')
    const submitBtn = () => cy.get('button')


    
    describe('Filling out the input and cancelling', () => {
        it('can navigate to the url', () => {
            cy.url().should('include', 'localhost');
        })
        
        it('can type in the inputs', () =>{
            nameInput()
            .should('have.value', '')
            .type('Ulises')
            .should('have.value', 'Ulises');
            dropDown()
            .select('12inch')
            .should('have.value', '12inch')
            checkBox1()
            .click()
            checkBox2()
            .click()
            submitBtn()
            .click()
        })
    })
}) 