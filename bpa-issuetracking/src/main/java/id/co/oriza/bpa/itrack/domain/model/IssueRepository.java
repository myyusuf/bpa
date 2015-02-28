package id.co.oriza.bpa.itrack.domain.model;

import java.util.Collection;

public interface IssueRepository {

	Collection<Issue> allIssues(int aStart, int aLimit);

}
