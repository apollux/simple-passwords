import StandardfileClient from './index';
import { Item } from './item';

let client;

async function run() {
  client = new StandardfileClient('http://localhost:8888');
  await client.signIn('test', 'test');
  client.observerable.subscribe(
    x => {
      console.log(x);
    },
    x => {
      console.error(x);
    },
    x => {
      console.info(x);
    }
  );
}
run();

(function sync() {
  const item = new Item({ content: Date(), content_type: 'test' });
  if (client._http.token) {
    client.sync(item);
  }
  setTimeout(sync, 5000);
})();
