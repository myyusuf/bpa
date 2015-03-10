package id.co.oriza.bpa.workstructure.interfaces.ws;

import id.co.oriza.bpa.base.interfaces.ws.CommonController;
import id.co.oriza.bpa.workstructure.application.WorkstructureApplicationService;
import id.co.oriza.bpa.workstructure.domain.model.Employee;
import id.co.oriza.bpa.workstructure.interfaces.ws.pm.EmployeePresentationModel;

import java.util.ArrayList;
import java.util.Collection;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

public class EmployeeController extends CommonController{
	
	private static final int MAX_LIMIT = 10000;
	
	final Logger logger = LoggerFactory.getLogger(EmployeeController.class);
	
	@Autowired
	private WorkstructureApplicationService workstructureService;
	
	@RequestMapping(value="/workstructure/employees", method=RequestMethod.GET, produces="application/json")
	public Map<String, Object> allEmployees(@RequestParam(required=false) Map<String, String> params){
		
		int start = params.get("pagenum") != null ? Integer.parseInt(params.get("pagenum")) : 0;
		int limit = params.get("pagesize") != null ? Integer.parseInt(params.get("pagesize")) : MAX_LIMIT;
		
		String employeeIdOrNameStartsWith = params.get("employeeIdOrNameStartsWith") != null ? params.get("employeeIdOrNameStartsWith") : "";
		
		printParamsString(params);
		
		List<EmployeePresentationModel> employeeModels = new ArrayList<EmployeePresentationModel>();
		Collection<Employee> employees = this.workstructureService().allSimilarlyEmployeeIdOrNamedEmployees(employeeIdOrNameStartsWith, employeeIdOrNameStartsWith, start, limit);
		for (Employee employee : employees) {
			EmployeePresentationModel employeeModel = new EmployeePresentationModel(employee);
			employeeModels.add(employeeModel);
		}
		
		Long employeesSize = 1l;//this.workstructureService().allEmployeesSize();
		
		Map<String, Object> result = new HashMap<String, Object>();
		
		result.put("num", employeesSize);
		result.put("data", employeeModels);
		result.put("success", true);
		
		return result;
	}

	public WorkstructureApplicationService workstructureService() {
		return workstructureService;
	}

}
