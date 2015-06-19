/**
 * Created by Yusuf on 5/5/2015.
 */

/// <reference path="./ComponentOptions.ts" />

import ComponentOptions = require("bpa/base/component/ComponentOptions");

class Component {

    static DEFAULT_THEME: string = "metro";

    id: string;
    theme: string;
    element: any;

    width: number;
    widthInPercentage: number;

    height: number;
    heightInPercentage: number;

    rendered: boolean;

    constructor(theOptions: ComponentOptions) {

        this.rendered = false;

        if(theOptions.id != undefined && theOptions.id != null && theOptions.id != "") {
            this.id = theOptions.id;
        }else {
            this.id = this.generateUUID();
        }

        if(theOptions.theme != undefined && theOptions.theme != null && theOptions.theme != "") {
            this.theme = theOptions.theme;
        }else{
            this.theme = Component.DEFAULT_THEME;
        }

        this.width = theOptions.width;
        this.widthInPercentage = theOptions.widthInPercentage;

        this.height = theOptions.height;
        this.heightInPercentage = theOptions.heightInPercentage;

    }

    renderTo(theContainer: any){
        this.rendered = true;
    }

    generateUUID() {
        var d = new Date().getTime();
        var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = (d + Math.random() * 16) % 16 | 0;
            d = Math.floor(d / 16);
            return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
        });
        return uuid;
    }

}

export = Component;
