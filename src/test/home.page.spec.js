'use strict';

var homePage = require('./home.page.po.js'),
    EC = protractor.ExpectedConditions,
    couponCode = 'krishnasakinala';

describe('Practice Automation Testing', function() {
    beforeAll(function () {
        browser.get('http://practice.automationtesting.in/');
        homePage.shopMenuLink.click();
        browser.wait(EC.visibilityOf(homePage.homeMenuLink), 2000);
        homePage.homeMenuLink.click();

    });

    it('Step1: Home page with 3 sliders only', function() {
        expect(homePage.imageSliders.count()).toBe(3);
    });

    it('Step2: Home page with 3 arrivals only', function() {
        expect(homePage.arrivalsList.count()).toBe(3);
    });

    it('Step3: Home page - image in arrivals should navigate', function() {
        expect(homePage.arrivalsImage.isPresent()).toBeTruthy();
        homePage.arrivalsImage.click();
        expect(homePage.addToBasketBtn.isPresent()).toBeTruthy();
    });

    it('Step4: Home page - arrivals image description', function() {
        expect(homePage.descriptionTab.isPresent()).toBeTruthy();
        homePage.descriptionTab.click();
        expect(homePage.productDesription.getText()).toContain('Product Description');
    });

    it('Step5: Home page - arrivals image reviews', function() {
        expect(homePage.reviewsTab.isPresent()).toBeTruthy();
        homePage.reviewsTab.click();
        expect(homePage.productReview.getText()).toContain('Reviews');
    });

    it('Step6: Home page - arrivals images add to basket', function() {
        homePage.addToBasketBtn.click();
        expect(homePage.menuItemCart.getText()).toBe('1 Item');
        expect(homePage.menuAmount.getText()).toContain('₹350.00');
    });

    it('Step7: Home page - arrivals add to basket with more books', function() {
        homePage.booksInStock.getText().then(function (text) {
            var booksInStock = text.split(" ")[0];
            homePage.quantityInput.clear();
            homePage.quantityInput.sendKeys(booksInStock);
            homePage.addToBasketBtn.click();
            expect(homePage.errorMessage.getText()).toContain('You cannot add that amount to the cart — we have ' + booksInStock + ' in stock and you already have 1 in your cart.');
        });
    });

    it('Step8: Home - arrivals add to basket items', function() {
        expect(homePage.viewShoppingCartLink.isPresent()).toBeTruthy();
        homePage.viewShoppingCartLink.click();
        expect(homePage.checkoutButton.isPresent()).toBeTruthy();
    });

    it('Step9: Home - arrivals add to basket items coupon value<450 ', function() {
        var couponCodeInput = homePage.getCouponCodeInput();
        couponCodeInput.clear();
        couponCodeInput.sendKeys(couponCode);
        homePage.getApplyCouponButton().click();
        browser.wait(EC.visibilityOf(homePage.errorMessage), 2000);
        expect(homePage.errorMessage.getText()).toContain('The minimum spend for this coupon is ₹450.00.');
    });

    it('Step10: Home - arrivals add to basket items coupon', function() {
        homePage.quantityInput.clear();
        homePage.quantityInput.sendKeys('2');
        homePage.updateCartButton.click();
        browser.wait(EC.visibilityOf(homePage.message), 2000);
        expect(homePage.message.getText()).toContain('Basket updated.');
        var couponCodeInput = homePage.getCouponCodeInput();
        browser.wait(EC.visibilityOf(couponCodeInput), 2000);
        couponCodeInput.clear();
        couponCodeInput.sendKeys(couponCode);
        homePage.getApplyCouponButton().click();
        browser.sleep(1000);
        browser.wait(EC.visibilityOf(homePage.message), 2000);
        expect(homePage.message.getText()).toContain('Coupon code applied successfully.');
    });
});