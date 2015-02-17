var BPA = BPA || {};

BPA.Constant = BPA.Constant || {};

BPA.Constant.workflow = {
	deploymentsUrl : 'service/workflow/deployments',	
//	processDefinitionsUrl : 'sample/data/workflow/processdefinitions.json',
	processDefinitionsUrl : 'service/workflow/processdefinitions',
	startProcessUrl : 'service/workflow/processdefinitions/startprocess',
	identity: {
		usersUrl : 'service/workflow/identity/users',
		groupsUrl : 'service/workflow/identity/groups'
	},
	administration:{
		runningProcessInstancesUrl : 'service/workflow/administration/runningprocessinstances',
		processInstanceTasksUrl : 'service/workflow/administration/processinstancetasks'	
	},
	task: {
		queuedsUrl : 'service/workflow/task/queueds',
		queuedsClaimUrl : 'service/workflow/task/queueds/claim'
	},
	tasksUrl : 'sample/data/workflow/tasks.json'
};