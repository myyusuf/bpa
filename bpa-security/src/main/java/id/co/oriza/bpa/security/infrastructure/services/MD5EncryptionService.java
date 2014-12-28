package id.co.oriza.bpa.security.infrastructure.services;

import java.math.BigInteger;
import java.security.MessageDigest;

import id.co.oriza.bpa.base.domain.model.AssertionConcern;
import id.co.oriza.bpa.security.domain.model.EncryptionService;

public class MD5EncryptionService extends AssertionConcern implements EncryptionService{

	@Override
	public String encryptedValue(String aPlainTextValue) {
		this.assertArgumentNotEmpty(
                aPlainTextValue,
                "Plain text value to encrypt must be provided.");

        String encryptedValue = null;

        try {

            MessageDigest messageDigest = MessageDigest.getInstance("MD5");

            messageDigest.update(aPlainTextValue.getBytes("UTF-8"));

            BigInteger bigInt = new BigInteger(1, messageDigest.digest());

            encryptedValue = bigInt.toString(16);

        } catch (Exception e) {
            throw new IllegalStateException(e);
        }

        return encryptedValue;
	}

}
