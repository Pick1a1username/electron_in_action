import { openDB } from 'idb';

const database = openDB('jetsetter', 1, {
    upgrade(db) {
        db.createObjectStore('items', {
            keyPath: 'id',
            autoIncrement: true
        });
    },
});

export default {
    getAll() {
        return database.then(db => {
            return db.transaction('items')
                     .objectStore('items')
                     .getAll();
        });
    },
    add(item) {
        return database.then(db => {
            const tx = db.transaction('items', 'readwrite');
            tx.objectStore('items').add(item);
            return tx.complete;
        });
    },
    update(item) {
        return database.then(db => {
            const tx = db.transaction('items', 'readwrite');
            tx.objectStore('items').put(item);
            return tx.complete;
        });
    },
    markAllAsUnpacked() {
        return this.getAll()
            .then(items =>  items.map(item => ({ ...item, packed: false })))
            .then(items => {
                return database.then(db => {
                    const tx = db.transaction('items', 'readwrite');
                    for (const item of items) {
                        tx.objectStore('items').put(item);
                    }
                    return tx.complete;
                });
            });
    },
    delete(item) {
        return database.then(db => {
            const tx = db.transaction('items', 'readwrite');
            tx.objectStore('items').delete(item.id);
            return tx.complete;
        })
    },
    deleteUnpackedItems() {
        return this.getAll()
            .then(items => items.filter(item => !item.packed))
            .then(items => {
                return database.then(db => {
                    const tx = db.transaction('items', 'readwrite');
                    for (const item of items) {
                        tx.objectStore('items').delete(item.id);
                    }
                    return tx.complete;
                });
            });
    }
};