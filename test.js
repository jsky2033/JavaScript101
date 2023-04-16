const age = [30, 29, 54];

age.push(60);

const namePop = [
  { userName: "max", usages: 5 },
  { userName: "manu", usages: 10 },
];

const manuUsages = namePop.find((person) => person.userName === "manu").usages;

// BEST CASE: manu obj is first, CTC=> 0(1)
// WORST CASE: manu obj comes later, LTC=> 0(n)
// AVG CASE:  manu obj comes later, LTC=> 0(n)

const nameMap = {
  max: 5,
  manu: 6,
};

const mapManuUsages = nameMap["manu"];

// AVG CASE: manu obj always found in one execution, CTC => 0(1)
