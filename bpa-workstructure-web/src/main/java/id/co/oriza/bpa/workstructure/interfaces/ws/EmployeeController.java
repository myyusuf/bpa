package id.co.oriza.bpa.workstructure.interfaces.ws;

import id.co.oriza.bpa.base.interfaces.ws.CommonController;
import id.co.oriza.bpa.workstructure.application.ChangeEmployeeInfoCommand;
import id.co.oriza.bpa.workstructure.application.NewEmployeeCommand;
import id.co.oriza.bpa.workstructure.application.WorkstructureApplicationService;
import id.co.oriza.bpa.workstructure.domain.model.Employee;
import id.co.oriza.bpa.workstructure.interfaces.ws.pm.EmployeePresentationModel;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.util.ArrayList;
import java.util.Collection;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
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
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;
import org.springframework.web.multipart.commons.CommonsMultipartResolver;

@Controller
public class EmployeeController extends CommonController{
	
	private static final int MAX_LIMIT = 10000;
	
	final Logger logger = LoggerFactory.getLogger(EmployeeController.class);
	
	@Value("${employee.image.folder}")
	private String employeeImageFolder;
	
	@Value("${employee.tempimage.folder}")
	private String employeeTempImageFolder;
	
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
		
		Long employeesSize = (long) this.workstructureService().allSimilarlyEmployeeIdOrNamedEmployeesSize(employeeIdOrNameStartsWith, employeeIdOrNameStartsWith);
		
		Map<String, Object> result = new HashMap<String, Object>();
		
		result.put("num", employeesSize);
		result.put("data", employeeModels);
		result.put("success", true);
		
		return result;
	}
	
	@RequestMapping(value="/workstructure/employees", method=RequestMethod.POST, produces="application/json")
	public Map<String, Object> createEmployee(@RequestBody(required=false) Map<String, Object> params){
		
		logger.debug("create employee");
		
		String employeeId = (String) params.get("employeeId");
		String name = (String) params.get("name");
		String imageFileName = (String) params.get("imageFileName");
		
		System.out.println("Name : " + name);
		printParams(params);
		
		NewEmployeeCommand aCommand = new NewEmployeeCommand(employeeId, name, imageFileName);
		
		this.workstructureService().newEmployeeWith(aCommand);
		
		Map<String, Object> result = new HashMap<String, Object>();
		
		result.put("success", true);
		
		return result;
	}
	
	@RequestMapping(value="/workstructure/employees", method=RequestMethod.PUT, produces="application/json")
	public Map<String, Object> changeEmployeeInfo(@RequestBody(required=false) Map<String, Object> params){
		
		logger.debug("changeEmployeeInfo");
		
		printParams(params);
		
		String employeeId = (String) params.get("employeeId");
		String name = (String) params.get("name");
		String imageFileName = (String) params.get("imageFileName");
		
		ChangeEmployeeInfoCommand changeEmployeeInfoCommand = new ChangeEmployeeInfoCommand(employeeId, name, imageFileName);
		this.workstructureService().changeEmployeeInfo(changeEmployeeInfoCommand);
		
		Map<String, Object> result = new HashMap<String, Object>();
		
		result.put("success", true);
		
		return result;
	}
	
	
	
	@RequestMapping(value="/workstructure/employees/upload", method=RequestMethod.POST, produces="application/json")
	public Map<String, Object> uploadPhoto(@RequestParam(required=false) Map<String, String> params, HttpServletRequest request){
		ServletContext servletContext = request.getSession().getServletContext();
		
		CommonsMultipartResolver resolver = new CommonsMultipartResolver(servletContext);
		MultipartHttpServletRequest multipartRequest = resolver.resolveMultipart(request);
		
		/*Enumeration parameterNames = multipartRequest.getParameterNames();
		while (parameterNames.hasMoreElements()) {
			String parameterName = (String) parameterNames.nextElement();
			System.out.println("parameterName : " + parameterName);
			
		}*/
		
		Map<String, Object> result = new HashMap<String, Object>();
		
		String fullPath = employeeTempImageFolder;
		String tempFileName = "";
		String fileRandomCode = "";
		
		try{
			for (Iterator<String> iterator =  multipartRequest.getFileNames(); iterator.hasNext();) {
				String fileName =  iterator.next();
				System.out.println(fileName);
				
				MultipartFile file = multipartRequest.getFile(fileName);
				
				fileRandomCode = UUID.randomUUID().toString().toUpperCase();
				tempFileName = fileRandomCode + "_" + file.getOriginalFilename();
				System.out.println("tempFileName : " + tempFileName);
				writeMultipartFile(file, fullPath + tempFileName);
			}
			
			result.put("fileRandomCode", fileRandomCode);
			result.put("tempFileName", tempFileName);
			result.put("success", true);
			
		}catch(Exception e){
			System.out.println(e.getMessage());
			e.printStackTrace();
		}
		
		return result;
	}
	
	@RequestMapping(value="/workstructure/employee/tempimage/{fileName}", method=RequestMethod.GET)
	public void loadTemporaryImage(@PathVariable String fileName, HttpServletResponse resp) throws IOException {
		
		String fullPath = employeeTempImageFolder;
		
		fullPath += fileName + ".jpg";

//		resp.setContentType(mime);
		File file = new File(fullPath);
		
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
	
	@RequestMapping(value="/workstructure/employee/image/{employeeId}", method=RequestMethod.GET)
	public void loadImage(@PathVariable String employeeId, HttpServletResponse resp) throws IOException {
		
		String defaultFile = employeeImageFolder + "cms_default_employee_img.png";
		String fullPath = employeeImageFolder;
		
		if(StringUtils.isEmpty(employeeId) || "default".equals(employeeId)){
			fullPath = defaultFile;
		}else{
			Employee employee = this.workstructureService().employeeWithEmployeeId(employeeId);
			
			if (employee == null) throw new IllegalArgumentException("Employee not found");
			fullPath += "\\" + employeeId + "\\" + employee.photoFileName();
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
	
	private void writeMultipartFile(MultipartFile multipartFile, String filePath) {

		InputStream inputStream = null;
		OutputStream outputStream = null;
		
		try {
			inputStream = multipartFile.getInputStream();

			outputStream = new FileOutputStream(filePath);
			int read = 0;
			byte[] bytes = new byte[256];

			while ((read = inputStream.read(bytes)) != -1) {
				outputStream.write(bytes, 0, read);
			}
			
			System.out.println("end write file");
			
			outputStream.flush();
			outputStream.close();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

	}

	public WorkstructureApplicationService workstructureService() {
		return workstructureService;
	}

}
