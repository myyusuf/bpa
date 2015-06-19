/**
 * Created by Yusuf on 5/23/2015.
 */
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", "jquery", "jqxcombobox", "bpa/base/component/Component"], function (require, exports, $, jqxcombobox, Component) {
    var ComboBox = (function (_super) {
        __extends(ComboBox, _super);
        function ComboBox(theOptions) {
            _super.call(this, theOptions);
            this.dataAdapter = theOptions.dataAdapter;
            this.valueMember = theOptions.valueMember;
            this.displayMember = theOptions.displayMember;
            jqxcombobox;
        }
        ComboBox.prototype.renderTo = function (theContainer) {
            this.element = $("<div id=\"" + this.id + "\"><\/div>");
            this.element.appendTo(theContainer);
            var _width = 'auto';
            if (this.widthInPercentage != undefined) {
                _width = this.widthInPercentage + '%';
            }
            if (this.width != undefined) {
                _width = this.width;
            }
            var _height = 'auto';
            if (this.heightInPercentage != undefined) {
                _height = this.heightInPercentage + '%';
            }
            if (this.height != undefined) {
                _height = this.height;
            }
            this.element = this.element.jqxComboBox({
                source: this.dataAdapter.get(),
                displayMember: this.displayMember,
                valueMember: this.valueMember,
                width: _width,
                height: _height,
                theme: this.theme
            });
        };
        return ComboBox;
    })(Component);
    return ComboBox;
});
