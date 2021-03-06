package id.co.oriza.bpa.workstructure.infrastructure.persistence;

import id.co.oriza.bpa.base.persistence.AbstractHibernateSession;
import id.co.oriza.bpa.workstructure.domain.model.Position;
import id.co.oriza.bpa.workstructure.domain.model.PositionRepository;

import java.util.Collection;

import javax.validation.ConstraintViolationException;

import org.hibernate.Query;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class HibernatePositionRepository extends AbstractHibernateSession implements PositionRepository{
	
	final Logger logger = LoggerFactory.getLogger(HibernatePositionRepository.class);

	@SuppressWarnings("unchecked")
	@Override
	public Collection<Position> allSimilarlyCodedOrNamed(String aCode,
			String aName, int aStart, int aLimit) {
		
		logger.debug("allSimilarlyCodedOrNamed");
		
		if(aCode.endsWith("%") || aName.endsWith("%")){
			throw new IllegalArgumentException("Code or name prefixes must not include %");
		}
		
		Query query = this.session().createQuery("from id.co.oriza.bpa.workstructure.domain.model.Position as _obj_ "
				+ "where _obj_.code like :aCode "
				+ "or _obj_.name like :aName ");
		query.setString("aCode", aCode + "%");
		query.setString("aName", aName + "%");
		query.setFirstResult(aStart);
		query.setMaxResults(aLimit);
		
		return query.list();
	}

	@Override
	public Position withCode(String aCode) {
		Query query = this.session().createQuery("from id.co.oriza.bpa.workstructure.domain.model.Position as _obj_ "
				+ "where _obj_.code = :aCode ");
		query.setString("aCode", aCode);
		return (Position) query.uniqueResult();
	}

	@Override
	public void add(Position aPosition) {
		try{
			this.session().saveOrUpdate(aPosition);
		}catch(ConstraintViolationException e){
			throw new IllegalStateException("Position is not unique.", e);
		}
		
	}

	@Override
	public int allSimilarlyCodedOrNamedPositionsSize(String aCode, String aName) {
		if(aCode.endsWith("%") || aName.endsWith("%")){
			throw new IllegalArgumentException("code or name prefixes must not include %");
		}
		
		Query query = this.session().createQuery("select count(_obj_) from id.co.oriza.bpa.workstructure.domain.model.Position as _obj_ "
				+ "where _obj_.code like :aCode "
				+ "or _obj_.name like :aName ");
		query.setString("aCode", aCode + "%");
		query.setString("aName", aName + "%");
		
		return ((Long) query.uniqueResult()).intValue();
	}

	@Override
	public void remove(Position position) {
		this.session().delete(position);
	}

}
