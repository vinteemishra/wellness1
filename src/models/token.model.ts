// models/token.model.ts

import { Entity, model, property,belongsTo } from '@loopback/repository';
import {UserSignup} from './user-signup.model';

@model()
export class Token extends Entity {
  @property({
    type: 'number',
    id: true,
  })
  id: number;

  @property({
    type: 'string',
    required: true,
  })
  token: string;
  @belongsTo(() => UserSignup)
  userId: string;

  constructor(data?: Partial<Token>) {
    super(data);
  }
}
