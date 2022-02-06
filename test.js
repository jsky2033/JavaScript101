
const arr = [5,4,30,-3,2.5];
let max = arr[0];

for(let i = 1; i < arr.length; i++){
  console.log(`Iteration ${i}: arr[${i}](${arr[i]})>max(${max})?`)
  if (arr[i] > max){
    max = arr[i];
    console.log(`Yes! So max is now ${max}`)
  }else{
    console.log(`No! So max is still ${max}`)
  }
}


