srv/service.cds


using mfu.dashboard as db from '../db/schema';

service MFUDashboardService {

    entity Summary        as projection on db.MFUSummary;
    entity ModuleStats    as projection on db.MFUModuleStats;
    entity Usage          as projection on db.MFUUsage;
    entity Details        as projection on db.MFUDetails;

}
