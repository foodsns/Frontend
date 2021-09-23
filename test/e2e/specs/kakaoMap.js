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
        .click('#mainboard > div.container > div:nth-child(2) > div.toggle-btn.col-6 > div > div > button.btn.btn-secondary')
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
        .assert.containsText('#lat', '37.566')
        .assert.containsText('#lot', '126.975')
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
