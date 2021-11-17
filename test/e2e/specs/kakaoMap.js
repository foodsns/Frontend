// For authoring Nightwatch tests, see
// http://nightwatchjs.org/guide#usage

module.exports = {
    'kakao map e2e tests': function (browser) {
      // automatically uses dev Server port from /config.index.js
      // default: http://localhost:8080
      // see nightwatch.conf.js
      const devServer = browser.globals.devServerURL

      browser
        .url(`${devServer}/#/hello`)
        .waitForElementVisible('#app', 5000)
        .url(`${devServer}/#/dev/map`)
        .assert.elementPresent('#testlabboard')
        .pause(1000)
        .url(`${devServer}/#/`)
        .assert.elementPresent('#mainboard')
        .pause(1000)
        .click('#mainboard > div.body.container > div:nth-child(3) > div.toggle-btn.col-4 > div > div > button.btn.btn-secondary')
        .pause(1000)
        .assert.elementPresent('#kakaomap')
        .assert.elementPresent('#kakaomap > div:nth-child(1)')
        .assert.containsText('#lv', '3')
        .assert.containsText('#lat', '35.196')
        .assert.containsText('#lot', '129.080')
        .pause(1000)
        .perform(() => {
            console.log('Click zoom in')
        })
        .execute(() => {
            document.querySelector('#zoomin').click()
        })
        .pause(1000)
        .assert.containsText('#lv', '2')
        .perform(() => {
            console.log('Click zoom out twice')
        })
        .execute(() => {
            document.querySelector('#zoomout').click()
        })
        .pause(500)
        .execute(() => {
            document.querySelector('#zoomout').click()
        })
        .pause(1000)
        .assert.containsText('#lv', '4')
        .perform(() => {
            console.log('Move to seoul city hall')
        })
        .execute(() => {
            document.querySelector('#move').click()
        })
        .pause(1000)
        // .getLog('browser', (result) => {
        //   console.log(`Browser log: `, result)
        // })
        .assert.containsText('#lat', '37.566')
        .assert.containsText('#lot', '126.975')
        .pause(1000)
        .perform(() => {
            console.log('Test create markers')
        })
        .execute(() => {
            document.querySelector('#setmarker').click()
        })
        .execute(() => {
            // https://medium.com/@jameslin_85107/nightwatch-js-b9c5b5719e15
            // console.assert(document.querySelectorAll('#kakaomap > div:nth-child(1) > div > div:nth-child(6) > div > img:nth-child(1)').length === 8, 'Test data & marker should be exist 8 items')
            return document.querySelectorAll('#kakaomap > div:nth-child(1) > div > div:nth-child(6) > div > img:nth-child(1)').length
        }, (len) => {
            browser.assert.equal(len.value, 8)
        })
        .perform(() => {
            console.log('Test append markers')
        })
        .execute(() => {
            document.querySelector('#appendMarker').click()
        })
        .execute(() => {
            // console.assert(document.querySelectorAll('#kakaomap > div:nth-child(1) > div > div:nth-child(6) > div > img:nth-child(1)').length === 9, 'Test data & marker should be exist 9 items')
            return document.querySelectorAll('#kakaomap > div:nth-child(1) > div > div:nth-child(6) > div > img:nth-child(1)').length
        }, (len) => {
            browser.assert.equal(len.value, 9)
        })
        .perform(() => {
            console.log('Test modify markers')
        })
        .execute(() => {
            document.querySelector('#modifyMarker').click()
        })
        .execute(() => {
            // console.assert(document.querySelectorAll('#kakaomap > div:nth-child(1) > div > div:nth-child(6) > div > img:nth-child(1)').length === 9, 'Test data & marker should be exist 9 items')
            return document.querySelectorAll('#kakaomap > div:nth-child(1) > div > div:nth-child(6) > div > img:nth-child(1)').length
        }, (len) => {
            browser.assert.equal(len.value, 9)
        })
        .perform(() => {
            console.log('Test create customoverlay')
        })
        .execute(() => {
            document.querySelector('#setCustomOverlay').click()
        })
        .execute(() => {
            return document.querySelector('#testClickMarker').click()
        })
        .perform(() => {
            console.log('Fire 2nd marker click event')
        })
        .execute(() => {
            // console.assert(document.querySelectorAll('#kakaomap > div:nth-child(1) > div > div:nth-child(6) > div > img:nth-child(1)').length === 9, 'Test data & marker should be exist 9 items')
            return document.querySelector('#id-525d7948-d35a-4104-8cbb-ab70f0ced1d1').hasAttribute('hidden')
        }, (result) => {
            browser.assert.equal(result.value, false)
        })
        .pause(1000)
        .execute(() => {
            return document.querySelector('#testClickMarker').click()
        })
        .perform(() => {
            console.log('Fire 2nd marker click event again')
        })
        .execute(() => {
            // console.assert(document.querySelectorAll('#kakaomap > div:nth-child(1) > div > div:nth-child(6) > div > img:nth-child(1)').length === 9, 'Test data & marker should be exist 9 items')
            return document.querySelector('#id-525d7948-d35a-4104-8cbb-ab70f0ced1d1')
        }, (result) => {
            browser.assert.equal(result.value, null)
        })
        .pause(1000)
        .execute(() => {
            document.querySelector('#move2').click()
        })
        .pause(1000)
        .execute(() => {
            return document.querySelectorAll('div[data-overlay]')
        }, (result) => {
            browser.assert.equal(result.value.length, 0)
        })
        .pause(1000)
        .perform(() => {
            console.log('Test reset markers')
        })
        .execute(() => {
            document.querySelector('#resetMarker').click()
        })
        .execute(() => {
            // console.assert(document.querySelectorAll('#kakaomap > div:nth-child(1) > div > div:nth-child(6) > div > img:nth-child(1)').length === 9, 'Test data & marker should be exist 9 items')
            return document.querySelectorAll('#kakaomap > div:nth-child(1) > div > div:nth-child(6) > div > img:nth-child(1)').length
        }, (len) => {
            browser.assert.equal(len.value, 0)
        })
        .pause(1000)
        .perform(() => {
            console.log('Test reset custom overlays')
        })
        .execute(() => {
            document.querySelector('#resetCustomOverlayList').click()
        })
        .execute(() => {
            return document.querySelectorAll('div[data-overlay]')
        }, (len) => {
            browser.assert.equal(len.value.length, 0)
        })
        .end()

    //   browser
    //     .url(`${devServer}/#/dev/map`)
    //     .waitForElementVisible('#app', 5000)
    //     .assert.elementPresent('#testlabboard')
    //     .url(`${devServer}/#/`)
    //     .waitForElementVisible('#app', 5000)
    //     .assert.elementPresent('#mainboard')
    //     .assert.elementCount('#postbox', 10)
    //     .end()
    }
}
