import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';

import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';

import {Contactus} from '../models';
import {ContactusRepository} from '../repositories';
import * as path from 'path';
import {request} from 'http';
// import { HttpResponse } from '@loopback/rest';

import { RestBindings, Response } from '@loopback/rest';
// import {sendEmail} from '../utils/sendMail';
// import { sendEmail } from '../services/email.service';
import {sendEmail} from '../utils/sendmail1';
import * as fs from 'fs';
import { Buffer } from 'buffer'; // Import the Buffer module
import {toString} from 'lodash';

interface ContactusResponse {
  data: Contactus;
  status: number;
}

const buf1 = Buffer.allocUnsafe(26);







export class ContactusController {

  constructor(
    @repository(ContactusRepository)
    public contactusRepository : ContactusRepository,
  ) {}
  // attachmentBase64: string;


  @post('/contacts')
  async createContact(
    @requestBody({
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              firstname: {type: 'string'},
              lastname: {type: 'string'},
              email: {type: 'string'},
              contactno: {type: 'string'},
              details: {type: 'string'},
              speciality: {type: 'string'},
              report: {type: 'string'}, // Assuming image is a base64-encoded string
            },
          },
        },
      },
    })
    contactus: Contactus,
  ): Promise<{ status: string; data: Contactus }>
  // Promise<Contactus>
  {
    const { report, ...contactData } = contactus;
    // Save the contact information to MongoDB
    const savedContact = await this.contactusRepository.create(contactData);
    const {Storage} = require('@google-cloud/storage');
    let projectId="silent-venture-405711";
    let keyfilename=path.join(__dirname, '..', 'mykey.json');

    const storage = new Storage({
      projectId,
      keyfilename,

    });
    console.log(projectId);
    console.log(keyfilename)
    const bucketName = 'tour2wellness_bucket';
    const filename = `report/${savedContact.id}.png`; // Assuming image is a PNG file
    // let x=storage.getBuckets();
    // console.log("hiiii",x)

    if (contactus.report) {


       await storage.bucket(bucketName).file(filename).save(Buffer.from(contactus.report, 'base64'));
       const file1 = storage.bucket(bucketName).file(filename);

      //  const [fileContent] = await file1.download();
      //  const attachmentBase64 = fileContent.toString('base64');
      //  console.log("test3",attachmentBase64);
      try {
        if (file1) {
          const [fileContent] = await file1.download();
          const attachmentBase64: string = fileContent.toString('base64');
          // attachmentBase64 = fileContent.toString('base64'); // Assign the value

          console.log("attachmentBase64",attachmentBase64);

          // Rest of your code...
        } else {
          console.error('Error: file1 is undefined');
          // Handle the case where file1 is undefined
        }
        // const [fileContent] = await file1.download();
        // // const attachment64 = fileContent.toString('base64');
        // //  const attachmentBase64 = fileContent.toString('base64');
        // const attachmentBase64: string = fileContent.toString('base64');
        // console.log("attachmentBase64",attachmentBase64)


        // const attachmentBase64 = Buffer.from(savedContact.report).toString('base64');


        // Rest of your code...
      } catch (error) {
        console.error('Error downloading file:', error);
        // Handle the error or log additional information.
      }



      // fs.writeFileSync(attachmentPath, Buffer.from(contactus.report, 'base64'));

      // // Upload the report to Google Cloud Storage
      // await storage.bucket(bucketName).file(filename).save(Buffer.from(contactus.report, 'base64'));


    } else {
      // Handle the case where contactus.report is undefined
      console.error('Error: report is undefined');
    }
    // savedContact.report = 'https://storage.cloud.google.com/tour2wellness_bucket/{filename}';
    savedContact.report = filename;

    await this.contactusRepository.updateById(savedContact.id, savedContact);

    let baseurl='https://storage.cloud.google.com/tour2wellness_bucket/'
    // if (savedContact.report) {
    //   const attachmentBuffer = Buffer.from(savedContact.report, 'base64');
    //   // Rest of the code...
    // } else {
    //   console.error('Error: savedContact.report is undefined');
    // }


    // const attachmentBuffer = Buffer.from(savedContact.report, 'base64')
    const attachmentBase64 = Buffer.from(savedContact.report).toString('base64');
    console.log("test2",savedContact.report);







    // await sendEmail('m.mathur@afidigitalservices.com', 'contact_us', 'Plz find the attachment of report', attachmentBuffer, baseurl+savedContact.report);
    await sendEmail('vinteeshukla@gmail.com', 'contact_us', 'Plz find the attachment of report',attachmentBase64 , savedContact.report);


     return { status: '200', data: savedContact };


}
@get('/contactus/count')
  @response(200, {
    description: 'Contactus model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Contactus) where?: Where<Contactus>,
  ): Promise<Count> {
    return this.contactusRepository.count(where);
  }

  @get('/contactus')
  @response(200, {
    description: 'Array of Contactus model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Contactus, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Contactus) filter?: Filter<Contactus>,
  ): Promise<Contactus[]> {
    return this.contactusRepository.find(filter);
  }

  @patch('/contactus')
  @response(200, {
    description: 'Contactus PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Contactus, {partial: true}),
        },
      },
    })
    contactus: Contactus,
    @param.where(Contactus) where?: Where<Contactus>,
  ): Promise<Count> {
    return this.contactusRepository.updateAll(contactus, where);
  }

  @get('/contactus/{id}')
  @response(200, {
    description: 'Contactus model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Contactus, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Contactus, {exclude: 'where'}) filter?: FilterExcludingWhere<Contactus>
  ): Promise<Contactus> {
    return this.contactusRepository.findById(id, filter);
  }

  @patch('/contactus/{id}')
  @response(204, {
    description: 'Contactus PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Contactus, {partial: true}),
        },
      },
    })
    contactus: Contactus,
  ): Promise<void> {
    await this.contactusRepository.updateById(id, contactus);
  }

  @put('/contactus/{id}')
  @response(204, {
    description: 'Contactus PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() contactus: Contactus,
  ): Promise<void> {
    await this.contactusRepository.replaceById(id, contactus);
  }

  @del('/contactus/{id}')
  @response(204, {
    description: 'Contactus DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.contactusRepository.deleteById(id);
  }
}
