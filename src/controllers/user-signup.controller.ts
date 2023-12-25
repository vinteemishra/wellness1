// Uncomment these imports to begin using these cool features!

import {inject} from '@loopback/core';
// import {UserRepository} from '@loopback/authentication-jwt';
import {Credentials} from '@loopback/authentication-jwt';
import {repository} from '@loopback/repository';
import {getJsonSchemaRef, post, requestBody} from '@loopback/rest';
import * as _ from 'lodash';
import {UserSignup} from '../models';
import {UserSignupRepository} from '../repositories';
import {BcyptHasher} from '../services/encrypt_password';
import {MyUserService} from '../services/user_service';
import {validatecredentials} from '../services/validator';
import {TokenService} from '@loopback/authentication';


export class UserSignupController {
  constructor(
    @repository(UserSignupRepository)
    public UserSignupRepository: UserSignupRepository,
    @inject('service.hasher')
    public hasher: BcyptHasher,
    @inject('services.user.service')
    public userService: MyUserService,
    // @inject('services.jwt.service') public jwtService: TokenService,


  ) { }
  @post("/signup", {
    responses: {
      '200': {
        description: 'User',
        content: {
          schema: getJsonSchemaRef(UserSignup)
        }
      }
    }
  })
  async signup(@requestBody() userdata: UserSignup) {
    validatecredentials(_.pick(userdata, ['email', 'password']))
    userdata.password = await this.hasher.HashPassword(userdata.password)
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
                  type: 'string'
                },
              },
            },
          },
        },
      },
    },
  })

  async login(
    @requestBody({
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              email: { type: 'string', format: 'email' },
              password: { type: 'string', minLength: 8 },
            },
            required: ['email', 'password'],
          }
        }
      }
    }) credentials: Credentials,
  ): Promise<{ token: string }> {
    console.log('Login method called'); // Add this log statement
    console.log(credentials);
    console.log("helloooo");
    const user = await this.userService.verifyCredentials(credentials);
    // console.log(user);
    console.log("hello");
    return Promise.resolve({ token: '899009888' });
    // const token = await this.jwtService.generateToken(user);

    // return { token };

  }
}
