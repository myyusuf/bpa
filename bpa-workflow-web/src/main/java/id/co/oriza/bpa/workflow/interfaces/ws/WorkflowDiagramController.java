package id.co.oriza.bpa.workflow.interfaces.ws;

import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import id.co.oriza.bpa.base.interfaces.ws.CommonController;
import id.co.oriza.bpa.workflow.application.TaskService;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
public class WorkflowDiagramController extends CommonController {
	
	final Logger logger = LoggerFactory.getLogger(WorkflowDiagramController.class);
	
	@Autowired
	private TaskService taskService;
	
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
	
	@RequestMapping(value="/workflow/diagram/definition", method=RequestMethod.GET, produces="application/json")
	public void getDiagramByDefinitionId(HttpServletRequest request, HttpServletResponse response, 
			@RequestParam(required=false) Map<String, String> params){
		
		printParamsString(params);
		String processDefinitionId = params.get("processDefinitionId") != null ? params.get("processDefinitionId") : "";
		
		InputStream is = taskService.getBpmnResourceAsStreamByProcessDefinitionId(processDefinitionId);
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

}
