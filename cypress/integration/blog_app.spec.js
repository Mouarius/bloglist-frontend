/// <reference types="Cypress" />

describe('Blog App', () => {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3000/api/testing/reset')
    const user = {
      username: 'mouarius',
      name: 'Marius Menault',
      password: 'suirauom',
    }
    cy.request('POST', 'http://localhost:3000/api/users/', user).then(
      (response) => {
        localStorage.setItem('loggedNoteappUser', JSON.stringify(response.body))
      }
    )
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
  describe('When logged in', () => {
    beforeEach(function () {
      cy.login('mouarius', 'suirauom')
      const testBlog = {
        title: 'The test blog',
        author: 'Marius Menault',
        url: 'http://localhost:3000',
      }
      cy.createBlog({ ...testBlog })
      cy.createBlog({ ...testBlog, title: 'The second test blog' })
      cy.createBlog({ ...testBlog, title: 'The third test blog' })
    })
    it('can open and close the form', function () {
      cy.contains('add blog').click()
      cy.get('#blog-form').should('be.visible')
      cy.contains('cancel').click()
      cy.get('#blog-form').should('not.be.visible')
    })
    it('logged in user can create a new blog', function () {
      cy.contains('add blog').click()
      cy.get('input[name=blogTitle]').type('A test blog title')
      cy.get('input[name=blogAuthor]').type('Marius Menault')
      cy.get('input[name=blogUrl]').type('http://mouarius.github.io')
      cy.contains('send').click()
      cy.get('#blog-form').should('not.be.visible')
      cy.get('.info.message')
        .should(
          'contain.text',
          'The blog A test blog title by Marius Menault has been created'
        )
        .should('have.css', 'background-color', 'rgb(0, 0, 0)')
      cy.get('.blog')
        .should('contain.text', 'A test blog title')
        .and('contain.text', 'Marius Menault')
        .and('contain.text', 'view')
        .and('not.contain.text', 'author')
    })
    it('the second blog details can be viewed', function () {
      cy.contains('second test blog')
        .parents('.blog')
        .find('.button-visibility')
        .click()
      cy.get('.blog-details').should('be.visible')
    })
    it('can like the third blog twice', function () {
      cy.contains('third test blog').parents('.blog').as('theThirdBlog')
      cy.get('@theThirdBlog').find('.button-visibility').click()
      cy.get('@theThirdBlog').find('.button-likes').click()
      cy.get('@theThirdBlog').find('.button-likes').click()
      cy.get('@theThirdBlog').find('.blog-likes').should('contain', '2')
    })
    it('the owner can delete his blog', function () {
      cy.contains('The test blog').parents('.blog').as('theFirstBlog')
      cy.get('@theFirstBlog').find('.button-visibility').click()
      cy.get('@theFirstBlog').find('.button-remove').click()
      cy.on('window:confirm', () => true)
      cy.get('.info.message')
        .should('contain.text', 'The blog The test blog has been deleted')
        .and('have.css', 'background-color', 'rgb(0, 0, 0)')
      cy.get('.blog').should('have.length', 2)
    })
    // eslint-disable-next-line quotes
    it("a user cannot delete a blog that doesn't belong to him", function () {
      // Create a new user in the db
      const newUser = {
        username: 'bobby',
        name: 'Bobby McBob',
        password: 'bobbob',
      }
      cy.request('POST', 'http://localhost:3000/api/users/', newUser).then(
        (response) => {
          localStorage.setItem(
            'loggedNoteappUser',
            JSON.stringify(response.body)
          )
        }
      )
      // Log Marius Menault out
      cy.contains('log out').click()
      cy.login('bobby', 'bobbob')
      cy.contains('The test blog').parents('.blog').as('theFirstBlog')
      cy.get('@theFirstBlog').find('.button-visibility').click()
      cy.get('@theFirstBlog').should('not.contain.text', 'remove')
    })
    it('blogs are ordered by number of likes', function () {
      const testBlog = {
        title: 'the title',
        author: 'Marius Menault',
        url: 'http://localhost:3000',
        likes: 0,
      }
      cy.createBlog({
        ...testBlog,
        title: 'The fourth test blog that should be first',
        likes: 100,
      })
      cy.createBlog({
        ...testBlog,
        title: 'The fifth test blog that should be second',
        likes: 50,
      })
      cy.get('.blog').then((response) => {
        let blogLikes = []

        // * To check if the blogs are ordered by likes we extract the likes from each component in a number array
        for (let i = 0; i < response.length; i += 1) {
          const blog = response[i]
          cy.get(blog)
            .find('li.blog-likes')
            .then((response) =>
              // * This adds the number of likes in the array
              blogLikes.push(parseInt(response.text().match(/\d+/), 10))
            )
        }
        // * Checks if the sorted version of the array is the same as the array
        const sortedBlogLikes = blogLikes.sort().reverse()
        expect(blogLikes).to.equal(sortedBlogLikes)
      })
    })
  })
})
