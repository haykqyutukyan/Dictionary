const formInput = document.getElementById("form")
const footerIn = document.getElementById("footer")
const formInput2 = document.getElementById("form2")
const footerIn2 = document.getElementById("footer2")


formInput.addEventListener("submit", (e) => {
   e.preventDefault();
   const value = formInput.querySelector("input").value; 
   
   fetch(`/search/${value}`)
   .then(response => response.json())
   .then(data => {
      if (data.found) {
         footerIn.innerHTML = "This word exists"
      } else {
         footerIn.innerHTML = "This word doesn't exist"
   }
})
});




function convertToSingularLowercase(word) {
   const lowercaseWord = word.toLowerCase();
 
   const rules = [
     { suffix: 's', replacement: '' },
     { suffix: 'es', replacement: '' },
     { suffix: 'ies', replacement: 'y' },
   ];
 
   const exceptions = [
      { word: 'man', replacement: 'men' },
      { word: 'woman', replacement: 'women' },
      { word: 'child', replacement: 'children' },
      { word: 'tooth', replacement: 'teeth' },
      { word: 'goose', replacement: 'geese' },
      { word: 'mouse', replacement: 'mice' },
      { word: 'sheep', replacement: 'sheep' },
      { word: 'deer', replacement: 'deer' },
      { word: 'fish', replacement: 'fish' },
      { word: 'series', replacement: 'series' },
      { word: 'species', replacement: 'species' },
      { word: 'ox', replacement: 'oxen' },
      { word: 'child', replacement: 'children' },
      { word: 'person', replacement: 'people' },
      { word: 'tooth', replacement: 'teeth' },
      { word: 'foot', replacement: 'feet' },
      { word: 'leaf', replacement: 'leaves' },
      { word: 'mouse', replacement: 'mice' },
      { word: 'louse', replacement: 'lice' },
      { word: 'cactus', replacement: 'cacti' },
      { word: 'focus', replacement: 'foci' },
      { word: 'fungus', replacement: 'fungi' },
    ];
 
   for (const exception of exceptions) {
     if (lowercaseWord === exception.word) {
       return exception.replacement;
     }
   }
 
   for (const rule of rules) {
     if (lowercaseWord.endsWith(rule.suffix)) {
       return lowercaseWord.slice(0, -rule.suffix.length) + rule.replacement;
     }
   }
 
   return lowercaseWord;
 }

 formInput2.addEventListener("submit", (e) => {
   e.preventDefault();
   const value2 = formInput2.querySelector("input").value; 
   footerIn2.innerHTML = convertToSingularLowercase(value2)
   
})



