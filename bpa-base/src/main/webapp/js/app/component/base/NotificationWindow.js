define(["jqxbuttons", "jqxwindow"], function () {
	
	var NotificationWindow = function(container, options){
		
		var _options = options || {};
		var _title = _options.title || 'Title';
		var _content = _options.content || 'Notification';
		var _type = _options.type || 'info';
		var _onOk = _options.onOk;
		var _onCancel = _options.onCancel;
		
		var _notificationWindow = $('<div></div>'), _notificationWindowHeader = '', _notificationWindowContent = '';
		var _buttonContainer = $('<div style="position:absolute; bottom: 15px; text-align: center; width: 100%;"></div>');
		
		if('info' == _type){
			_notificationWindowHeader = $('<div style="height: 18px; padding: 5px; padding-top: 3px; padding-bottom: 7px;"><table><tr><td><img src="resources/images/exclamation-circle.png" alt="" style="margin-right: 1px" /></td><td valign="center"><span style="font-weight: bold">' + _title + '</span></td></tr></table></div>');
			_notificationWindowContent = $('<div><span>' + _content + '</span></div>');
		
			var _okButton = $('<input type="button" value="Ok" style="margin-right: 5px;"/>');
			_okButton.appendTo(_buttonContainer);
			_okButton.jqxButton({ width: 60, height: 25, theme: 'metro'});
			_okButton.click(function(event){
				_notificationWindow.jqxWindow('close');
				_notificationWindow.jqxWindow('destroy');
				if(_onOk){
					_onOk();
				}
			});
			
			var _cancelButton = $('<input type="button" value="Cancel"/>');
			_cancelButton.appendTo(_buttonContainer);
			
			_cancelButton.jqxButton({ width: 60, height: 25, theme: 'metro'});
			_cancelButton.click(function(event){
				_notificationWindow.jqxWindow('close');
				_notificationWindow.jqxWindow('destroy');
				if(_onCancel){
					_onCancel();
				}
			});
		}else{
			_notificationWindowHeader = $('<div style="height: 18px; padding: 5px; padding-top: 3px; padding-bottom: 7px;"><table><tr><td><img src="resources/images/error.png" alt="" style="margin-right: 1px" /></td><td valign="center"><span style="font-weight: bold">' + _title + '</span></td></tr></table></div>');
			_notificationWindowContent = $('<div><span style="color: red">' + _content + '</span></div>');
			var _closeButton = $('<input type="button" value="Close"/>');
			_closeButton.appendTo(_buttonContainer);
			_closeButton.jqxButton({ width: 60, height: 25, theme: 'metro'});
			_closeButton.click(function(event){
				_notificationWindow.jqxWindow('close');
				_notificationWindow.jqxWindow('destroy');
			});
		}
		
		_notificationWindowHeader.appendTo(_notificationWindow);
		_notificationWindowContent.appendTo(_notificationWindow);
		_notificationWindow.appendTo(container);
		_buttonContainer.appendTo(_notificationWindowContent);
		
		_notificationWindow.jqxWindow({
            showCollapseButton: false, 
            isModal: true,
            height: 150, width: 400,
            initContent: function () {
            	_notificationWindow.jqxWindow('focus');
            },
            theme: 'metro'
        });
	}

    return NotificationWindow;
    
});