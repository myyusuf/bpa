package id.co.oriza.bpa.acc.application;

import java.util.List;

import id.co.oriza.bpa.acc.domain.model.Account;
import id.co.oriza.bpa.acc.domain.model.AccountGroupRepository;
import id.co.oriza.bpa.acc.domain.model.AccountRepository;

import org.junit.Before;
import org.mockito.ArgumentCaptor;
import org.springframework.test.util.ReflectionTestUtils;

import static org.junit.Assert.*;
import static org.mockito.Mockito.*;

public class AccountApplicationServiceTest {
	
	private AccountApplicationService accountApplicationService;
	
	@Before
	public void init(){
		accountApplicationService = new AccountApplicationService();
	}
	
	public void testNewAccountWith(){
		AccountRepository accountRepositoryMock = getAccountRepository();
		AccountGroupRepository accountGroupRepositoryMock = getAccountGroupRepository();
		
		ReflectionTestUtils.setField(accountApplicationService, "accountRepository", accountRepositoryMock);
		ReflectionTestUtils.setField(accountApplicationService, "accountGroupRepository", accountGroupRepositoryMock);
		
		NewAccountCommand aCommand = new NewAccountCommand("1111", "", "", "", "");
		accountApplicationService.newAccountWith(aCommand );
		
		ArgumentCaptor<Account> accountCaptor = ArgumentCaptor.forClass(Account.class);
		List<Account> capturedAccounts = accountCaptor.getAllValues();
		
		verify(accountRepositoryMock).add(accountCaptor.capture());
		assertEquals("1111", capturedAccounts.get(0).code());
	}

	private AccountGroupRepository getAccountGroupRepository() {
		// TODO Auto-generated method stub
		return null;
	}

	private AccountRepository getAccountRepository() {
		AccountRepository accountRepositoryMock = mock(AccountRepository.class);
		return accountRepositoryMock;
	}

}
