package id.co.oriza.bpa.acc.infrastructure.persistence;

import id.co.oriza.bpa.acc.domain.model.Account;
import id.co.oriza.bpa.acc.domain.model.AccountRepository;

import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.Reader;
import java.sql.SQLException;
import java.util.Collection;

import javax.sql.DataSource;

import org.dbunit.DatabaseUnitException;
import org.dbunit.database.IDatabaseConnection;
import org.dbunit.dataset.IDataSet;
import org.dbunit.dataset.xml.FlatXmlDataSet;
import org.dbunit.ext.oracle.OracleConnection;
import org.dbunit.operation.DatabaseOperation;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import static org.junit.Assert.*;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration("classpath:bpa-accounting-ctx.xml")
public class HibernateAccountRepositoryTest {
	
	@Autowired
	private DataSource dataSource;
	
	@Autowired
	private AccountRepository accountRepository;
	
	private IDatabaseConnection connection;
	
	private static final String DATASET_FILE_EMPTY = "/fixtures/account_empty.xml";
	private static final String DATASET_FILE_CREATE = "/fixtures/account_create.xml";
	
	@Before
	public void initiate(){
		try {
			connection = new OracleConnection(dataSource.getConnection(), "bpa_phase_1");
			DatabaseOperation.DELETE_ALL.execute(connection, getDataSet(DATASET_FILE_EMPTY));
		} catch (DatabaseUnitException e) {
			e.printStackTrace();
		} catch (SQLException e) {
			e.printStackTrace();
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	
	@Test
	public void testAllSimilarlyCodedOrNamedAccounts() throws Exception{
		DatabaseOperation.INSERT.execute(connection, getDataSet(DATASET_FILE_CREATE));
		Collection<Account> allSimilarlyCodedOrNamedAccounts = accountRepository.allSimilarlyCodedOrNamedAccounts("", "", 0, 1);
		assertEquals(1, allSimilarlyCodedOrNamedAccounts.size());
		
	}
	
	protected IDataSet getDataSet(String name) throws Exception {
		InputStream inputStream = getClass().getResourceAsStream(name);
		assertNotNull("file"+name+" not found in classpath", inputStream);
		Reader reader = new InputStreamReader(inputStream);
		FlatXmlDataSet dataset = new FlatXmlDataSet(reader);
		return dataset;
	}
}
