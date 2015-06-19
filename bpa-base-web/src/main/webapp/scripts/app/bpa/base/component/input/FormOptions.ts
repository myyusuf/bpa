/**
 * Created by Yusuf on 5/6/2015.
 */

import ComponentOptions = require("bpa/base/component/ComponentOptions");
import FormInput = require("bpa/base/component/input/FormInput");
import Layout = require("bpa/base/component/layout/Layout");

interface FormOptions extends ComponentOptions{
   items: Array<FormInput>;
   layout: Layout;
   onValidationSuccess?: any;
}

export = FormOptions;
