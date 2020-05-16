import * as path from 'path';

// https://stackoverflow.com/questions/47957479/how-to-use-electrons-app-getpath-to-store-data
import { remote } from 'electron';
import 'sqlite3';
import knex from 'knex';

const database = knex({
    client: 'sqlite3',
    connection: {
        filename: path.join(
            remote.app.getPath('userData'),
            'jetsetter-items.sqlite'
        )
    },
    useNullAsDefault: true
});

database.schema.hasTable('items').then(exists => {
    if (!exists) {
        return database.schema.createTable('items', t => {
            t.increments('id').primary();
            t.string('value', 100);
            t.boolean('packed');
        });
    }
});

export default database;