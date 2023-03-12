// const mySet1 = new Set();
// mySet1.add(1); // Set(1) { 1 }
// mySet1.add(5); // Set(2) { 1, 5 }
// mySet1.add(5); // Set(2) { 1, 5 }
// mySet1.add("some text"); // Set(3) { 1, 5, 'some text' }
// const o = { a: 1, b: 2 };
// mySet1.add(o);


// for (const [k, v] of mySet1.entries()) {
//     console.log(v)
// }

// 8:29:36

const arr = [ 
    {
        id: '1',
        name: 'gerald',
        surname: 'biason'
    },
    {
        id: '2',
        name: 'makima',
        surname: 'control devil'
    },
    {
        id: '3',
        name: 'denji',
        surname: 'chainsaw devil'
    },
    {
        id: '4',
        name: 'okkotsu',
        surname: 'yuta'
    },
    {
        id: '5',
        name: 'gojou',
        surname: 'satoru'
    },
]

const names = new Map()

for (let i = 0; i < arr.length; i++) {
    names.set(arr[i].id, arr[i])
}

//* get the provided argument from map object (undefined if none)
// console.log(names.get('5'))

//* check if there's a data in map (boolean)
// console.log(names.has('3'))

//* iterate the map
// for (const [k, v] of names) {
//     console.log(v)
// }

//* convert map into arrays and create a new array
// console.log([...names.values()].map(person => person.name))
// console.log(Array.from(names).map(([k, val]) => val.name))
// console.log(Array.from(names.entries()).map(([k, v]) => v))






const nums = [1, 2, 3, 4, 5, 6, 7, 8, 9]

function incrementString (strng) {
    // const body = strng.slice(0, -1)
    // const lastDigit = strng.slice(-1).match(/[0-9]/);
    // return lastDigit === null ? strng + "1" : lastDigit != 9 ? body + (+lastDigit + 1) : incrementString(body)
    return strng.replace(/([0-8]|\d?9+)?$/, (e) => (e ? +e + 1 : 1));
}

// console.log(incrementString('foo'))
// console.log(incrementString('foo9'))
console.log(incrementString('foo000200'))
// console.log(incrementString('foobar023'))