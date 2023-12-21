import {promises} from 'dns';
import { genSalt,hash } from 'bcryptjs';
import {inject} from '@loopback/core';


interface PasswordHasher<T=string>{
  HashPassword(password:T):Promise<T>;

}

export class BcyptHasher implements PasswordHasher<string>{
  @inject('rounds')
  public readonly rounds:number;
  round:number=10;
  async HashPassword(password: string){
    const salt=await genSalt(this.rounds);
    return await hash(password,salt);


  }
}
