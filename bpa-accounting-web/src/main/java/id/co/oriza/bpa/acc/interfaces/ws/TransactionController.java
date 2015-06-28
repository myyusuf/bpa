package id.co.oriza.bpa.acc.interfaces.ws;

import id.co.oriza.bpa.acc.application.NewJournalCommand;
import id.co.oriza.bpa.acc.application.NewTransactionCommand;
import id.co.oriza.bpa.acc.application.TransactionApplicationService;
import id.co.oriza.bpa.acc.domain.model.AccountGroup;
import id.co.oriza.bpa.acc.domain.model.Currency;
import id.co.oriza.bpa.acc.domain.model.Journal;
import id.co.oriza.bpa.acc.domain.model.Transaction;
import id.co.oriza.bpa.acc.interfaces.ws.pm.AccountGroupPresentationModel;
import id.co.oriza.bpa.acc.interfaces.ws.pm.CurrencyPresentationModel;
import id.co.oriza.bpa.acc.interfaces.ws.pm.JournalPresentationModel;
import id.co.oriza.bpa.acc.interfaces.ws.pm.TransactionPresentationModel;
import id.co.oriza.bpa.base.interfaces.ws.CommonController;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
public class TransactionController extends CommonController{
	
final Logger logger = LoggerFactory.getLogger(TransactionController.class);
	
	private static final int MAX_LIMIT = 100000;
	
	@Autowired
	private TransactionApplicationService transactionApplicationService;
	
	@RequestMapping(value="/accounting/transactions", method=RequestMethod.GET, produces="application/json")
	public Map<String, Object> getTransactions(@RequestParam(required=false) Map<String, String> params){
		
		int start = params.get("pagenum") != null ? Integer.parseInt(params.get("pagenum")) : 0;
		int limit = params.get("pagesize") != null ? Integer.parseInt(params.get("pagesize")) : MAX_LIMIT;
		
		String transactionNumberStartsWith = params.get("transactionNumberStartsWith") != null ? params.get("transactionNumberStartsWith") : "";
		
		printParamsString(params);
		
		List<TransactionPresentationModel> transactionModels = new ArrayList<TransactionPresentationModel>();
		Collection<Transaction> transactions = this.transactionApplicationService().allSimilarlyNumberedTransactions(transactionNumberStartsWith, start, limit);
		for (Transaction transaction : transactions) {
			TransactionPresentationModel transactionModel = new TransactionPresentationModel(transaction);
			transactionModels.add(transactionModel);
		}
		
		int transactionsSize = this.transactionApplicationService().allSimilarlyNumberedTransactionsSize(transactionNumberStartsWith);
		
		Map<String, Object> result = new HashMap<String, Object>();
		
		result.put("num", transactionsSize);
		result.put("data", transactionModels);
		result.put("success", true);
		
		return result;
	}
	
	@RequestMapping(value="/accounting/transactions/{transactionId}/journals", method=RequestMethod.GET, produces="application/json")
	public Map<String, Object> getTransactionJournals(@PathVariable String transactionId, @RequestParam(required=false) Map<String, String> params){
		
		int start = params.get("pagenum") != null ? Integer.parseInt(params.get("pagenum")) : 0;
		int limit = params.get("pagesize") != null ? Integer.parseInt(params.get("pagesize")) : MAX_LIMIT;
		
		printParamsString(params);
		
		List<JournalPresentationModel> journalModels = new ArrayList<JournalPresentationModel>();
		Collection<Journal> journals = this.transactionApplicationService().allJournalsWithinTransaction(transactionId, start, limit);
		for (Journal journal : journals) {
			JournalPresentationModel journalModel = new JournalPresentationModel(journal);
			journalModels.add(journalModel);
		}
		
		int transactionsSize = this.transactionApplicationService().allJournalsWithinTransactionSize(transactionId);
		
		Map<String, Object> result = new HashMap<String, Object>();
		
		result.put("num", transactionsSize);
		result.put("data", journalModels);
		result.put("success", true);
		
		return result;
	}
	
	@SuppressWarnings("unchecked")
	@RequestMapping(value="/accounting/transactions", method=RequestMethod.POST, produces="application/json")
	public Map<String, Object> createTransaction(@RequestBody(required=false) Map<String, Object> params){
		
		logger.debug("create transaction");
		
		String transactionNumber = (String) params.get("transactionNumber");
		Long createdTimeInLong = (Long) params.get("createdTime");
		String description = (String) params.get("description");
		
		Date createdTime = new Date(createdTimeInLong);
		List<NewJournalCommand> newJournalCommands = new ArrayList<NewJournalCommand>();
		
		List<Map<String, Object>> journalsMap = (List<Map<String, Object>>) params.get("journals");
		for (Map<String, Object> journalMap : journalsMap) {
			
			Map<String, String> accountMap = (Map<String, String>) params.get("account");
			Map<String, String> currencyMap = (Map<String, String>) params.get("currency");
			Map<String, String> positionMap = (Map<String, String>) params.get("position");
			
			String accountCode = accountMap.get("code");
			BigDecimal amount = new BigDecimal((String) journalMap.get("amount"));
			String currencyCode = (String) currencyMap.get("code");
			BigDecimal kurs = new BigDecimal((String) journalMap.get("kurs"));
			String positionCode = (String) positionMap.get("code");
			String journalDescription = (String) journalMap.get("description");
			NewJournalCommand newJournalCommand = new NewJournalCommand(createdTime, accountCode, amount, currencyCode, kurs, positionCode, journalDescription);
			newJournalCommands.add(newJournalCommand);
		}
		
		NewTransactionCommand newTransactionCommand = new NewTransactionCommand(transactionNumber, description, createdTime , newJournalCommands);
		this.transactionApplicationService().newTransactionWith(newTransactionCommand);
		
		Map<String, Object> result = new HashMap<String, Object>();
		
		result.put("success", true);
		
		return result;
	}
	
	@RequestMapping(value="/accounting/journals", method=RequestMethod.GET, produces="application/json")
	public Map<String, Object> getJournals(@RequestParam(required=false) Map<String, String> params){
		
		int start = params.get("pagenum") != null ? Integer.parseInt(params.get("pagenum")) : 0;
		int limit = params.get("pagesize") != null ? Integer.parseInt(params.get("pagesize")) : MAX_LIMIT;
		
		String descriptionStartsWith = params.get("descriptionStartsWith") != null ? params.get("descriptionStartsWith") : "";
		
		printParamsString(params);
		
		List<JournalPresentationModel> journalModels = new ArrayList<JournalPresentationModel>();
		Collection<Journal> journals = this.transactionApplicationService().allSimilarlyDescribedJournals(descriptionStartsWith, start, limit);
		for (Journal journal : journals) {
			JournalPresentationModel journalModel = new JournalPresentationModel(journal);
			journalModels.add(journalModel);
		}
		
		int journalsSize = this.transactionApplicationService().allSimilarlyDescribedJournalsSize(descriptionStartsWith);
		
		Map<String, Object> result = new HashMap<String, Object>();
		
		result.put("num", journalsSize);
		result.put("data", journalModels);
		result.put("success", true);
		
		return result;
	}
	
	@RequestMapping(value="/accounting/currencies", method=RequestMethod.GET, produces="application/json")
	public Map<String, Object> getCurrencies(@RequestParam(required=false) Map<String, String> params){
		
		int start = params.get("pagenum") != null ? Integer.parseInt(params.get("pagenum")) : 0;
		int limit = params.get("pagesize") != null ? Integer.parseInt(params.get("pagesize")) : MAX_LIMIT;
		
		String codeOrNameStartsWith = params.get("codeOrNameStartsWith") != null ? params.get("codeOrNameStartsWith") : "";
		
		printParamsString(params);
		
		List<CurrencyPresentationModel> currencyModels = new ArrayList<CurrencyPresentationModel>();
		Collection<Currency> currencys = this.transactionApplicationService().allSimilarlyCodedOrNamedCurrencies(codeOrNameStartsWith, codeOrNameStartsWith, start, limit);
		for (Currency currency : currencys) {
			CurrencyPresentationModel currencyModel = new CurrencyPresentationModel(currency);
			currencyModels.add(currencyModel);
		}
		
		int currencysSize = this.transactionApplicationService().allSimilarlyCodedOrNamedCurrenciesSize(codeOrNameStartsWith, codeOrNameStartsWith);
		
		Map<String, Object> result = new HashMap<String, Object>();
		
		result.put("num", currencysSize);
		result.put("data", currencyModels);
		result.put("success", true);
		
		return result;
	}
	

	public TransactionApplicationService transactionApplicationService() {
		return transactionApplicationService;
	}

}
