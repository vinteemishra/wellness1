import {inject, lifeCycleObserver, LifeCycleObserver} from '@loopback/core';
import {juggler} from '@loopback/repository';

const config = {
  name: 'ht_db_mg',
  connector: 'mongodb',
  // url: 'mongodb://htinitdbcreator:paSSw0rdX@127.0.0.1:27017/htinitdb',
  host: '127.0.0.1',
  port: 27017,
  user: 'htinitdbcreator',
  password: 'paSSw0rdX',
  database: 'htinitdb',
  useNewUrlParser: true
};

// Observe application's life cycle to disconnect the datasource when
// application is stopped. This allows the application to be shut down
// gracefully. The `stop()` method is inherited from `juggler.DataSource`.
// Learn more at https://loopback.io/doc/en/lb4/Life-cycle.html
@lifeCycleObserver('datasource')
export class HtDbMgDataSource extends juggler.DataSource
  implements LifeCycleObserver {
  static dataSourceName = 'ht_db_mg';
  static readonly defaultConfig = config;

  constructor(
    @inject('datasources.config.ht_db_mg', {optional: true})
    dsConfig: object = config,
  ) {
    super(dsConfig);
  }
}
