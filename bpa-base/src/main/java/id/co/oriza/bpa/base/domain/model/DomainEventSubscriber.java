package id.co.oriza.bpa.base.domain.model;

public interface DomainEventSubscriber<T> {

	public void handleEvent(T aDomainEvent);
	public Class<?> subscribedToEventType();

}
