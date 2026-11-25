/*
 * Copyright 2026 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

export type Language = 'es' | 'pt-BR' | 'en';

export const DEFAULT_LANGUAGE: Language = 'es';

export const LANGUAGE_STORAGE_KEY = 'ge_eval_studio_lang';

export interface LanguageOption {
  readonly code: Language;
  readonly label: string;
  readonly shortLabel: string;
  readonly htmlLang: string;
}

export const SUPPORTED_LANGUAGES: readonly LanguageOption[] = [
  {code: 'es', label: 'Español (LATAM)', shortLabel: 'ES', htmlLang: 'es-419'},
  {code: 'pt-BR', label: 'Português (BR)', shortLabel: 'PT-BR', htmlLang: 'pt-BR'},
  {code: 'en', label: 'English', shortLabel: 'EN', htmlLang: 'en'},
];

/**
 * Typed dictionary of all user-facing strings in Eval Studio.
 * Every language file implements this exact interface so missing keys are
 * caught at compile time.
 */
export interface Translations {
  // App / Auth
  'app.mainContentAria': string;
  'app.signInTitle': string;
  'app.loadingSignIn': string;
  'app.noProviders': string;
  'header.logOut': string;
  'header.languageAria': string;

  // Navigation / Tabs
  'nav.runQueries': string;
  'nav.runEvaluation': string;
  'nav.compareEvals': string;
  'nav.about': string;
  'nav.aboutTitle': string;
  'nav.defaultTitle': string;
  'nav.expandSidebar': string;
  'nav.collapseSidebar': string;

  // Wizard Steps
  'wizard.step1': string;
  'wizard.step2': string;
  'wizard.step3': string;

  // Config Form
  'config.lockedNotice': string;
  'config.engineSelection': string;
  'config.projectId': string;
  'config.projectIdTooltip': string;
  'config.projectIdPlaceholder': string;
  'config.region': string;
  'config.regionTooltip': string;
  'config.gcloudToken': string;
  'config.gcloudTokenTooltip': string;
  'config.fetchEngines': string;
  'config.fetchingEngines': string;
  'config.engine': string;
  'config.engineTooltip': string;
  'config.model': string;
  'config.modelTooltip': string;
  'config.agent': string;
  'config.agentTooltip': string;
  'config.defaultAssistant': string;
  'config.agentSuspendedSuffix': string;
  'config.loadingAgents': string;
  'config.noAgents': string;
  'config.agentsErrorFallback': string;
  'config.couldNotListAgents': string;
  'config.connectors': string;
  'config.connectorsTooltip': string;
  'config.selectConnectors': string;
  'config.connectorsSelectedSingular': string;
  'config.connectorsSelectedPlural': string;
  'config.searchConnectorsPlaceholder': string;
  'config.entitiesCount': string;
  'config.noConnectorsFound': string;
  'config.connectorNotAuthorized': string;
  'config.scoringSetup': string;
  'config.next': string;
  'config.errProvideProjectId': string;
  'config.errNoEnginesFound': string;
  'config.errFetchingEngines': string;
  'config.errSeeConsole': string;

  // Scoring Setup & Scorers
  'scoring.methods': string;
  'scoring.methodsTooltip': string;
  'scoring.runOrderHint': string;
  'scoring.noScorersSelected': string;
  'scoring.scorersSelectedCount': string;
  'scoring.errSelectAtLeastOne': string;
  'scoring.autoRaterLocation': string;
  'scoring.autoRaterLocationTooltip': string;
  'scoring.autoRaterModel': string;
  'scoring.autoRaterModelTooltip': string;
  'scoring.autoRaterInstruction': string;
  'scoring.autoRaterInstructionTooltip': string;
  'scoring.autoRaterInstructionPlaceholder': string;
  'scoring.defaultAutoRaterInstruction': string;
  'scoring.errSelectAutoRaterModel': string;
  'scoring.errModelNotAvailableInLocation': string;
  'scoring.errInstructionTooShort': string;

  // Scorer display names & descriptions (UI)
  'scorer.autoRater.name': string;
  'scorer.autoRater.description': string;
  'scorer.lcs.name': string;
  'scorer.lcs.description': string;
  'scorer.sourceAttribution.name': string;
  'scorer.sourceAttribution.description': string;

  // File Upload
  'upload.title': string;
  'upload.clickToUpload': string;
  'upload.orDragAndDrop': string;
  'upload.orDrag': string;
  'upload.rowLimitNotice': string;
  'upload.rowLimitShort': string;
  'upload.rowsFound': string;
  'upload.parsingFile': string;
  'upload.back': string;
  'upload.errInvalidCsv': string;
  'upload.errMissingColumns': string;
  'upload.errEmptyCsv': string;
  'upload.connectorsOverrideInstruction': string;

  // Run Queries
  'queries.uploadInstruction': string;
  'queries.runButton': string;
  'queries.progressText': string;
  'queries.resultsTitle': string;
  'queries.backToUpload': string;

  // Run Evaluation
  'eval.uploadInstruction': string;
  'eval.runButton': string;
  'eval.progressText': string;
  'eval.resultsTitle': string;
  'eval.backToUpload': string;
  'eval.reRateButton': string;
  'eval.reRateTitle': string;
  'eval.reRateDescription': string;
  'eval.cancel': string;
  'eval.reRateConfirm': string;
  'eval.errScoringFailed': string;
  'eval.errReRateFailed': string;

  // CSV Table & Columns
  'table.exportCsv': string;
  'table.showMore': string;
  'table.showLess': string;
  'table.improvement': string;
  'table.regression': string;
  'table.viewTrace': string;
  'table.traceTooltip': string;
  'table.col.query': string;
  'table.col.response': string;
  'table.col.golden': string;
  'table.col.fetched': string;
  'table.col.connectorsUsed': string;
  'table.col.sources': string;
  'table.col.dataStores': string;
  'table.col.connectors': string;
  'table.col.conversation': string;
  'table.col.turn': string;
  'table.col.trace': string;
  'table.col.baselineSuffix': string;
  'table.col.recentSuffix': string;
  'table.col.deltaSuffix': string;

  // Progress Bar & Stop Modal
  'progress.stop': string;
  'progress.stopTitle': string;
  'progress.stopConfirmBody': string;
  'progress.cancel': string;

  // Compare Evals
  'compare.uploadBaselineTitle': string;
  'compare.uploadBaselineAria': string;
  'compare.uploadRecentTitle': string;
  'compare.uploadRecentAria': string;
  'compare.rowsCount': string;
  'compare.compareButton': string;
  'compare.resultsTitle': string;
  'compare.sideBySideTitle': string;
  'compare.matchedQueriesPrefix': string;
  'compare.matchedQueriesSuffix': string;
  'compare.queryLabel': string;
  'compare.baselineLabel': string;
  'compare.recentLabel': string;
  'compare.errMissingColumns': string;
  'compare.errNoSharedScorer': string;
  'compare.status.recent_failure': string;
  'compare.status.recent_skip': string;
  'compare.status.persistent_failure': string;
  'compare.status.persistent_skip': string;
  'compare.status.recovered': string;

  // About
  'about.overviewTitle': string;
  'about.overviewBody': string;
  'about.gettingStartedTitle': string;
  'about.prereqsTitle': string;
  'about.prereqAgentApiTitle': string;
  'about.prereqAgentApiBody': string;
  'about.prereqDiscoveryApiTitle': string;
  'about.prereqDiscoveryApiBody': string;
  'about.prereqAuthTitle': string;
  'about.prereqAuthBody': string;
  'about.prereqTokenTitle': string;
  'about.prereqTokenBodyBefore': string;
  'about.prereqTokenBodyAfter': string;
  'about.prereqTokenNote': string;
  'about.prereqSetupTitle': string;
  'about.prereqSetupBody': string;
  'about.csvFormatsTitle': string;
  'about.csvEvalTitle': string;
  'about.csvEvalIntro': string;
  'about.csvColQuery': string;
  'about.csvColGolden': string;
  'about.csvOptional': string;
  'about.csvColConversationId': string;
  'about.csvRequiredMultiTurn': string;
  'about.csvColTurnPart1': string;
  'about.csvColTurnPart2': string;
  'about.csvColTurnPart3': string;
  'about.csvQueriesTitle': string;
  'about.csvQueriesIntro': string;
  'about.metricsTitle': string;
  'about.metricTtftTitle': string;
  'about.metricTtftBody': string;
  'about.metricTtfaTitle': string;
  'about.metricTtfaBody': string;
  'about.metricTtltTitle': string;
  'about.metricTtltBody': string;
  'about.metricScoreTitle': string;
  'about.metricScoreBody': string;
  'about.interpretationTitle': string;
  'about.interpDeltaTitle': string;
  'about.interpDeltaBody': string;
  'about.interpImprovementTitle': string;
  'about.interpImprovementBody': string;
  'about.interpRegressionTitle': string;
  'about.interpRegressionBody': string;
  'about.interpStableTitle': string;
  'about.interpStableBody': string;
  'about.privacyTitle': string;
  'about.privacyIntro1': string;
  'about.privacyIntro2': string;
  'about.privacyTenantTitle': string;
  'about.privacyTenantBody': string;
  'about.privacyNoCollectionTitle': string;
  'about.privacyNoCollectionBody': string;
  'about.privacyAgreementsTitle': string;
  'about.privacyAgreementsBody': string;
  'about.privacyExportTitle': string;
  'about.privacyExportBody': string;
}

export type TranslationKey = keyof Translations;

export const EN_TRANSLATIONS: Translations = {
  // App / Auth
  'app.mainContentAria': 'Main content',
  'app.signInTitle': 'Sign in to Eval Studio',
  'app.loadingSignIn': 'Loading sign-in options...',
  'app.noProviders': 'No authentication providers configured. Check server configuration.',
  'header.logOut': 'Log out',
  'header.languageAria': 'Select language',

  // Navigation / Tabs
  'nav.runQueries': 'Run Queries',
  'nav.runEvaluation': 'Run Evaluation',
  'nav.compareEvals': 'Compare Evals',
  'nav.about': 'About',
  'nav.aboutTitle': 'About Eval Studio',
  'nav.defaultTitle': 'Eval Studio',
  'nav.expandSidebar': 'Expand sidebar',
  'nav.collapseSidebar': 'Collapse sidebar',

  // Wizard Steps
  'wizard.step1': '1. Configuration',
  'wizard.step2': '2. Upload & Run',
  'wizard.step3': '3. Results',

  // Config Form
  'config.lockedNotice': 'Settings are locked while a run is in progress, so every row uses the same settings.',
  'config.engineSelection': 'Engine Selection',
  'config.projectId': 'Project ID',
  'config.projectIdTooltip': 'The Google Cloud Project ID where your Discovery Engine is located.',
  'config.projectIdPlaceholder': 'my-project-id',
  'config.region': 'Region',
  'config.regionTooltip': 'The region where your Discovery Engine is located (e.g., global, us, eu).',
  'config.gcloudToken': 'gCloud Access Token',
  'config.gcloudTokenTooltip': 'OAuth 2.0 Access Token for Google Cloud APIs. Obtain via \'gcloud auth print-access-token\'.',
  'config.fetchEngines': 'Fetch Engines',
  'config.fetchingEngines': 'Fetching engines...',
  'config.engine': 'Engine',
  'config.engineTooltip': 'The specific search engine or app to evaluate.',
  'config.model': 'Model',
  'config.modelTooltip': 'The generation model to use for evaluation.',
  'config.agent': 'Agent',
  'config.agentTooltip': 'The agent published under this engine that every query in the run is sent to. Leave on the default assistant to evaluate the engine itself.',
  'config.defaultAssistant': 'Default assistant (no agent)',
  'config.agentSuspendedSuffix': '(suspended)',
  'config.loadingAgents': 'Loading agents...',
  'config.noAgents': 'No agents published under this engine.',
  'config.agentsErrorFallback': 'Queries will run against the default assistant.',
  'config.couldNotListAgents': 'Could not list agents: {error}',
  'config.connectors': 'Connectors',
  'config.connectorsTooltip': 'Select one or more connectors to use.',
  'config.selectConnectors': 'Select Connectors',
  'config.connectorsSelectedSingular': '{count} Connector Selected',
  'config.connectorsSelectedPlural': '{count} Connectors Selected',
  'config.searchConnectorsPlaceholder': 'Search connectors...',
  'config.entitiesCount': '({count} entities)',
  'config.noConnectorsFound': 'No connectors found.',
  'config.connectorNotAuthorized': 'not available (not authorized)',
  'config.scoringSetup': 'Scoring Setup',
  'config.next': 'Next',
  'config.errProvideProjectId': 'Please provide Project ID',
  'config.errNoEnginesFound': 'No engines found.',
  'config.errFetchingEngines': 'Error fetching engines: {error}',
  'config.errSeeConsole': 'See console for details.',

  // Scoring Setup & Scorers
  'scoring.methods': 'Scoring Methods',
  'scoring.methodsTooltip': 'The strategies used to score each fetched response. Every selected scorer runs against every row, one after another, and gets its own column in the results.',
  'scoring.runOrderHint': 'Scorers run in the order listed above.',
  'scoring.noScorersSelected': 'No Scorers Selected',
  'scoring.scorersSelectedCount': '{count} Scorers Selected',
  'scoring.errSelectAtLeastOne': 'Select at least one scoring method.',
  'scoring.autoRaterLocation': 'Auto Rater Location',
  'scoring.autoRaterLocationTooltip': 'The Vertex AI location used to call the auto-rater model. Multi-regional locations (us, eu) keep scoring requests in-region and offer a subset of models; choose global for models only served globally.',
  'scoring.autoRaterModel': 'Auto Rater Model',
  'scoring.autoRaterModelTooltip': 'The Gemini model to use for auto-rating.',
  'scoring.autoRaterInstruction': 'Auto Rater Instruction',
  'scoring.autoRaterInstructionTooltip': 'Instructions for the Gemini model acting as an auto-rater. Define the rubric or metric for scoring here. The model must output a score between 0.0 and 1.0.',
  'scoring.autoRaterInstructionPlaceholder': 'Enter evaluation instructions...',
  'scoring.defaultAutoRaterInstruction': 'You are an expert evaluator. Compare the fetched response (including any cited grounding sources) to the golden response for the given query. Verify that the answer is accurate and supported by valid citations. Calculate an overall score between 0.0 and 1.0 based on correctness and citation grounding.',
  'scoring.errSelectAutoRaterModel': 'Select an auto rater model.',
  'scoring.errModelNotAvailableInLocation': 'Model \'{model}\' is not available in \'{location}\'. Select an available model or change Auto Rater Location to \'global\'.',
  'scoring.errInstructionTooShort': 'Enter an auto rater instruction of at least {min} characters.',

  // Scorer display names & descriptions
  'scorer.autoRater.name': 'Auto Rater (LLM as a judge)',
  'scorer.autoRater.description': 'Asks a Gemini model to rate the fetched response against the golden response using your rubric.',
  'scorer.lcs.name': 'Longest Common Subsequence',
  'scorer.lcs.description': 'Measures word-order overlap (ROUGE-L F1) between the response and the golden answer.',
  'scorer.sourceAttribution.name': 'Source Attribution',
  'scorer.sourceAttribution.description': 'Measures the share of the sources in the expected_sources column that the agent cited. Rows without expected sources are skipped.',

  // File Upload
  'upload.title': 'Upload Evaluation Dataset',
  'upload.clickToUpload': 'Click to upload',
  'upload.orDragAndDrop': 'or drag and drop',
  'upload.orDrag': 'or drag',
  'upload.rowLimitNotice': 'Limited to 100 rows. If exceeded, only the first 100 rows will be considered.',
  'upload.rowLimitShort': 'Limited to 100 rows. If exceeded, only first 100 rows considered.',
  'upload.rowsFound': '{count} rows found',
  'upload.parsingFile': 'Parsing file...',
  'upload.back': 'Back',
  'upload.errInvalidCsv': 'Please upload a valid CSV file.',
  'upload.errMissingColumns': 'CSV must contain columns: {required}. Missing: {missing}',
  'upload.errEmptyCsv': 'CSV file is empty or contains no data rows.',
  'upload.connectorsOverrideInstruction': 'an optional \'connectors_override\' column: connector ids separated by \';\', \'web_search\' for Web Search, \'[]\' for none, or blank to use the connectors chosen in the Configuration step',

  // Run Queries
  'queries.uploadInstruction': 'CSV file with at least \'query\' column (plus {connectorsOverride})',
  'queries.runButton': 'Run Queries',
  'queries.progressText': 'Generating responses... ({completed} / {total})',
  'queries.resultsTitle': 'Query Results',
  'queries.backToUpload': 'Back to Upload',

  // Run Evaluation
  'eval.uploadInstruction': 'CSV file with required \'query\' and \'golden\' columns (plus optional \'conversation_id\' and consecutive \'turn\' columns starting at 0 or 1 for multi-turn evaluation, and {connectorsOverride})',
  'eval.runButton': 'Run Evaluation',
  'eval.progressText': 'Evaluating... ({completed} / {total})',
  'eval.resultsTitle': 'Evaluation Results',
  'eval.backToUpload': 'Back to Upload',
  'eval.reRateButton': 'Re-rate Responses',
  'eval.reRateTitle': 'Re-rate Responses',
  'eval.reRateDescription': 'Adjust the scoring setup below and re-score the current responses with {scorers} without re-fetching them. Re-rating saves these settings to the Run Evaluation configuration.',
  'eval.cancel': 'Cancel',
  'eval.reRateConfirm': 'Re-rate',
  'eval.errScoringFailed': 'Scoring failed for some rows: {error}',
  'eval.errReRateFailed': 'Re-rating failed: {error}',

  // CSV Table & Columns
  'table.exportCsv': 'Export CSV',
  'table.showMore': 'Show more',
  'table.showLess': 'Show less',
  'table.improvement': 'Improvement',
  'table.regression': 'Regression',
  'table.viewTrace': 'View Trace',
  'table.traceTooltip': 'Trace links might take some time to appear as traces aren\'t persisted in real time and take some time after Gemini Enterprise has responded.',
  'table.col.query': 'Query',
  'table.col.response': 'Response',
  'table.col.golden': 'Golden',
  'table.col.fetched': 'Fetched',
  'table.col.connectorsUsed': 'Connectors Used',
  'table.col.sources': 'Sources',
  'table.col.dataStores': 'Data stores',
  'table.col.connectors': 'Connectors',
  'table.col.conversation': 'Conversation',
  'table.col.turn': 'Turn',
  'table.col.trace': 'Trace',
  'table.col.baselineSuffix': 'Baseline',
  'table.col.recentSuffix': 'Recent',
  'table.col.deltaSuffix': 'Delta',

  // Progress Bar & Stop Modal
  'progress.stop': 'Stop',
  'progress.stopTitle': 'Stop Processing',
  'progress.stopConfirmBody': 'Are you sure you want to stop the current process? Partial results will be kept.',
  'progress.cancel': 'Cancel',

  // Compare Evals
  'compare.uploadBaselineTitle': 'Upload Baseline CSV',
  'compare.uploadBaselineAria': 'Upload Baseline CSV file',
  'compare.uploadRecentTitle': 'Upload Recent CSV',
  'compare.uploadRecentAria': 'Upload Recent CSV file',
  'compare.rowsCount': '{count} rows',
  'compare.compareButton': 'Compare',
  'compare.resultsTitle': 'Comparison Results',
  'compare.sideBySideTitle': 'Detailed Side-by-Side Comparison',
  'compare.matchedQueriesPrefix': 'Matched',
  'compare.matchedQueriesSuffix': 'queries',
  'compare.queryLabel': 'Query',
  'compare.baselineLabel': 'Baseline',
  'compare.recentLabel': 'Recent',
  'compare.errMissingColumns': 'CSV must contain columns: query, fetched and at least one "{scoreCol}" column. Missing columns - {missing}',
  'compare.errNoSharedScorer': 'The two CSVs share no scoring method, so there is nothing to compare. Re-run one of them with a common scoring method.',
  'compare.status.recent_failure': 'Recent Failure',
  'compare.status.recent_skip': 'Recent Skip',
  'compare.status.persistent_failure': 'Persistent Failure',
  'compare.status.persistent_skip': 'Persistent Skip',
  'compare.status.recovered': 'Recovered',

  // About
  'about.overviewTitle': 'Overview',
  'about.overviewBody': 'Gemini Enterprise Eval Studio is a specialized tool for cloud engineers and AI practitioners to rigorously test, evaluate, and compare responses from Google Cloud Discovery Engine (Vertex AI Search & Conversation). It leverages Gemini as an automated rater to provide objective semantic similarity scores and user defined rubrics along with the latency metrics.',
  'about.gettingStartedTitle': 'Getting Started',
  'about.prereqsTitle': '1. Prerequisites',
  'about.prereqAgentApiTitle': 'Enable Agent Platform API in your GCP project',
  'about.prereqAgentApiBody': 'In the Google Cloud Console, navigate to "APIs & Services" > "Library", search for "Agent Platform API", and enable it.',
  'about.prereqDiscoveryApiTitle': 'Enable Discovery Engine API in your GCP project',
  'about.prereqDiscoveryApiBody': 'In the Google Cloud Console, navigate to "APIs & Services" > "Library", search for "Discovery Engine API", and enable it.',
  'about.prereqAuthTitle': 'Authentication (Auth Mode)',
  'about.prereqAuthBody': 'Sign in using your Google Workspace account or a third-party enterprise identity provider (via Workforce Identity Federation OIDC/SAML) to authorize the tool to access Vertex AI and Discovery Engine.',
  'about.prereqTokenTitle': 'Google Cloud Access Token (No-Auth Mode)',
  'about.prereqTokenBodyBefore': 'You can get this by running',
  'about.prereqTokenBodyAfter': 'in your terminal. You can open Cloud Shell (terminal icon on the top right of the Google Cloud Console home page) to run this command.',
  'about.prereqTokenNote': 'Note: that these tokens are ephemeral and expire, so you may need to refresh them periodically.',
  'about.prereqSetupTitle': 'Discovery Engine Setup',
  'about.prereqSetupBody': 'Ensure you have engines configured in your Vertex AI Search project.',
  'about.csvFormatsTitle': '2. CSV Formats',
  'about.csvEvalTitle': 'For Run Evaluation',
  'about.csvEvalIntro': 'Your CSV must contain at least these two columns:',
  'about.csvColQuery': 'The search or conversation prompt.',
  'about.csvColGolden': 'The expected ideal response (baseline).',
  'about.csvOptional': '(Optional)',
  'about.csvColConversationId': 'Groups multiple rows into a multi-turn conversation sharing the same Assistant session context.',
  'about.csvRequiredMultiTurn': '(Required for multi-turn)',
  'about.csvColTurnPart1': 'Consecutive numeric turn order within a conversation starting at',
  'about.csvColTurnPart2': 'or',
  'about.csvColTurnPart3': 'If a turn ID is missing or non-consecutive, remaining rows in that conversation are marked as',
  'about.csvQueriesTitle': 'For Run Queries',
  'about.csvQueriesIntro': 'Your CSV only needs:',
  'about.metricsTitle': '3. Metric Definitions',
  'about.metricTtftTitle': 'TTFT (s) (Time to First Token)',
  'about.metricTtftBody': 'Latency in seconds until the first chunk of data (text or thought) is received from the model.',
  'about.metricTtfaTitle': 'TTFA (s) (Time To First Answer Token)',
  'about.metricTtfaBody': 'Latency in seconds until the first actual text response (excluding internal chain-of-thought) is received.',
  'about.metricTtltTitle': 'TTLT (s) (Time To Last Token)',
  'about.metricTtltBody': 'Total time in seconds taken for the entire response to stream.',
  'about.metricScoreTitle': '<Scoring method> Score',
  'about.metricScoreBody': 'One column per selected scoring method, holding its score (0.0 to 1.0) for each row. For the auto rater, Gemini scores the fetched response against your golden response using your defined rubrics or metrics.',
  'about.interpretationTitle': '4. Interpretation of Results',
  'about.interpDeltaTitle': 'Delta (Δ)',
  'about.interpDeltaBody': 'Calculated per scoring method present in both CSVs as Recent Score - Baseline Score.',
  'about.interpImprovementTitle': 'Improvement (Green)',
  'about.interpImprovementBody': 'Delta > +0.10.',
  'about.interpRegressionTitle': 'Regression (Red)',
  'about.interpRegressionBody': 'Delta < -0.10.',
  'about.interpStableTitle': 'Stable (Gray)',
  'about.interpStableBody': 'Changes within +/- 0.10 range.',
  'about.privacyTitle': 'Data Privacy & Governance',
  'about.privacyIntro1': 'Sensitive tokens and keys (such as the Google Cloud Access Token) are kept only in memory during your session and are not stored in your browser\'s local storage. They are never sent to any server other than directly to Google\'s official APIs during execution.',
  'about.privacyIntro2': 'Gemini Enterprise Eval Studio is designed with a strict client-side, stateless architecture:',
  'about.privacyTenantTitle': 'GCP Tenant Isolation',
  'about.privacyTenantBody': 'The tool operates entirely within your Google Cloud Platform (GCP) tenant. All computations, evaluation runs, and data storage occur within your controlled environment.',
  'about.privacyNoCollectionTitle': 'No Google Data Collection',
  'about.privacyNoCollectionBody': 'Google does not collect, store, or have access to your customer data, queries, evaluation inputs, or evaluation results processed by this tool.',
  'about.privacyAgreementsTitle': 'Governing Agreements',
  'about.privacyAgreementsBody': 'Any data handling and API calls made by the tool are governed solely by your existing agreements with Google Cloud for the specific APIs used (e.g., Vertex AI APIs).',
  'about.privacyExportTitle': 'Exported Data Responsibility',
  'about.privacyExportBody': 'Query and evaluation results exported to CSV may contain Customer Core Content (such as queries, golden responses, model responses, and scores). Once downloaded, these files are stored on your local filesystem, outside of your Google Cloud environment. You are solely responsible for securing and protecting exported files in accordance with your organization\'s data handling policies, including restricting access, storing them securely, and deleting them when no longer needed.',
};
