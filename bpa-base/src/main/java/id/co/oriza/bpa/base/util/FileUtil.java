package id.co.oriza.bpa.base.util;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;

import org.springframework.util.FileCopyUtils;

public class FileUtil {
	
	public static void forceMakeDirectory(String directory){
		File file = new File(directory);
		if(!file.exists()){
			file.mkdirs();
		}
	}
	
	public static void forceSaveFile(String directory, String fileName, InputStream inputStream){
		forceMakeDirectory(directory);
		String fullFilePath = directory + "/" + fileName;
		writeFile(inputStream, fullFilePath);
	}
	
	public static void writeFile(InputStream inputStream, String filePath) {

		OutputStream outputStream = null;
		
		try {
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
	
	public static void copyFile(String fromFilePath, String toFilePath){
		try {
			FileCopyUtils.copy(new File(fromFilePath), new File(toFilePath));
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
	
	public static void deleteDirectory(String dirPath){
		File directory = new File(dirPath);
		if(directory.exists()){
			File[] listFiles = directory.listFiles();
			for (File file : listFiles) {
				file.delete();
			}
			
			directory.delete();
		}
	}

}
