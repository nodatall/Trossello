import React from 'react'
import Key from 'selenium-webdriver'
const { expect } = require('../setup')
import { By, until, usingSelenium } from '../selenium-helpers'
import { withBoardsListsAndCardsInTheDatabase } from '../helpers'


describe('Side Menu Tests', () => {
  withBoardsListsAndCardsInTheDatabase( () => {
    usingSelenium(()=> {
      describe('when a user is logged in', ()=> {
        beforeEach(function(){
          return this.loginAs(1455)
        })

        it('can invite a member to the current board', function(done){
          this.timeout(100000)
          this.browser.visit('/boards/101')
          this.browser.sleep(1000)
          this.browser.wait(until.elementLocated(By.className('BoardShowPage-menuButton')), 1000).click()
          this.browser.wait(until.elementLocated(By.className('BoardShowPage-MenuSideBar-InviteByEmailButton')), 1000).click()
          this.browser.findElement(By.className('emailInput')).sendKeys('test@email.com')
          this.browser.findElement(By.className('Button-primary')).click()
          this.browser.wait(until.elementLocated(By.className('BoardShowPage-menuButton')), 1000)
          this.browser.then(_ => done())
        })

        it('can change the background of the current board', function(done){
          this.timeout(100000)
          this.browser.visit('/boards/101')
          this.browser.wait(until.elementLocated(By.className('BoardShowPage-menuButton')), 1000).click()
          this.browser.wait(until.elementLocated(By.linkText('Change Background')), 1000).click()
          this.browser.sleep(2000)
          this.browser.findElement(By.xpath("//div[@color='#70a95d']")).click()
          this.browser.findElement(By.className('Icon fa fa-times')).click()
          this.browser.sleep(2000)
          this.browser.then(_ => done())
        })

        it('can go to the filter cards, powerups, and stickers panes of the current board', function(done){
          this.timeout(100000)
          this.browser.visit('/boards/101')
          this.browser.wait(until.elementLocated(By.className('BoardShowPage-menuButton')), 1000).click()
          this.browser.wait(until.elementLocated(By.linkText('Filter Cards')), 1000).click()
          this.browser.sleep(2000)
          this.browser.wait(until.elementLocated(By.className('BoardShowPage-MenuSideBar-Pane BoardShowPage-MenuSideBar-FilterCardsPane')), 1000)
          this.browser.findElement(By.className('Icon fa fa-arrow-left')).click()
          this.browser.sleep(2000)
          this.browser.wait(until.elementLocated(By.linkText('Power-Ups')), 1000).click()
          this.browser.sleep(2000)
          this.browser.wait(until.elementLocated(By.className('BoardShowPage-MenuSideBar-Pane BoardShowPage-MenuSideBar-PowerUpsPane')), 1000)
          this.browser.findElement(By.className('Icon fa fa-arrow-left')).click()
          this.browser.sleep(2000)
          this.browser.wait(until.elementLocated(By.linkText('Stickers')), 1000).click()
          this.browser.sleep(2000)
          this.browser.wait(until.elementLocated(By.className('BoardShowPage-MenuSideBar-Pane BoardShowPage-MenuSideBar-StickersPane')), 1000)
          this.browser.findElement(By.className('Icon fa fa-arrow-left')).click()
          this.browser.then(_ => done())
        })

        it('can go to the activity pane using the icon and the "View all activity..." link', function(){
          this.timeout(100000)
          this.browser.visit('/boards/101')
          this.browser.wait(until.elementLocated(By.className('BoardShowPage-menuButton')), 1000).click()
          this.browser.wait(until.elementLocated(By.linkText('Activity')), 1000).click()
          this.browser.findElement(By.className('Icon fa fa-arrow-left')).click()
          this.browser.wait(until.elementLocated(By.linkText('View all activity...')), 1000).click()
          this.browser.then(_ => done())
        })

        it('make an activity and then view that in the activity list on the panel', function(){
          this.timeout(200000)
          this.browser.visit('/boards/101')
          this.browser.wait(until.elementLocated(By.className('BoardShowPage-menuButton')), 2000).click()
          this.browser.wait(until.elementLocated(By.linkText('Change Background')), 2000).click()
          this.browser.sleep(2000)
          this.browser.findElement(By.xpath("//div[@color='#d478a4']")).click()
          this.browser.findElement(By.className('Icon fa fa-arrow-left')).click()
          this.browser.wait(until.elementLocated(By.linkText('View all activity...')), 2000).click()
          this.browser.sleep(2000)
          this.browser.wait(until.elementLocated(By.className('Activity-string')), 2000).click()
          this.browser.then(_ => done())
        })
      })
    })
  })
})