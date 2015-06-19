/**
 * Created by Yusuf on 5/6/2015.
 */

import OnSendDataSuccessListener = require("bpa/base/data/OnSendDataSuccessListener");
import OnSendDataErrorListener = require("bpa/base/data/OnSendDataErrorListener");

interface RemoteServiceParameters{
    onSendDataSuccess: OnSendDataSuccessListener;
    onSendDataError: OnSendDataErrorListener;
    url?: string;
    data: any;
}

export = RemoteServiceParameters;
