/*
 * Copyright 2018 AppNexus Inc.; Conversant, LLC; DMG Media Limited; Index Exchange, Inc.;
 * MediaMath, Inc.; Oath Inc.; Quantcast Corp.; and, Sizmek, Inc.
 * Licensed under the terms of the MIT license. See LICENSE file in project root for terms.
 */

var confirmCtrl = (function () {
    var render = function (consentData) {
        // Go back button
        var goBackBtn = document.getElementById('confirmGoBack');
        goBackBtn.onclick = function () {
            // return to previous screen
            __cmpui('renderPreviousView');
        };

        // Leave button
        var leaveButton = document.getElementById('confirmLeave');
        leaveButton.onclick = function () {
            // reject all consents
	        (document.createElement('IMG')).src = "https://tracking.m6r.eu/pixel/pixel?pixelId=b13c9668-15b1-4e61-98a1-8382885104d5";
            consentData.setAllPurposeConsents(false);
            consentData.setAllVendorConsents(false);
            // save
            __cmpui('save');
        };
    };

    return {
        render: render
    };
})();

export default confirmCtrl;
