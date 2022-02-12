'use strict';

var HomePage = function() {
    this.shopMenuLink = element(by.css('.main-nav li a'));
    this.homeMenuLink = element(by.css('.woocommerce-breadcrumb a'));
    this.imageSliders = element.all(by.css('.n2-ss-slider-3 img'));
    this.arrivalsList = element.all(by.css('.module-text .product'));
    this.arrivalsImage = element.all(by.css('.module-text .product img')).last();
    this.addToBasketBtn = element(by.css('.single_add_to_cart_button'));
    this.descriptionTab = element(by.css('.description_tab'));
    this.reviewsTab = element(by.css('.reviews_tab'));
    this.productDesription = element(by.css('.woocommerce-Tabs-panel--description'));
    this.productReview = element(by.css('.woocommerce-Reviews'));
    this.menuItemCart = element(by.css('.cartcontents'));
    this.menuAmount = element(by.css('#wpmenucartli .amount'));
    this.booksInStock = element(by.css('.in-stock'));
    this.quantityInput = element(by.css('.quantity input'));
    this.errorMessage = element(by.css('.woocommerce-error'));
    this.viewShoppingCartLink = element(by.css('.wpmenucart-contents'));
    this.checkoutButton = element(by.css('.checkout-button'));
    this.updateCartButton = element(by.css('[name="update_cart"]'));
    this.message = element(by.css('.woocommerce-message'));
    var EC = protractor.ExpectedConditions;

    this.getCouponCodeInput = function() {
        var locator = element(by.css('#coupon_code'));
        // browser.wait(EC.stalenessOf(locator), 2000);
        return locator;
    };

    this.getApplyCouponButton = function() {
        var locator = element(by.css('[name="apply_coupon"]'));
        // browser.wait(EC.stalenessOf(locator), 2000);
        return locator;
    };
};

module.exports = new HomePage();