class Course {
  title;
  length;
  #price;
  constructor(newTtitle, newLength, newPrice) {
    this.title = newTtitle;
    this.length = newLength;
    this.#price = newPrice;
  }
  //price access
  set coursePrice(coursePriceInput) {
    if (coursePriceInput > 0) {
      this.#price = coursePriceInput;
    } else {
      console.log(`Price must be above 0`);
    }
  }
  get coursePriceShow() {
    return `\$${this.#price}`;
  }
  //methods
  valueCalc() {
    const regEx = /(.*)[h]/g;
    const hrs = parseFloat(this.length.match(regEx)[0].replace(/[^0-9]/g, ""));
    const regEx2 = /[s].*[m]/g;
    const mins = parseFloat(
      this.length.match(regEx2)[0].replace(/[^0-9]/g, "")
    );
    return parseInt((hrs * 60 + mins) / this.#price);
  }
  showSummary() {
    console.log(
      `Title: ${this.title}\nPrice: ${this.#price}\nLength: ${
        this.length
      }\nValue for your money: ${this.valueCalc()} mins/\$ `
    );
  }
}

class PracticalCourse extends Course {
  numOfExercises;
  constructor(title, length, price, newNum) {
    super(title, length, price);
    this.numOfExercises = newNum;
  }
}

class TheoreticalCourse extends Course {
  constructor(title, length, price) {
    super(title, length, price);
  }
  publish() {
    console.log("Course is published.");
  }
}

const course1 = new Course("JavaScript 1101", "5hrs40mins", 30.5);

const practicalCourse = new PracticalCourse(
  "Python 2202",
  "4hrs10min",
  20.2,
  8
);
const theoreticalCourse = new TheoreticalCourse("Chem 1130", "9hrs4min", 70.5);

theoreticalCourse.coursePrice = 30;
console.log(theoreticalCourse.coursePriceShow);
