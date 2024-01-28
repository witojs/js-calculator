# js-calculator
Simple javascript calculator

Membuat Calculator menggunakan html, css & javascript

## Membuat berkas html

Kita akan membuat sebuah struktur html untuk membentuk calculator, elemen yang akan kita buat berupa sebuah input yang akan menampilkan angka dan hasil angka serta beberapa elemen button yang berfungsi sebagai tombol calculator.

Buat berkas html dengan nama index.html

```html
<!-- index.html -->
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Calculator</title>
    <link rel="stylesheet" href="style.css" />
  </head>
  <body>
    <div id="calculator">
      <p id="calculateHistory"></p>
      <input id="display" readonly />
      <p id="displayResult"></p>
      <div id="keys">
        <button class="operator-btn">+</button>
        <button class="number">7</button>
        <button class="number">8</button>
        <button class="number">9</button>
        <button class="operator-btn">-</button>
        <button class="number">4</button>
        <button class="number">5</button>
        <button class="number">6</button>
        <button class="operator-btn">*</button>
        <button class="number">1</button>
        <button class="number">2</button>
        <button class="number">3</button>
        <button class="operator-btn">/</button>
        <button class="number">0</button>
        <button class="number">.</button>
        <button class="equal">=</button>
        <button class="clear-all">C</button>
        <button class="clear-last">CE</button>
      </div>
    </div>

    <script src="main.js"></script>
  </body>
</html>
```

Pada code di atas, kita memberikan class "number" pada tombol 1-9 dan tombol (.). Pada tombol operator seperti +, -, /, \* kita memberikan class "operator-btn". Terdapat juga tombol dengan class "equal", "clear-all" & "clear last" Pemberian nama class ini selain digunakan untuk styling, kita juga akan gunakan untuk mengakses DOM.

## Melakukan Sytling

Buat berkas dengan nama style.css. Kita akan melakukan styling pada html agar tampilan menjadi menarik.

```css
body {
  margin: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: hsl(0, 0%, 95%);
}

#calculator {
  display: flex;
  flex-direction: column;
  font-family: Arial, Helvetica, sans-serif;
  background-color: hsl(0, 0%, 15%);
  border-radius: 15px;
  max-width: 350px;
  overflow: hidden;
}

#display {
  width: 100%;
  padding: 20px;
  font-size: 5rem;
  text-align: left;
  border: none;
  background-color: hsl(0, 0%, 20%);
  color: white;
}

#keys {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
  padding: 25px;
}

#calculateHistory,
#displayResult {
  color: white;
  text-align: end;
  padding-inline: 0.75rem;
}

button {
  width: 70px;
  height: 70px;
  border-radius: 50px;
  border: none;
  background-color: hsl(0, 0%, 30%);
  color: white;
  font-size: 3rem;
  font-weight: bold;
  cursor: pointer;
}

button:hover {
  background-color: hsl(0, 0%, 40%);
}

button:active {
  background-color: hsl(0, 0%, 50%);
}

.operator-btn {
  background-color: hsl(35, 100%, 55%);
}

.operator-btn:hover {
  background-color: hsl(35, 100%, 65%);
}

.operator-btn:active {
  background-color: hsl(35, 100%, 75%);
}
```

## Menambahkan fungsionalitas

Selanjutnya kita akan menambahkan fungsionalitas pada aplikasi. Buat berkas dengan nama main.js. Pada berkas kita memerlukan beberapa fungsi seperti:

```js
const display = document.getElementById('display');
const calculateHistory = document.getElementById('calculateHistory');
const displayResult = document.getElementById('displayResult');
const numberElement = document.querySelectorAll('.number');
const operationElement = document.querySelectorAll('.operator-btn');
const equalElement = document.querySelector('.equal');
const clearAllElement = document.querySelector('.clear-all');
const clearLastElement = document.querySelector('.clear-last');

let operationState = '';
let initialValue;
let nextValue;
let result;
let haveDot = false;

numberElement.forEach((number) => {
  number.addEventListener('click', (e) => {
    if (e.target.innerText === '.' && !haveDot) {
      haveDot = true;
    } else if (e.target.innerText === '.' && haveDot) {
      return;
    }
    display.value += e.target.innerText;
    initialValue = Number(display.value);
  });
});

//NOT IMPLEMENTED YET (FOR DEL BUTTON)
function deleteChar() {
  if (result) {
    return;
  }
  display.value = display.value.slice(0, -1);
  initialValue = Number(display.value);
}

operationElement.forEach((operation) => {
  operation.addEventListener('click', (e) => {
    if (!display.value) {
      return;
    }
    haveDot = false;
    const operationName = e.target.innerText;
    if (nextValue && initialValue && operationState) {
      calculate();
    } else {
      result = Number(initialValue);
    }
    clearVar(operationName);
    operationState = operationName;
    //console.log(result);
  });
});

function clearVar(name = '') {
  nextValue = initialValue;
  calculateHistory.innerText += `${initialValue} ${name} `;
  display.value = '';
  initialValue = '';
  displayResult.innerText = result;
}

function calculate() {
  if (operationState === '+') {
    result = Number(result) + initialValue;
  } else if (operationState === '-') {
    result = Number(result) - initialValue;
  } else if (operationState === '*') {
    result = Number(result) * initialValue;
  } else if (operationState === '/') {
    result = Number(result) / initialValue;
  }
}

equalElement.addEventListener('click', (e) => {
  if (!nextValue || !initialValue) {
    return;
  }
  haveDot = false;
  calculate();
  clearVar();
  display.value = result;
  displayResult.innerText = '';
  initialValue = result;
  nextValue = '';
});

clearAllElement.addEventListener('click', (e) => {
  displayResult.innerText = '';
  calculateHistory.innerText = '';
  initialValue = '';
  nextValue = '';
  result = '';
  display.value = '';
});

clearLastElement.addEventListener('click', (e) => {
  display.value = '';
  initialValue = '';
});

//keybinding
window.addEventListener('keydown', (e) => {
  if (
    e.key === '0' ||
    e.key === '1' ||
    e.key === '2' ||
    e.key === '3' ||
    e.key === '4' ||
    e.key === '5' ||
    e.key === '6' ||
    e.key === '7' ||
    e.key === '8' ||
    e.key === '9' ||
    e.key === '.'
  ) {
    clickButtonEl(e.key);
    // console.log(e.key)
  } else if (e.key === '+' || e.key === '-' || e.key === '/' || e.key === '*') {
    clickOperation(e.key);
  } else if (e.key == 'Enter' || e.key === '=') {
    clickEqual();
  } else if (e.key == 'Escape') {
    clickClearAll();
  }
  // console.log(e.key)
});

function clickButtonEl(key) {
  numberElement.forEach((button) => {
    if (button.innerText === key) {
      button.click();
    }
  });
}
function clickOperation(key) {
  operationElement.forEach((operation) => {
    if (operation.innerText === key) {
      operation.click();
    }
  });
}
function clickEqual() {
  equalElement.click();
}

function clickClearAll() {
  clearAllElement.click();
}

//Source & inspiration:
//WEB CIFAR - Build A Simple Calculator With JavaScript | Mini Project For Beginners: https://www.youtube.com/watch?v=0Vg4EiYPCUc
```

Berikut penjelasan pada code di atas:

1. Pada code berikut:

```js
const display = document.getElementById('display');
const calculateHistory = document.getElementById('calculateHistory');
const displayResult = document.getElementById('displayResult');
const numberElement = document.querySelectorAll('.number');
const operationElement = document.querySelectorAll('.operator-btn');
const equalElement = document.querySelector('.equal');
const clearAllElement = document.querySelector('.clear-all');
const clearLastElement = document.querySelector('.clear-last');
```

Kita membuat variabel dengan mengakses DOM element, seperti display yang mengakses element input, numberElement yang mengakses tombol nomor, dan seterusnya.

2. Kita juga membuat beberapa variabel seperti berikut:

```js
let operationState = '';
let initialValue;
let nextValue;
let result;
let haveDot = false;
```

- variabel operationState akan kita gunakan untuk menyimpan simbol operator (+, -, /, \*)
- variabel initialValue akan menyimpan nilai angka yang didapatkan dari menekan tombol number
- variabel nextValue akan menyimpan nilai selanjutnya yang akan kita gunakan pada operasi matematika
- variabel result digunakan untuk menyimpan hasil dari operasi matematika
- variabel haveDot digunakan untuk pengkondisian ketika kita menggunakan tanda (.) dalam membuat bilangan desimal.

3. Selanjutnya kita memberikan event listener pada tombol dengan class number, yakni numberElement.

```js
//kode sebelumnya disembunyikan

numberElement.forEach((number) => {
  number.addEventListener('click', (e) => {
    if (e.target.innerText === '.' && !haveDot) {
      haveDot = true;
    } else if (e.target.innerText === '.' && haveDot) {
      return;
    }
    display.value += e.target.innerText;
    initialValue = Number(display.value);
  });
});
```

Pada code di atas, kita melakukan iterasi pada variabel numberElement, setiap element button kita tambahkan event listener 'click' di mana kita melakukan pengecekan apakah kita telah menekan tombol '.'. Jika tombol '.' telah ditekan & variabel haveDot bernilai false maka kita akan mengubah nilai dari variabel haveDot menjadi true.
Sedangkan jika tombol '.' ditekan dan variabel haveDot telah bernilai true, maka fungsi terhenti. Bagian kode tersebut akan membatasi penggunaan tombol '.', sehingga menghindari kita menulis contohnya: 2.75.12 dikarenakan tombol '.' hanya dapat ditekan sekali saja.
Kemudian kita juga memunculkan nilai yang kita tekan pada element display. Setelah itu nilai tampilan tersebut kita masukan dalam variabel initialValue.

4. Tombol number telah kita berikan event listener, selanjutnya kita memberikan event listener pada setiap tombol operator yakni operationElement.

```js
//code lainnya disembunyikan

operationElement.forEach((operation) => {
  operation.addEventListener('click', (e) => {
    if (!display.value) {
      return;
    }
    haveDot = false;
    const operationName = e.target.innerText;
    if (nextValue && initialValue && operationState) {
      calculate();
    } else {
      result = Number(initialValue);
    }
    clearVar(operationName);
    operationState = operationName;
    //console.log(result);
  });
});
```

Pada code di atas, kita memberikan event listener untuk masing-masing tombol operator melalui iterasi forEach. Ketika tidak terdapat nilai pada tampilan input, maka tombol tidak akan melakukan hal apapun, setiap kita menekan tombol operator, kita juga mengembalikan nilai haveDot menjadi false, hal ini bertujuan agar ketika kita memasukan nilai selanjutnya, kita tetap dapat menggunakan angka desimal.
Nilai operator dari tombol juga kita masukan ke dalam variabel operationName, contohnya ketika kita menekan tombol "+" maka nilai dari operationName adalah "+".
Selanjutnya kita membuat pengkondisian, jika nilai pertama, nilai kedua serta nilai operasi ditemukan, maka fungsi calculate() akan dijalankan. Nilai dari initialValue akan kita masukan ke dalam variabel result. Pada event listener kita juga memanggil fungsi clearVar() dan menyimpan nilai dari operationName ke dalam variabel operationState.

5. Selanjutnya kita membuat fungsi clearVar. Fungsi ini akan menghilangkan tampilan display ketika tombol operasi ditekan dan memunculkan history perhitungan serta hasil perhitungan dalam bentuk element paragraph.

```js
function clearVar(name = '') {
  //nextValue += initialValue + ' ' + name + ' '; SOURCE BUG
  nextValue = initialValue;
  calculateHistory.innerText += `${initialValue} ${name} `;
  display.value = '';
  initialValue = '';
  displayResult.innerText = result;
}
```

fungsi clearVar akan menerima argumen berupa nilai dari tombol operator, kemudian memunculkan nilai pada element calculateHistory serta memunculkan hasil pada element displayResult. Pada fungsi ini kita juga memberikan nilai initialValue ke variabel nextValue.

6. Selanjutnya kita membuat fungsi calculate, fungsi ini akan melakukan kalkulasi perhitungan matematika.

```js
// code lainnya disembunyikan

function calculate() {
  if (operationState === '+') {
    result = Number(result) + initialValue;
  } else if (operationState === '-') {
    result = Number(result) - initialValue;
  } else if (operationState === '*') {
    result = Number(result) * initialValue;
  } else if (operationState === '/') {
    result = Number(result) / initialValue;
  }
}
```

fungsi calculate bekerja secara sederhana yakni melakukan operasi matematika berdasarkan nilai result sementara dengan nilai kedua dari input. Pada code yang kita buat di iterasi button operasi, nilai result pertama didapatkan dari nilai initialValue, kemudian ketika fungsi clearVar dijalankan maka nilai initialValue adalah nilai kedua yang kita input setelah tombol iterasi diklik. Contohnya ketika kita menginput 10 + 5

```js
// Tombol 10 ditekan,
// initialValue = 10,
// tombol operasi + ditekan,
// result = 10, initialValue = 0,
// tombol 5 ditekan,
// initialValue = 5,
// fungsi calculate dijalankan,
// result = 10 + 5 = 15
```

7. Selanjutnya kita berikan event listener pada tombol "=".

```js
// code lainnya disembunyikan

equalElement.addEventListener('click', (e) => {
  if (!nextValue || !initialValue) {
    return;
  }
  haveDot = false;
  calculate();
  clearVar();
  display.value = result;
  displayResult.innerText = '';
  initialValue = result;
  nextValue = '';
});
```

Ketika tombol "=" ditekan, kita akan melakukan pengecekan terlebih dahulu, jika nilai initialValue & nextValue tidak ditemukan maka tidak ada fungsi yang akan dijalankan. Jika terdapat nilai tersebut, kita akan mengatur nilai haveDot menjadi nilai awal yakni false, kemudian menjalankan fungsi calculate & clearVar. Nilai result akan ditampilkan pada display. Nilai result akan kita masukan ke initialValue, hal ini agar operasi selanjutnya dapat dilakukan dengan berdasarkan pada nilai terakhir.

8. Selanjutnya kita akan memberikan event listener pada tombol Clear all & clear last input.

```js
// code sebelumnya disembunyikan

clearAllElement.addEventListener('click', (e) => {
  displayResult.innerText = '';
  calculateHistory.innerText = '';
  initialValue = '';
  nextValue = '';
  result = '';
  display.value = '';
});

clearLastElement.addEventListener('click', (e) => {
  display.value = '';
  initialValue = '';
});
```

Pada tombol clearAll kita akan menghapus nilai initialValue, nextValue, result, display.value serta display result & calculate history. Sedangkan pada tombol clear last kita hanya menghapus nilai display.value & initialValue. Jalankan Aplikasi, Calculator sudah dapat digunakan dengan baik. 9. Kita juga memberikan fungsionalitas aplikasi ketika menggunakan keyboard.

```js
// code lainnya disembunyikan

//keybinding
window.addEventListener('keydown', (e) => {
  if (
    e.key === '0' ||
    e.key === '1' ||
    e.key === '2' ||
    e.key === '3' ||
    e.key === '4' ||
    e.key === '5' ||
    e.key === '6' ||
    e.key === '7' ||
    e.key === '8' ||
    e.key === '9' ||
    e.key === '.'
  ) {
    clickButtonEl(e.key);
    // console.log(e.key)
  } else if (e.key === '+' || e.key === '-' || e.key === '/' || e.key === '*') {
    clickOperation(e.key);
  } else if (e.key == 'Enter' || e.key === '=') {
    clickEqual();
  } else if (e.key == 'Escape') {
    clickClearAll();
  }
  // console.log(e.key)
});

function clickButtonEl(key) {
  numberElement.forEach((button) => {
    if (button.innerText === key) {
      button.click();
    }
  });
}
function clickOperation(key) {
  operationElement.forEach((operation) => {
    if (operation.innerText === key) {
      operation.click();
    }
  });
}
function clickEqual() {
  equalElement.click();
}

function clickClearAll() {
  clearAllElement.click();
}
```

Ketika browser dijalankan, maka interaksi menekan tombol atau keydown akan diberikan event listener.

