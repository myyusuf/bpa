package id.co.oriza.bpa.workflow.infrastructure.services;

import static org.junit.Assert.assertNotNull;
import id.co.oriza.bpa.workflow.application.TaskService;

import java.util.List;

import org.activiti.engine.ProcessEngine;
import org.activiti.engine.RepositoryService;
import org.activiti.engine.repository.Deployment;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

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
		List<Deployment> deployments = taskService.allDeployments(0, 1);
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
