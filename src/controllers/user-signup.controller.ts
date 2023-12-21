// Uncomment these imports to begin using these cool features!

import {inject, service} from '@loopback/core';
// import {UserRepository} from '@loopback/authentication-jwt';
import {repository} from '@loopback/repository';
import {getJsonSchemaRef, post, requestBody} from '@loopback/rest';
import * as _ from 'lodash';
import {UserSignup} from '../models';
import {UserSignupRepository} from '../repositories';
import {validatecredentials} from '../services/validator';
import {BcyptHasher} from '../services/encrypt_password';
import {Credentials} from '@loopback/authentication-jwt';
import {CredentialsRequestBody} from './spec/user_controller_spec';



export class UserSignupController {
  constructor(
  @repository(UserSignupRepository)
  public UserSignupRepository: UserSignupRepository,
  @inject('service.hasher')
  public hasher:BcyptHasher

  ) { }
  @post("/signup", {
    responses: {
      '200': {
        descroption: 'User',
        content: {
          schema: getJsonSchemaRef(UserSignup)
        }
      }
    }
  })
  async signup(@requestBody() userdata: UserSignup) {
    validatecredentials(_.pick(userdata, ['email', 'password']))
    userdata.password=await this.hasher.HashPassword(userdata.password)
    const saveduser = await this.UserSignupRepository.create(userdata);
    delete (saveduser as {password?: string}).password;

    // delete saveduser.password;
    // return saveduser;
    return {
      status: 200,
      data: {
        user: saveduser,
      }
    }
  }
  // @post('/users/login')
  @post('/login', {
    responses: {
      '200': {
        description: 'Token',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                token: {
                  type: 'string'},
              },
            },
          },
        },
      },
    },
  })
  async login(
    @requestBody() credentials:Credentials,
  ): Promise<{token:string}>{
    return Promise.resolve({token: '899009888'});
  }


}
