/**
 * Created by Yusuf on 5/5/2015.
 */
define(["require", "exports"], function (require, exports) {
    var Component = (function () {
        function Component(theOptions) {
            this.rendered = false;
            if (theOptions.id != undefined && theOptions.id != null && theOptions.id != "") {
                this.id = theOptions.id;
            }
            else {
                this.id = this.generateUUID();
            }
            if (theOptions.theme != undefined && theOptions.theme != null && theOptions.theme != "") {
                this.theme = theOptions.theme;
            }
            else {
                this.theme = Component.DEFAULT_THEME;
            }
            this.width = theOptions.width;
            this.widthInPercentage = theOptions.widthInPercentage;
            this.height = theOptions.height;
            this.heightInPercentage = theOptions.heightInPercentage;
        }
        Component.prototype.renderTo = function (theContainer) {
            this.rendered = true;
        };
        Component.prototype.generateUUID = function () {
            var d = new Date().getTime();
            var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
                var r = (d + Math.random() * 16) % 16 | 0;
                d = Math.floor(d / 16);
                return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
            });
            return uuid;
        };
        Component.DEFAULT_THEME = "metro";
        return Component;
    })();
    return Component;
});
