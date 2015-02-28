package id.co.oriza.bpa.itrack.interfaces.ws;

import java.util.ArrayList;
import java.util.Collection;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import id.co.oriza.bpa.base.interfaces.ws.CommonController;
import id.co.oriza.bpa.itrack.domain.model.Issue;
import id.co.oriza.bpa.itrack.interfaces.ws.pm.IssuePresentationModel;
import id.co.oriza.bpa.workflow.domain.model.User;
import id.co.oriza.bpa.workflow.interfaces.ws.pm.UserPresentationModel;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

public class IssueController extends CommonController{
	
	private static final int MAX_LIMIT = 10000;
	
	final Logger logger = LoggerFactory.getLogger(IssueController.class);
	
	@Autowired
	private IssueService issueService;
	
	@RequestMapping(value="/issuetracking/issues", method=RequestMethod.GET, produces="application/json")
	public Map<String, Object> allIssues(@RequestParam(required=false) Map<String, String> params){
		
		int start = params.get("pagenum") != null ? Integer.parseInt(params.get("pagenum")) : 0;
		int limit = params.get("pagesize") != null ? Integer.parseInt(params.get("pagesize")) : MAX_LIMIT;
		
		printParamsString(params);
		
		List<IssuePresentationModel> issueModels = new ArrayList<IssuePresentationModel>();
		Collection<Issue> issues = this.issueService().allIssues(start, limit);
		for (Issue issue : issues) {
			IssuePresentationModel issueModel = new IssuePresentationModel(issue);
			issueModels.add(issueModel);
		}
		
		Long issuesSize = this.issueService().allIssuesSize();
		
		Map<String, Object> result = new HashMap<String, Object>();
		
		result.put("num", issuesSize);
		result.put("data", issueModels);
		result.put("success", true);
		
		return result;
	}

}
