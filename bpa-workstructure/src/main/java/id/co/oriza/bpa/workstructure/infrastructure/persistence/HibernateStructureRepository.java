package id.co.oriza.bpa.workstructure.infrastructure.persistence;

import id.co.oriza.bpa.base.persistence.AbstractHibernateSession;
import id.co.oriza.bpa.workstructure.domain.model.Structure;
import id.co.oriza.bpa.workstructure.domain.model.StructureRepository;

import java.util.Collection;

import javax.validation.ConstraintViolationException;

import org.hibernate.Query;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

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

	@Override
	public void deleteAll() {
		Query query = this.session().createQuery("delete from id.co.oriza.bpa.workstructure.domain.model.Structure ");
		query.executeUpdate();
	}
	
	@Override
	public void add(Structure aStructure) {
		try{
			this.session().saveOrUpdate(aStructure);
		}catch(ConstraintViolationException e){
			throw new IllegalStateException("Structure is not unique.", e);
		}

	}

}
