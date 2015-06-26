package id.co.oriza.bpa.acc.infrastructure.persistence;

import id.co.oriza.bpa.acc.domain.model.Transaction;
import id.co.oriza.bpa.acc.domain.model.TransactionId;
import id.co.oriza.bpa.acc.domain.model.TransactionRepository;
import id.co.oriza.bpa.base.persistence.AbstractHibernateSession;

import java.util.Collection;
import java.util.UUID;

import javax.validation.ConstraintViolationException;

import org.hibernate.Query;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class HibernateTransactionRepository extends AbstractHibernateSession implements TransactionRepository {
	
	final Logger logger = LoggerFactory.getLogger(HibernateTransactionRepository.class);
	
	@Override
	public void add(Transaction aTransaction) {
		try{
			this.session().saveOrUpdate(aTransaction);
		}catch(ConstraintViolationException e){
			throw new IllegalStateException("Transaction is not unique.", e);
		}

	}

	@SuppressWarnings("unchecked")
	@Override
	public Collection<Transaction> allSimilarlyNumberedTransactions(String aTransactionNumber, int aStart, int aLimit) {
		
		logger.debug("allSimilarlyNumberedTransactions");
		
		if(aTransactionNumber.endsWith("%")){
			throw new IllegalArgumentException("aTransactionNumber prefixes must not include %");
		}
		
		Query query = this.session().createQuery("from id.co.oriza.bpa.acc.domain.model.Transaction as _obj_ "
				+ "where _obj_.transactionNumber like :aTransactionNumber ");
		query.setString("aDescription", aTransactionNumber + "%");
		query.setFirstResult(aStart);
		query.setMaxResults(aLimit);
		
		return query.list();
	}
	
	@Override
	public long allSimilarlyNumberedTransactionsSize(String aTransactionNumber) {
		if(aTransactionNumber.endsWith("%") ){
			throw new IllegalArgumentException("aTransactionNumber prefixes must not include %");
		}
		
		Query query = this.session().createQuery("select count(_obj_) from id.co.oriza.bpa.acc.domain.model.Transaction as _obj_ "
				+ "where _obj_.transactionNumber like :aTransactionNumber ");
		query.setString("aTransactionNumber", aTransactionNumber + "%");
		
		return (Long) query.uniqueResult();
	}

	@Override
	public void remove(Transaction anTransaction) {
		this.session().delete(anTransaction);
		
	}
	
	@Override
    public TransactionId nextIdentity() {
        return new TransactionId(UUID.randomUUID().toString().toUpperCase());
    }

	@Override
	public Transaction transactionWithNumber(String aTransactionNumber) {
		Query query = this.session().createQuery("from id.co.oriza.bpa.acc.domain.model.Transaction as _obj_ "
				+ "where _obj_.transactionNumber = :aTransactionNumber ");
		query.setString("aTransactionNumber", aTransactionNumber);
		return (Transaction) query.uniqueResult();
	}
	
	@Override
	public Transaction transactionOfId(TransactionId aTransactionId) {
		Query query = this.session().createQuery("from id.co.oriza.bpa.acc.domain.model.Transaction as _obj_ "
				+ "where _obj_.transactionId = :aTransactionId ");
		query.setParameter("aTransactionId", aTransactionId);
		return (Transaction) query.uniqueResult();
	}

}
