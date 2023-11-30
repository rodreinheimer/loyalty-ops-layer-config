const config = {
  secrets: {
    slack: 'SKXOPS_SLACK_SECRET', 
    database: 'DEFAULT_TO_LOCAL'
  },
  database: {
    connectionTimeoutInSeconds: 10,
    connection: {
      username:"root",
      password:"xxxxxxxx",
      engine:"mysql",
      host:"docker.for.mac.localhost",
      port:3306,
      dbInstanceIdentifier: "database-1",
      database: "workspace"
    }
  },
  ORDERS_REPORT:
  {
    bucketName: "loyalty-ops-foundation-report-test",
    query: "select orders_id,timeplaced from `orders` where `timeplaced` between ? and ?",
    headers: "orders_id_1,timeplaced_1",
    transports: ["ses","slack"],
    ses: {
      delivery: ["bodyHtml","attachment"],
      subject:  "@ENVIRONMENT: @BRAND_@BRAND_REGION Please Find Attached Orders Report @NOW",
      body: "Please review users. Find additional information at the following wiki.... https://digital.vfc.com/wiki/display/VFDP/Development+Setup",
      to: "rodrei@yahoo,rodrigo.reinheimer@gmail",
      from: "rodrei@yahoo"
    },
    slack: {
      pretext: "@ENVIRONMENT: @BRAND_@BRAND_REGION Orders Report Email @NOW",
      body: "Please review users. Find additional information at the following wiki.... https://digital.vfc.com/wiki/display/VFDP/Development+Setup",
      channelId: "C01NQLHHZK2"
    }
  },
  USERS_REPORT:
  {
    bucketName: "loyalty-ops-foundation-report-test",
    query: "select orders_id,timeplaced from `orders` where `timeplaced` between ? and ?",
    headers: "orders_id_1,timeplaced_1",
    transports: ["ses","slack"],
    ses: {
      delivery: ["bodyHtml","attachment"],
      subject:  "@ENVIRONMENT: @BRAND_@BRAND_REGION Please Find Attached Orders Report @NOW",
      body: "Please review users. Find additional information at the following wiki.... https://digital.vfc.com/wiki/display/VFDP/Development+Setup",
      to: "rreinheimer@vfc.com,rodrei@yahoo.com,rodrigo.reinheimer@gmail.com",
      from: "rodrei@yahoo.com"
    },
    slack: {
      pretext: "@ENVIRONMENT: @BRAND_@BRAND_REGION Orders Report Email @NOW",
      body: "Please review users. Find additional information at the following wiki.... https://digital.vfc.com/wiki/display/VFDP/Development+Setup",
      channelId: "C01MU2J574N"
    }
  }
};

module.exports = config;