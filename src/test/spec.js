const { browser, element } = require("protractor");

describe('Enter GURU99 Name', function() {
    it('should add a Name as GURU99', function() {
        element(by.css('.main-nav li a')).click();
        browser.sleep(1000);
        element(by.css('.woocommerce-breadcrumb a')).click();
        browser.sleep(1000);
        expect(element.all(by.css('.n2-ss-slider-3 img')).count()).toBe(3);
        // expect(guru.getText()).toEqual('Hello GURU99!');
    });
});