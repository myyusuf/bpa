package id.co.oriza.bpa.workstructure.interfaces.ws;

import id.co.oriza.bpa.base.interfaces.ws.CommonController;
import id.co.oriza.bpa.workstructure.application.CreateStructureCommand;
import id.co.oriza.bpa.workstructure.application.CreateStructureModel;
import id.co.oriza.bpa.workstructure.application.WorkstructureApplicationService;
import id.co.oriza.bpa.workstructure.domain.model.Structure;
import id.co.oriza.bpa.workstructure.interfaces.ws.pm.StructurePresentationModel;

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
public class StructureController extends CommonController{
	
private static final int MAX_LIMIT = 10000;
	
	final Logger logger = LoggerFactory.getLogger(StructureController.class);
	
	@Autowired
	private WorkstructureApplicationService workstructureService;
	
	@RequestMapping(value="/workstructure/structures", method=RequestMethod.GET, produces="application/json")
	public Map<String, Object> allStructures(@RequestParam(required=false) Map<String, String> params){
		
		int start = params.get("pagenum") != null ? Integer.parseInt(params.get("pagenum")) : 0;
		int limit = params.get("pagesize") != null ? Integer.parseInt(params.get("pagesize")) : MAX_LIMIT;
		
		printParamsString(params);
		
		List<StructurePresentationModel> structureModels = new ArrayList<StructurePresentationModel>();
		Collection<Structure> structures = this.workstructureService().allStructures(start, limit);
		for (Structure structure : structures) {
			StructurePresentationModel structureModel = new StructurePresentationModel(structure);
			structureModels.add(structureModel);
		}
		
		Long structuresSize = 1l;//this.workstructureService().allStructuresSize();
		
		Map<String, Object> result = new HashMap<String, Object>();
		
		result.put("num", structuresSize);
		result.put("data", structureModels);
		result.put("success", true);
		
		return result;
	}
	
	@SuppressWarnings("unchecked")
	@RequestMapping(value="/workstructure/structures", method=RequestMethod.POST, produces="application/json")
	public Map<String, Object> createStructures(@RequestBody(required=false) Map<String, Object> params){
		
		logger.debug("createStructures");
		
		printParams(params);
		
		List<Map<String, Object>> structuresMap = (List<Map<String, Object>>) params.get("structures");
		List<CreateStructureModel> createStructureModels = new ArrayList<CreateStructureModel>(0);
		for (Map<String, Object> structureMap : structuresMap) {
			System.out.println("structureId : " + structureMap.get("structureId"));
			String structureId = (String) structureMap.get("structureId");
			String parentId = (String) structureMap.get("parentId");
			String employeeId = (String) structureMap.get("employeeId");
			String positionCode = (String) structureMap.get("positionCode");
			String locationCode = (String) structureMap.get("locationCode");
			CreateStructureModel createStructureModel = new CreateStructureModel(structureId, parentId, employeeId, positionCode, locationCode);
			createStructureModels.add(createStructureModel);
		}
		
		CreateStructureCommand createStructureCommand = new CreateStructureCommand(createStructureModels);
		this.workstructureService().newStructuresWith(createStructureCommand);
		Map<String, Object> result = new HashMap<String, Object>();
		
		result.put("success", true);
		
		return result;
	}
	
	public WorkstructureApplicationService workstructureService() {
		return workstructureService;
	}

}
