import {Entity, model, property} from '@loopback/repository';

@model()
export class Recipe extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: false,
    required: true,
  })
  id: string;


  constructor(data?: Partial<Recipe>) {
    super(data);
  }
}

export interface RecipeRelations {
  // describe navigational properties here
}

export type RecipeWithRelations = Recipe & RecipeRelations;
