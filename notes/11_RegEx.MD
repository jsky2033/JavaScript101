# Basics

Regular expressions allow us to check a series of characters for 'matches'. An example would be to check if a form field contains the characters for a valid email address or password. As well as if the value in there matches a certain password. It can also be used for URL matching as well. 

# text matching

- /ninja

This means that there is a simple, literal, case-sensitive search for the character pattern that checks for the first match regardless of appeneding/prepending characters.

'ninja', 'ninjawawa', 'ninjaninja' 'ninja ninja' will return one match while 'Ninja' will return none. 

# character set

- /[ng]inja

This is if you would like to look for a certain subset of characters that exists in strings rather than a literal match. For example the expression above would allow you to search for any string that starts with n OR g and ends with 'inja'. 

Keep in mind the customizable 'free' section is what you put in brackets and the rest is the character set that MUST be literally there. 

- /[^ng]inja

This does the inverse! It searches for everything EXCEPT for n or g in the first position. It is an inverted character set.

Of course this can be done for numbers as well!

# ranges

- /[a-z]inja

This refers to all the letters between a to z. 

# repeating characters

Let us say we have a phone number which has a set number of characters and an induvidual range for each of those characters. How would we attempt to match for all those?

- /[0-9]{10}

This does that for a 10-digit number where each digit is from 0-9. It essentially states: 10 repetitions of any character from 0-9!

- /[a-d]{5,8}

This will look for matches where the string is between 5 to 8 characters long and whose characters range from a to d. 

# Metacharacters

This is essentially shorthand for certain ranges and characters

\d => match any digit character

\w => match any word character

[a-zA-Z0-9_]

Note that this includes uppercase letters, 0-0 and underscores (_'s)

\s => match a whitespace character (spaces, tabs etc)

\t => match a tab character

- \d{3}\s\w

This means you want 3 digits, then a space and then a whitespace in this order. 

# Special Characters

- +

This character appears one or more times. So \d+ means that we want a digit to appear more than once. This can also be used in combination with other characters to mean you don't care how many letters appear like this before the letter you are looking for

\w+@[a-z]+\.com

This is used to match for an email for example. Notice that [a-z]+ means any number of characters from a-z.

- ?

This makes the preceding character optional. '\d?Mel' would  look for any instance of 'Mel' and not care if a digit was before it (though that would also be caught!).

'please?' would look for any instance of 'pleas'

- .

Any character whatsoever. 'car.' will look for a 4-character string where any character can come after car

- *

This means zero or as many times as possible. So card[a-z]* means card and anything after that. 

* What is the difference between * and + ?

a*  ---> a{0,}  ---> Match a or aa or aaaaa or an empty string
a+  ---> a{1,}  ---> Match a or aa or aaaa but not a string empty

- \

This is very important as it is the escape character! It allows you to search for those characters in a literal sense.

So if you want to look for .com in the string you do:

\.com 

# Start and End Pattern

Let us say we want to ensure the user input is 5 characters long exactly. \[a-z]{5} would certainly catch that but would NOT take into account anything after that. 

So for example the user could type in 'dcscsdcscd' and it would still be a match as the first 5 are counted! If global is used, 2 matches are made. 

^[a-z]{5}$

What this does is state that the string has to be at the start and the end (respectively) of the form field. Which means that it is essentially mushed together and therefore limited to exactly 5 characters. Any more will cause no matches to be found. 

The two patterns can be used induvidually as well!

# Matching multiple cases

## OR

This is if you want a certain use case or some other use case. So for example this expression:

* (p|t)yre

This would give you a match if you entered pyre or tyre.The difference between this and just matching character sets is that this allows for entire strings to be used instead of simply one character

* (short|tall)? boy

This will look for all instances of 'boy' since the question mark is used. 

## AND

THis can be done using lookahead!

This is useful when you want to test for multiple parameters across a string. Essentially test multiple patterns with just one expression. Essentially an AND 

- A positive lookahead will look to make sure that the element in the search pattern is there but won't actually match it. So for example if you want several conditions for a string of fixed length as shown below: 

^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$

At least one upper case English letter, (?=.*?[A-Z])
At least one lower case English letter, (?=.*?[a-z])
At least one digit, (?=.*?[0-9])
At least one special character, (?=.*?[#?!@$%^&*-])
Minimum eight in length .{8,} (with the anchors)

Note the use of . 
This means whatever character, repeated 8 times. 

## Matching for specific string patterns

Let us say we want to have an email that matches a specific pattern which is:

1. any letters, numbers, dots and/or hyphens
@
2. any letters, numbers and/or hyphens
3. .
4. any letters with a range of 2-8
-- OPTIONAL PART --
5. .
6. any letters with a range of 2-8

- theboss@thenetninja.co.uk

Understand that the use of paranthesees can help here and even allow you to set specific sizes for parts of the pattern. 

<script>
const regEx = /^([a-z\d\.-]+)@([a-z\d-]{2,8})(\.[a-z]{2,8})?$/
</script>


# Flags

- g

This makes the search global and returns all instances of the search. 

- i

This makes the search insensitive. 