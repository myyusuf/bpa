/**
 * Created by Yusuf on 5/6/2015.
 */
import FormInput = require("bpa/base/component/input/FormInput");
import Form = require("bpa/base/component/input/Form");

interface ValidatorOptions{
    form: Form;
    items: Array<FormInput>;
    onValidationSuccess?: any;
}

export = ValidatorOptions;
