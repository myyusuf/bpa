package id.co.oriza.bpa.workflow.interfaces.ws;

import id.co.oriza.bpa.base.interfaces.ws.CommonController;
import id.co.oriza.bpa.workflow.application.TaskService;
import id.co.oriza.bpa.workflow.interfaces.ws.pm.DeploymentPresentationModel;

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
import javax.servlet.http.HttpServletResponse;

import org.activiti.engine.repository.Deployment;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;
import org.springframework.web.multipart.commons.CommonsMultipartResolver;

@Controller
public class DeploymentController extends CommonController {
	
	private static final int MAX_LIMIT = 10000;
	
	final Logger logger = LoggerFactory.getLogger(DeploymentController.class);
	
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
		
		String name = (String) multipartRequest.getParameter("name");
		System.out.println("name : " + name);
		
		
		Map<String, Object> result = new HashMap<String, Object>();
		
		try{
			for (Iterator<String> iterator =  multipartRequest.getFileNames(); iterator.hasNext();) {
				String fileName =  iterator.next();
				System.out.println(fileName);
				
				MultipartFile file = multipartRequest.getFile(fileName);
				System.out.println("file.getName() : " + file.getName());
//				writeFile(file);
				this.taskService().createDeployment(name, file.getName(), file.getInputStream());
			}
			result.put("success", true);
		}catch(Exception e){
			System.out.println(e.getMessage());
			e.printStackTrace();
		}
		
		return result;
	}
	
	@RequestMapping(value="/workflow/deployments", method=RequestMethod.DELETE, produces="application/json")
	public Map<String, Object> deleteDeployment(@RequestBody(required=false) Map<String, Object> params){
		
		logger.debug("delete deployment");
		
		String deploymentId = (String) params.get("id");
		
		this.taskService().deleteDeployment(deploymentId);
		
		Map<String, Object> result = new HashMap<String, Object>();
		result.put("success", true);
		
		return result;
	}
	
	@RequestMapping(value="/workflow/diagram", method=RequestMethod.GET, produces="application/json")
	public void getDiagram(HttpServletRequest request, HttpServletResponse response, 
			@RequestParam(required=false) Map<String, String> params){
		
		printParamsString(params);
		String deploymentId = params.get("deploymentId") != null ? params.get("deploymentId") : "";
		
		InputStream is = taskService.getBpmnResourceAsStream(deploymentId);
		try {
			writeToOutputStream(is, response.getOutputStream());
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
	
	private void writeToOutputStream(InputStream inputStream, OutputStream outputStream){
		try {
	 
			int read = 0;
			byte[] bytes = new byte[1024];
	 
			while ((read = inputStream.read(bytes)) != -1) {
				outputStream.write(bytes, 0, read);
			}
	 
			System.out.println("Done!");
	 
		} catch (IOException e) {
			e.printStackTrace();
		} finally {
			if (inputStream != null) {
				try {
					inputStream.close();
				} catch (IOException e) {
					e.printStackTrace();
				}
			}
			if (outputStream != null) {
				try {
					// outputStream.flush();
					outputStream.close();
				} catch (IOException e) {
					e.printStackTrace();
				}
			}
		}
		
	}

	public TaskService taskService() {
		return taskService;
	}

}
