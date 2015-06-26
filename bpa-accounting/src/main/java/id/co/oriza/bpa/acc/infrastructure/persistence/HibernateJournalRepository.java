package id.co.oriza.bpa.acc.infrastructure.persistence;

import id.co.oriza.bpa.acc.domain.model.Journal;
import id.co.oriza.bpa.acc.domain.model.JournalId;
import id.co.oriza.bpa.acc.domain.model.JournalRepository;
import id.co.oriza.bpa.acc.domain.model.TransactionId;
import id.co.oriza.bpa.base.persistence.AbstractHibernateSession;

import java.util.Collection;
import java.util.UUID;

import javax.validation.ConstraintViolationException;

import org.hibernate.Query;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class HibernateJournalRepository extends AbstractHibernateSession implements JournalRepository {
	
	final Logger logger = LoggerFactory.getLogger(HibernateJournalRepository.class);
	
	@Override
	public void add(Journal aJournal) {
		try{
			this.session().saveOrUpdate(aJournal);
		}catch(ConstraintViolationException e){
			throw new IllegalStateException("Journal is not unique.", e);
		}

	}

	@SuppressWarnings("unchecked")
	@Override
	public Collection<Journal> allSimilarlyDescribedJournals(String aDescription, int aStart, int aLimit) {
		
		logger.debug("allSimilarlyCodedOrNamedJournals");
		
		if(aDescription.endsWith("%")){
			throw new IllegalArgumentException("description prefixes must not include %");
		}
		
		Query query = this.session().createQuery("from id.co.oriza.bpa.acc.domain.model.Journal as _obj_ "
				+ "where _obj_.description like :aDescription ");
		query.setString("aDescription", aDescription + "%");
		query.setFirstResult(aStart);
		query.setMaxResults(aLimit);
		
		return query.list();
	}
	
	@Override
	public long allSimilarlyDescribedJournalsSize(String aDescription) {
		if(aDescription.endsWith("%") ){
			throw new IllegalArgumentException("description prefixes must not include %");
		}
		
		Query query = this.session().createQuery("select count(_obj_) from id.co.oriza.bpa.acc.domain.model.Journal as _obj_ "
				+ "where _obj_.description like :aDescription "
				+ "or _obj_.name like :aName ");
		query.setString("aDescription", aDescription + "%");
		
		return (Long) query.uniqueResult();
	}
	
	@SuppressWarnings("unchecked")
	@Override
	public Collection<Journal> allWithinTransaction(TransactionId aTransactionId, int aStart, int aLimit) {
		
		logger.debug("allWithinTransaction");
		
		Query query = this.session().createQuery("from id.co.oriza.bpa.acc.domain.model.Journal as _obj_ "
				+ "where _obj_.transactionId = :aTransactionId ");
		query.setParameter("aTransactionId", aTransactionId);
		query.setFirstResult(aStart);
		query.setMaxResults(aLimit);
		
		return query.list();
	}
	
	@Override
	public long allWithinTransactionSize(TransactionId aTransactionId) {
		
		Query query = this.session().createQuery("select count(_obj_) from id.co.oriza.bpa.acc.domain.model.Journal as _obj_ "
				+ "where _obj_.transactionId = :aTransactionId");
		query.setParameter("aTransactionId", aTransactionId);
		
		return (Long) query.uniqueResult();
	}

	@Override
	public void remove(Journal anJournal) {
		this.session().delete(anJournal);
		
	}
	
	@Override
    public JournalId nextIdentity() {
        return new JournalId(UUID.randomUUID().toString().toUpperCase());
    }

}
