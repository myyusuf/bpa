package id.co.oriza.bpa.workstructure.interfaces.ws;

import id.co.oriza.bpa.base.interfaces.ws.CommonController;
import id.co.oriza.bpa.workstructure.application.ChangeLocationInfoCommand;
import id.co.oriza.bpa.workstructure.application.NewLocationCommand;
import id.co.oriza.bpa.workstructure.application.RemoveLocationCommand;
import id.co.oriza.bpa.workstructure.application.WorkstructureApplicationService;
import id.co.oriza.bpa.workstructure.domain.model.Location;
import id.co.oriza.bpa.workstructure.interfaces.ws.pm.LocationPresentationModel;

import java.util.ArrayList;
import java.util.Collection;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
public class LocationController extends CommonController{
	
	private static final int MAX_LIMIT = 10000;
	
	final Logger logger = LoggerFactory.getLogger(LocationController.class);
	
	@Autowired
	private WorkstructureApplicationService workstructureService;
	
	@RequestMapping(value="/workstructure/locations", method=RequestMethod.GET, produces="application/json")
	public Map<String, Object> allLocations(@RequestParam(required=false) Map<String, String> params){
		
		int start = params.get("pagenum") != null ? Integer.parseInt(params.get("pagenum")) : 0;
		int limit = params.get("pagesize") != null ? Integer.parseInt(params.get("pagesize")) : MAX_LIMIT;
		
		String codeOrAddressStartsWith = params.get("codeOrAddressStartsWith") != null ? params.get("codeOrAddressStartsWith") : "";
		
		printParamsString(params);
		
		List<LocationPresentationModel> locationModels = new ArrayList<LocationPresentationModel>();
		Collection<Location> locations = this.workstructureService().allSimilarlyCodedOrAddressedLocations(codeOrAddressStartsWith, codeOrAddressStartsWith, start, limit);
		for (Location location : locations) {
			LocationPresentationModel locationModel = new LocationPresentationModel(location);
			locationModels.add(locationModel);
		}
		
		Long locationsSize = (long) this.workstructureService().allSimilarlyCodedOrAddressedLocationsSize(codeOrAddressStartsWith, codeOrAddressStartsWith);
		
		Map<String, Object> result = new HashMap<String, Object>();
		
		result.put("num", locationsSize);
		result.put("data", locationModels);
		result.put("success", true);
		
		return result;
	}
	
	public WorkstructureApplicationService workstructureService() {
		return workstructureService;
	}
	
	@RequestMapping(value="/workstructure/locations", method=RequestMethod.POST, produces="application/json")
	public Map<String, Object> createLocation(@RequestBody(required=false) Map<String, Object> params){
		
		logger.debug("create location");
		
		String code = (String) params.get("code");
		String address = (String) params.get("address");
		String description = (String) params.get("description");
		
		printParams(params);
		
		NewLocationCommand aCommand = new NewLocationCommand(code, address, description);
		
		this.workstructureService().newLocationWith(aCommand);
		
		Map<String, Object> result = new HashMap<String, Object>();
		
		result.put("success", true);
		
		return result;
	}
	
	@RequestMapping(value="/workstructure/locations", method=RequestMethod.PUT, produces="application/json")
	public Map<String, Object> changeLocationInfo(@RequestBody(required=false) Map<String, Object> params){
		
		logger.debug("changeLocationInfo");
		
		printParams(params);
		
		String code = (String) params.get("code");
		String address = (String) params.get("address");
		String description = (String) params.get("description");
		
		ChangeLocationInfoCommand aCommand = new ChangeLocationInfoCommand(code, address, description);
		this.workstructureService().changeLocationInfo(aCommand);
		
		Map<String, Object> result = new HashMap<String, Object>();
		
		result.put("success", true);
		
		return result;
	}
	
	@RequestMapping(value="/workstructure/locations", method=RequestMethod.DELETE, produces="application/json")
	public Map<String, Object> deleteLocation(@RequestBody(required=false) Map<String, Object> params){
		
		logger.debug("delete location");
		
		String code = (String) params.get("code");
		
		RemoveLocationCommand aCommand = new RemoveLocationCommand(code);
		this.workstructureService().removeLocation(aCommand);
		
		Map<String, Object> result = new HashMap<String, Object>();
		result.put("success", true);
		
		return result;
	}

}
