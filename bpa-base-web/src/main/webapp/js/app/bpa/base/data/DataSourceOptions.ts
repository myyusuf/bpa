/**
 * Created by Yusuf on 5/6/2015.
 */

import DataField = require("bpa/base/data/DataField");

interface DataSourceOptions{
    id: string;
    dataType: string;
    dataFields: Array<DataField>;
    hierarchy?: any;
    localData?: Array<any>;
    url?: string;
}

export = DataSourceOptions;
