import {Entity, model, property} from '@loopback/repository';

@model()
export class Feature extends Entity {
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
  frequency: string;

  @property({
    type: 'string',
    required: true,
  })
  description: string;

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

  constructor(data?: Partial<Feature>) {
    super(data);
  }
}

export interface FeatureRelations {
  // describe navigational properties here
}

export type FeatureWithRelations = Feature & FeatureRelations;
