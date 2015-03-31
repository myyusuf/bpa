package id.co.oriza.bpa.workstructure.interfaces.ws;

import id.co.oriza.bpa.base.interfaces.ws.CommonController;
import id.co.oriza.bpa.workstructure.application.WorkstructureApplicationService;
import id.co.oriza.bpa.workstructure.domain.model.Employee;
import id.co.oriza.bpa.workstructure.domain.model.Location;
import id.co.oriza.bpa.workstructure.domain.model.Position;
import id.co.oriza.bpa.workstructure.interfaces.ws.pm.EmployeePresentationModel;
import id.co.oriza.bpa.workstructure.interfaces.ws.pm.LocationPresentationModel;
import id.co.oriza.bpa.workstructure.interfaces.ws.pm.PositionPresentationModel;

import java.util.ArrayList;
import java.util.Collection;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
public class WorkstructureController extends CommonController{
	
	private static final int MAX_LIMIT = 10000;
	
	final Logger logger = LoggerFactory.getLogger(WorkstructureController.class);
	
	@Autowired
	private WorkstructureApplicationService workstructureService;
	
	
	@RequestMapping(value="/workstructure/locations", method=RequestMethod.GET, produces="application/json")
	public Map<String, Object> allLocations(@RequestParam(required=false) Map<String, String> params){
		
		int start = params.get("pagenum") != null ? Integer.parseInt(params.get("pagenum")) : 0;
		int limit = params.get("pagesize") != null ? Integer.parseInt(params.get("pagesize")) : MAX_LIMIT;
		
		printParamsString(params);
		
		List<LocationPresentationModel> locationModels = new ArrayList<LocationPresentationModel>();
		Collection<Location> locations = this.workstructureService().allSimilarlyCodedOrAddressedLocations("", "", start, limit);
		for (Location location : locations) {
			LocationPresentationModel locationModel = new LocationPresentationModel(location);
			locationModels.add(locationModel);
		}
		
		Long locationsSize = 1l;//this.workstructureService().allEmployeesSize();
		
		Map<String, Object> result = new HashMap<String, Object>();
		
		result.put("num", locationsSize);
		result.put("data", locationModels);
		result.put("success", true);
		
		return result;
	}

	public WorkstructureApplicationService workstructureService() {
		return workstructureService;
	}

}
