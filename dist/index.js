"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// ex1
var name = "Abel", age = 24, gender = "male";
// gender는 optional 변수로 선언
// 변수가 optional로 선언되지 않으면 parameter를 생략할 수 없다.
// --> js에서는 undefined로 출력 됐을텐데, typescript에서는 허락하지 않는다.
// sayHi(name, age) -> 불가능
// 타입을 입력함으로써 코드를 더 예측하기 쉬워지고, 실수를 줄일 수 있다.
// argument의 유형과 return 값의 유형(String)을 적어줄 수 있다.
var sayHi = function (name, age, gender) {
    return "Hello ".concat(name, ", you are ").concat(age, ", you are a ").concat(gender);
};
console.log(sayHi(name, age, gender));
var person = {
    name: "Abel",
    age: 24,
    gender: 'male'
};
// interface 적용
var sayHi2 = function (person) {
    return "Hello ".concat(person.name, ", you are ").concat(person.age, ", you are a ").concat(person.gender);
};
console.log(sayHi2(person));
// ex3 interface 대신 class 사용
// js에서 interface를 사용하고 싶다면 class를 사용하자.
var Human3 = /** @class */ (function () {
    // private는 class 내부에서만 접근이 가능하다. (person.age를 함수에서 접근하려고 하면 error가 발생한다.)
    // private age: number;
    // gender는 선택사항 (constructor는 생성자)
    function Human3(name, age, gender) {
        this.name = name;
        this.age = age;
        this.gender = gender;
    }
    return Human3;
}());
var lynn = new Human3("Lynn", 18, 'female');
var sayHi3 = function (person) {
    return "Hello ".concat(person.name, ", you are ").concat(person.age, ", you are a ").concat(person.gender);
};
console.log(sayHi3(lynn));
var CryptoJS = require("crypto-js");
// block class
var Block = /** @class */ (function () {
    function Block(index, hash, previousHash, data, timestamp) {
        this.index = index;
        this.hash = hash;
        this.previousHash = previousHash;
        this.data = data;
        this.timestamp = timestamp;
    }
    // static method는 class를 생성하지 않아도 호출할 수 있는 method
    Block.calculateBlockHash = function (index, previosHash, timestamp, data) { return CryptoJS.SHA256(index + previosHash + timestamp + data).toString(); };
    Block.validateStructure = function (aBlock) {
        return typeof aBlock.index === "number" &&
            typeof aBlock.hash === "string" &&
            typeof aBlock.previousHash === "string" &&
            typeof aBlock.timestamp === "number" &&
            typeof aBlock.data === "string";
    };
    return Block;
}());
// 블럭 생성
var genesisBlock = new Block(0, '02391230129', '', 'hello', 1234932);
// blockChain 배열에 push하려면 Block class 형태의 값이 와야한다.
// correct한 값만 push 할 수 있다.
var blockChain = [genesisBlock];
var getBlockchain = function () { return blockChain; };
var getLatestBlock = function () { return blockChain[blockChain.length - 1]; };
var getNewTimeStamp = function () { return Math.round(new Date().getTime() / 1000); };
var createNewBlock = function (data) {
    var previosBlock = getLatestBlock();
    var newIndex = previosBlock.index + 1;
    var newTimeStamp = getNewTimeStamp();
    var newHash = Block.calculateBlockHash(newIndex, previosBlock.hash, newTimeStamp, data);
    var newBlock = new Block(newIndex, newHash, previosBlock.hash, data, newTimeStamp);
    addBlock(newBlock);
    return newBlock;
};
var getHashforBlock = function (aBlock) { return Block.calculateBlockHash(aBlock.index, aBlock.previousHash, aBlock.timestamp, aBlock.data); };
var isBlockValid = function (candidateBlock, previousBlock) {
    if (!Block.validateStructure(candidateBlock)) {
        return false;
    }
    else if (previousBlock.index + 1 !== candidateBlock.index) {
        return false;
    }
    else if (previousBlock.hash !== candidateBlock.previousHash) {
        return false;
    }
    else if (getHashforBlock(candidateBlock) !== candidateBlock.hash) {
        return false;
    }
    else {
        return true;
    }
};
var addBlock = function (candidateBlock) {
    if (isBlockValid(candidateBlock, getLatestBlock())) {
        blockChain.push(candidateBlock);
    }
};
createNewBlock("second block");
createNewBlock("third block");
createNewBlock("fourth block");
console.log(blockChain);
//# sourceMappingURL=index.js.map