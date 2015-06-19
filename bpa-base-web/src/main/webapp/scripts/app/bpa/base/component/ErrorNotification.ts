/**
 * Created by Yusuf on 6/12/2015.
 */


import Notification = require("bpa/base/component/Notification");

class ErrorNotification extends Notification{

    constructor() {
        super({label: "Error while doing operation", template: "error", width: 280});
    }

}

export = ErrorNotification;
