package id.co.oriza.bpa.workstructure.interfaces.ws;

import id.co.oriza.bpa.base.interfaces.ws.CommonController;
import id.co.oriza.bpa.workstructure.application.WorkstructureApplicationService;
import id.co.oriza.bpa.workstructure.domain.model.Structure;
import id.co.oriza.bpa.workstructure.interfaces.ws.pm.StructurePresentationModel;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.util.ArrayList;
import java.util.Collection;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;


@Controller
public class StructureController extends CommonController{
	
private static final int MAX_LIMIT = 10000;
	
	final Logger logger = LoggerFactory.getLogger(StructureController.class);
	
	@Value("${employee.image.folder}")
	private String employeeImageFolder;
	
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
	
	@RequestMapping(value="/workstructure/structures", method=RequestMethod.POST, produces="application/json")
	public Map<String, Object> createStructures(@RequestBody(required=false) Map<String, Object> params){
		
		logger.debug("createStructures");
		
		printParams(params);
		
		List<Map<String, Object>> structuresMap = (List<Map<String, Object>>) params.get("structures");
		for (Map<String, Object> structureMap : structuresMap) {
			System.out.println("structureId : " + structureMap.get("structureId"));
		}
		Map<String, Object> result = new HashMap<String, Object>();
		
		result.put("success", true);
		
		return result;
	}
	
	@RequestMapping(value="/workstructure/employee/image/{fileName}", method=RequestMethod.GET)
	public void loadImage(@PathVariable String fileName, HttpServletResponse resp) throws IOException {
		
		String defaultFile = employeeImageFolder + "cms_default_employee_img.png";
		String fullPath = employeeImageFolder;
		
		if(StringUtils.isEmpty(fileName)){
			fullPath = defaultFile;
		}else{
			fullPath += fileName + ".jpg";
		}

//		resp.setContentType(mime);
		File file = new File(fullPath);
		
		if(!file.exists()){
			file = new File(defaultFile);
		}
		resp.setContentLength((int) file.length());

		FileInputStream in = new FileInputStream(file);
		OutputStream out = resp.getOutputStream();

		// Copy the contents of the file to the output stream
		byte[] buf = new byte[1024];
		int count = 0;
		while ((count = in.read(buf)) >= 0) {
			out.write(buf, 0, count);
		}
		out.close();
		in.close();
	}

	
	public WorkstructureApplicationService workstructureService() {
		return workstructureService;
	}

}
