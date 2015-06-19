/**
 * Created by Yusuf on 5/8/2015.
 */
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", "jquery", "jqxpanel", "bpa/base/component/Component"], function (require, exports, $, jqxpanel, Component) {
    var Panel = (function (_super) {
        __extends(Panel, _super);
        function Panel(theOptions) {
            _super.call(this, theOptions);
            this.content = theOptions.content;
            this.caption = theOptions.caption;
            jqxpanel;
        }
        Panel.prototype.renderTo = function (theContainer) {
            var _body = $("<div id=\"" + this.id + "\" style=\"border: 1px solid #f0f0f0;\"><\/div>");
            this.element = _body;
            this.element.appendTo(theContainer);
            var _section = $("<div style=\"border: 0;\"><\/div>");
            var _sectionContainer = $("<div><\/div>");
            _sectionContainer.appendTo(_section);
            if (this.caption != undefined && this.caption != null) {
                var _header = $("<div style=\"background-color: #f0f0f0; height: 18px; padding: 8px;\"><span style=\"font-weight: bold;\">" + this.caption + "<\/span><\/div>");
                _header.appendTo(_body);
            }
            _section.appendTo(_body);
            var _width = 'auto';
            if (this.width != undefined) {
                _width = this.width;
            }
            var _height = 'auto';
            if (this.height != undefined) {
                _height = this.height;
            }
            _section = _section.jqxPanel({ width: _width, height: _height, theme: this.theme });
            if (this.content != undefined && this.content != null) {
                this.content.renderTo(_sectionContainer);
            }
        };
        return Panel;
    })(Component);
    return Panel;
});
