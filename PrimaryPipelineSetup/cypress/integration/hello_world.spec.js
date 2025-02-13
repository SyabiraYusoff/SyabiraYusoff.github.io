describe('Application Load Test', () => {
    it('should load the application correctly', () => {
        cy.visit('http://localhost:3000');
        cy.contains('Welcome'); // Adjust the text based on your application
    });
});