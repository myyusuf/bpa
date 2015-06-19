/**
 * Created by Yusuf on 5/9/2015.
 */
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", "jquery", "jqxtabs", "bpa/base/component/Component"], function (require, exports, $, jqxtabs, Component) {
    var Tab = (function (_super) {
        __extends(Tab, _super);
        function Tab(theOptions) {
            _super.call(this, theOptions);
            this.selectionTracker = theOptions.selectionTracker;
            this.tempItems = theOptions.items;
            jqxtabs;
        }
        Tab.prototype.addTab = function (anTabItem) {
            /* var _tabItemTmp = new TabItem({caption: "test"});
             this.items.push(_tabItemTmp);
     
             var _positionIndex = this.element.jqxTabs('length');
             this.element.jqxTabs('addLast', tabCaption , tabId + "_content");
             this.element.jqxTabs('setContentAt', _positionIndex , '<div id="' + tabId + '" >Loading content...</div>');
     
             var _parentContainer = $('#' + tabId).parent();
             var _children = _parentContainer.children();
             for(var i=0; i<_children.length; i++){
                 _children[i].remove();
             }*/
            //this.items.push(anTabItem);
            this.element.jqxTabs('addLast', "<div tabKey='" + anTabItem.tabKey + "'>" + anTabItem.caption + "<\/div>", "<div>[Content]<\/div>");
            var _tabLength = this.element.jqxTabs('length');
            var _contentDIV = $("#" + this.id + " .jqx-tabs-content-element")[_tabLength - 1];
            var _children = $(_contentDIV).children();
            for (var i = 0; i < _children.length; i++) {
                _children[i].remove();
            }
            anTabItem.renderTo(_contentDIV);
        };
        Tab.prototype.selectTab = function (aTabKey) {
            var _positionIndex = -1;
            for (var _index = 0; _index < this.element.jqxTabs('length'); _index++) {
                var _contentDIV = $("#" + this.id + " .jqx-tabs-title")[_index];
                var _tabKey = $(_contentDIV).find("[tabKey]").attr("tabKey");
                if (_tabKey == aTabKey) {
                    _positionIndex = _index;
                }
            }
            if (_positionIndex > -1) {
                this.element.jqxTabs('select', _positionIndex);
            }
            return _positionIndex;
        };
        Tab.prototype.renderTo = function (theContainer) {
            var _this = this;
            this.element = $("<div style='border: 0;' id=\"" + this.id + "\"><\/div>");
            this.element.appendTo(theContainer);
            var _ul = $("<ul><\/ul>");
            _ul.appendTo(this.element);
            this.tempItems.forEach(function (item) {
                var _li = $("<li><div tabKey='" + item.tabKey + "'>" + item.caption + "<\/div><\/li>");
                _li.appendTo(_ul);
            });
            this.tempItems.forEach(function (item) {
                //var _childContainer = $("<div id=\""+ this.id + "_child_" + this.mainIndex +"\"><\/div>");
                var _childContainer = $("<div><\/div>");
                _childContainer.appendTo(_this.element);
                //item.renderTo(_childContainer); must not render directly, instead please use initTabContent
            });
            //var _initTabContent = function(tabIndex: number){
            //    //_this.items[tabIndex].renderTo($("#"+ _this.id + "_child_" + tabIndex));
            //    var _contentDIV = $("#" + this.id + " .jqx-tabs-content-element")[tabIndex];
            //    _this.items[tabIndex].renderTo(_contentDIV);
            //}
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
            this.element = this.element.jqxTabs({ width: _width, height: _height, theme: this.theme, position: 'top', showCloseButtons: true });
            this.tempItems.forEach(function (item) {
                _this.element.jqxTabs('removeLast');
            });
            this.tempItems.forEach(function (item) {
                _this.addTab(item);
            });
        };
        return Tab;
    })(Component);
    return Tab;
});
