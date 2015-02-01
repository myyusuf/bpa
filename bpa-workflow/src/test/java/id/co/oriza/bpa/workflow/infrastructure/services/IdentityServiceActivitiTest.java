package id.co.oriza.bpa.workflow.infrastructure.services;

import static org.junit.Assert.assertNotNull;
import id.co.oriza.bpa.workflow.application.ChangeGroupNameCommand;
import id.co.oriza.bpa.workflow.application.IdentityService;
import id.co.oriza.bpa.workflow.domain.model.User;

import java.util.List;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration("classpath:bpa-workflow-ctx-test.xml")
public class IdentityServiceActivitiTest {
	
	@Autowired
	private IdentityService identityService;
	
	@Test
	public void testUsers(){
		List<User> allUsers = identityService.allUsers(0, 100);
		assertNotNull(allUsers);
	}
	
	@Test
	public void testChangeGroupName(){
		ChangeGroupNameCommand aCommand = new ChangeGroupNameCommand("my", "myyxx");
		identityService.changeGroupName(aCommand);
	}

}
