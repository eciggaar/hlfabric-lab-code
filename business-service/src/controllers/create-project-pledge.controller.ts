import {api, operation, requestBody} from '@loopback/rest';
import {BlockChainModule} from '../blockchainClient';
import {CreateProjectPledge} from '../models/create-project-pledge.model';
import {ResponseMessage} from '../models/response-message.model';

let blockchainClient = new BlockChainModule.BlockchainClient();
/**
 * The controller class is generated from OpenAPI spec with operations tagged
 * by CreateProjectPledgeController.
 *
 */
@api({
  components: {
    schemas: {
      ResponseMessage: {
        title: 'ResponseMessage',
        properties: {
          message: {
            type: 'string',
          },
          statusCode: {
            type: 'string',
          },
        },
        required: [
          'message',
          'statusCode',
        ],
      },
      CreateProjectPledge: {
        title: 'CreateProjectPledge',
        properties: {
          aidOrg: {
            type: 'string',
          },
          pledgeNumber: {
            type: 'string',
          },
          name: {
            type: 'string',
          },
          description: {
            type: 'string',
          },
          fundsRequired: {
            type: 'string',
          },
        },
        required: [
          'aidOrg',
          'pledgeNumber',
          'name',
          'description',
          'fundsRequired',
        ],
      },
      Funding: {
        title: 'Funding',
        properties: {
          fundingType: {
            type: 'string',
          },
          nextFundingDueInDays: {
            type: 'number',
          },
          approvedFunding: {
            type: 'number',
          },
          totalFundsReceived: {
            type: 'number',
          },
          fundsPerInstallment: {
            type: 'number',
          },
          govOrgId: {
            type: 'string',
          },
        },
        required: [
          'fundingType',
          'nextFundingDueInDays',
          'approvedFunding',
          'totalFundsReceived',
          'fundsPerInstallment',
          'govOrgId',
        ],
      },
      ProjectPledge: {
        title: 'ProjectPledge',
        properties: {
          pledgeId: {
            type: 'string',
          },
          name: {
            type: 'string',
          },
          decription: {
            type: 'string',
          },
          fundsRequired: {
            type: 'number',
          },
          status: {
            type: 'string',
          },
          aidOrg: {
            type: 'string',
          },
          funds: {
            type: 'array',
            items: {
              $ref: '#/components/schemas/Funding',
            },
          },
        },
        required: [
          'pledgeId',
          'name',
          'decription',
          'fundsRequired',
          'status',
          'aidOrg',
        ],
      },
      SendPledgeToGlobalCitizen: {
        title: 'SendPledgeToGlobalCitizen',
        properties: {
          pledgeId: {
            type: 'string',
          },
        },
        required: [
          'pledgeId',
        ],
      },
      SendPledgeToGovOrg: {
        title: 'SendPledgeToGovOrg',
        properties: {
          pledgeId: {
            type: 'string',
          },
        },
        required: [
          'pledgeId',
        ],
      },
      TransferFunds: {
        title: 'TransferFunds',
        properties: {
          pledgeId: {
            type: 'string',
          },
        },
        required: [
          'pledgeId',
        ],
      },
      UpdatePledge: {
        title: 'UpdatePledge',
        properties: {
          pledgeId: {
            type: 'string',
          },
          fundingType: {
            type: 'string',
          },
          approvedFunding: {
            type: 'string',
          },
          fundsPerInstallment: {
            type: 'string',
          },
        },
        required: [
          'pledgeId',
          'fundingType',
          'approvedFunding',
          'fundsPerInstallment',
        ],
      },
    },
  },
  paths: {},
})
export class CreateProjectPledgeController {
  constructor() {}

  /**
   *
   *
   * @param _requestBody
   * @returns ResponseMessage model instance
   */
  @operation('post', '/CreateProjectPledge', {
    'x-controller-name': 'CreateProjectPledgeController',
    'x-operation-name': 'createProjectPledgeCreate',
    tags: [
      'CreateProjectPledgeController',
    ],
    responses: {
      '200': {
        description: 'ResponseMessage model instance',
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/ResponseMessage',
            },
          },
        },
      },
    },
    requestBody: {
      content: {
        'application/json': {
          schema: {
            $ref: '#/components/schemas/CreateProjectPledge',
          },
        },
      },
    },
    operationId: 'CreateProjectPledgeController.createProjectPledgeCreate',
  })
  async createProjectPledgeCreate(@requestBody({
    content: {
      'application/json': {
        schema: {
          $ref: '#/components/schemas/CreateProjectPledge',
        },
      },
    },
  }) _requestBody: CreateProjectPledge): Promise<ResponseMessage> {
    try {
      let networkObj = await blockchainClient.connectToNetwork();

      if (networkObj && !(networkObj.stack)) {
        // Construc the input object with right function to call, the necessary
        // parameters and the created contract from the blockchainClient class
        let inputObj = {
          function: 'createProjectPledge',
          contract: networkObj.contract,
          pledgeNumber: _requestBody.pledgeNumber,
          name: _requestBody.name,
          desc: _requestBody.description,
          fundsRequired: _requestBody.fundsRequired,
          aidOrg: _requestBody.aidOrg
        };

        await blockchainClient.createProjectPledge(inputObj);
      } else {
        // Couldn't connect to network, so passing this object on to catch clause...
        throw new Error(networkObj.message);
      }

      let responseMessage: ResponseMessage = new ResponseMessage({message: 'added project pledge'});
      return responseMessage;

    } catch (error) {
      let responseMessage: ResponseMessage = new ResponseMessage({message: error, statusCode: '400'});
      return responseMessage;
    } finally {
      // Workaround for error @grpc/grpc-js: Closing Stream After Unary Call Triggers Double Free
      // For more info: https://github.com/grpc/grpc-node/issues/1464
      await new Promise(resolve => setTimeout(resolve, 0));

      // Properly disconnecting from the network
      blockchainClient.disconnectFromNetwork();
    }
  }
}

