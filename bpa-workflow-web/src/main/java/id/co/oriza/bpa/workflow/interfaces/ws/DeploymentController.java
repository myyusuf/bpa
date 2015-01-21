package id.co.oriza.bpa.workflow.interfaces.ws;

import id.co.oriza.bpa.workflow.application.TaskService;
import id.co.oriza.bpa.workflow.interfaces.ws.pm.DeploymentPresentationModel;

import java.io.File;
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

import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;

import org.activiti.engine.repository.Deployment;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;
import org.springframework.web.multipart.commons.CommonsMultipartResolver;

@Controller
public class DeploymentController {
	
	private static final int MAX_LIMIT = 10000;
	
	@Autowired
	private TaskService taskService;

	@RequestMapping(value="/workflow/deployments", method=RequestMethod.GET, produces="application/json")
	public Map<String, Object> allDeployments(@RequestParam(required=false) Map<String, String> params){
		
		int start = params.get("pagenum") != null ? Integer.parseInt(params.get("pagenum")) : 0;
		int limit = params.get("pagesize") != null ? Integer.parseInt(params.get("pagesize")) : MAX_LIMIT;
		
		printParamsString(params);
		
		List<DeploymentPresentationModel> deploymentModels = new ArrayList<DeploymentPresentationModel>();
		Collection<Deployment> deployments = this.taskService().allDeployments(start, limit);
		for (Deployment deployment : deployments) {
			DeploymentPresentationModel deploymentModel = new DeploymentPresentationModel(deployment);
			deploymentModels.add(deploymentModel);
		}
		
		Long deploymentsSize = this.taskService().allDeploymentsSize();
		
		Map<String, Object> result = new HashMap<String, Object>();
		
		result.put("num", deploymentsSize);
		result.put("data", deploymentModels);
		result.put("success", true);
		
		return result;
	}
	
	@RequestMapping(value="/workflow/deployments", method=RequestMethod.POST, produces="application/json")
	public Map<String, Object> createDeployment(@RequestParam(required=false) Map<String, String> params, HttpServletRequest request){
//		System.out.println(ServletFileUpload.isMultipartContent(request));
		ServletContext servletContext = request.getSession().getServletContext();
		
		CommonsMultipartResolver resolver = new CommonsMultipartResolver(servletContext);
		MultipartHttpServletRequest multipartRequest = resolver.resolveMultipart(request);
		
		String code = (String) multipartRequest.getParameter("code");
		System.out.println("code : " + code);
		
		
		Map<String, Object> result = new HashMap<String, Object>();
		
		try{
			for (Iterator<String> iterator =  multipartRequest.getFileNames(); iterator.hasNext();) {
				String fileName =  iterator.next();
				System.out.println(fileName);
				
				MultipartFile file = multipartRequest.getFile(fileName);
				System.out.println("file.getName() : " + file.getName());
				writeFile(file);
				taskService.createDeployment(file.getName(), "Deploy BPA", file.getInputStream());
			}
			result.put("success", true);
		}catch(Exception e){
			System.out.println(e.getMessage());
			e.printStackTrace();
		}
		
		
		
		return result;
	}
	
	private void writeFile(MultipartFile multipartFile) {

		InputStream inputStream = null;
		OutputStream outputStream = null;
		
//		String extension = ".txt";
//		if("image/jpeg".equals(multipartFile.getContentType())){
//			extension = ".jpg";
//		}
		
		try {
			inputStream = multipartFile.getInputStream();

			String userImageFolder = "E:\\tests\\bpaupload\\";
//			File newFile = new File(userImageFolder + extension);
			File newFile = new File(userImageFolder + multipartFile.getName());
			if (!newFile.exists()) {
				newFile.createNewFile();
			}
//			outputStream = new FileOutputStream(userImageFolder + extension);
			outputStream = new FileOutputStream(userImageFolder + multipartFile.getName());
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
	
	private void printParams(Map<String, Object> params){
		List<String> listKeys = new ArrayList<String>(params.keySet());
		for (String key : listKeys) {
			System.out.println("key : " + key + ", value : " + params.get(key));
		}
	}
	
	private void printParamsString(Map<String, String> params){
		List<String> listKeys = new ArrayList<String>(params.keySet());
		for (String key : listKeys) {
			System.out.println("key : " + key + ", value : " + params.get(key));
		}
	}

	public TaskService taskService() {
		return taskService;
	}

}
