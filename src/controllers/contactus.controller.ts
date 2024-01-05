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





export class ContactusController {
  constructor(
    @repository(ContactusRepository)
    public contactusRepository : ContactusRepository,
  ) {}

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
  ): Promise<Contactus> {
    const { report, ...contactData } = contactus;
    // Save the contact information to MongoDB
    const savedContact = await this.contactusRepository.create(contactData);
    const {Multer}=require ('multer');
    // const multer=Multer({
    //   storage:Multer.memoryStorage(),
    //   limits:{
    //     filesize:5*1024*1024
    //   }
    // })
    const {Storage} = require('@google-cloud/storage');
    let projectId="silent-venture-405711";
    let keyfilename=path.join(__dirname, '..', 'mykey.json');

    const storage = new Storage({
      projectId,
      keyfilename,

    });
    console.log(projectId);
    console.log(keyfilename)
    // const bucket=storage.bucket('tour2wellness_bucket')

    const bucketName = 'tour2wellness_bucket';
    // const filename = `report/${savedContact.id}.png`; // Assuming image is a PNG file
    const filename = `report/${savedContact.id}.png`; // Assuming image is a PNG file
    let x=storage.getBuckets();
    console.log("hiiii",x)


    if (contactus.report) {
      let flag=1;
      // const blob=bucket.file(request.file.originalname)
      // const blobStream=blob.creatwritStream();
      // blobStream.on('finish',()=>{
      //   res.status(200).send('success');

      // })
      // blobStream.end(req.file.buffer);
      await storage.bucket(bucketName).file(filename).save(Buffer.from(contactus.report, 'base64'));
      // await storage.bucket(bucketName).file(filename).createWriteStream({resumable: false, gzip: true})
    } else {
      // Handle the case where contactus.report is undefined
      console.error('Error: report is undefined');
    }

    // await storage.bucket(bucketName).file(filename).save(Buffer.from(contactus.report, 'base64'));

    // return savedContact;
    // savedContact.report = undefined;
    // return savedContact;

    return { ...savedContact, report: undefined } as Contactus;

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
