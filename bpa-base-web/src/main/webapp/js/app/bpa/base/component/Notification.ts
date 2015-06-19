/**
 * Created by Yusuf on 6/12/2015.
 */

/// <reference path="../../../ts/jquery.d.ts" />

import $ = require("jquery");
import jqxnotification = require("jqxnotification");
import Component = require("bpa/base/component/Component");
import NotificationOptions = require("bpa/base/component/NotificationOptions");
import ClickEventListener = require("bpa/base/component/event/ClickEventListener");

class Notification extends Component{

    label: string;
    position: string;
    opacity: number;
    autoOpen: boolean;
    animationOpenDelay: number;
    autoClose: boolean;
    autoCloseDelay: number;
    template: string;

    constructor(theOptions: NotificationOptions) {
        super(theOptions);

    /*.jqxNotification({
            width: 250, position: "top-right", opacity: 0.9,
            autoOpen: false, animationOpenDelay: 800, autoClose: true, autoCloseDelay: 3000, template: "info"
        }*/


        this.label = theOptions.label;


        if(theOptions.position != undefined){
            this.position = theOptions.position;
        }else{
            this.position = "top-right";
        }

        if(theOptions.opacity != undefined){
            this.opacity = theOptions.opacity;
        }else{
            this.opacity = 0.9;
        }

        if(theOptions.autoOpen != undefined){
            this.autoOpen = theOptions.autoOpen;
        }else{
            this.autoOpen = false;
        }

        if(theOptions.animationOpenDelay != undefined){
            this.animationOpenDelay = theOptions.animationOpenDelay;
        }else{
            this.animationOpenDelay = 800;
        }

        if(theOptions.autoClose != undefined){
            this.autoClose = theOptions.autoClose;
        }else{
            this.autoClose = true;
        }

        if(theOptions.autoCloseDelay != undefined){
            this.autoCloseDelay = theOptions.autoCloseDelay;
        }else{
            this.autoCloseDelay = 23000;
        }

        if(theOptions.template != undefined){
            this.template = theOptions.template;
        }else{
            this.template = "info";
        }

        //render without container
        this.element = $("<div>" + this.label + "</div>");

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
        });
        //-------------

        jqxnotification;
    }

    renderTo(theContainer: any){
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
    }

    open(){
        this.element.jqxNotification("open");
    }

}

export = Notification;
