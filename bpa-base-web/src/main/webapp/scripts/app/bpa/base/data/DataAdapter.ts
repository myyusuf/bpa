/**
 * Created by Yusuf on 5/12/2015.
 */

/// <reference path="../../../ts/jquery.d.ts" />

import $ = require("jquery");
import jqxdata = require("jqxdata");
import jqxgridpager = require("jqxgrid.pager");
import jqxgridsort = require("jqxgrid.sort");
import jqxgridselection = require("jqxgrid.selection");
import DataSource = require("bpa/base/data/DataSource");

class DataAdapter{

    dataAdapter: any;

    constructor(theSource: DataSource, formatDataCallback?: any){
       this.dataAdapter = new $.jqx.dataAdapter(theSource, {
            formatData: formatDataCallback,
            downloadComplete: function (data, status, xhr) {
            },
            loadComplete: function (data) {
                //console.log('data : ' + data);

            },
            loadError: function (xhr, status, error) { }
        });

        jqxdata;
        jqxgridpager;
        jqxgridsort;
        jqxgridselection;
    }

    get(): any{
        return this.dataAdapter;
    }

}

export = DataAdapter;
