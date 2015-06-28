/**
 * Created by Yusuf on 5/6/2015.
 */

import ComponentOptions = require("bpa/base/component/ComponentOptions");
import OnAddModelListener = require("bpa/base/model/event/OnAddModelListener");
import OnEditModelListener = require("bpa/base/model/event/OnEditModelListener");
import OnDeleteModelListener = require("bpa/base/model/event/OnDeleteModelListener");

interface AccountGroupListOptions extends ComponentOptions{

    onAddAccountGroup?: OnAddModelListener;
    onEditAccountGroup?: OnEditModelListener;
    onDeleteAccountGroup?: OnDeleteModelListener;

}

export = AccountGroupListOptions;
