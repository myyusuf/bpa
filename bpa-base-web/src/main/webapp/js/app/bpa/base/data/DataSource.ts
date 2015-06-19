/**
 * Created by Yusuf on 5/12/2015.
 */

/// <reference path="../../../ts/jquery.d.ts" />

import DataField = require("bpa/base/data/DataField");
import DataSourceOptions = require("bpa/base/data/DataSourceOptions");

class DataSource{

    id: string;
    dataType: string;
    dataFields: Array<DataField>;
    hierarchy: any;
    localData: Array<any>;
    url: string;
    beforeProcessing: any;
    totalrecords: number;

    constructor(theOptions: DataSourceOptions){
        this.id = theOptions.id;
        this.dataType = theOptions.dataType;
        this.dataFields = theOptions.dataFields;
        this.hierarchy = theOptions.hierarchy;
        this.localData = theOptions.localData;
        this.url = theOptions.url;

        var _this = this;
        this.beforeProcessing = function (data) {
            _this.totalrecords = data.num;
        }
    }
}

export = DataSource;
