var BPA = BPA || {};

BPA.Constant = BPA.Constant || {};

BPA.Constant.workflow = {
	deploymentsUrl : 'service/workflow/deployments',	
//	processDefinitionsUrl : 'sample/data/workflow/processdefinitions.json',
	processDefinitionsUrl : 'service/workflow/processdefinitions',
	startProcessUrl : 'service/workflow/processdefinitions/startprocess',
	identity: {
		usersUrl : 'service/workflow/identity/users',
	},
	tasksUrl : 'sample/data/workflow/tasks.json'
};