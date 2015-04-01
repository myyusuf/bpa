package id.co.oriza.bpa.workstructure.interfaces.ws;

import id.co.oriza.bpa.base.interfaces.ws.CommonController;
import id.co.oriza.bpa.workstructure.application.ChangePositionInfoCommand;
import id.co.oriza.bpa.workstructure.application.NewPositionCommand;
import id.co.oriza.bpa.workstructure.application.RemovePositionCommand;
import id.co.oriza.bpa.workstructure.application.WorkstructureApplicationService;
import id.co.oriza.bpa.workstructure.domain.model.Position;
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
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
public class PositionController extends CommonController{
	
	private static final int MAX_LIMIT = 10000;
	
	final Logger logger = LoggerFactory.getLogger(PositionController.class);
	
	@Autowired
	private WorkstructureApplicationService workstructureService;
	
	@RequestMapping(value="/workstructure/positions", method=RequestMethod.GET, produces="application/json")
	public Map<String, Object> allPositions(@RequestParam(required=false) Map<String, String> params){
		
		int start = params.get("pagenum") != null ? Integer.parseInt(params.get("pagenum")) : 0;
		int limit = params.get("pagesize") != null ? Integer.parseInt(params.get("pagesize")) : MAX_LIMIT;
		
		String codeOrNameStartsWith = params.get("codeOrNameStartsWith") != null ? params.get("codeOrNameStartsWith") : "";
		
		printParamsString(params);
		
		List<PositionPresentationModel> positionModels = new ArrayList<PositionPresentationModel>();
		Collection<Position> positions = this.workstructureService().allSimilarlyCodedOrNamedPositions(codeOrNameStartsWith, codeOrNameStartsWith, start, limit);
		for (Position position : positions) {
			PositionPresentationModel positionModel = new PositionPresentationModel(position);
			positionModels.add(positionModel);
		}
		
		Long positionsSize = (long) this.workstructureService().allSimilarlyCodedOrNamedPositionsSize(codeOrNameStartsWith, codeOrNameStartsWith);
		
		Map<String, Object> result = new HashMap<String, Object>();
		
		result.put("num", positionsSize);
		result.put("data", positionModels);
		result.put("success", true);
		
		return result;
	}
	
	public WorkstructureApplicationService workstructureService() {
		return workstructureService;
	}
	
	@RequestMapping(value="/workstructure/positions", method=RequestMethod.POST, produces="application/json")
	public Map<String, Object> createPosition(@RequestBody(required=false) Map<String, Object> params){
		
		logger.debug("create position");
		
		String code = (String) params.get("code");
		String name = (String) params.get("name");
		String description = (String) params.get("description");
		
		printParams(params);
		
		NewPositionCommand aCommand = new NewPositionCommand(code, name, description);
		
		this.workstructureService().newPositionWith(aCommand);
		
		Map<String, Object> result = new HashMap<String, Object>();
		
		result.put("success", true);
		
		return result;
	}
	
	@RequestMapping(value="/workstructure/positions", method=RequestMethod.PUT, produces="application/json")
	public Map<String, Object> changePositionInfo(@RequestBody(required=false) Map<String, Object> params){
		
		logger.debug("changePositionInfo");
		
		printParams(params);
		
		String code = (String) params.get("code");
		String name = (String) params.get("name");
		String description = (String) params.get("description");
		
		ChangePositionInfoCommand aCommand = new ChangePositionInfoCommand(code, name, description);
		this.workstructureService().changePositionInfo(aCommand);
		
		Map<String, Object> result = new HashMap<String, Object>();
		
		result.put("success", true);
		
		return result;
	}
	
	@RequestMapping(value="/workstructure/positions", method=RequestMethod.DELETE, produces="application/json")
	public Map<String, Object> deletePosition(@RequestBody(required=false) Map<String, Object> params){
		
		logger.debug("delete position");
		
		String code = (String) params.get("code");
		
		RemovePositionCommand aCommand = new RemovePositionCommand(code);
		this.workstructureService().removePosition(aCommand);
		
		Map<String, Object> result = new HashMap<String, Object>();
		result.put("success", true);
		
		return result;
	}

}
