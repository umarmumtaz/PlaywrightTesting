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

const sjdf = ['test', 'test', 2]
console.log(sjdf)
//console.log(sjdf.length())
console.log(sjdf[0])

//object singlton and create object construnctor are same
//objects literal
const objTest= {
name: "umar",
email: "nanncy@gmail.com",
age: 25,
gender: "male"
}
console.log(objTest)
console.log(objTest.name)
console.log(objTest["email"])
objTest.name ="Umar mumtaz "
console.log(objTest.name)
// Object.freeze(objTest)
// objTest.name ="Umar mumtaz ahmad gull "
// console.log(objTest.name)

objTest.greeting = function(){
console.log("hello Umar")

}
console.log(objTest.age);
console.log(objTest.greeting());
//other one with variable
// objTest.greetingT = function(){
// console.log(`Hi ${this.name}`)

// }
// console.log(objTest.greetingT())

// const testUser = new object()//singleton object
// console.log(testUser)
// const tinderUser2={} //non singleton object
// console.log(tinderUser2)
const testingUser = {}
testingUser.id =321,
testingUser.name='nanncy',
testingUser.status='single'
testingUser.citizin=false

const testingUser2 = {
email: "kevinpaul@gmail.com",

fullname: {
firstname: "kevin",
lastname:  "nanncy",
}
}
console.log(testingUser.id)
console.log(testingUser2.email)
console.log(testingUser2.fullname.firstname)
const objectCombine = {testingUser, testingUser2}
console.log(objectCombine)

//---------------------
const obj11 ={v1:'nanncy', v2:'kevin', v3:41010 }
const obj22={t1: 'paul', t2:'walker',t3: 'abc'}
const obj33 = {...obj11, ...obj22}
console.log(obj33)    
console.log(Object.keys(obj33))
console.log(Object.values(obj33))
console.log(Object.entries(obj33))
console.log(obj33.hasOwnProperty('v1'))



const person={
name: 'nanncy',
age: 30,
gender: 'female',
status: 'single',

//console.log(person)

 fullName: function(kk){
return this.name + kk;
}
}
console.log(person.fullName('kevin'))

console.log(person.status)




const objTest= {
  name: "umar",
  email: "nanncy@gmail.com",
  age: 25,
  gender: "male"
  }
//   console.log(objTest)
//   console.log(objTest.name)
//   console.log(objTest["email"])
//   //objTest.name ="Umar mumtaz "
//   //console.log(objTest.name)

  
  objTest.greeting = function(){
  console.log("hello Umar")
  return 'test';
  }
  console.log(objTest.age);
  console.log (objTest.greeting());



  
 const person={
name: 'nanncy',
age: 30,
gender: 'female',
status: 'single',

//console.log(person)

 fullName: function(){
return this.name
},
nameAge : (n)=>{console.log(n + "and age is  "+ person.age)}
}

person.email="jhsdfkjhd@gamil.com"
person["emmmail"]="sdklfjks@emmmail.com"

// person.nameAge = (n)=>{console.log(n + "and age is  "+ person.age)
// }

//  console.log(person.emmmail)
//  console.log(person["emmmail"])

person.nameAge("nanccy")

//destructring
const courses = {
course1: 'maths',
course2: 'stats',
course3:'eco',
course4: 'eng'
}
const{course1} =courses
console.log(course1)
const{course2: aa} =courses
console.log(aa)


//functions
// function abc1(){
// console.log('my first function')
// } abc1() //simple

// function addnumbers(num1, num2){
// console.log(num1 + num2);

// }
// return addnumbers(5, 9)


// function addition(a,b){
// return a+b;

// }
// const add = addition(9,7)
// console.log(add)

function login(username){
return (`my name is ${username}`)
}
const myloginName = login('umar')
console.log(myloginName)

function login2(username='sdf'){
if(username ===undefined){
  console.log("please enter username")
  return
}else{


  return (`my name is ${username}`)
  }}
 console.log(login2())


function logintosystem(username){
if(username ===undefined)
  {
console.log("user is not here")
return 
}else{
  return (`Username is  ${username}` )
} }
console.log(logintosystem("ab devillers"))



function addnumbers(num1, num2){
console.log(num1 + num2);

}
return addnumbers(5, 9);
//discuss

function addnum(a, m){
return (a+m)
} 
console.log(addnum(7,3))


//simple vs arrow function
function testi(username)
{
return(username)
}
console.log(testi("nanncy"))
//arrow function
const additions =(a,b) =>{
return(a+b)
}
console.log(additions(7,9))
//arrow funciton with diff style implicit
const add2=(aa,bb)=> aa+bb
console.log(add2(7,1))
// with object
const objobjectfunc = (az, bz) => ({usernames: 'nanncy'})
console.log(objobjectfunc(9,3))

*/
//invoke function
(function invotest(){
console.log('our output')
})()

//with arrow function

const add2=(aa,bb)  => aa+bb

console.log(add2(7,1))

const add3=(aa,bb)  => {
  return (aa+bb)
}
console.log(add3(7,8))
