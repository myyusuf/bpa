define(["require", "jQuery", "tinypubsub", "i18next", "jqxcore", "jqxmenu", "jqxtabs", "jqxbuttons", "jqxtree", "jqxpanel", "jqxscrollbar", "jqxexpander", 
        "jqxsplitter", "jqxnavigationbar"
        
        ], function (require) {
    var initialize = function () {
    	
        $(document).ready(function () {
        	
            
        	var contentHeight = function(){
        		return $(window).height()-77;
        	}
        	
        	var feedExpanderHeight = function(){
        		return $(window).height()-101;
        	}
        	
        	
        	$('#mainSplitter').jqxSplitter({  width: '100%', height: contentHeight(), panels: [{ size: '240', min: 100 }, { min: 200}], theme: 'metro' });
            $('#contentSplitter').jqxSplitter({ width: '100%', height: '100%',  orientation: 'horizontal', 
            	panels: [{ size: '100%', min: 100, collapsible: false }, { min: 0, collapsible: true}], theme: 'metro' });
            $('#contentSplitter').css({margin : "0px"})
        
            $("#feedExpander").jqxExpander({toggleMode: 'none', showArrow: false, width: "100%", height: feedExpanderHeight(), 
            	theme: 'arctic',
            	initContent: function () {
                }
            });
            
            $("#contentExpander").css({overflow: "hidden", marginTop: "0px", marginBottom: "0px"});
            
            $("#jqxNavigationBar").jqxNavigationBar({ width: "100%", height: feedExpanderHeight(), expandMode: "singleFitHeight", theme: 'metro'});
            $('#jqxNavigationBar').css({marginLeft: "1px"});
            
            // It is needed to fix bug for jqxtree
            $("#jqxNavigationBar").on('expandedItem', function(event){
            	var innerWidth = $("#jqxNavigationBar").innerWidth() - 2 + 'px';
            	$('#financeTreeMenu').jqxTree({width: innerWidth});
            	$('#securityTreeMenu').jqxTree({width: innerWidth});
            	$('#workflowTreeMenu').jqxTree({width: innerWidth});
            	$('#purchasingTreeMenu').jqxTree({width: innerWidth});
            });
            
            var innerWidth = $("#jqxNavigationBar").innerWidth() - 2 + 'px';
            
            $('#securityTreeMenu').jqxTree({ height: '100%', width: innerWidth, theme: 'metro'});
            $('#financeTreeMenu').jqxTree({ height: '100%', width: innerWidth, theme: 'metro'});
            $('#workflowTreeMenu').jqxTree({ height: '100%', width: innerWidth, theme: 'metro'});
            $('#purchasingTreeMenu').jqxTree({ height: '100%', width: innerWidth, theme: 'metro'});
            
            $("#jqxMenu").jqxMenu({ width: '100%', theme: 'metro'});
            $("#jqxMenu").css('visibility', 'visible');
            
            $(window).resize(function(){
            	$('#mainSplitter').css({height: contentHeight()});
            	$('#feedExpander').jqxExpander({height: $(window).height()-101});
            	$('#jqxNavigationBar').jqxNavigationBar({height: $(window).height()-101});
            });
            
            $('#mainSplitter').on('resize', function (event) {
            	var innerWidth = $("#jqxNavigationBar").innerWidth() - 2 + 'px';
            	$('#financeTreeMenu').jqxTree({width: innerWidth});
            	$('#securityTreeMenu').jqxTree({width: innerWidth});
            	$('#purchasingTreeMenu').jqxTree({width: innerWidth});
            	$('#workflowTreeMenu').jqxTree({width: innerWidth});
            });
            
            
            var registerMenu = function(){
            	$("#userListMenu").click(function(){
            		$.publish("viewUserListEvent", {name: "waw"});
            	});
            	$("#roleListMenu").click(function(){
            		$.publish("viewRoleListEvent", {name: "waw"});
            	});
            	
            	$("#accountGroupListMenu").click(function(){
            		$.publish("viewAccountGroupListEvent", {name: "waw"});
            	});
            	$("#coaListMenu").click(function(){
            		$.publish("viewCoaListEvent", {name: "waw"});
            	});
            	$("#ledgerListMenu").click(function(){
            		$.publish("viewLedgerListEvent", {name: "waw"});
            	});
            	
            	$("#processListListMenu").click(function(){
            		$.publish("viewProcessListListEvent", {name: "waw"});
            	});
            	
            	$("#structureListMenu").click(function(){
            		$.publish("viewStructureListEvent", {name: "waw"});
            	});
            	$("#employeeListMenu").click(function(){
            		$.publish("viewEmployeeListEvent", {name: "waw"});
            	});
            	$("#positionListMenu").click(function(){
            		$.publish("viewPositionListEvent", {name: "waw"});
            	});
            	$("#locationListMenu").click(function(){
            		$.publish("viewLocationListEvent", {name: "waw"});
            	});
            	
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