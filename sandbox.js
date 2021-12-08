/*function isValidIP(str) {
  if (typeof str !== "string") return false;
  let result;
  let temp = str.split(".");
  let spacingCek = str.split(" ");
  let nextPharCheck = str.split("\n");
  let spacingDetected = false;
  let attributeNun = false;
  let morethan0or255;
  //   console.log(nextPharCheck);
  //   mencari yang ga 4
  if (temp.length != 4) return false;
  //mencari angka antara 0-255
  temp.forEach((e) => {
    if (e.length == 0) {
      morethan0or255 = true;
      result = false;
    }
  });
  //   if (morethan0or255) return result;

  temp.forEach((e) => {
    if (+e < 0 || +e > 255) {
      morethan0or255 = true;
      result = false;
    }
  });
  if (morethan0or255) return result;

  //mencari space
  //   console.log(spacingCek, "INI CEK SPASI");
  if (spacingCek.length > 1) {
    spacingDetected = true;
    result = false;
  }
  if (nextPharCheck.length > 1) {
    spacingDetected = true;
    result = false;
  }
  if (spacingDetected) return result;

  temp.forEach((e) => {
    for (let i = 0; i < e.length; i++) {
      let tampungan = isNaN(+e[i]);
      if (tampungan) {
        attributeNun = true;
        result = false;
      }
    }
  });
  if (attributeNun) return result;
  //Mencari yang NUN
  temp.forEach((e) => {
    let tampungan = isNaN(+e);
    if (tampungan) {
      attributeNun = true;
      result = false;
    }
  });
  if (attributeNun) return result;

  let leadingZero = false;
  temp.forEach((e) => {
    if (e[0] == "0") {
      leadingZero = true;
    }
  });
  //true bearrti ada 0 didepan
  // if yang bawah untuk cari tau 0.0.0.0
  let flag = false;
  if (leadingZero == true) {
    temp.forEach((e) => {
      if (e.length != 1) {
        flag = true;
      }
    });
    if (flag) {
      leadingZero = false;
      result = false;
      return result;
    } else {
      return (result = true);
    }
  }

  if (!leadingZero) result = true;
  return result;
}
// Test.assertEquals(isValidIP("0.0.0.0"), true);
//   Test.assertEquals(isValidIP("12.255.56.1"), true);
//   Test.assertEquals(isValidIP("137.255.156.100"), true);

// console.log(isValidIP("0.0.0.0")); //t
// console.log(isValidIP("12.255.56.1")); //t
// console.log(isValidIP("137.255.156.100")); //t
// console.log(isValidIP("")); //f
// console.log(isValidIP("abc.def.ghi.jkl")); //f
// console.log(isValidIP("123.456.789.0"));
// console.log(isValidIP("12.34.56"));
// console.log(isValidIP("01.02.03.04"));
// console.log(isValidIP("256.1.2.3"));
// console.log(isValidIP("1.2.3.4.5"));
// console.log(isValidIP("123,45,67,89"));
// console.log(isValidIP("1e0.1e1.1e2.2e2"));
// console.log(isValidIP(" 1.2.3.4"));
// console.log(isValidIP("1.2.3.4 "));
// console.log(isValidIP("12.34.56.-7"));
// console.log(isValidIP("1.2.3.4\n"));
// console.log(isValidIP("\n1.2.3.4"));
// console.log(isValidIP(".53.157.111"));
console.log(isValidIP(137.255));
*/

const { resolve } = require("url");

//Nomer 3

// function likes(names) {
//   // TODO
//   if (names.length == 0) return `no one likes this`;
//   if (names.length == 1) return `${names[0]} likes this`;
//   if (names.length == 2) return `${names[0]} and ${names[1]} like this`;
//   if (names.length == 3)
//     return `${names[0]}, ${names[1]} and ${names[2]} like this`;
//   if (names.length > 3)
//     return `${names[0]}, ${names[1]} and ${names.length - 2} others like this`;
// }

// console.log(likes([]));
// console.log(likes(["Peter"]));
// console.log(likes(["Jacob", "Alex"]));
// console.log(likes(["Max", "John", "Mark"]));
// console.log(likes(["Alex", "Jacob", "Mark", "Max"]));
// console.log(likes(["Alex", "Jacob", "Mark", "Fulan", "McQUeen"]));

//nomor 7
// function isPangram(string) {
//   let obj = {};
//   for (let i = 0; i < string.length; i++) {
//     if (string[i] != " " && string[i] != ".") obj[string[i].toLowerCase()] = 0;
//   }
//   if (Object.keys(obj).length >= 26) return true;
//   else return false;
// }

// console.log(isPangram("The quick brown fox jumps over the lazy dog."));
// console.log(isPangram("This is not a pangram."));

//Nomor 9

// const s =
//   "/+1-541-754-3010 156 Alphand_St. <J Steeve>\n 133, Green, Rd. <E Kustur> NY-56423 ;+1-541-914-3010\n" +
//   "+1-541-984-3012 <P Reed> /PO Box 530; Pollocksville, NC-28573\n :+1-321-512-2222 <Paul Dive> Sequoia Alley PQ-67209\n" +
//   "+1-741-984-3090 <Peter Reedgrave> _Chicago\n :+1-921-333-2222 <Anna Stevens> Haramburu_Street AA-67209\n" +
//   "+1-111-544-8973 <Peter Pan> LA\n +1-921-512-2222 <Wilfrid Stevens> Wild Street AA-67209\n" +
//   "<Peter Gone> LA ?+1-121-544-8974 \n <R Steell> Quora Street AB-47209 +1-481-512-2222\n" +
//   "<Arthur Clarke> San Antonio $+1-121-504-8974 TT-45120\n <Ray Chandler> Teliman Pk. !+1-681-512-2222! AB-47209,\n" +
//   "<Sophia Loren> +1-421-674-8974 Bern TP-46017\n <Peter O'Brien> High Street +1-908-512-2222; CC-47209\n" +
//   "<Anastasia> +48-421-674-8974 Via Quirinal Roma\n <P Salinger> Main Street, +1-098-512-2222, Denver\n" +
//   "<C Powel> *+19-421-674-8974 Chateau des Fosses Strasbourg F-68000\n <Bernard Deltheil> +1-498-512-2222; Mount Av.  Eldorado\n" +
//   "+1-099-500-8000 <Peter Crush> Labrador Bd.\n +1-931-512-4855 <William Saurin> Bison Street CQ-23071\n" +
//   "<P Salinge> Main Street, +1-098-512-2222, Denve\n";

// console.log(dr.split(","));
// function phone(string, num) {
//   let getSearch = string.split("\n");
//   let flag = [];
//   let sementara = [];
//   //   console.log(getSearch);
//   getSearch.forEach((element) => {
//     let getName1 = element.split("<")[1].split(">")[0];
// sementara.push(getName1);
// let getPhone = element
//   .split("+")[1]
//   .split(" ")[0]
//   .split("!")[0]
//   .split(";")[0]
//   .split(",")[0];
// // console.log(getPhone);
// let deleteName = element.replace(`<${getName1}>`, "");
// let deletePhone = deleteName.replace(`+${getPhone}`, "").split(" ");
// // console.log(deletePhone);
// let joining = [];
// let joining1 = [];
// deletePhone.forEach((e) => {
//   if (e.length !== 0) joining.push(e);
// });
// joining.forEach((e) => {
//   let temp = e.replace("/", " ");
//   let temp1 = temp.replace(";", " ");
//   let temp2 = temp1.replace(",", " ");
//   let temp3 = temp2.replace("_", " ");
//   let temp4 = temp3.replace(":", " ");
//   let temp5 = temp4.replace("*", " ");
//   let temp6 = temp5.replace("?", " ");
//   let temp7 = temp6.replace("!", " ");
//   let temp8 = temp7.replace("!", " ");
//   let temp9 = temp8.replace("$", " ");
//   let temp10 = temp9.split(" ");
//   // console.log(temp5);
//   temp10.forEach((e) => {
//     if (e.length !== 0) joining1.push(e);
//   });
//   // console.log(e);
// });
// let address = joining1.join(" "); // dapetin address
// let searchResult = `Phone => ${getPhone}, Name => ${getName1}, Address => ${address}`;
// // console.log(searchResult);
// if (getPhone == num) {
//   flag.push(searchResult);
// }
//   });
//   sementara.forEach((element) => {
//     console.log(element);
//   });
//   if (flag.length > 1) return `Too many people: ${num}`;
//   if (flag.length == 0) return `Not Found: ${num}`;

//   return flag[0];
// }

// console.log(testing(dr));

// describe("phone",function() {
// it("Basic tests",function() {
// console.log(phone(s, "48-421-674-8974")); //   "Phone => 48-421-674-8974, Name => Anastasia, Address => Via Quirinal Roma"
// console.log(phone(s, "1-908-512-2222")); //"Phone => 1-908-512-2222, Name => Peter O'Brien, Address => High Street CC-47209")
// console.log(phone(s, "1-541-754-3010")); //"Phone => 1-541-754-3010, Name => J Steeve, Address => 156 Alphand St.")
// console.log(phone(s, "1-121-504-8974")); //"Phone => 1-121-504-8974, Name => Arthur Clarke, Address => San Antonio TT-45120")
// console.log(phone(s, "1-498-512-2222")); // "Phone => 1-498-512-2222, Name => Bernard Deltheil, Address => Mount Av. Eldorado")
// console.log(phone(s, "1-098-512-2222")); // "Error => Too many people: 1-098-512-2222")
// console.log(phone(s, "5-555-555-5555")); //"Error => Not found: 5-555-555-5555")
// })})

//hashtag generator
// function generateHashtag(str) {
//   if (str.length == 0) return false;
//   let tamp = str.split(" ");
//   let tampHash = [];
//   let tampungan = tamp.filter((e) => {
//     return e != "";
//   });
//   if (tampungan.length == 0) return false;

//   //bikin hashtag
//   let firstWord;
//   let words;
//   //   console.log(tampungan);
//   tampHash.push("#");
//   tampungan.forEach((element) => {
//     firstWord = element[0].toUpperCase();
//     words = "";
//     for (let i = 1; i < element.length; i++) {
//       words += element[i];
//     }
//     tampHash.push(firstWord, words);
//   });
//   //   console.log(tampHash.join(""));
//   //   console.log(tampHash.join("").length);
//   if (tampHash.join("").length > 140) return false;
//   return tampHash.join("");
// }

// console.log(generateHashtag("")); //, false, "Expected an empty string to return false")
// console.log(generateHashtag(" ".repeat(200))); //, false, "Still an empty string")
// console.log(generateHashtag("Do We have A Hashtag")); //, "#DoWeHaveAHashtag", "Expected a Hashtag (#) at the beginning.")
// console.log(generateHashtag("Codewars")); //, "#Codewars", "Should handle a single word.")
// console.log(generateHashtag("Codewars Is Nice")); //, "#CodewarsIsNice", "Should remove spaces.")
// console.log(generateHashtag("Codewars is nice")); //, "#CodewarsIsNice", "Should capitalize first letters of words.")
// console.log(generateHashtag("code" + " ".repeat(140) + "wars")); //, "#CodeWars")
// console.log(
//   generateHashtag(
//     "Looooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooong Cat"
//   )
// );
// ); //, false, "Should return false if the final word is longer than 140 chars.")
// console.log(generateHashtag("a".repeat(139))); //, "#A" + "a".repeat(138))//, "Should work")
// console.log(generateHashtag("a".repeat(140))); //, false, "Too long")

//calculating with functions

// function action(num, calculation) {
//   if (!calculation) {
//     return num;
//   }
//   return calculation(num);
// }

// function zero(calculation) {
//   return action(0, calculation);
// }
// function one(calculation) {
//   return action(1, calculation);
// }
// function two(calculation) {
//   return action(2, calculation);
// }
// function three(calculation) {
//   return action(3, calculation);
// }
// function four(calculation) {
//   return action(4, calculation);
// }
// function five(calculation) {
//   return action(5, calculation);
// }
// function six(calculation) {
//   return action(6, calculation);
// }
// function seven(calculation) {
//   return action(7, calculation);
// }
// function eight(calculation) {
//   return action(8, calculation);
// }
// function nine(calculation) {
//   return action(9, calculation);
// }

// function plus(firstNum) {
//   return function (secondNum) {
//     return Math.floor(secondNum + firstNum);
//   };
// }
// function minus(firstNum) {
//   return function (secondNum) {
//     return Math.floor(secondNum - firstNum);
//   };
// }
// function times(firstNum) {
//   return function (secondNum) {
//     return Math.floor(secondNum * firstNum);
//   };
// }
// function dividedBy(firstNum) {
//   return function (secondNum) {
//     return Math.floor(secondNum / firstNum);
//   };
// }

// console.log(seven(times(five())));
// console.log(four(plus(nine())));
// console.log(eight(minus(three())));
// console.log(six(dividedBy(two())));

// countring duplicates

// function duplicateCount(text) {
//   let temp = text.toLowerCase(); //aa bbcde
//   //   console.log(temp);
//   let count = 0;
//   let tempArray = [];
//   let obj = {};
//   for (let i = 0; i < temp.length; i++) {
//     if (tempArray.length == 0) {
//       tempArray.push(temp[i]);
//     } else {
//       let flag = false;
//       for (let j = 0; j < tempArray.length; j++) {
//         if (temp[i] == tempArray[j]) {
//           flag = true;
//           //   count++;
//         }
//       }
//       if (!flag) {
//         tempArray.push(temp[i]);
//       }
//       if (flag) {
//         obj[temp[i]] = 0;
//       }
//     }
//   }
//   return Object.keys(obj).length;
// }

// console.log(duplicateCount("")); //, 0);
// console.log(duplicateCount("abcde")); //, 0);
// console.log(duplicateCount("aabbcde")); //, 2);
// console.log(duplicateCount("aabBcde")); //, 2,"should ignore case");
// console.log(duplicateCount("Indivisibility")); //, 1)
// console.log(duplicateCount("Indivisibilities")); //, 2, "characters may not be adjacent")

const myPromise = () => Promise.resolve().then(() => console.log("1"));

const firstFunction = () => {
  setTimeout(() => {
    console.log("2");
  }, 0);
  myPromise();
};

async function secondFunction() {
  await new Promise((resolve) => {
    console.log("3");
    resolve();
  });
  console.log("4");
}

console.log("5");
firstFunction();
secondFunction();
