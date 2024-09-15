class HashMap {
  constructor(buckets = 4) {
    this.buckets = new Array(buckets).fill(null).map(() => []);
    this.loadFactor = 0.75;
  }

  hash(key) {
    let hashCode = 0;

    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      let hash = primeNumber * hashCode + key.charCodeAt(i);
      hashCode = hash % this.buckets.length; 
    }

    return hashCode;
  }

  set(key, value) {
    let bucketIndex = this.hash(key);

    for (let i = 0; i < this.buckets[bucketIndex].length; i++) {
      if (this.buckets[bucketIndex][i][0] === key) {
        this.buckets[bucketIndex][i][1] = value;
        return;
      }
    }

    this.buckets[bucketIndex].push([key, value]);

    if (this.length() / this.buckets.length > this.loadFactor) {
      this.resize();
    }
  }

  // get(key) takes one argument as a key and returns the value that is assigned to this key. If a key is not found, return null.

  get(key) {
    let bucketIndex = this.hash(key);

    for (let i = 0; i < this.buckets[bucketIndex].length; i++) {
      if (this.buckets[bucketIndex][i][0] === key) {
        return this.buckets[bucketIndex][i][1];
      }
    }

    return null;
  }

  // has(key) takes a key as an argument and returns true or false based on whether or not the key is in the hash map.

  has(key) {
    let bucketIndex = this.hash(key);

    for (let i = 0; i < this.buckets[bucketIndex].length; i++) {
      if (this.buckets[bucketIndex][i][0] === key) {
        return true;
      }
    }

    return false;
  }

  // remove(key) takes a key as an argument.
  // If the given key is in the hash map, it should remove
  // the entry with that key and return true. If the key isn’t 
  // in the hash map, it should return false.

  remove(key) {
    let bucketIndex = this.hash(key);

    for (let i = 0; i < this.buckets[bucketIndex].length; i++) {
      if (this.buckets[bucketIndex][i][0] === key) {
        this.buckets[bucketIndex].splice(i, 1);
        return true;
      }
    }

    return false;
  }

  // length() returns the number of stored keys in the hash map.

  length() {
    let storedKeys = 0;

    for (let i = 0; i < this.buckets.length; i++) {
      storedKeys += this.buckets[i].length;
    }

    return storedKeys;
  }

  // clear() removes all entries in the hash map.

  clear() {
    this.buckets = new Array(this.buckets.length).fill(null).map(() => []);
  }

  // keys() returns an array containing all the keys inside the hash map.

  keys() {
    let keys = [];

    for (let i = 0; i < this.buckets.length; i++) {
      for (let j = 0; j < this.buckets[i].length; j++) {
        keys.push(this.buckets[i][j][0]);
      }
    }
    return keys;
  }

  // values() returns an array containing all the values.

  values() {
    let values = [];

    for (let i = 0; i < this.buckets.length; i++) {
      for (let j = 0; j < this.buckets[i].length; j++) {
        values.push(this.buckets[i][j][1]);
      }
    }

    return values;
  }

  // entries() returns an array that contains each key, value pair.
  // Example: 
  // [[firstKey, firstValue], [secondKey, secondValue]]

  entries() {
    let keyValues = [];

    for (let i = 0; i < this.buckets.length; i++) {
      for (let j = 0; j < this.buckets[i].length; j++) {
        keyValues.push([this.buckets[i][j][0], this.buckets[i][j][1]]);
      }
    }

    return keyValues;
  }

  // Resize the array(buckets) if entries length / total buckets 
  // is more than 0.75 threshold.

  resize() {
    const newBucketSize = this.buckets.length * 2;
    const newBuckets = new Array(newBucketSize).fill(null).map(() => []);

    for (let i = 0; i < this.buckets.length; i++) {
      for (let j = 0; j < this.buckets[i].length; j++) {
        const [key, value] = this.buckets[i][j];
        let bucketIndex = this.hash(key) % newBucketSize;
        newBuckets[bucketIndex].push([key, value]);

      }
    }

    this.buckets = newBuckets;
  }

  printBuckets() {
    this.buckets.forEach((bucket, index) => {
      console.log(`Bucket ${index}: ${JSON.stringify(bucket)}`);
    });
  }

}

const hashMap = new HashMap();

hashMap.set('apple', 'red');
hashMap.set('banana', 'yellow');
hashMap.set('carrot', 'orange');
hashMap.set('dog', 'brown');
hashMap.set('elephant', 'gray');
hashMap.set('frog', 'green');
hashMap.set('grape', 'purple');
hashMap.set('hat', 'black');
hashMap.set('ice cream', 'white');
hashMap.set('jacket', 'blue');
hashMap.set('kite', 'pink');
hashMap.set('lion', 'golden');

console.log(hashMap.entries());
console.log(hashMap.keys());
console.log(hashMap.values());

hashMap.printBuckets();
