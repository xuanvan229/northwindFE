const pets = [
  {name: "guichio", species: "dog"},
  {name: "felix", species: "cat"},
  {name: "nemo", species: "fish"},
];

let namePets = pets.map(item => item.name)

// for (let i=0; i<pets.length; i++) {
//   namePets.push(pets[i].name)
// }

console.log("[namePets] =>", namePets);