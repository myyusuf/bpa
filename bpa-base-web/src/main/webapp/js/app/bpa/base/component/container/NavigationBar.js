/**
 * Created by Yusuf on 5/8/2015.
 */
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", "jquery", "jqxnavigationbar", "bpa/base/component/Component", "myresize"], function (require, exports, $, jqxnavigationbar, Component, myresize) {
    var NavigationBar = (function (_super) {
        __extends(NavigationBar, _super);
        function NavigationBar(theOptions) {
            _super.call(this, theOptions);
            this.items = theOptions.items;
            jqxnavigationbar;
            myresize;
        }
        NavigationBar.prototype.renderTo = function (theContainer) {
            var _this = this;
            this.element = $("<div id='" + this.id + "'></div>");
            this.element.css("border", "0");
            this.element.css("margin-right", "-1px");
            this.element.css("margin-top", "-1px");
            this.items.forEach(function (item) {
                var _itemLabelStr = "";
                _itemLabelStr += "	<div>";
                _itemLabelStr += "		<div style='margin-top: 0px;'>";
                _itemLabelStr += "			<div style='float: left;'>";
                _itemLabelStr += "				<img alt='" + item.iconAlt + "' src='" + item.iconUrl + "' \/>";
                _itemLabelStr += "			<\/div>";
                _itemLabelStr += "			<div style='margin-left: 4px; float: left;'>" + item.label + "<\/div>";
                _itemLabelStr += "		<\/div>";
                _itemLabelStr += "	<\/div>";
                var _itemLabel = $(_itemLabelStr);
                var _itemContent = $("<div><\/div>");
                _itemLabel.appendTo(_this.element);
                _itemContent.appendTo(_this.element);
                if (item.content != undefined && item.content != null) {
                    item.content.renderTo(_itemContent);
                }
            });
            this.element.appendTo(theContainer);
            //needed for navigation bar to fit the container's height (possibly bugs)
            $(theContainer).resize(function () {
                //console.log("theContainer height : " + $(theContainer).height());
            });
            var _width = 'auto';
            if (this.widthInPercentage != undefined) {
                _width = this.widthInPercentage + '%';
            }
            if (this.width != undefined) {
                _width = this.width;
            }
            var _height = 'auto';
            if (this.heightInPercentage != undefined) {
                _height = this.heightInPercentage + '%';
            }
            if (this.height != undefined) {
                _height = this.height;
            }
            this.element.jqxNavigationBar({ width: _width, height: _height, expandMode: "singleFitHeight", theme: this.theme });
        };
        return NavigationBar;
    })(Component);
    return NavigationBar;
});
