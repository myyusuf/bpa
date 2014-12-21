package id.co.oriza.bpa.acc.application;

import java.util.List;
import java.util.UUID;

import id.co.oriza.bpa.acc.domain.model.Account;
import id.co.oriza.bpa.acc.domain.model.AccountGroup;
import id.co.oriza.bpa.acc.domain.model.AccountGroupRepository;
import id.co.oriza.bpa.acc.domain.model.AccountId;
import id.co.oriza.bpa.acc.domain.model.AccountRepository;
import id.co.oriza.bpa.acc.domain.model.MovementType;

import org.junit.Before;
import org.junit.Test;
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
	
	@Test
	public void testNewAccountWith(){
		AccountRepository accountRepositoryMock = getAccountRepository();
		AccountGroupRepository accountGroupRepositoryMock = getAccountGroupRepository();
		
		ReflectionTestUtils.setField(accountApplicationService, "accountRepository", accountRepositoryMock);
		ReflectionTestUtils.setField(accountApplicationService, "accountGroupRepository", accountGroupRepositoryMock);
		
		NewAccountCommand aCommand = new NewAccountCommand("1111", "Kas", "", "", "");
		accountApplicationService.newAccountWith(aCommand );
		
		ArgumentCaptor<Account> accountCaptor = ArgumentCaptor.forClass(Account.class);
		List<Account> capturedAccounts = accountCaptor.getAllValues();
		
		verify(accountRepositoryMock).add(accountCaptor.capture());
		assertEquals("1111", capturedAccounts.get(0).code());
	}

	private AccountGroupRepository getAccountGroupRepository() {
		AccountGroupRepository accountGroupRepositoryMock = mock(AccountGroupRepository.class);
		when(accountGroupRepositoryMock.accountGroupWithCode(anyString())).thenReturn(new AccountGroup("111", "Liability", "", MovementType.DEBET));
		return accountGroupRepositoryMock;
	}

	private AccountRepository getAccountRepository() {
		AccountRepository accountRepositoryMock = mock(AccountRepository.class);
		AccountId accountId = new AccountId(UUID.randomUUID().toString().toUpperCase());
		AccountGroup accountGroup = new AccountGroup("111", "Liability", "", MovementType.DEBET);
		Account account = new Account(accountId, "1111", "Kas", "", null, accountGroup);
		when(accountRepositoryMock.accountWithCode(anyString())).thenReturn(account);
		when(accountRepositoryMock.nextIdentity()).thenReturn(accountId);
		return accountRepositoryMock;
	}

}
