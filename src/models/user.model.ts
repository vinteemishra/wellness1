import {Entity, model, property, hasMany} from '@loopback/repository';
import {Patient} from './patient.model';

@model()
export class User extends Entity {
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
  userName: string;

  @property({
    type: 'string',
    required: true,
  })
  passwordSalt: string;

  @property({
    type: 'string',
    required: true,
  })
  userType: string;

  @property({
    type: 'string',
    required: true,
  })
  phoneNumber: string;

  @property({
    type: 'string',
    required: true,
  })
  email: string;

  @property({
    type: 'string',
    required: true,
  })
  status: string;

  @property({
    type: 'date',
    required: true,
  })
  createdOn: Date;

  @hasMany(() => Patient)
  patients: Patient[];

  constructor(data?: Partial<User>) {
    super(data);
  }
}

export interface UserRelations {
  // describe navigational properties here
}

export type UserWithRelations = User & UserRelations;
