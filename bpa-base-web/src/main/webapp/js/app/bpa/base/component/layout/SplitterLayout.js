/**
 * Created by Yusuf on 5/5/2015.
 */
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", "jquery", "jqxsplitter", "bpa/base/component/Component"], function (require, exports, $, jqxsplitter, Component) {
    var SplitterLayout = (function (_super) {
        __extends(SplitterLayout, _super);
        function SplitterLayout(theOptions) {
            _super.call(this, theOptions);
            this.panels = theOptions.panels;
            if (theOptions.orientation != undefined && theOptions.orientation != null && theOptions.orientation != "") {
                this.orientation = theOptions.orientation;
            }
            else {
                this.orientation = SplitterLayout.DEFAULT_ORIENTATION;
            }
            jqxsplitter;
        }
        SplitterLayout.prototype.renderTo = function (theContainer) {
            var _mainPanel = $("<div><\/div>");
            var _childPanel = "";
            this.element = _mainPanel;
            this.element.appendTo(theContainer);
            this.panels.forEach(function (panel) {
                var _childPanel = $("<div><\/div>");
                _childPanel.appendTo(_mainPanel);
                if (panel.content != undefined && panel.content != null) {
                    panel.content.renderTo(_childPanel);
                }
            });
            var _panelsOptions = [];
            this.panels.forEach(function (panel) {
                _panelsOptions.push({
                    size: panel.size,
                    collapsible: panel.collapsible,
                    collapsed: panel.collapsed,
                    min: panel.min
                });
            });
            var _width = '100%';
            if (this.widthInPercentage != undefined) {
                _width = this.widthInPercentage + '%';
            }
            if (this.width != undefined) {
                _width = this.width;
            }
            var _height = '100%';
            if (this.heightInPercentage != undefined) {
                _height = this.heightInPercentage + '%';
            }
            if (this.height != undefined) {
                _height = this.height;
            }
            this.element = this.element.jqxSplitter({ theme: this.theme, width: _width, height: _height, panels: _panelsOptions, orientation: this.orientation });
        };
        SplitterLayout.DEFAULT_ORIENTATION = "vertical";
        return SplitterLayout;
    })(Component);
    return SplitterLayout;
});
