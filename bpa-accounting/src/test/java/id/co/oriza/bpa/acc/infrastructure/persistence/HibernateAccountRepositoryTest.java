package id.co.oriza.bpa.acc.infrastructure.persistence;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotNull;
import id.co.oriza.bpa.acc.domain.model.Account;
import id.co.oriza.bpa.acc.domain.model.AccountRepository;

import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.Reader;
import java.sql.Statement;
import java.util.Collection;

import javax.sql.DataSource;

import org.dbunit.database.IDatabaseConnection;
import org.dbunit.dataset.IDataSet;
import org.dbunit.dataset.xml.FlatXmlDataSet;
import org.dbunit.ext.mysql.MySqlConnection;
import org.dbunit.operation.DatabaseOperation;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration("classpath:bpa-accounting-ctx-test.xml")
public class HibernateAccountRepositoryTest {
	
	@Autowired
	private DataSource dataSource;
	
	@Autowired
	private AccountRepository accountRepository;
	
	private IDatabaseConnection connection;
	
	private static final String DATASET_FILE_EMPTY = "/fixtures/account_empty.xml";
	private static final String DATASET_FILE_CREATE = "/fixtures/account_create.xml";
	
	@Before
    public void setUp() throws Exception {
        connection = new MySqlConnection(dataSource.getConnection(), null);
        Statement statement = connection.getConnection().createStatement();
        statement.addBatch("SET FOREIGN_KEY_CHECKS=0");
        statement.executeBatch();
        DatabaseOperation.DELETE_ALL.execute(connection, getDataSet(DATASET_FILE_EMPTY));
        statement.addBatch("SET FOREIGN_KEY_CHECKS=1");
        statement.executeBatch();
    }
	
	@Test
	public void testAllSimilarlyCodedOrNamedAccounts() throws Exception{
		DatabaseOperation.INSERT.execute(connection, getDataSet(DATASET_FILE_CREATE));
		Collection<Account> allSimilarlyCodedOrNamedAccounts = accountRepository.allSimilarlyCodedOrNamedAccounts("", "", 0, 10);
		assertEquals(2, allSimilarlyCodedOrNamedAccounts.size());
	}
	
	@Test
	public void allAccountParents() throws Exception{
		DatabaseOperation.INSERT.execute(connection, getDataSet(DATASET_FILE_CREATE));
		Collection<Account> accounts = accountRepository.allAccountParents("", "");
		assertEquals(0, accounts.size());
	}
	
	protected IDataSet getDataSet(String userDataSet) throws Exception {
		InputStream inputStream = getClass().getResourceAsStream(userDataSet);
		assertNotNull("File : " + userDataSet + " not found in classpath", inputStream);
		Reader reader = new InputStreamReader(inputStream);
		FlatXmlDataSet dataSet = new FlatXmlDataSet(reader);
		return dataSet;
	}
}
