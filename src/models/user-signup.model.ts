import {Entity, model, property} from '@loopback/repository';

@model()
export class UserSignup extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: false,
  })
  id?: number;

  @property({
    type: 'string',
    required: true,
  })
  email: string;

  @property({
    type: 'string',
    required: true,
  })
  password: string;

  @property({
    type: 'date',
    jsonSchema: {
      format: 'date',
    },
  })

  date_of_birth?: Date;

  @property({
    type: 'string',
    required: true,
  })
  contact_no: string;


  constructor(data?: Partial<UserSignup>) {
    super(data);
  }
}

export interface UserSignupRelations {
  // describe navigational properties here
}

export type UserSignupWithRelations = UserSignup & UserSignupRelations;
