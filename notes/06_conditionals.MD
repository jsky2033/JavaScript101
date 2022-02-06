# Operators

## == vs ===

The latter checks for value AND type equality! It is what is most reccomended as one should care about what type is being compared.

=== true is not really necessary and neither is the check for false as they can be use implcitly.

## else if

Else ifs allow for other conditions to be checked for. What is the difference between this and a series of if statements?

The difference is that the else ifs are all related to the other prepending conditions. If one of the first conditions is met, the else if will never execute.

However if one of the first conditions is met, the seperate if may also execute! There is no reliance on the first condition failing.

* So use an else if, if there is no possibility of more than one condition being true at the same time. 

## Comparing objects and arrays

Two objects and arrays that are identical will not pass the conditional check with == OR ===. HOWEVER, directly comparing the identical elements inside will pass the conditional.

Unless of course the identical elements inside are also objects/arrays.

## Order of Operations

Left to right always. Follow math rules. Left to right with comparison operators as well.

Note that math operations will take precedence over comparison operators.

<script>
  if (currentPlayerHealth >= chosenMaxLife - HEAL_VALUE) {
  }
</script>

The comparison operator will check against the result of the operation.

## A note on the || comparison operator

It should also be noted that when we have two conditions in the operator with an || comparison,

<script>
if(isNaN(numInput) || numInput <=0){
    chosenMaxLife = 100;
  }
</script>

If the first one is true, then it will NOT bother checking if the second one is true or not. As such you must ensure that the more important check comes first.

In this case the more important check is if the input is a number. If it is not a number there is no point in checking if it is below 0 or not!

## Joining OR statements

<script>
  if ((randomNumber > 0.7 && randomNumber2 > 0.7) || (randomNumber < 0.2 || randomNumber2 < 0.2)) {}
  //is the same as 
  if ((randomNumber > 0.7 && randomNumber2 > 0.7) || randomNumber < 0.2 || randomNumber2 < 0.2) {}
  </script>

This is because the OR property is commutative and as such there is no need to group them together. 

## Falsy and Truthy

This refers to JavaScript coerce values to Boolean if used in comparison operators.

These values will always be falsy:

- 0
- ""
- null/undefined/NaN

* NaN means not a number

ANY other value will always be truthy.

So these will implcitly be converted to their boolean values if they are used in comparison to anything. Please realize that this does NOT actually convert values.

## Ternary Operator

Sometimes we want to return values as a result of a condition.

<script>
const userName = isLogin?'Max':null;

// using if else

const userName = isLogin=='prenium'?'Max_VIP': isLogin?'Max':null;
</script>

## Boolean Tricks with Logical Operators

### Boolean Coercion

This is a way to have truthy and falsy values be converted into actual true/false value.

<script>
const userName = "Max";

if(!!userName){
}
</script>

This is done so that we have, with absolute certainty a true boolean value for username and do not rely on the conditional checking a truthy value.

Check absolutely for false by doing !!!

### Default value assignment

This is a value to provide a default value for a variable if a value for that variable no longer exists (it is a falsy value).

<script>
  const name = someInput || 'Max';
  </script>

### Make assignment conditional

The && operator ALWAYS returns the second value if the first value if truthy.

<script>
//this will be set to 'Max' if isLoggedIn is truthy
const name = isLoggedIn && 'Max';
// this will be set to 'Anna' as it is the second value
const userName = 'Max' && 'Anna';
// this will return '' as it is falsy
const userName = '' && 'Anna';
</script>

## Switch Statement

Switch statements are used for multiple cases of if statements. It is like a series of if statements rather than else ifs.

<script>
switch(event){
  case equalityValue:
    //some code
  break;
  default:
    //code in case no other case is met
}
</script>

If more complex conditions or combined conditions are required, then else if is suggested.  Finally is code that gets executed no matter what. 

