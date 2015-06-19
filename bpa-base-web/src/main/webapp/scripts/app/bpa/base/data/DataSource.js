/**
 * Created by Yusuf on 5/12/2015.
 */
define(["require", "exports"], function (require, exports) {
    var DataSource = (function () {
        function DataSource(theOptions) {
            this.id = theOptions.id;
            this.dataType = theOptions.dataType;
            this.dataFields = theOptions.dataFields;
            this.hierarchy = theOptions.hierarchy;
            this.localData = theOptions.localData;
            this.url = theOptions.url;
            var _this = this;
            this.beforeProcessing = function (data) {
                _this.totalrecords = data.num;
            };
        }
        return DataSource;
    })();
    return DataSource;
});
