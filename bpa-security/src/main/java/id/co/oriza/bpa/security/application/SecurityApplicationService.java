package id.co.oriza.bpa.security.application;

import id.co.oriza.bpa.security.domain.model.User;
import id.co.oriza.bpa.security.domain.model.UserRepository;

import java.util.Collection;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;

@Transactional
public class SecurityApplicationService {
	
final Logger logger = LoggerFactory.getLogger(SecurityApplicationService.class);
	
	@Autowired
	private UserRepository userRepository;
	
	@Transactional(readOnly=true)
	public Collection<User> allSimilarlyNamedUsers(String aName, int aStart, int aLimit){
		Collection<User> users = this.userRepository().allSimilarlyNamedUsers(aName, aStart, aLimit);
		return users;
	}
	
	@Transactional
	public User newUserWith(NewUserCommand aCommand){
		
		String randomPassword = "admin123!";
		
		User user = new User(aCommand.getUsername(), randomPassword, aCommand.getFirstName(), aCommand.getLastName(), 
				aCommand.getDescription(), null);
		this.userRepository().add(user);
		
		return user;
	}
	
	@Transactional
	public void changeUserInfo(ChangeUserInfoCommand aCommand){
		User user = this.existingUser(aCommand.getUsername());
		user.changeFirstName(aCommand.getFirstName());
		user.changeLastName(aCommand.getLastName());
		user.changeDescription(aCommand.getDescription());
	}
	
	private User existingUser(String aUsername) {
		User user = this.user(aUsername);
		
		if(user == null){
			throw new IllegalArgumentException("User does not exist for : " + aUsername);
		}
		return user;
	}

	private User user(String aUsername) {
		User user = this.userRepository().userWithUsername(aUsername);
		return user;
	}

	public UserRepository userRepository() {
		return userRepository;
	}

}
