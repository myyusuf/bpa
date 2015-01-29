package id.co.oriza.bpa.base.interfaces.ws;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.web.multipart.MultipartFile;

public abstract class CommonController {
	
	protected void printParams(Map<String, Object> params){
		List<String> listKeys = new ArrayList<String>(params.keySet());
		for (String key : listKeys) {
			System.out.println("key : " + key + ", value : " + params.get(key));
		}
	}
	
	protected void printParamsString(Map<String, String> params){
		List<String> listKeys = new ArrayList<String>(params.keySet());
		for (String key : listKeys) {
			System.out.println("key : " + key + ", value : " + params.get(key));
		}
	}
	
	protected void writeFile(MultipartFile multipartFile, String filePath) {

		InputStream inputStream = null;
		OutputStream outputStream = null;
		
//		String extension = ".txt";
//		if("image/jpeg".equals(multipartFile.getContentType())){
//			extension = ".jpg";
//		}
		
		try {
			inputStream = multipartFile.getInputStream();

//			String userImageFolder = "E:\\tests\\bpaupload\\";
			String userImageFolder = filePath;
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

}
