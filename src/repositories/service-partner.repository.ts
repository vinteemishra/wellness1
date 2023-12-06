import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {HtDbMgDataSource} from '../datasources';
import {ServicePartner, ServicePartnerRelations, Rating} from '../models';
import {RatingRepository} from './rating.repository';

export class ServicePartnerRepository extends DefaultCrudRepository<
  ServicePartner,
  typeof ServicePartner.prototype.id,
  ServicePartnerRelations
> {

  public readonly ratings: HasManyRepositoryFactory<Rating, typeof ServicePartner.prototype.id>;

  constructor(
    @inject('datasources.ht_db_mg') dataSource: HtDbMgDataSource, @repository.getter('RatingRepository') protected ratingRepositoryGetter: Getter<RatingRepository>,
  ) {
    super(ServicePartner, dataSource);
    this.ratings = this.createHasManyRepositoryFactoryFor('ratings', ratingRepositoryGetter,);
    this.registerInclusionResolver('ratings', this.ratings.inclusionResolver);
  }
}
