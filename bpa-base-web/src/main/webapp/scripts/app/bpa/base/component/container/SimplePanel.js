/**
 * Created by Yusuf on 5/8/2015.
 */
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", "jquery", "bpa/base/component/Component"], function (require, exports, $, Component) {
    var SimplePanel = (function (_super) {
        __extends(SimplePanel, _super);
        function SimplePanel(theOptions) {
            _super.call(this, theOptions);
            this.content = theOptions.content;
        }
        SimplePanel.prototype.renderTo = function (theContainer) {
            this.element = $("<div id=\"" + this.id + "\" style=\"height: 100%;\"><\/div>");
            this.element.appendTo(theContainer);
            if (this.content != undefined) {
                this.content.renderTo(this.element);
            }
        };
        return SimplePanel;
    })(Component);
    return SimplePanel;
});
