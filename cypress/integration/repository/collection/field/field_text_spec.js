describe('Text field test', function() {
  beforeEach(() => {
    cy.loginByUI()
  })

  it('clear DB', function(){
    cy.clearDB()
  })

  it('create collection for create fields', function(){
    cy.visit('/wp-admin/admin.php?page=tainacan_admin#/collections')
    cy.location().should((loc) => {expect(loc.hash).to.eq('#/collections')})
    cy.get('#button-collection-creation').click()
    cy.get('#tainacan-text-name').type('Book Text Fields')
    cy.get('#tainacan-text-description').type('Description book Fields')
    cy.get('#tainacan-select-status').select('Publish').should('have.value', 'publish')
    cy.get('#button-submit-collection-creation').click()
    cy.get('#primary-menu > .menu > .menu-header > .menu-list > li > .router-link-active > .icon > .mdi').click()
    cy.get('.b-table').should('contain', 'Book Text Fields')
  })

  context('CRUD text field', function(){
    it('create actor field', function(){
      cy.visit('/wp-admin/admin.php?page=tainacan_admin#/collections')
      cy.location().should((loc) => {expect(loc.hash).to.eq('#/collections')})
      cy.get('[data-label="Name"] > :nth-child(1) > .clickable-row').click()
      cy.get(':nth-child(4) > .router-link-active').should('contain', 'Items')
      cy.get('.menu > :nth-child(2) > :nth-child(5) > a').click()
      cy.get('h1').should('contain', 'Collection Fields Edition Page')
      cy.get('.field > :nth-child(2) > :nth-child(1)').click()
      cy.get('#fieldEditForm > :nth-child(1) > .control > .input').type('{selectall}{del}Actor')
      cy.get('.textarea').type('description actor')
      cy.get('#tainacan-select-status-publish > .check').click()
      cy.get(':nth-child(2) > .button').click()
      cy.get('.active-fields-area >').should('contain', 'Actor')
    })

    it('check create actor field', function(){
      cy.visit('/wp-admin/admin.php?page=tainacan_admin#/collections')
      cy.location().should((loc) => {expect(loc.hash).to.eq('#/collections')})
      cy.get('[data-label="Name"] > :nth-child(1) > .clickable-row').click()
      cy.get(':nth-child(4) > .router-link-active').should('contain', 'Items')
      cy.get('.menu > :nth-child(2) > :nth-child(5) > a').click()
      cy.get('h1').should('contain', 'Collection Fields Edition Page')
      cy.contains('Actor')
    })

    it('create location field', function(){
      cy.visit('/wp-admin/admin.php?page=tainacan_admin#/collections')
      cy.location().should((loc) => {expect(loc.hash).to.eq('#/collections')})
      cy.get('[data-label="Name"] > :nth-child(1) > .clickable-row').click()
      cy.get(':nth-child(4) > .router-link-active').should('contain', 'Items')
      cy.get('.menu > :nth-child(2) > :nth-child(5) > a').click()
      cy.get('h1').should('contain', 'Collection Fields Edition Page')
      cy.get('.field > :nth-child(2) > :nth-child(1)').click()
      cy.get('#fieldEditForm > :nth-child(1) > .control > .input').type('{selectall}{del}Location')
      cy.get('.textarea').type('description location')
      cy.get('#tainacan-select-status-publish > .check').click()
      cy.get(':nth-child(2) > .button').click()
      cy.get('.active-fields-area >').should('contain', 'Location')
    })

    it('check create location field', function(){
      cy.visit('/wp-admin/admin.php?page=tainacan_admin#/collections')
      cy.location().should((loc) => {expect(loc.hash).to.eq('#/collections')})
      cy.get('[data-label="Name"] > :nth-child(1) > .clickable-row').click()
      cy.get(':nth-child(4) > .router-link-active').should('contain', 'Items')
      cy.get('.menu > :nth-child(2) > :nth-child(5) > a').click()
      cy.get('h1').should('contain', 'Collection Fields Edition Page')
      cy.contains('Location')
    })

    it('edit location field', function(){
      cy.visit('/wp-admin/admin.php?page=tainacan_admin#/collections')
      cy.location().should((loc) => {expect(loc.hash).to.eq('#/collections')})
      cy.get('[data-label="Name"] > :nth-child(1) > .clickable-row').click()
      cy.get(':nth-child(4) > .router-link-active').should('contain', 'Items')
      cy.get('.menu > :nth-child(2) > :nth-child(5) > a').click()
      cy.get('h1').should('contain', 'Collection Fields Edition Page')
      cy.get(':nth-child(4) > .handle > .controls > :nth-child(2) > .icon > .mdi').click()
      cy.get('#fieldEditForm > :nth-child(1) > .control > .input').type(' edited')
      cy.get('.textarea').type(' edited')
      cy.get('#tainacan-select-status-publish > .check').click()
      cy.get(':nth-child(2) > .button').click()
      cy.get('.active-fields-area >').should('contain', 'Location edited')
    })

    it('create denomination field', function(){
      cy.visit('/wp-admin/admin.php?page=tainacan_admin#/collections')
      cy.location().should((loc) => {expect(loc.hash).to.eq('#/collections')})
      cy.get('[data-label="Name"] > :nth-child(1) > .clickable-row').click()
      cy.get(':nth-child(4) > .router-link-active').should('contain', 'Items')
      cy.get('.menu > :nth-child(2) > :nth-child(5) > a').click()
      cy.get('h1').should('contain', 'Collection Fields Edition Page')
      cy.get('.field > :nth-child(2) > :nth-child(1)').click()
      cy.get('#fieldEditForm > :nth-child(1) > .control > .input').type('{selectall}{del}Denomination')
      cy.get('.textarea').type('description denomination')
      cy.get('#tainacan-select-status-publish > .check').click()
      cy.get(':nth-child(2) > .button').click()
      cy.get('.active-fields-area >').should('contain', 'Denomination')
    })

    it('delete denomination field', function(){
      cy.visit('/wp-admin/admin.php?page=tainacan_admin#/collections')
      cy.location().should((loc) => {expect(loc.hash).to.eq('#/collections')})
      cy.get('[data-label="Name"] > :nth-child(1) > .clickable-row').click()
      cy.get(':nth-child(4) > .router-link-active').should('contain', 'Items')
      cy.get('.menu > :nth-child(2) > :nth-child(5) > a').click()
      cy.get('h1').should('contain', 'Collection Fields Edition Page')
      cy.contains('Denomination')
      cy.get(':nth-child(5) > .handle > .controls > :nth-child(3) > .icon > .mdi').click()
      cy.get('.handle > .field-name').should('not.eq', 'Denomination')
    })

    it('check not contain denomination field', function(){
      cy.visit('/wp-admin/admin.php?page=tainacan_admin#/collections')
      cy.location().should((loc) => {expect(loc.hash).to.eq('#/collections')})
      cy.get('[data-label="Name"] > :nth-child(1) > .clickable-row').click()
      cy.get(':nth-child(4) > .router-link-active').should('contain', 'Items')
      cy.get('.menu > :nth-child(2) > :nth-child(5) > a').click()
      cy.get('h1').should('contain', 'Collection Fields Edition Page')
      cy.get('.handle > .field-name').should('not.eq', 'Denomination')
    })
  })

  context('Diseble text field', function(){
    it('create record field', function(){
      cy.visit('/wp-admin/admin.php?page=tainacan_admin#/collections')
      cy.location().should((loc) => {expect(loc.hash).to.eq('#/collections')})
      cy.get('[data-label="Name"] > :nth-child(1) > .clickable-row').click()
      cy.get(':nth-child(4) > .router-link-active').should('contain', 'Items')
      cy.get('.menu > :nth-child(2) > :nth-child(5) > a').click()
      cy.get('h1').should('contain', 'Collection Fields Edition Page')
      cy.get('.field > :nth-child(2) > :nth-child(1)').click()
      cy.get('#fieldEditForm > :nth-child(1) > .control > .input').type('{selectall}{del}Record disebled')
      cy.get('.textarea').type('description record')
      cy.get('#tainacan-select-status-publish > .check').click()
      cy.get(':nth-child(2) > .button').click()
      cy.get('.active-fields-area >').should('contain', 'Record disebled')
    })

    it('disebled record field', function(){
      cy.visit('/wp-admin/admin.php?page=tainacan_admin#/collections')
      cy.location().should((loc) => {expect(loc.hash).to.eq('#/collections')})
      cy.get('[data-label="Name"] > :nth-child(1) > .clickable-row').click()
      cy.get(':nth-child(4) > .router-link-active').should('contain', 'Items')
      cy.get('.menu > :nth-child(2) > :nth-child(5) > a').click()
      cy.get('h1').should('contain', 'Collection Fields Edition Page')
      cy.get(':nth-child(5) > .handle > .controls > .switch > .check').click()
      cy.get('.active-fields-area > :nth-child(5)').should('have.class', 'disabled-field')
      })

    it('check disebled record field', function(){
      cy.visit('/wp-admin/admin.php?page=tainacan_admin#/collections')
      cy.location().should((loc) => {expect(loc.hash).to.eq('#/collections')})
      cy.get('[data-label="Name"] > :nth-child(1) > .clickable-row').click()
      cy.get(':nth-child(4) > .router-link-active').should('contain', 'Items')
      cy.get('.menu > :nth-child(2) > :nth-child(5) > a').click()
      cy.get('h1').should('contain', 'Collection Fields Edition Page')
      cy.get('.active-fields-area > :nth-child(5)').should('have.class', 'disabled-field')
    })
  })

  context('Check required fields', function(){
    it('create blank field', function(){
      cy.visit('/wp-admin/admin.php?page=tainacan_admin#/collections')
      cy.location().should((loc) => {expect(loc.hash).to.eq('#/collections')})
      cy.get('[data-label="Name"] > :nth-child(1) > .clickable-row').click()
      cy.get(':nth-child(4) > .router-link-active').should('contain', 'Items')
      cy.get('.menu > :nth-child(2) > :nth-child(5) > a').click()
      cy.get('h1').should('contain', 'Collection Fields Edition Page')
      cy.get('.field > :nth-child(2) > :nth-child(1)').click()
      cy.get('.not-focusable-item > .handle > .label-details').should('contain', 'Not saved')
      cy.get('#fieldEditForm > :nth-child(1) > .control > .input').type('{selectall}{del}Bank{selectall}{del}')
      cy.get('.textarea').clear()
      cy.get('#tainacan-select-status-publish > .check').click()
      cy.get(':nth-child(2) > .button').click()
      cy.get('.not-focusable-item > .handle > .field-name').should('have.class', 'is-danger')
      cy.get('#fieldEditForm > :nth-child(1) > .control > .input').should('have.class', 'is-danger')
      cy.get(':nth-child(1) > .button').click()
      cy.get('.active-fields-area > :nth-child(6) > .handle > .field-name').should('not.contain', 'Blank').and('contain', 'Text')
      cy.get('.active-fields-area > :nth-child(6) > .handle > .label-details').should('contain', 'Not saved')
    })

    it('check not contain blank field', function(){
      cy.visit('/wp-admin/admin.php?page=tainacan_admin#/collections')
      cy.location().should((loc) => {expect(loc.hash).to.eq('#/collections')})
      cy.get('[data-label="Name"] > :nth-child(1) > .clickable-row').click()
      cy.get(':nth-child(4) > .router-link-active').should('contain', 'Items')
      cy.get('.menu > :nth-child(2) > :nth-child(5) > a').click()
      cy.get('h1').should('contain', 'Collection Fields Edition Page')
      cy.get('.active-fields-area').should('not.contain', 'Blank')
    })
  })

  context('Create text field private', function(){
    it('create private field', function(){
      cy.visit('/wp-admin/admin.php?page=tainacan_admin#/collections')
      cy.location().should((loc) => {expect(loc.hash).to.eq('#/collections')})
      cy.get('[data-label="Name"] > :nth-child(1) > .clickable-row').click()
      cy.get(':nth-child(4) > .router-link-active').should('contain', 'Items')
      cy.get('.menu > :nth-child(2) > :nth-child(5) > a').click()
      cy.get('h1').should('contain', 'Collection Fields Edition Page')
      cy.get('.field > :nth-child(2) > :nth-child(1)').click()
      cy.get('#fieldEditForm > :nth-child(1) > .control > .input').type('{selectall}{del}Text Private')
      cy.get('.textarea').type('description private')
      cy.get('#tainacan-select-status-private > .check').click()
      cy.get(':nth-child(2) > .button').click()
      cy.get('.active-fields-area >').should('contain', 'Text Private')
    })

    it('check create private field', function(){
      cy.visit('/wp-admin/admin.php?page=tainacan_admin#/collections')
      cy.location().should((loc) => {expect(loc.hash).to.eq('#/collections')})
      cy.get('[data-label="Name"] > :nth-child(1) > .clickable-row').click()
      cy.get(':nth-child(4) > .router-link-active').should('contain', 'Items')
      cy.get('.menu > :nth-child(2) > :nth-child(5) > a').click()
      cy.get('h1').should('contain', 'Collection Fields Edition Page')
      cy.get('.active-fields-area > :nth-child(6) > .handle > .field-name').should('contain', 'Text Private')
      cy.get(':nth-child(6) > .handle > .controls > :nth-child(2) > .icon > .mdi').click()
      cy.get('#tainacan-select-status-private > .check').should('be.selected')
    })
  })

  context('"Not saved" label vs. "cancel button"', function(){
    it('create denomination field', function(){
      cy.visit('/wp-admin/admin.php?page=tainacan_admin#/collections')
      cy.location().should((loc) => {expect(loc.hash).to.eq('#/collections')})
      cy.get('[data-label="Name"] > :nth-child(1) > .clickable-row').click()
      cy.get(':nth-child(4) > .router-link-active').should('contain', 'Items')
      cy.get('.menu > :nth-child(2) > :nth-child(5) > a').click()
      cy.get('h1').should('contain', 'Collection Fields Edition Page')
      cy.get('.field > :nth-child(2) > :nth-child(1)').click()
      cy.get('#fieldEditForm > :nth-child(1) > .control > .input').type('{selectall}{del}Denomination')
      cy.get('.textarea').type('description denomination')
      cy.get('#tainacan-select-status-publish > .check').click()
      cy.get(':nth-child(2) > .button').click()
      cy.get('.active-fields-area >').should('contain', 'Denomination')
    })

    it('check that ‘Not Saved’ label wasn’t inserted, and changes were lost', function(){
      cy.visit('/wp-admin/admin.php?page=tainacan_admin#/collections')
      cy.location().should((loc) => {expect(loc.hash).to.eq('#/collections')})
      cy.get('[data-label="Name"] > :nth-child(1) > .clickable-row').click()
      cy.get(':nth-child(4) > .router-link-active').should('contain', 'Items')
      cy.get('.menu > :nth-child(2) > :nth-child(5) > a').click()
      cy.get('h1').should('contain', 'Collection Fields Edition Page')
      cy.get('.active-fields-area > :nth-child(7) > .handle > .field-name').should('contain', 'Denomination')
      cy.get(':nth-child(7) > .handle > .controls > :nth-child(2) > .icon > .mdi').click()
      cy.get('#fieldEditForm > :nth-child(1) > .control > .input').type(' edited')
      cy.get('.textarea').type(' edited')
      cy.get('#tainacan-select-status-private > .check').click()
      cy.get(':nth-child(1) > .button').click()
      cy.get('.active-fields-area >').should('not.contain', 'Denomination edited')
      cy.get('.active-fields-area > :nth-child(7) > .handle > .label-details').should('not.contain', 'Not saved')
    })

    it('check if the message “Not Saved” appeared next to the field name', function(){
      cy.visit('/wp-admin/admin.php?page=tainacan_admin#/collections')
      cy.location().should((loc) => {expect(loc.hash).to.eq('#/collections')})
      cy.get('[data-label="Name"] > :nth-child(1) > .clickable-row').click()
      cy.get(':nth-child(4) > .router-link-active').should('contain', 'Items')
      cy.get('.menu > :nth-child(2) > :nth-child(5) > a').click()
      cy.get('h1').should('contain', 'Collection Fields Edition Page')
      cy.get('.field > :nth-child(2) > :nth-child(1)').click()
      cy.get('#fieldEditForm > :nth-child(1) > .control > .input').type('{selectall}{del}Record Type')
      cy.get('.textarea').type('description new')
      cy.get('#tainacan-select-status-publish > .check').click()
      cy.get(':nth-child(1) > .button').click()
      cy.get('.active-fields-area > :nth-child(8) > .handle > .field-name').should('not.contain', 'Record Type').and('contain', 'Text')
      cy.get('.active-fields-area > :nth-child(8) > .handle > .label-details').should('contain', 'Not saved')
      cy.get(':nth-child(8) > .handle > .controls > :nth-child(2) > .icon > .mdi').click()
      cy.get('#fieldEditForm > :nth-child(1) > .control > .input').type('{selectall}{del}Record Type')
      cy.get(':nth-child(2) > .button').click()
      cy.get('.active-fields-area > :nth-child(8) > .handle > .field-name').should('contain', 'Record Type').and('not.contain', 'Text')
      cy.get('.active-fields-area > :nth-child(8) > .handle > .label-details').should('not.contain', 'Not saved')
    })
  })

  context('Fields Sorting', function(){
  })

  context('create text-type fields tests', function(){
    it('canceled create text field', function(){
      cy.visit('/wp-admin/admin.php?page=tainacan_admin#/collections')
      cy.location().should((loc) => {expect(loc.hash).to.eq('#/collections')})
      cy.get('[data-label="Name"] > :nth-child(1) > .clickable-row').click()
      cy.get(':nth-child(4) > .router-link-active').should('contain', 'Items')
      cy.get('.menu > :nth-child(2) > :nth-child(5) > a').click()
      cy.get('h1').should('contain', 'Collection Fields Edition Page')
      cy.get('.field > :nth-child(2) > :nth-child(1)').click()
      cy.get('#fieldEditForm > :nth-child(1) > .control > .input').type('{selectall}{del}Text name canceled')
      cy.get('.textarea').type('description')
      cy.get('#tainacan-select-status-publish > .check').click()
      cy.get(':nth-child(1) > .button').click()
      cy.get('.active-fields-area >').should('not.contain', 'Text name canceled')
    })

    it('create text-type field public required', function(){
      cy.visit('/wp-admin/admin.php?page=tainacan_admin#/collections')
      cy.location().should((loc) => {expect(loc.hash).to.eq('#/collections')})
      cy.get('[data-label="Name"] > :nth-child(1) > .clickable-row').click()
      cy.get(':nth-child(4) > .router-link-active').should('contain', 'Items')
      cy.get('.menu > :nth-child(2) > :nth-child(5) > a').click()
      cy.get('h1').should('contain', 'Collection Fields Edition Page')
      cy.get('.field > :nth-child(2) > :nth-child(1)').click()
      cy.get('#fieldEditForm > :nth-child(1) > .control > .input').type('{selectall}{del}Text name public required')
      cy.get('.textarea').type('book description required')
      cy.get('#tainacan-select-status-publish > .check').click()
      cy.get(':nth-child(2) > .b-checkbox > .check').click()
      cy.get(':nth-child(2) > .button').click()
      cy.get('.active-fields-area >').should('contain', 'Text name public required')
    })

    it('create text-type field public multiple values', function(){
      cy.visit('/wp-admin/admin.php?page=tainacan_admin#/collections')
      cy.location().should((loc) => {expect(loc.hash).to.eq('#/collections')})
      cy.get('[data-label="Name"] > :nth-child(1) > .clickable-row').click()
      cy.get(':nth-child(4) > .router-link-active').should('contain', 'Items')
      cy.get('.menu > :nth-child(2) > :nth-child(5) > a').click()
      cy.get('h1').should('contain', 'Collection Fields Edition Page')
      cy.get('.field > :nth-child(2) > :nth-child(1)').click()
      cy.get('#fieldEditForm > :nth-child(1) > .control > .input').type('{selectall}{del}Text name public multiple values')
      cy.get('.textarea').type('book description multiple values')
      cy.get('#tainacan-select-status-publish > .check').click()
      cy.get(':nth-child(3) > .b-checkbox > .check').click()
      cy.get(':nth-child(2) > .button').click()
      cy.get('.active-fields-area >').should('contain', 'Text name public multiple values')
    })

    it('create text-type field public unique values', function(){
      cy.visit('/wp-admin/admin.php?page=tainacan_admin#/collections')
      cy.location().should((loc) => {expect(loc.hash).to.eq('#/collections')})
      cy.get('[data-label="Name"] > :nth-child(1) > .clickable-row').click()
      cy.get(':nth-child(4) > .router-link-active').should('contain', 'Items')
      cy.get('.menu > :nth-child(2) > :nth-child(5) > a').click()
      cy.get('h1').should('contain', 'Collection Fields Edition Page')
      cy.get('.field > :nth-child(2) > :nth-child(1)').click()
      cy.get('#fieldEditForm > :nth-child(1) > .control > .input').type('{selectall}{del}Text name public unique values')
      cy.get('.textarea').type('name book description multiple values')
      cy.get('#tainacan-select-status-publish > .check').click()
      cy.get(':nth-child(4) > .b-checkbox > .check').click()
      cy.get(':nth-child(2) > .button').click()
      cy.get('.active-fields-area >').should('contain', 'Text name public unique values')
    })
  })

  context('Leave page without saving field editions', function(){
    it('Leave page without saving field editions', function(){
      cy.visit('/wp-admin/admin.php?page=tainacan_admin#/collections')
      cy.location().should((loc) => {expect(loc.hash).to.eq('#/collections')})
      cy.get('[data-label="Name"] > :nth-child(1) > .clickable-row').click()
      cy.get(':nth-child(4) > .router-link-active').should('contain', 'Items')
      cy.get('.menu > :nth-child(2) > :nth-child(5) > a').click()
      cy.get('h1').should('contain', 'Collection Fields Edition Page')
      cy.get('.field > :nth-child(2) > :nth-child(1)').click()
      cy.get('#fieldEditForm > :nth-child(1) > .control > .input').type('{selectall}{del}Not Saved')
      cy.get('.textarea').type('description')
      cy.get('#tainacan-select-status-publish > .check').click()
      cy.contains('Items').click()
      cy.get('.modal-card').should('have.class', 'animation-content')
      cy.get('.modal-card-foot > :nth-child(1)').click()
      cy.get(':nth-child(1) > .button').click()
      cy.get('.active-fields-area >').should('not.contain', 'Not Saved').and('contain', 'Text')
      cy.get('.menu > :nth-child(2) > :nth-child(8) > a').click()
      cy.get('.modal-card').should('have.class', 'is-titleless')
    })
  })

  context('Field loading for paging and persistence testing', function(){
    it('create texts fields', function(){
      cy.visit('/wp-admin/admin.php?page=tainacan_admin#/collections')
      cy.location().should((loc) => {expect(loc.hash).to.eq('#/collections')})
      cy.get('[data-label="Name"] > :nth-child(1) > .clickable-row').click()
      cy.get(':nth-child(4) > .router-link-active').should('contain', 'Items')
      cy.get('.menu > :nth-child(2) > :nth-child(5) > a').click()
      cy.get('h1').should('contain', 'Collection Fields Edition Page')
      cy.get('.field > :nth-child(2) > :nth-child(1)').click()
      cy.get('#fieldEditForm > :nth-child(1) > .control > .input').type('{selectall}{del}Text 1')
      cy.get('.textarea').type('description text')
      cy.get('#tainacan-select-status-publish > .check').click()
      cy.get(':nth-child(2) > .button').click()
      cy.wait(500)
      cy.get('[draggable="false"]').click()
      cy.get('#fieldEditForm > :nth-child(1) > .control > .input').type('{selectall}{del}Text 2')
      cy.get('.textarea').type('description text')
      cy.get('#tainacan-select-status-publish > .check').click()
      cy.get(':nth-child(2) > .button').click()
      cy.wait(500)
      cy.get('[draggable="false"]').click()
      cy.get('#fieldEditForm > :nth-child(1) > .control > .input').type('{selectall}{del}Text 3')
      cy.get('.textarea').type('description text')
      cy.get('#tainacan-select-status-publish > .check').click()
      cy.get(':nth-child(2) > .button').click()
      cy.wait(500)
      cy.get('[draggable="false"]').click()
      cy.get('#fieldEditForm > :nth-child(1) > .control > .input').type('{selectall}{del}Text 4')
      cy.get('.textarea').type('description text')
      cy.get('#tainacan-select-status-publish > .check').click()
      cy.get(':nth-child(2) > .button').click()
      cy.wait(500)
      cy.get('[draggable="false"]').click()
      cy.get('#fieldEditForm > :nth-child(1) > .control > .input').type('{selectall}{del}Text 5')
      cy.get('.textarea').type('description text')
      cy.get('#tainacan-select-status-publish > .check').click()
      cy.get(':nth-child(2) > .button').click()
      cy.wait(500)
      cy.get('[draggable="false"]').click()
      cy.get('#fieldEditForm > :nth-child(1) > .control > .input').type('{selectall}{del}Text 6')
      cy.get('.textarea').type('description text')
      cy.get('#tainacan-select-status-publish > .check').click()
      cy.get(':nth-child(2) > .button').click()
      cy.wait(500)
      cy.get('[draggable="false"]').click()
      cy.get('#fieldEditForm > :nth-child(1) > .control > .input').type('{selectall}{del}Text 7')
      cy.get('.textarea').type('description text')
      cy.get('#tainacan-select-status-publish > .check').click()
      cy.get(':nth-child(2) > .button').click()
      cy.wait(500)
      cy.get('[draggable="false"]').click()
      /cy.get('#fieldEditForm > :nth-child(1) > .control > .input').type('{selectall}{del}Text 8')
      cy.get('.textarea').type('description text')
      cy.get('#tainacan-select-status-publish > .check').click()
      cy.get(':nth-child(2) > .button').click()
      cy.wait(500)
      cy.get('[draggable="false"]').click()
      cy.get('#fieldEditForm > :nth-child(1) > .control > .input').type('{selectall}{del}Text 9')
      cy.get('.textarea').type('description text')
      cy.get('#tainacan-select-status-publish > .check').click()
      cy.get(':nth-child(2) > .button').click()
      cy.wait(500)
      cy.get('.field > :nth-child(2) > :nth-child(1)').click()
      cy.get('#fieldEditForm > :nth-child(1) > .control > .input').type('{selectall}{del}Text 10')
      cy.get('.textarea').type('description text')
      cy.get('#tainacan-select-status-publish > .check').click()
      cy.get(':nth-child(2) > .button').click()
    })

    it('check if fields are updated to page', function(){
      cy.visit('/wp-admin/admin.php?page=tainacan_admin#/collections')
      cy.location().should((loc) => {expect(loc.hash).to.eq('#/collections')})
      cy.get('[data-label="Name"] > :nth-child(1) > .clickable-row').click()
      cy.get(':nth-child(4) > .router-link-active').should('contain', 'Items')
      cy.get('.menu > :nth-child(2) > :nth-child(5) > a').click()
      cy.get('h1').should('contain', 'Collection Fields Edition Page')
      cy.get('.active-fields-area >').should('contain', 'Actor')
      .and('contain', 'Location edited')
      .and('contain', 'Record disebled')
      .and('contain', 'Text Private')
      .and('not.contain', 'Blank')
      .and('contain', 'Denomination')
      .and('contain', 'Record Type')
      .and('not.contain', 'Text name canceled')
      .and('contain', 'Text name public required')
      .and('contain', 'Text name public multiple values')
      .and('contain', 'Text name public unique values')
      .and('contain', 'Text 1')
      .and('contain', 'Text 2')
      .and('contain', 'Text 3')
      .and('contain', 'Text 4')
      .and('contain', 'Text 5')
      .and('contain', 'Text 6')
      .and('contain', 'Text 7')
      .and('contain', 'Text 8')
      .and('contain', 'Text 9')
      .and('contain', 'Text 10')
    })
  })
})
