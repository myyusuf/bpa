package id.co.oriza.bpa.workflow.infrastructure.services;

import java.util.List;

import id.co.oriza.bpa.workflow.application.TaskService;

import org.activiti.engine.ProcessEngine;
import org.activiti.engine.RepositoryService;
import org.activiti.engine.repository.Deployment;
import org.junit.Before;
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
	
	RepositoryService repositoryService;
	
	@Autowired
	ProcessEngine processEngine;
	
	@Test
	public void testGetDeployments(){
		List<Deployment> deployments = taskService.getDeployments();
		assertNotNull(deployments);
	}
	
//	@Before
	public void init(){
		repositoryService = processEngine.getRepositoryService();
		Deployment deployment = repositoryService.createDeployment()
				.addClasspathResource("bpmn/SampleWorkflow.bpmn")
				.name("Test BPMN")
				.deploy();
		
		String deploymentId = deployment.getId();
		System.out.println("Deployed id : " + deploymentId);
	}

}
