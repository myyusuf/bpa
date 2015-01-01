package id.co.oriza.bpa.base.persistence;

import org.hibernate.FlushMode;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessResourceFailureException;
import org.springframework.orm.hibernate3.SessionFactoryUtils;
import org.springframework.orm.hibernate3.SessionHolder;
import org.springframework.transaction.support.TransactionSynchronizationManager;

public class RepositoryHibernateTest {
	
	@Autowired
    protected SessionFactory sessionFactory;
	
	protected FlushMode flushMode = FlushMode.MANUAL;

    protected void setUp() throws Exception {
        Session session = getSession(this.sessionFactory);
        TransactionSynchronizationManager.bindResource(sessionFactory,new SessionHolder(session));
        System.out.println("Hibernate session is bound");
    }

    protected void tearDown() throws Exception {
        SessionHolder sessionHolder = (SessionHolder) TransactionSynchronizationManager.unbindResource(sessionFactory);
        closeSession(sessionHolder.getSession(), sessionFactory);
        System.out.println("Hibernate session is closed");
    }

    protected void closeSession(Session session, SessionFactory sessionFactory) {
        SessionFactoryUtils.closeSession(session);
    }

    protected Session getSession(SessionFactory sessionFactory) throws DataAccessResourceFailureException {
        Session session = SessionFactoryUtils.getSession(sessionFactory, true);
        FlushMode flushMode = this.flushMode;
        if (flushMode != null) {
            session.setFlushMode(flushMode);
        }
        return session;
    }
	
}
