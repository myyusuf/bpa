var BPA = BPA || {};

BPA.Constant = BPA.Constant || {};

BPA.Constant.workflow = {
	deploymentsUrl : 'service/workflow/deployments',
	processDefinitionsUrl : 'service/workflow/processdefinitions',
	startProcessUrl : 'service/workflow/processdefinitions/startprocess',
	identity: {
		usersUrl : 'service/workflow/identity/users',
		groupsUrl : 'service/workflow/identity/groups'
	},
	administration:{
		runningProcessInstancesUrl : 'service/workflow/administration/runningprocessinstances'
	},
	tasksUrl : 'service/workflow/tasks'
};