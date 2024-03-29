define(function() {
    return function(controller) {
        var MainHeader = new kony.ui.FlexContainer({
            "autogrowMode": kony.flex.AUTOGROW_NONE,
            "clipBounds": true,
            "isMaster": true,
            "height": "4%",
            "id": "MainHeader",
            "isVisible": true,
            "layoutType": kony.flex.FREE_FORM,
            "left": "0dp",
            "skin": "slFbox",
            "top": "2.02%",
            "width": "100%"
        }, {}, {});
        MainHeader.setDefaultUnit(kony.flex.DP);
        var imgBack = new kony.ui.Image2({
            "height": "100%",
            "id": "imgBack",
            "isVisible": true,
            "left": "4.30%",
            "skin": "slImage",
            "src": "backblack.png",
            "top": "0dp",
            "width": "4%",
            "zIndex": 1
        }, {
            "imageScaleMode": constants.IMAGE_SCALE_MODE_MAINTAIN_ASPECT_RATIO,
            "padding": [0, 0, 0, 0],
            "paddingInPixel": false
        }, {});
        var lblHeading = new kony.ui.Label({
            "centerX": "50%",
            "height": "100%",
            "id": "lblHeading",
            "isVisible": true,
            "left": "0dp",
            "skin": "sknLblAHBGSC17pt363836",
            "i18n_text": "kony.i18n.getLocalizedString(\"kony.ahb.Registration.RegistrationHeading\")",
            "textStyle": {},
            "top": "0dp",
            "width": kony.flex.USE_PREFFERED_SIZE,
            "zIndex": 1
        }, {
            "contentAlignment": constants.CONTENT_ALIGN_CENTER,
            "padding": [0, 0, 0, 0],
            "paddingInPixel": false
        }, {
            "renderAsAnchor": false,
            "textCopyable": false
        });
        MainHeader.add(imgBack, lblHeading);
        return MainHeader;
    }
})