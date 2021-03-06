import LocalizedStrings from 'localized-strings';

function getCustomInterfaceLanguage () {
  return process.env.LABELS || 'daac';
}

export const strings = new LocalizedStrings({
  daac: {
    active_collections: 'Active Collections',
    add_collection: 'Add Collection',
    all_collections: 'All Collections',
    all_granules: 'All Granules',
    associated_collections: 'Associated Collections',
    back_to_collections: 'Back to Collections',
    back_to_granules: 'Back to Granules',
    cmr: 'CMR',
    collection: 'Collection',
    collection_id: 'Collection ID',
    collection_granules: 'CollectionGranules',
    collection_logs: 'Collection Logs',
    collection_name: 'Collection Name',
    collection_overview: 'Collection Overview',
    collections: 'Collections',
    dashboard: 'CUMULUS Dashboard',
    executions: 'Executions',
    granule: 'Granule',
    granules: 'Granules',
    granules_updated: 'Granules Updated',
    granules_errors: 'Granules Errors',
    granule_overview: 'Granule Overview',
    granules_running: 'Granule Running',
    granules_completed: 'Granule Completed',
    granules_failed: 'Granule Failed',
    logo: 'cumulus-logo.png',
    operations: 'Operations',
    pdrs: 'Pdrs',
    reconciliation_reports: 'Reconciliation Reports',
    remove_from_cmr: 'Remove from CMR',
    running_granules: 'Running Granules',
    total_granules: 'Total Granules',
    view_all_granules: 'View All Granules',
    view_granules_overview: 'View Granule Overview'
  },
  gitc: {
    active_collections: 'Active Layers',
    add_collection: 'Add Layer',
    all_collections: 'All Layers',
    all_granules: 'All Products',
    associated_collections: 'Associated Layers',
    back_to_collections: 'Back to Layers',
    back_to_granules: 'Back to Products',
    cmr: 'OnEarth',
    collection: 'Layer',
    collection_id: 'Layer ID',
    collection_granules: 'LayerProducts',
    collection_logs: 'Layer Logs',
    collection_name: 'Layer Name',
    collection_overview: 'Layer Overview',
    collections: 'Layers',
    dashboard: 'GITC Dashboard',
    executions: 'Executions',
    granule: 'Product',
    granules: 'Products',
    granules_updated: 'Products Updated',
    granules_errors: 'Products Errors',
    granules_completed: 'Products Completed',
    granules_failed: 'Products Failed',
    granule_overview: 'Product Overview',
    granules_running: 'Products Running',
    logo: 'gitc-logo.png',
    operations: 'Operations',
    pdrs: 'Pdrs',
    reconciliation_reports: 'Reconciliation Reports',
    remove_from_cmr: 'Remove from OnEarth',
    running_granules: 'Running Products',
    total_granules: 'Total Products',
    view_all_granules: 'View All Products',
    view_granules_overview: 'View Product Overview'
  }
}, getCustomInterfaceLanguage);
