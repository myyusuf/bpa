package id.co.oriza.bpa.acc.application;

import id.co.oriza.bpa.acc.domain.model.AccountGroupRepository;
import id.co.oriza.bpa.acc.domain.model.AccountRepository;

import org.junit.Before;
import org.springframework.test.util.ReflectionTestUtils;

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
	}

	private AccountGroupRepository getAccountGroupRepository() {
		// TODO Auto-generated method stub
		return null;
	}

	private AccountRepository getAccountRepository() {
		// TODO Auto-generated method stub
		return null;
	}

}
