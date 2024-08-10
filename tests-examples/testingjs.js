/*
const user = {
username: "Umar",
age: 26,
signature: true,

getthetext(){

//console.log("testing")
console.log(this)
}

}
console.log(user.username)
console.log(user.getthetext())

console.log(this)

*/
/*

//variables definations
console.log("Umar")
const accountId = 14222
let accountEmail = 'nanncy@gmail.com'
var password = "jaipur"
let state //not defined so its undefined
console.log(accountEmail)
accountEmail = 'testest@yahoo.com'
console.table([accountEmail, accountId, password, state])
*/
//data types
/*
let name ='umar'
let age =25
let ismale = true
let state
let city = null
console.table(['name', 'age', 'ismale', 'state', 'city'])
console.log(typeof city)
console.log(typeof state)
console.log(typeof ismale)


let score =33;
console.log(typeof (score))

let changeType = String(score)
console.log(changeType)
console.log(typeof changeType)


let gameCounter =100;
gameCounter++
console.log(gameCounter)

//primitive datayypes call by ref
console.log(null >0)
console.log(undefined ===0)
console.log(undefined >0)
console.log('2'==2)//just check value
console.log('2'===2)//check data type as well
console.log(typeof Symbol)
const bigint = 3333333333333;
console.log(typeof bigint)

"user strict";
 const array= ['SQA', 'BA', 'ABA']//arrays
 console.log(typeof array)
 //defin object
let myobj={
name: 'Umar',
position: 'SQA',
id: 31

 };
 console.log(typeof myobj)
//define function
 const myFunction=function () {
   console.log ('hello world')
 };
 console.log(typeof myFunction)
 
//stack (using primitive data types *copy), & heap (using non-primitive data types* reference/replace)
let stack1 ='Umar'
let stack2 =stack1
stack2='ALi'
console.log(stack2, stack1)
//non primitive -heap 
let user1 = {
userEmail:'nanny@gmail.com',
id: 1
} 

let user2 =user1
user2.userEmail='kevin@gmail.com'
console.log(user1.userEmail)
console.log(user2.userEmail)

const name ="      Umar       "
const userid = 10
console.log(`my name is ${name} and my user id is ${userid}`)
const newGame = new String ('Umar')
console.log(newGame[0])
console.log(newGame.length)
console.log(newGame.indexOf('a'))
console.log(newGame.toUpperCase())
console.log(name.trim())

// const numberTest = 100
// console.log(numberTest);
const newNumber = new Number(100)
console.log(newNumber)
console.log(newNumber.toString())
const testi = 100000
console.log(testi.toString())
console.log(Math)
console.log(Math.min(1,2,3,2,45))

const myArr = ['nanncy','10','kevin','13', 22, 33]
console.log(myArr)
console.log(myArr[0])

const myArr2 = new Array('paul', 'walker', 1, 22, 33)
console.log(myArr2)
*/
//array methods

const myArr33 = new Array('paul', 'walker', 1, 22, 33)
console.log(myArr33)
// myArr3.push(9,10)
// myArr3.pop(5)
// myArr3.unshift(9)
// console.log(myArr3)
// console.log(myArr3.includes(22))
// const myArr33 =  myArr3.join()
// console.log(myArr3, myArr33)

const myArr11 = myArr33.slice(1,4)
console.log(myArr11)

const myArr111 = myArr33.splice(1,4)
console.log(myArr111)

const myArrConcat = myArr11.concat(myArr33)
console.log(myArrConcat)

console.log(Array.from({name:'Umar'}))
console.log(Array.from('umar'))

const score1=100;const score2=200;const score3=300;
console.log(Array.of(score1, score2, score3))