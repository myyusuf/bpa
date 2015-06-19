/**
 * Created by Yusuf on 5/9/2015.
 */
/// <reference path="../../../../ts/jquery.d.ts" />
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", "jquery", "bpa/base/component/Component", "bpa/base/component/container/SimplePanel", "jqxwindow"], function (require, exports, $, Component, SimplePanel, jqxwindow) {
    var Window = (function (_super) {
        __extends(Window, _super);
        function Window(theOptions) {
            _super.call(this, theOptions);
            if (theOptions.title != undefined && theOptions.title != null) {
                this.title = theOptions.title;
            }
            else {
                this.title = "";
            }
            //this.content = theOptions.content;
            if (theOptions.titleIconUrl != undefined && theOptions.titleIconUrl != null) {
                this.titleIconUrl = theOptions.titleIconUrl;
            }
            else {
                this.titleIconUrl = "images/icons/bpa/base/application-dialog.png";
            }
            jqxwindow;
        }
        Window.prototype.renderTo = function (theContainer) {
            var _this = this;
            var _window = $("<div id=\"" + this.id + "\"><\/div>");
            var _windowHeader = $("<div style='height: 18px; padding: 5px; padding-top: 3px; padding-bottom: 7px;'>" + "<table>" + "   <tr>" + "       <td>" + "           <img src='" + this.titleIconUrl + "' style='margin-right: 1px' />" + "       </td>" + "       <td valign='center'>" + "           <span style='font-weight: bold'>" + this.title + "           </span>" + "       </td>" + "   </tr>" + "</table>" + "</div>");
            var _windowContent = $("<div><\/div>");
            _windowHeader.appendTo(_window);
            _windowContent.appendTo(_window);
            this.element = _window;
            this.element.appendTo(theContainer);
            //Build Content
            this.content = this.buildContent();
            this.contentContainer = this.buildContentContainer(this.content);
            this.contentContainer.renderTo(_windowContent);
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
            this.element = this.element.jqxWindow({
                autoOpen: false,
                showCollapseButton: false,
                isModal: true,
                width: _width,
                height: _height,
                initContent: function () {
                    _this.element.jqxWindow('focus');
                },
                theme: this.theme
            });
        };
        Window.prototype.openWindow = function () {
            this.element.jqxWindow('open');
        };
        Window.prototype.closeWindow = function () {
            this.element.jqxWindow('close');
        };
        Window.prototype.buildContentContainer = function (theContent) {
            return new SimplePanel({ content: theContent });
        };
        Window.prototype.buildContent = function () {
            return new SimplePanel({});
        };
        return Window;
    })(Component);
    return Window;
});
