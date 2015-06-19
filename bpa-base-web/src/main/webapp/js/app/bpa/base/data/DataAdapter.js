/**
 * Created by Yusuf on 5/12/2015.
 */
define(["require", "exports", "jquery", "jqxdata", "jqxgrid.pager", "jqxgrid.sort", "jqxgrid.selection"], function (require, exports, $, jqxdata, jqxgridpager, jqxgridsort, jqxgridselection) {
    var DataAdapter = (function () {
        function DataAdapter(theSource) {
            this.dataAdapter = new $.jqx.dataAdapter(theSource, {
                downloadComplete: function (data, status, xhr) {
                },
                loadComplete: function (data) {
                    //console.log('data : ' + data);
                },
                loadError: function (xhr, status, error) {
                }
            });
            jqxdata;
            jqxgridpager;
            jqxgridsort;
            jqxgridselection;
        }
        DataAdapter.prototype.get = function () {
            return this.dataAdapter;
        };
        return DataAdapter;
    })();
    return DataAdapter;
});
