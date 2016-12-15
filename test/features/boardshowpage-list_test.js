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
          this.timeout(20000)
          this.browser.visit('/boards/101')
          this.browser.wait(until.elementLocated(By.css('Link Link-default BoardShowPage-NewListForm-Link'), 10000)).sendKeys('Created List4')
          this.browser.findElement(By.css('body')).click()
          this.browser.wait(until.elementLocated(By.xpath('//div[@class="BoardShowPage-ListHeader" and ./div[contains(.,"Created List4")]]')), 5000)
          this.browser.then(_ => done())
        })

        it.only('can change the order of the lists on the board using drag and drop', function(done){
          this.timeout(60000)
          const browser = this.browser
          this.browser.visit('/boards/101')
          this.browser.wait(until.elementLocated(By.xpath('//div[@data-list-id="40"]'), 2000))
          let startLocation
          this.browser.findElement(By.xpath('//div[@data-list-id="40"]')).then(function(element){
            startLocation = element
            return
          })
          let dropLocation
          this.browser.findElement(By.xpath('//div[@data-list-id="41"]')).then(function(element){
            dropLocation = element
            return
          })
          this.browser.sleep(3000)
          console.log(dropLocation)
          // this.browser.findElements(By.className('BoardShowPage-List')).then(function(lists){
          //   this.browser.findElement(By.xpath('//div[@data-list-id="40"]')).then(function(list1){
          //     return expect(lists[0]).to.eql(list1)
          //   })
          //  })
          this.browser.sleep(3000)
          this.browser.findElement(By.xpath('//div[@data-list-id="40"]')).dragAndDrop().perform()

          // console.log('whatchu got', this.browser.React.PropTypes.stringions().dragAndDrop(startLocation, dropLocation).perform())
          // this.browser.actions().mouseDown(startLocation).mouseMove(dropLocation).mouseUp().perform()
          this.browser.sleep(5000)
          this.browser.then(_=> done())
        })
      })
    })
  })
})