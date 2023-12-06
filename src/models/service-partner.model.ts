import {Entity, model, property, hasMany} from '@loopback/repository';
import {Rating} from './rating.model';

@model()
export class ServicePartner extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: false,
    required: true,
  })
  id: string;

  @property({
    type: 'string',
    required: true,
  })
  name: string;

  @property({
    type: 'string',
    required: true,
  })
  category: string;

  @property({
    type: 'string',
    required: true,
  })
  city: string;

  @property({
    type: 'string',
    default: 'NA',
  })
  location?: string;

  @property({
    type: 'string',
    required: true,
  })
  phone: string;

  @property({
    type: 'string',
    required: true,
  })
  email: string;

  @property({
    type: 'string',
    required: true,
  })
  contactPerson: string;

  @property({
    type: 'string',
    default: 'NA',
  })
  contactPersonPhone?: string;

  @property({
    type: 'string',
    default: 'NA',
  })
  contactPersonEmail?: string;

  @property({
    type: 'string',
    default: 'NA',
  })
  escalationContact?: string;

  @property({
    type: 'date',
    required: true,
  })
  createdOn: string;

  @property({
    type: 'string',
    required: true,
  })
  status: string;

  @hasMany(() => Rating)
  ratings: Rating[];

  constructor(data?: Partial<ServicePartner>) {
    super(data);
  }
}

export interface ServicePartnerRelations {
  // describe navigational properties here
}

export type ServicePartnerWithRelations = ServicePartner & ServicePartnerRelations;
