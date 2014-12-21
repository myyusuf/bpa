package id.co.oriza.bpa.acc.domain.model;

import id.co.oriza.bpa.base.domain.model.DomainEventSubscriber;

public class AccountGroupRegistered implements DomainEventSubscriber<Object> {

	public AccountGroupRegistered(String aCode, String aName, String code) {
		// TODO Auto-generated constructor stub
	}

	@Override
	public void handleEvent(Object arg0) {
		// TODO Auto-generated method stub

	}

	@Override
	public Class<?> subscribedToEventType() {
		// TODO Auto-generated method stub
		return null;
	}

}
