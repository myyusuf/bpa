/**
 * Created by Yusuf on 5/12/2015.
 */
define(["require", "exports", "jquery"], function (require, exports, $) {
    var RemoteService = (function () {
        function RemoteService(theOptions) {
            this.defaultUrl = theOptions.defaultUrl;
        }
        RemoteService.prototype.getRequest = function (params) {
            var _url = this.defaultUrl;
            if (params.url != undefined && params.url != null) {
                _url = params.url;
            }
            this.sendRequest(_url, "GET", params.data, params.onSendDataSuccess, params.onSendDataError);
        };
        RemoteService.prototype.postRequest = function (params) {
            var _url = this.defaultUrl;
            if (params.url != undefined && params.url != null) {
                _url = params.url;
            }
            this.sendRequest(_url, "POST", params.data, params.onSendDataSuccess, params.onSendDataError);
        };
        RemoteService.prototype.putRequest = function (params) {
            var _url = this.defaultUrl;
            if (params.url != undefined && params.url != null) {
                _url = params.url;
            }
            this.sendRequest(_url, "PUT", params.data, params.onSendDataSuccess, params.onSendDataError);
        };
        RemoteService.prototype.deleteRequest = function (params) {
            var _url = this.defaultUrl;
            if (params.url != undefined && params.url != null) {
                _url = params.url;
            }
            this.sendRequest(_url, "DELETE", params.data, params.onSendDataSuccess, params.onSendDataError);
        };
        RemoteService.prototype.sendRequest = function (url, requestType, data, onSendDataSuccess, onSendDataError) {
            var _this = this;
            $.ajax({
                url: url,
                type: requestType,
                data: JSON.stringify(data),
                beforeSend: function (xhr) {
                    xhr.setRequestHeader("Accept", "application/json");
                    xhr.setRequestHeader("Content-Type", "application/json");
                },
                success: function (result) {
                    onSendDataSuccess("", result);
                },
                error: function (jqXHR, status, error) {
                    onSendDataError(jqXHR.status, error);
                }
            });
        };
        return RemoteService;
    })();
    return RemoteService;
});
