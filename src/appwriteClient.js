import { Client, Databases, Query } from 'appwrite';

const client = new Client()
  .setEndpoint('https://appbuild.oceanbase.com/v1')
  .setProject('691c216a0018d88175fb');

const databases = new Databases(client);

export { client, databases, Query };
