package id.co.oriza.bpa.workstructure.infrastructure.persistence;

import id.co.oriza.bpa.base.persistence.AbstractHibernateSession;
import id.co.oriza.bpa.workstructure.domain.model.Employee;
import id.co.oriza.bpa.workstructure.domain.model.EmployeeRepository;

import java.util.Collection;

import org.hibernate.Query;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class HibernateEmployeeRepository  extends AbstractHibernateSession implements EmployeeRepository{
	
	final Logger logger = LoggerFactory.getLogger(HibernateEmployeeRepository.class);

	@SuppressWarnings("unchecked")
	@Override
	public Collection<Employee> allSimilarlyEmployeeIdOrNamed(
			String anEmployeeId, String aName, int aStart, int aLimit) {
		
		logger.debug("allSimilarlyEmployeeIdOrNamed");
		
		if(anEmployeeId.endsWith("%") || aName.endsWith("%")){
			throw new IllegalArgumentException("EmployeeId or name prefixes must not include %");
		}
		
		Query query = this.session().createQuery("from id.co.oriza.bpa.workstructure.domain.model.Employee as _obj_ "
				+ "where _obj_.employeeId like :anEmployeeId "
				+ "or _obj_.name like :aName ");
		query.setString("anEmployeeId", anEmployeeId + "%");
		query.setString("aName", aName + "%");
		query.setFirstResult(aStart);
		query.setMaxResults(aLimit);
		
		return query.list();
	}

}
