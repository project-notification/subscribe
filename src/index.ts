import { Handler, APIGatewayEvent } from 'aws-lambda';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { PutCommand } from '@aws-sdk/lib-dynamodb';

export const handler: Handler = async (event: APIGatewayEvent) => {
  const data: {
    email: string;
    topics?: string[];
  } = JSON.parse(event.body!);

  const client = new DynamoDBClient({});

  const command = new PutCommand({
    TableName: 'subscription',
    Item: {
      ...data,
    },
  });

  const result = await client.send(command);
  if (result.$metadata.httpStatusCode === 200) {
    return {
      statusCode: 201,
    };
  } else {
    console.error('Fail');
    console.error('data: ', data);
    console.error('result: ', result);
    return {
      statusCode: 500,
    };
  }
};
