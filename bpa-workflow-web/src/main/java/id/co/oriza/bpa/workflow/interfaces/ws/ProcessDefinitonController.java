package id.co.oriza.bpa.workflow.interfaces.ws;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
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
		
		String extension = ".txt";
		if("image/jpeg".equals(multipartFile.getContentType())){
			extension = ".jpg";
		}
		
		try {
			inputStream = multipartFile.getInputStream();

			String userImageFolder = "E:\\tests\\bpaupload\\result";
			File newFile = new File(userImageFolder + extension);
			if (!newFile.exists()) {
				newFile.createNewFile();
			}
			outputStream = new FileOutputStream(userImageFolder + extension);
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

}
