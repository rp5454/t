namespace mfu.dashboard;

entity MFUSummary {
    key ID            : UUID;
    totalUploaded     : Integer;
    totalApproved     : Integer;
    totalRejected     : Integer;
    totalOnboarded    : Integer;
}

entity MFUModuleStats {
    key ID        : UUID;
    moduleName    : String;
    approved      : Integer;
    pending       : Integer;
    uploaded      : Integer;
}

entity MFUUsage {
    key ID        : UUID;
    periodType    : String;  // Month, Quarter, Year
    moduleName    : String;
    usageCount    : Integer;
}

entity MFUDetails {
    key ID          : UUID;
    moduleName      : String;
    subModuleName   : String;
    loadType        : String;
    loadTemplate    : String;
    loadCount       : Integer;
}
