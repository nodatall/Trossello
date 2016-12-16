import React from 'react'
import Key from 'selenium-webdriver'
const { expect } = require('../setup')
import { By, until, usingSelenium } from '../selenium-helpers'
import { withBoardsListsAndCardsInTheDatabase } from '../helpers'


describe('Board Show Page Tests for Lists', () => {
  withBoardsListsAndCardsInTheDatabase( () => {
    usingSelenium(()=> {
      describe('when a user is logged in', ()=> {
        beforeEach(function(){
          return this.loginAs(1455)
        })

        it('can click on a previously existing list header and edit the header name', function(done){
          this.timeout(20000)
          this.browser.visit('/boards/101')
          this.browser.wait(until.elementLocated(By.className('BoardShowPage-ListHeader')), 1000).click()
          this.browser.findElement(By.css('.BoardShowPage-ListHeader > input')).sendKeys('New List1')
          this.browser.findElement(By.css('body')).click()
          this.browser.wait(until.elementLocated(By.xpath('//div[@class="BoardShowPage-ListHeader" and ./div[contains(.,"New List1")]]')), 5000)
          this.browser.then(_ => done())
        })

        it('can create a new list', function(done){
          this.timeout(100000)
          this.browser.visit('/boards/101')
          this.browser.wait(until.elementLocated(By.className('BoardShowPage-NewListForm-Link'), 2000)).click()
          this.browser.findElement(By.css('.BoardShowPage-NewListForm-Form > form > input')).sendKeys('List3')
          this.browser.findElement(By.className('Button-primary')).click()
          this.browser.findElement(By.className('Icon fa fa-times')).click()
          this.browser.sleep(1000)
          this.browser.wait(until.elementLocated(By.xpath('//div[@class="BoardShowPage-ListHeader" and ./div[contains(.,"List3")]]')), 5000)
          this.browser.sleep(5000)
          this.browser.then(_ => done())
        })

        // it.only('can copy a list using the list popover menu', function(done){
        //   this.timeout(100000)
        //   this.browser.visit('/boards/101')
        //   this.browser.getId('list-actions-button').click()
        //   this.browser.sleep(10000)
        //   this.browser.then(_ => done())
        // })
      })
    })
  })
})