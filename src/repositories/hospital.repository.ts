import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {HtDbMgDataSource} from '../datasources';
import {Hospital, HospitalRelations} from '../models';

export class HospitalRepository extends DefaultCrudRepository<
  Hospital,
  typeof Hospital.prototype.id,
  HospitalRelations
> {
  constructor(
    @inject('datasources.ht_db_mg') dataSource: HtDbMgDataSource,
  ) {
    super(Hospital, dataSource);
  }
}
