package id.co.oriza.bpa.itrack.infrastructure.persistence;

import java.util.Collection;

import org.hibernate.Query;

import id.co.oriza.bpa.base.persistence.AbstractHibernateSession;
import id.co.oriza.bpa.itrack.domain.model.Issue;
import id.co.oriza.bpa.itrack.domain.model.IssueRepository;

public class HibernateIssueRepository extends AbstractHibernateSession implements IssueRepository {

	@SuppressWarnings("unchecked")
	@Override
	public Collection<Issue> allIssues(int aStart, int aLimit) {
		Query query = this.session().createQuery("from id.co.oriza.bpa.itract.domain.model.Issue as _obj_ ");
		query.setFirstResult(aStart);
		query.setMaxResults(aLimit);
		
		return query.list();
	}

}
