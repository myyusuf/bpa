package id.co.oriza.bpa.itrack.application;

import java.util.Collection;

import id.co.oriza.bpa.itrack.domain.model.Issue;
import id.co.oriza.bpa.itrack.domain.model.IssueRepository;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;

@Transactional
public class IssueApplicationService {
	
	final Logger logger = LoggerFactory.getLogger(IssueApplicationService.class);
	
	@Autowired
	private IssueRepository issueRepository;
	
	@Transactional(readOnly=true)
	public Collection<Issue> allIssues(int aStart, int aLimit){
		Collection<Issue> issues = this.issueRepository().allIssues(aStart, aLimit);
		return issues;
	}

	public IssueRepository issueRepository() {
		return issueRepository;
	}

}
