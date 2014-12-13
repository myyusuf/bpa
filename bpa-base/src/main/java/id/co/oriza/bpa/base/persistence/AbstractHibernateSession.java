package id.co.oriza.bpa.base.persistence;

import id.co.oriza.bpa.base.spring.SpringHibernateSessionProvider;

import org.hibernate.Session;

public abstract class AbstractHibernateSession {
	
	private Session session;
	private SpringHibernateSessionProvider sessionProvider;
	
	protected AbstractHibernateSession(){
		super();
	}
	
	protected AbstractHibernateSession(Session aSession){
		this();
		this.setSession(aSession);
	}

	protected void setSession(Session aSession) {
		this.session = aSession;
	}

	public void setSessionProvider(SpringHibernateSessionProvider aSessionProvider) {
		this.sessionProvider = aSessionProvider;
	}
	
	protected Session session(){
		Session actualSession = this.session;
		if(actualSession == null){
			if(this.sessionProvider == null){
				throw new IllegalStateException("Require either a Session or SpringHibernateSessionProvider");
			}
			
			actualSession = this.sessionProvider.session();
		}
		
		return actualSession;
	}

}
