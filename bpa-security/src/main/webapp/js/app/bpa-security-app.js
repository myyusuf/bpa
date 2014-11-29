define(["require", "jQuery", "tinypubsub", "jqxcore", "jqxtabs", "jqxbuttons", "jqxtree", "jqxpanel", "jqxscrollbar", "jqxexpander", 
        "jqxsplitter", "jqxmenu", "jqxnavigationbar", 
        "jqxgrid.pager", "jqxgrid.sort", "jqxgrid.edit", "jqxgrid.selection", "jqxlistbox", "jqxdropdownlist", "jqxgrid", "jqxdata"], function (require) {
    var initialize = function () {
    	
        $(document).ready(function () {
        	
            
            $("#jqxMenu").jqxMenu({ width: '100%', theme: 'metro'});
            $("#jqxMenu").css('visibility', 'visible');
            
            var registerMenu = function(){
            	$("#userListMenu").click(function(){
            		$.publish("viewUserListEvent", {name: "user"});
            	});
            	
            	$("#roleListMenu").click(function(){
            		$.publish("viewRoleListEvent", {name: "role"});
            	});
            }
            
            registerMenu();
            
            require(['./controller/WorkspaceSecurity'], function (WorkspaceSecurity) {
            	var workspaceSecurity = new WorkspaceSecurity($("#content"));
            });
            
        });
    };
    return {
        initialize: initialize
    };
});