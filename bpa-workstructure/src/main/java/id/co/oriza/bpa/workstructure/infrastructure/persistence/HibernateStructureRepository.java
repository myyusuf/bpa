package id.co.oriza.bpa.workstructure.infrastructure.persistence;

import java.util.Collection;

import org.hibernate.Query;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import id.co.oriza.bpa.base.persistence.AbstractHibernateSession;
import id.co.oriza.bpa.workstructure.domain.model.Structure;
import id.co.oriza.bpa.workstructure.domain.model.StructureRepository;

public class HibernateStructureRepository extends AbstractHibernateSession implements StructureRepository {
	
	final Logger logger = LoggerFactory.getLogger(HibernateStructureRepository.class);

	@SuppressWarnings("unchecked")
	@Override
	public Collection<Structure> all(int aStart, int aLimit) {
		logger.debug("all");
		
		Query query = this.session().createQuery("from id.co.oriza.bpa.workstructure.domain.model.Structure as _obj_ "
				+ "left join fetch _obj_.employee e "
				+ "left join fetch _obj_.position p ");
		query.setFirstResult(aStart);
		query.setMaxResults(aLimit);
		
		return query.list();
	}

}
