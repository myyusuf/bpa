/**
 * Created by Yusuf on 5/23/2015.
 */

import ComponentOptions = require("bpa/base/component/ComponentOptions");

interface DateTimeInputOptions extends ComponentOptions{
    name: string;
    value?: string;
    isRequired?: boolean;

    type?: string;
    disabled?: boolean;
}

export = DateTimeInputOptions;
