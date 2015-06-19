/**
 * Created by Yusuf on 5/8/2015.
 */
define(["require", "exports", "jquery"], function (require, exports, $) {
    var DockPanelItem = (function () {
        function DockPanelItem(theOptions) {
            this.width = theOptions.width;
            this.height = theOptions.height;
            this.dock = theOptions.dock;
            this.backgroundColor = theOptions.backgroundColor;
            this.content = theOptions.content;
            this.htmlContent = theOptions.htmlContent;
            this.dynamicHeight = theOptions.dynamicHeight;
        }
        DockPanelItem.prototype.changeContent = function (newContent) {
            if (this.container != undefined) {
                var _children = $(this.container).children();
                for (var _i = 0; _i < _children.length; _i++) {
                    $(_children[_i]).remove();
                }
                newContent.renderTo(this.container);
            }
            else {
                this.content = newContent;
            }
        };
        return DockPanelItem;
    })();
    return DockPanelItem;
});
