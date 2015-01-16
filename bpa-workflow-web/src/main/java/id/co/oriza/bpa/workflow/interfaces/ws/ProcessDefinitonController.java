package id.co.oriza.bpa.workflow.interfaces.ws;

import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;
import org.springframework.web.multipart.commons.CommonsMultipartResolver;

@Controller
public class ProcessDefinitonController {
	
	@RequestMapping(value="/workflow/processdefinitions", method=RequestMethod.POST, produces="application/json")
	public Map<String, Object> saveUser(@RequestParam(required=false) Map<String, String> params, HttpServletRequest request){
//		System.out.println(ServletFileUpload.isMultipartContent(request));
		ServletContext servletContext = request.getSession().getServletContext();
		
		CommonsMultipartResolver resolver = new CommonsMultipartResolver(servletContext);
		MultipartHttpServletRequest multipartRequest = resolver.resolveMultipart(request);
		
//		String username = (String) multipartRequest.getParameter("username");
		
		
		Map<String, Object> result = new HashMap<String, Object>();
		
		try{
			for (Iterator<String> iterator =  multipartRequest.getFileNames(); iterator.hasNext();) {
				String fileName =  iterator.next();
				System.out.println(fileName);
				
				MultipartFile file = multipartRequest.getFile(fileName);
				System.out.println("file.getName() : " + file.getName());
			}
			result.put("success", true);
		}catch(Exception e){
			System.out.println(e.getMessage());
			e.printStackTrace();
		}
		
		return result;
	}

}
