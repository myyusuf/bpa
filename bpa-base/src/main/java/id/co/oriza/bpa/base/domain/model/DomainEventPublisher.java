package id.co.oriza.bpa.base.domain.model;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

public class DomainEventPublisher {
	
	private static final ThreadLocal<DomainEventPublisher> instance = new ThreadLocal<DomainEventPublisher>(){
		protected DomainEventPublisher initialValue(){
			return new DomainEventPublisher();
		}
	};
	
	private boolean publishing;
	
	@SuppressWarnings("rawtypes")
	private List subscribers;
	
	public static DomainEventPublisher instance(){
		return instance.get();
	}
	
	public <T> void publish(final T aDOmainEvent){
		if(!this.isPublishing() && this.hasSubscribers()){
			
			try{
				this.setPublishing(true);
				
				Class<?> eventType = aDOmainEvent.getClass();
				@SuppressWarnings("unchecked")
				List<DomainEventSubscriber<T>> allSubscribers = this.subscribers();
				for (DomainEventSubscriber<T> subscriber : allSubscribers) {
					Class<?> subscribedToType = subscriber.subscribedToEventType();
					
					if(eventType == subscribedToType){
						subscriber.handleEvent(aDOmainEvent);
					}
				}
			}finally{
				this.setPublishing(false);
			}
			
		}
		
	}
	
	@SuppressWarnings("rawtypes")
	private List subscribers() {
		return this.subscribers;
	}

	public void publishAll(Collection<DomainEvent> aDomainEvents){
		for (DomainEvent domainEvent : aDomainEvents) {
			this.publish(domainEvent);
		}
	}
	
	public void reset(){
		if(!this.isPublishing()){
			this.setSubscribers(null);
		}
	}
	
	@SuppressWarnings("unchecked")
	public<T> void publish(DomainEventSubscriber<T> aSubscriber){
		if(!this.isPublishing()){
			this.ensureSubscribersList();
			this.subscribers.add(aSubscriber);
		}
	}

	@SuppressWarnings("rawtypes")
	private void ensureSubscribersList() {
		if(!this.hasSubscribers()){
			this.setSubscribers(new ArrayList());
		}
	}

	private DomainEventPublisher(){
		super();
		this.setPublishing(false);
		this.ensureSubscribersList();
	}
	public boolean isPublishing() {
		return publishing;
	}

	public void setPublishing(boolean publishing) {
		this.publishing = publishing;
	}
	
	private boolean hasSubscribers(){
		return this.subscribers != null;
	}

	@SuppressWarnings("rawtypes")
	public void setSubscribers(List aSubscribersList) {
		this.subscribers = aSubscribersList;
	}

}
