import Invoice from './classes/Invoice.js'
import Payment from './classes/Payment.js'
import { HasFormatter } from './interfaces/HasFormatter'
import { ListTemplate } from './classes/ListTemplate.js'

// let docOne: HasFormatter
// let docTwo: HasFormatter

// docOne = new Invoice('yooyo', 'web work', 21)
// docTwo = new Payment('mario', 'app work', 212)

// let docs: HasFormatter[] = []
// docs.push(docOne)
// docs.push(docTwo)
// console.log(docs)

// const invOne = new Invoice('mario', 'work', 230)
// const invTwo = new Invoice('luigi', 'read', 134)

// let invoices: Invoice[] = []
// invoices.push(invOne)
// invoices.push(invTwo)

// console.log(invoices)

// interface IsPerson {
//   name: string
//   age: number
//   speak(a: string): void
//   spend(a: number): number
// }

// const me: IsPerson = {
//   name: 'shan',
//   age: 30,
//   speak(text) {
//     console.log(text)
//   },
//   spend(num) {
//     console.log(num)
//     return num
//   }
// }

// const greetPerson = (person: IsPerson) => {
//   console.log('hello', person.name)
// }

// greetPerson(me)

//const form = document.querySelector('form')!
const form = document.querySelector('.new-item-form') as HTMLFormElement
console.log(form.children)

const type = document.querySelector('#type') as HTMLSelectElement
const tofrom = document.querySelector('#tofrom') as HTMLInputElement
const details = document.querySelector('#details') as HTMLInputElement
const amount = document.querySelector('#amount') as HTMLInputElement
const ul = document.querySelector('ul') as HTMLUListElement

const list = new ListTemplate(ul)

form.addEventListener('submit', (e: Event) => {
  e.preventDefault()
  let doc: HasFormatter
  if (type.value === 'invoice') {
    doc = new Invoice(tofrom.value, details.value, amount.valueAsNumber)
  } else {
    doc = new Payment(tofrom.value, details.value, amount.valueAsNumber)
  }
  list.render(doc, type.value, 'end')
  console.log(doc)
})

// GENERICS

// const addUID = (obj: object) => {
//   let uid = Math.floor(Math.random() * 100);
//   return {...obj, uid};
// }

// const addUID = <T extends object>(obj: T) => {
//   let uid = Math.floor(Math.random() * 100);
//   return {...obj, uid};
// }

const addUID = <T extends { name: string }>(obj: T) => {
  let uid = Math.floor(Math.random() * 100)
  return { ...obj, uid }
}

let docOne = addUID({ name: 'yoshi', age: 40 })
//let docTwo = addUID('shaun');

console.log(docOne.name)

// with interfaces
interface Resource<T> {
  uid: number
  resourceName: string
  data: T
}

const docThree: Resource<object> = {
  uid: 1,
  resourceName: 'person',
  data: { name: 'shaun' }
}

const docFour: Resource<string[]> = {
  uid: 1,
  resourceName: 'shoppingList',
  data: ['bread', 'milk']
}

console.log(docThree, docFour)

// ENUMS

enum ResourceType {
  BOOK,
  AUTHOR,
  FILM,
  DIRECTOR
}

interface Resource<T> {
  uid: number
  resourceType: ResourceType
  data: T
}

const docOne: Resource<object> = {
  uid: 1,
  resourceType: ResourceType.BOOK,
  data: { title: 'name of the wind' }
}
const docTwo: Resource<object> = {
  uid: 10,
  resourceType: ResourceType.DIRECTOR,
  data: { title: 'name of the wind' }
}

console.log(docOne)
console.log(docTwo)

// TUPLES
let arr = ['ryu', 25, true]
arr[0] = false
arr[1] = 'yoshi'
arr = [30, false, 'yoshi']

let tup: [string, number, boolean] = ['ryu', 25, true]
// tup[0] = false;
tup[0] = 'ken'

let student: [string, number]
//student = [23564, 'chun-li'];
student = ['chun-li', 23564]

let values: [string, string, number]
values = [tofrom.value, details.value, amount.valueAsNumber]
let doc: HasFormatter
if (type.value === 'invoice') {
  doc = new Invoice(...values)
} else {
  doc = new Payment(...values)
}
