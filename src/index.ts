// ex1
const name = "Abel",
age = 24,
gender = "male"

// gender는 optional 변수로 선언
// 변수가 optional로 선언되지 않으면 parameter를 생략할 수 없다.
// --> js에서는 undefined로 출력 됐을텐데, typescript에서는 허락하지 않는다.
// sayHi(name, age) -> 불가능
// 타입을 입력함으로써 코드를 더 예측하기 쉬워지고, 실수를 줄일 수 있다.
// argument의 유형과 return 값의 유형(String)을 적어줄 수 있다.
const sayHi = (name:String, age:Number, gender?:String): String => {
  return `Hello ${name}, you are ${age}, you are a ${gender}`;
}

console.log(sayHi(name, age, gender))


// ex2 interface 적용
// 예시:  블록체인에서 하나의 블록을 interface로 정의할 수 있음
interface Human {
  name: String,
  age: Number,
  gender: String
}

const person = {
  name: "Abel",
  age: 24,
  gender: 'male'
}

// interface 적용
const sayHi2 = (person: Human): String => {
  return `Hello ${person.name}, you are ${person.age}, you are a ${person.gender}`;
}

console.log(sayHi2(person))

// ex3 interface 대신 class 사용
// js에서 interface를 사용하고 싶다면 class를 사용하자.
class Human3 {
  public name: string;
  public age: number;
  public gender: string;
  // private는 class 내부에서만 접근이 가능하다. (person.age를 함수에서 접근하려고 하면 error가 발생한다.)
  // private age: number;
  // gender는 선택사항 (constructor는 생성자)
  constructor(name: string, age:number, gender?:string){
    this.name = name;
    this.age = age;
    this.gender = gender;
  }
}

const lynn = new Human3("Lynn", 18, 'female')

const sayHi3 = (person: Human3): String => {
  return `Hello ${person.name}, you are ${person.age}, you are a ${person.gender}`;
}
console.log(sayHi3(lynn))


import * as CryptoJS from 'crypto-js'

// block class
class Block {
  // static method는 class를 생성하지 않아도 호출할 수 있는 method
  static calculateBlockHash = (index: number, previosHash: string, timestamp: number, data:string): string => CryptoJS.SHA256(index + previosHash + timestamp + data).toString()

  static validateStructure = (aBlock: Block): boolean => 
    typeof aBlock.index === "number" &&
    typeof aBlock.hash === "string" &&
    typeof aBlock.previousHash === "string" &&
    typeof aBlock.timestamp === "number" &&
    typeof aBlock.data === "string";

  public index: number;
  public hash: string;
  public previousHash: string;
  public data: string;
  public timestamp: number;

  constructor(index: number, hash: string, previousHash: string, data: string, timestamp: number) {
    this.index = index;
    this.hash = hash;
    this.previousHash =  previousHash;
    this.data = data;
    this.timestamp = timestamp;
  }
}

// 블럭 생성
const genesisBlock:Block = new Block(0, '02391230129', '', 'hello', 1234932);

// blockChain 배열에 push하려면 Block class 형태의 값이 와야한다.
// correct한 값만 push 할 수 있다.
let blockChain: Block[] = [genesisBlock];

const getBlockchain = () : Block[] => blockChain

const getLatestBlock = (): Block => blockChain[blockChain.length -1];

const getNewTimeStamp = (): number => Math.round(new Date().getTime() / 1000)

const createNewBlock = (data:string): Block => {
  const previosBlock: Block = getLatestBlock();
  const newIndex: number = previosBlock.index + 1;
  const newTimeStamp: number = getNewTimeStamp();
  const newHash: string = Block.calculateBlockHash(newIndex, previosBlock.hash, newTimeStamp, data);

  const newBlock: Block = new Block(newIndex, newHash, previosBlock.hash, data, newTimeStamp);
  addBlock(newBlock);
  return newBlock;
}

const getHashforBlock = (aBlock: Block): string => Block.calculateBlockHash(aBlock.index, aBlock.previousHash, aBlock.timestamp, aBlock.data)

const isBlockValid = (candidateBlock: Block, previousBlock: Block): boolean => {
  if(!Block.validateStructure(candidateBlock)) {
    return false;
  } else if(previousBlock.index + 1 !== candidateBlock.index) {
    return false;
  } else if(previousBlock.hash !== candidateBlock.previousHash) {
    return false;
  } else if(getHashforBlock(candidateBlock) !== candidateBlock.hash) {
    return false;
  } else {
    return true;
  }
}

const addBlock = (candidateBlock: Block): void => {
  if(isBlockValid(candidateBlock, getLatestBlock())) {
    blockChain.push(candidateBlock);
  }
}

createNewBlock("second block")
createNewBlock("third block")
createNewBlock("fourth block")

console.log(blockChain)

export {};