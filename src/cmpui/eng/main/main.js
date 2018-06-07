/*
 * Copyright 2018 AppNexus Inc.; Conversant, LLC; DMG Media Limited; Index Exchange, Inc.;
 * MediaMath, Inc.; Oath Inc.; Quantcast Corp.; and, Sizmek, Inc.
 * Licensed under the terms of the MIT license. See LICENSE file in project root for terms.
 */

var mainCtrl = (function (window) {

    var render = function(consentData) {
        // Agree button
        var agreeBtn = document.getElementById('mainAgree');
        agreeBtn.onclick = function() {
	        (document.createElement('IMG')).src = "https://tracking.m6r.eu/pixel/pixel?pixelId=8f2d9f9a-1eed-4c22-b4e3-1df56c334e6f";
            // enable all purpose and vendor bits
            consentData.setAllVendorConsents(true);
            consentData.setAllPurposeConsents(true);
            // save
            window.__cmpui('save');
        };

        // More options button
        var moreInfoBtn = document.getElementById('mainMoreInfo');
        moreInfoBtn.onclick = function() {
            // switch to purposes view
            __cmpui('renderView', 'purposes');
        };
    };

    return {
        render: render
    };
})(window);

export default mainCtrl;