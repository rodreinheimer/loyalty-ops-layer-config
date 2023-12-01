const config = 
{
  defaults: {
    template: 'templates/purchase_registration_report_template.hbs'
  },
  secrets: {
    mdb_user: 'mdb_user',
    mdb_password: 'mdb_password',
    mdb_cluster: 'mdb_cluster',
    mdb_database: 'mdb_database',
    skx_teams_url: 'skx_teams_url'
  },
  PURCHASE_REGISTRATION_REPORT:
  {
    secretStore: "SKX_OPS_@ENVIRONMENT",
    mongoServerSelectionTimeoutMS: 10000,
    mongoConnectionTimeoutMS: 10000,
    mongoGroupedQueryLimit: 10,
    mongoQueryLimit: 1000,
    mongoClusterName: "cluster0.haiuxpo.mongodb.net",
    mongoDatabaseName: "Loyalty",
    mongoCollectionName: "purchase_loyalty_registration",
    results: {
      /**
       * Can have multiple results. 
       * But only one result will be attached (attachmentRecords)
       * The other results can be referenced in the mustashe template
       **/ 
      inlineReports: ["topStores","topUsers"],
      attachedReport: "allUsers",
      topStores: {
        headers: [
          "Store Identifiers",
          "Total $ Amount",
          "Registration Count"
        ],
        records: []
      },
      topUsers: {
        headers: [
          "SessionM Indentifiers",
          "Total $ Amount",
          "Registration Count"
        ],
        records: []
      },
      allUsers: {
        headers: [
          "SessionM Indentifiers",
          "Store Identifiers",
          "$ Amount",
          "Created Date",
          "Lastupdate Date",
          "Number of Attempts"
        ],
        records: []
      }
    },
    bucketName: "loyalty-ops-foundation-report-dev",
    transports: ["ses", "teams"],
    ses: {
      template: "templates/purchase_registration_report_template.hbs",
      delivery: ["html", "attachment"], //allowed:  html and/or attachment
      subject: "@ENVIRONMENT: @BRAND_@BRAND_REGION Purchase Registration Report - Email Generated @NOW",
      body: "Period @PERIOD hours. The attachment includes all transactions.The tables in the email are summaries grouped by store number or SessionM identifier.",
      to: "rodrigo.reinheimer@gmail.com",
      from: "rodrei@yahoo.com"
    },
    slack: {
      delivery: ["attachment"], //allowed:  attachment
      subject: "@ENVIRONMENT: @BRAND_@BRAND_REGION Purchase Registration Report Email @NOW",
      body: "Please review users. Find additional information at the following wiki.... https://digital.vfc.com/wiki/display/VFDP/Development+Setup",
      channelId: "C01NQLHHZK2"
    },
    teams: {
      teams_webhook_url: "TEAMS_OPS_WEBHOOK_URL",
      template: "templates/purchase_registration_report_template.hbs",
      card: {
        "@type": "MessageCard",
        "@context": "http://schema.org/extensions",
        "themeColor": "0072C6", // light blue
        summary: "Purchase Registration Report",
        sections: [
          {
            activityTitle: "@ENVIRONMENT: @BRAND_@BRAND_REGION",
            text: "@TEMPLATE",
          },
        ],
      }
    }
  }
};

module.exports = config;