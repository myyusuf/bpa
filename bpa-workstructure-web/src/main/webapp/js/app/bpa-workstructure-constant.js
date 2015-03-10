var BPA = BPA || {};

BPA.Constant = BPA.Constant || {};

BPA.Constant.workstructure = {
	deploymentsUrl : 'service/workstructure/deployments',
	processDefinitionsUrl : 'service/workstructure/processdefinitions',
	startProcessUrl : 'service/workstructure/processdefinitions/startprocess',
	identity: {
		usersUrl : 'service/workstructure/identity/users',
		groupsUrl : 'service/workstructure/identity/groups'
	},
	administration:{
		runningProcessInstancesUrl : 'service/workstructure/administration/runningprocessinstances',
		processInstanceTasksUrl : 'service/workstructure/administration/processinstancetasks'	
	},
	task: {
		queuedsUrl : 'service/workstructure/task/queueds',
		queuedsClaimUrl : 'service/workstructure/task/queueds/claim',
		inboxesUrl : 'service/workstructure/task/inboxes',
		inboxesCompleteUrl : 'service/workstructure/task/inboxes/complete'
	},
	tasksUrl : 'service/workstructure/tasks'
};