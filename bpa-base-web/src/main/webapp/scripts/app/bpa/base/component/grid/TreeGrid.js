/**
 * Created by Yusuf on 5/5/2015.
 */
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", "jqxtreegrid", "jqxmenu", "bpa/base/component/Component"], function (require, exports, jqxtreegrid, jqxmenu, Component) {
    var TreeGrid = (function (_super) {
        __extends(TreeGrid, _super);
        function TreeGrid(theOptions) {
            _super.call(this, theOptions);
            this.dataAdapter = theOptions.dataAdapter;
            this.source = this.dataAdapter.get();
            this.columns = theOptions.columns;
            jqxmenu;
            jqxtreegrid;
        }
        TreeGrid.prototype.renderTo = function (theContainer) {
            var _this = this;
            //this.element = $("<div id=\"" + this.id + "\" style='height: 100%;'><\/div>");
            //this.element.appendTo(theContainer);
            this.element = theContainer;
            this.element.css("border-top", "0");
            this.element.css("border-bottom", "0");
            this.element.css("border-left", "0");
            this.element.css("border-right", "0");
            var _width = '100%';
            if (this.widthInPercentage != undefined) {
                _width = this.widthInPercentage + '%';
            }
            if (this.width != undefined) {
                _width = this.width;
            }
            var _height = '100%';
            if (this.heightInPercentage != undefined) {
                _height = this.heightInPercentage + '%';
            }
            if (this.height != undefined) {
                _height = this.height;
            }
            this.element = this.element.jqxTreeGrid({
                width: _width,
                height: _height,
                source: this.dataAdapter.get(),
                pageable: true,
                //autoheight: false,
                //sortable: true,
                //altrows: true,
                //enabletooltips: true,
                //editable: false,
                //selectionmode: 'singlerow',
                pagerMode: 'advanced',
                showToolbar: false,
                sortable: true,
                filterable: true,
                columns: this.columns,
                theme: this.theme
            });
            //var _this = this;
            //
            //$(theContainer).parent().resize(function(){
            //    var _containerHeight = $(theContainer).parent().height();
            //    console.log("theContainer height : " + _containerHeight);
            //    _this.element.jqxGrid({height: _containerHeight-10});
            //});
        };
        return TreeGrid;
    })(Component);
    return TreeGrid;
});
