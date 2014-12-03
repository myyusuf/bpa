define(["require", "jQuery", "tinypubsub", "jqxcore", "jqxtabs", "jqxbuttons", "jqxtree", "jqxpanel", "jqxscrollbar", "jqxexpander", 
        "jqxsplitter", "jqxmenu", "jqxnavigationbar", 
        "jqxgrid.pager", "jqxgrid.sort", "jqxgrid.edit", "jqxgrid.selection", "jqxlistbox", "jqxdropdownlist", "jqxgrid", "jqxdata",
        "jqxslider"], function (require) {
    var initialize = function () {
    	
        $(document).ready(function () {
        	
            
        	var contentHeight = function(){
        		return $(document).height()-77;
        	}
        	
        	var feedExpanderHeight = function(){
        		return $(document).height()-101;
        	}
        	
        	
        	$('#mainSplitter').jqxSplitter({  width: '100%', height: contentHeight(), panels: [{ size: '15%', min: 100 }, {size: '85%', min: 200}], theme: 'metro' });
            $('#contentSplitter').jqxSplitter({ width: '100%', height: '100%',  orientation: 'horizontal', 
            	panels: [{ size: '70%', min: 100, collapsible: false }, { min: 100, collapsible: true}], theme: 'metro' });
            $('#contentSplitter').css({margin : "0px"})
        
            $("#feedExpander").jqxExpander({toggleMode: 'none', showArrow: false, width: "100%", height: feedExpanderHeight(), 
            	theme: 'arctic',
            	initContent: function () {
                }
            });
            
            $("#contentExpander").css({overflow: "hidden", marginTop: "0px", marginBottom: "0px"});
            
            $("#jqxNavigationBar").jqxNavigationBar({ width: "100%", height: feedExpanderHeight(), expandMode: "singleFitHeight", theme: 'metro'});
            $('#jqxNavigationBar').css({marginLeft: "1px"});
            
            $('#securityTreeMenu').jqxTree({ height: '300px', theme: 'metro'});
            $('#financeTreeMenu').jqxTree({ height: '300px', theme: 'metro'});
            $('#workflowTreeMenu').jqxTree({ height: '300px', theme: 'metro'});
            
            $("#jqxMenu").jqxMenu({ width: '100%', theme: 'metro'});
            $("#jqxMenu").css('visibility', 'visible');
            
            $(window).resize(function(){
            	$('#mainSplitter').css({height: contentHeight()});
            	$('#feedExpander').css({height: feedExpanderHeight()});
            	$('#jqxNavigationBar').css({height: feedExpanderHeight()});
            });
            
            
            var registerMenu = function(){
            	$("#userListMenu").click(function(){
            		$.publish("viewUserListEvent", {name: "waw"});
            	});
            	$("#roleListMenu").click(function(){
            		$.publish("viewRoleListEvent", {name: "waw"});
            	});
            	$("#ledgerListMenu").click(function(){
            		$.publish("viewLedgerListEvent", {name: "waw"});
            	});
            	$("#processListListMenu").click(function(){
            		$.publish("viewProcessListListEvent", {name: "waw"});
            	});
            	
//            	$('#jqxTree').bind('select', function (event) {
//                    var htmlElement = event.args.element;
//                    var item = $('#jqxTree').jqxTree('getItem', htmlElement);
//                    console.log(item.label);
//                    $.publish("viewUserListEvent", {name: "waw"});
//                });
            }
            
            registerMenu();
            
            require(['./controller/WorkspaceMain'], function (WorkspaceMain) {
            	var workspaceMain = new WorkspaceMain($("#contentPanel"));
            });
            
        });
    };
    return {
        initialize: initialize
    };
});