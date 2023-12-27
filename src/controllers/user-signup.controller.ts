// Uncomment these imports to begin using these cool features!

import {inject} from '@loopback/core';
// import {UserRepository} from '@loopback/authentication-jwt';
import {Credentials} from '../repositories/user-signup.repository';
// import {Credentials} from '@loopback/authentication-jwt';
import {repository} from '@loopback/repository';
import {HttpErrors, getJsonSchemaRef, post, requestBody} from '@loopback/rest';
import * as _ from 'lodash';
import {UserSignup} from '../models';
import {UserSignupRepository} from '../repositories';
import {BcyptHasher} from '../services/encrypt_password';
import {MyUserService} from '../services/user_service';
import {validatecredentials} from '../services/validator';

// Assuming you have Node.js environment
const crypto = require('crypto');

function generateToken(length = 32) {
  return crypto.randomBytes(Math.ceil(length / 2))
    .toString('hex')
    .slice(0, length);
}

// Example usage
const token = generateToken();
// console.log('Generated Token:', token);



export class UserSignupController {
  constructor(
    @repository(UserSignupRepository)
    public UserSignupRepository: UserSignupRepository,
    @inject('service.hasher')
    public hasher: BcyptHasher,
    @inject('services.user_service')
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
              email: {type: 'string', format: 'email'},
              password: {type: 'string', minLength: 8},
            },
            required: ['email', 'password'],
          }
        }
      }
    }) credentials: Credentials,
  ): Promise<{token: string}> {
    console.log('Login method called');
    console.log("credentials");
    console.log(credentials);
    console.log("helloooo");
    try {
      const user = await this.userService.verifyCredentials(credentials);
      console.log("User:", user);

      // Proceed with generating the token or any other logic

      // return Promise.resolve({token: '899009888'});
      const generatedToken = '899009888'; // Replace this with your actual token generation logic
      const response = {
        token: token,
        status: '200', // Add the status you want to send
      };

      return Promise.resolve(response);
      // return Promise.resolve({token: '899009888'});
    } catch (error) {
      // Catch and handle the error appropriately
      console.error('Error during login:', error);

      // You might want to throw a specific error or handle it in another way
      return Promise.reject(new HttpErrors.Unauthorized('Invalid credentials'));
    }
  }
}
