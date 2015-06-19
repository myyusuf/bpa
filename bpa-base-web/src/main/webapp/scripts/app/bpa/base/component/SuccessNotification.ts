/**
 * Created by Yusuf on 6/12/2015.
 */


import Notification = require("bpa/base/component/Notification");

class SuccessNotification extends Notification{

    constructor() {
        super({label: "Operation Completed Successfully"});
    }

}

export = SuccessNotification;
