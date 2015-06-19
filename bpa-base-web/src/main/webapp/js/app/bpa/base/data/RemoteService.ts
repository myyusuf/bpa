/**
 * Created by Yusuf on 5/12/2015.
 */

/// <reference path="../../../ts/jquery.d.ts" />

import $ = require("jquery");
import RemoteServiceOptions = require("bpa/base/data/RemoteServiceOptions");
import RemoteServiceParameters = require("bpa/base/data/RemoteServiceParameters");
import OnSendDataSuccessListener = require("bpa/base/data/OnSendDataSuccessListener");
import OnSendDataErrorListener = require("bpa/base/data/OnSendDataErrorListener");

class RemoteService{

    defaultUrl: string;

    constructor(theOptions: RemoteServiceOptions) {
        this.defaultUrl = theOptions.defaultUrl;
    }

    getRequest(params: RemoteServiceParameters){
        var _url = this.defaultUrl;

        if(params.url != undefined && params.url != null){
            _url = params.url;
        }
        this.sendRequest(_url, "GET", params.data, params.onSendDataSuccess, params.onSendDataError);
    }

    postRequest(params: RemoteServiceParameters){
        var _url = this.defaultUrl;

        if(params.url != undefined && params.url != null){
            _url = params.url;
        }
        this.sendRequest(_url, "POST", params.data, params.onSendDataSuccess, params.onSendDataError);
    }

    putRequest(params: RemoteServiceParameters){
        var _url = this.defaultUrl;

        if(params.url != undefined && params.url != null){
            _url = params.url;
        }
        this.sendRequest(_url, "PUT", params.data, params.onSendDataSuccess, params.onSendDataError);
    }

    deleteRequest(params: RemoteServiceParameters){
        var _url = this.defaultUrl;

        if(params.url != undefined && params.url != null){
            _url = params.url;
        }
        this.sendRequest(_url, "DELETE", params.data, params.onSendDataSuccess, params.onSendDataError);
    }

    sendRequest(url: string, requestType: string, data: any, onSendDataSuccess: OnSendDataSuccessListener, onSendDataError: OnSendDataErrorListener){

        var _this = this;
        $.ajax({
            url: url,
            type: requestType,
            data: JSON.stringify(data),
            beforeSend: function(xhr) {
                xhr.setRequestHeader("Accept", "application/json");
                xhr.setRequestHeader("Content-Type", "application/json");

            },
            success: function(result) {
                onSendDataSuccess("", result);
            },
            error: function(jqXHR, status, error){
                onSendDataError(jqXHR.status, error);
            }
        });


    }

}

export = RemoteService;
