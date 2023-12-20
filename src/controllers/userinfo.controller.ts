// Uncomment these imports to begin using these cool features!

// import {inject} from '@loopback/core';
// import {UserRepository} from '@loopback/authentication-jwt';
import {repository} from '@loopback/repository';
import {getJsonSchemaRef, post, requestBody} from '@loopback/rest';
import {User1} from '../models';
import {User1Repository} from '../repositories';
import * as _ from 'lodash';
import {validatecredentials} from '../services/validator';



export class User1Controller {
  constructor(@repository(User1Repository)
              public user1Repository:User1Repository

  ) {}
  @post("/signup",{
    responses:{
      '200':{
        descroption:'User',
        content:{
          schema:getJsonSchemaRef(User1)
        }
      }
    }
  })
  async signup(@requestBody() userdata:User1){
    validatecredentials(_.pick(userdata,['email','password']))
    const saveduser=await this.user1Repository.create(userdata);
    // delete (saveduser as { password?: string }).password;

    // delete saveduser.password;
    // return saveduser;
    return {
      status: 200,
      data: {
        user: saveduser,
      }
    }


  }

}
