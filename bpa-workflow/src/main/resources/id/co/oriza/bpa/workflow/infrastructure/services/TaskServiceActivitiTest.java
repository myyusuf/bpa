package id.co.oriza.bpa.workflow.infrastructure.services;

import java.util.List;

import id.co.oriza.bpa.workflow.application.TaskService;

import org.activiti.engine.repository.Deployment;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import static org.junit.Assert.*;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration("classpath:bpa-workflow-ctx-test.xml")
public class TaskServiceActivitiTest {
	
	@Autowired
	private TaskService taskService;
	
	@Test
	public void testGetDeployments(){
		List<Deployment> deployments = taskService.getDeployments();
		assertNotNull(deployments);
	}

}
