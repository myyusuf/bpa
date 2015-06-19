/**
 * Created by Yusuf on 6/12/2015.
 */
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", "jquery", "jqxnotification", "bpa/base/component/Component"], function (require, exports, $, jqxnotification, Component) {
    var Notification = (function (_super) {
        __extends(Notification, _super);
        function Notification(theOptions) {
            _super.call(this, theOptions);
            /*.jqxNotification({
                    width: 250, position: "top-right", opacity: 0.9,
                    autoOpen: false, animationOpenDelay: 800, autoClose: true, autoCloseDelay: 3000, template: "info"
                }*/
            this.label = theOptions.label;
            if (theOptions.position != undefined) {
                this.position = theOptions.position;
            }
            else {
                this.position = "top-right";
            }
            if (theOptions.opacity != undefined) {
                this.opacity = theOptions.opacity;
            }
            else {
                this.opacity = 0.9;
            }
            if (theOptions.autoOpen != undefined) {
                this.autoOpen = theOptions.autoOpen;
            }
            else {
                this.autoOpen = false;
            }
            if (theOptions.animationOpenDelay != undefined) {
                this.animationOpenDelay = theOptions.animationOpenDelay;
            }
            else {
                this.animationOpenDelay = 800;
            }
            if (theOptions.autoClose != undefined) {
                this.autoClose = theOptions.autoClose;
            }
            else {
                this.autoClose = true;
            }
            if (theOptions.autoCloseDelay != undefined) {
                this.autoCloseDelay = theOptions.autoCloseDelay;
            }
            else {
                this.autoCloseDelay = 23000;
            }
            if (theOptions.template != undefined) {
                this.template = theOptions.template;
            }
            else {
                this.template = "info";
            }
            //render without container
            this.element = $("<div>" + this.label + "</div>");
            var _width = '250';
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
            this.element = this.element.jqxNotification({
                width: _width,
                position: this.position,
                opacity: this.opacity,
                autoOpen: this.autoOpen,
                animationOpenDelay: this.animationOpenDelay,
                autoClose: this.autoClose,
                autoCloseDelay: this.autoCloseDelay,
                template: this.template
            });
            //-------------
            jqxnotification;
        }
        Notification.prototype.renderTo = function (theContainer) {
            /*this.element = $("<div>" + this.label + "</div>");
            //this.element.appendTo(theContainer);
    
            var _width: any = '250';
            if(this.widthInPercentage != undefined){
                _width = this.widthInPercentage + '%';
            }
            if(this.width != undefined){
                _width = this.width;
            }
    
            var _height: any = 'auto';
            if(this.heightInPercentage != undefined){
                _height = this.heightInPercentage + '%';
            }
            if(this.height != undefined){
                _height = this.height;
            }
    
            this.element = this.element.jqxNotification({
                width: _width, position: this.position, opacity: this.opacity,
                autoOpen: this.autoOpen, animationOpenDelay: this.animationOpenDelay,
                autoClose: this.autoClose, autoCloseDelay: this.autoCloseDelay, template: this.template
            });*/
        };
        Notification.prototype.open = function () {
            this.element.jqxNotification("open");
        };
        return Notification;
    })(Component);
    return Notification;
});
