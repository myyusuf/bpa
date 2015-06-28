/**
 * Created by Yusuf on 5/23/2015.
 */

import ComponentOptions = require("bpa/base/component/ComponentOptions");
import DataAdapter = require("bpa/base/data/DataAdapter");

interface ComboBoxOptions extends ComponentOptions{

    name: string;
    value?: any;
    objectToValueCoverter?: any;
    valueToObjectConverter?: any;

    dataAdapter: DataAdapter;
    displayMember: string;
    valueMember: string;

    isRequired?: boolean;

    promptText?: string;
    renderer?: any;
    renderSelectedItem?: any;
    autoComplete?: boolean;

    onChange?: any;
}

export = ComboBoxOptions;
