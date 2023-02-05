# Numbers

In JS, every number is a Float. JS does not know special integer types.

## Floating Point Imprecision

Adding decimal numbers may product incorrect or falsy results when you try to compare them.

We solve this (at least in a limited way) by using the toFixed function and specifying number of digits which rounds the number to those digits.

<script>
    0.2 + 0.4 === 0.6 //false

    (0.2 + 0.4).toFixed(2); // this will at least result in 0.5
</script>

# Global Objects

## Infinity

This is what you can get when you do 1/0. Note that you do not get an error if you do this. You can check if soemthing is + or - negative infinite with .isFinite

## Math

The Math Object will probably have what you are looking for if you desire a special Mathematical number.

## True Randomizing

<script>
const randomIntBetween = (min, max) => {
  // min: 5, max: 10
  return Math.floor(Math.random() * (max - min + 1) + min);
};
</script>
