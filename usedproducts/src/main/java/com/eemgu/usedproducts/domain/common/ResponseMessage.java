package com.eemgu.usedproducts.domain.common;

public interface ResponseMessage {
    String SUCCESS = "Success.";

    String VALIDATION_FAIL = "Validation faild.";
    String DUPLICATE_ID = "Duplicate Id.";

    String SIGN_IN_FAIL = "Login information mismatch.";
    String CERTIFICATION_FAIL = "Certification faild.";

    String MAIL_FAIL = "Mail send failed.";
    String DATABASE_ERROR = "Databse error.";
}
