package id.co.oriza.bpa.base.persistence;

import id.co.oriza.bpa.base.spring.SpringHibernateSessionProvider;

import org.hibernate.Session;

public abstract class AbstractHibernateSession {
	
	private Session session;
	private SpringHibernateSessionProvider sessionProvider;

}
