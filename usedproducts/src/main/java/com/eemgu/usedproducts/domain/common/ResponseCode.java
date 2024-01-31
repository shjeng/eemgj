package com.eemgu.usedproducts.domain.common;

public interface ResponseCode {
    // HTTP Status 200
    String SUCCESS = "SU";

    // HTTP Status 400
    String VALIDATION_FAIL = "VF";
    String DUPLICATE_EMAIL = "DM";
    String DUPLICATE_ID = "DI";
    String DUPLICATE_NICKNAME = "DN";
    String SIGN_IN_FAIL = "SF";
    String CERTIFICATION_FAIL = "CF";

    String MAIL_FAIL = "MF";
    String DATABASE_ERROR = "DBE";
}
