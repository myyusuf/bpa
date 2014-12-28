package id.co.oriza.bpa.security.domain.model;

import org.springframework.beans.BeansException;
import org.springframework.context.ApplicationContext;
import org.springframework.context.ApplicationContextAware;

public class DomainRegistry implements ApplicationContextAware{
	
	private static ApplicationContext applicationContext;

	@Override
	public void setApplicationContext(ApplicationContext anApplicationContext)
			throws BeansException {
		if (DomainRegistry.applicationContext == null) {
            DomainRegistry.applicationContext = anApplicationContext;
        }
		
	}
	
	public static EncryptionService encryptionService() {
        return (EncryptionService) applicationContext.getBean("encryptionService");
    }
	
	public static PasswordService passwordService() {
        return (PasswordService) applicationContext.getBean("passwordService");
    }

}
