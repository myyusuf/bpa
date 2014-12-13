package id.co.oriza.bpa.acc.infrastructure.persistence;

import java.util.Collection;

import id.co.oriza.bpa.acc.domain.model.Account;
import id.co.oriza.bpa.acc.domain.model.AccountRepository;

public class HibernateAccountRepository implements AccountRepository {

	@Override
	public void add(Account anAccount) {
		// TODO Auto-generated method stub

	}

	@Override
	public Collection<Account> allSimilarlyCodeOrNameAccounts(String aCode,
			String aName) {
		// TODO Auto-generated method stub
		return null;
	}

}
