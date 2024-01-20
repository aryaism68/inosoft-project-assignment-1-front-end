function changeMode() {
  let imageMode = document.getElementById("lightDarkMode");

  if (imageMode.getAttribute("src") == "./images/Light mode.png") {
    imageMode.src = "./images/Dark mode.png";
    document.documentElement.setAttribute("data-bs-theme", "dark");
  } else {
    imageMode.src = "./images/Light mode.png";
    document.documentElement.setAttribute("data-bs-theme", "light");
  }
}

function clearAll() {
  let number = document.getElementById("inputResult").innerHTML;
  let historyScreen = document.getElementById("history").innerHTML;

  number = 0;
  historyScreen = "";
  equalClick = 0;
  operatorClick = 0;

  document.getElementById("inputResult").innerHTML = number;
  document.getElementById("history").innerHTML = historyScreen;
}

function plusMinus() {
  let number = document.getElementById("inputResult").innerHTML;

  number *= -1;

  document.getElementById("inputResult").innerHTML = number;
}

function percentage() {
  let number = document.getElementById("inputResult").innerHTML;

  number /= 100;

  document.getElementById("inputResult").innerHTML = number;
}

function input(inputNumber) {
  let number = document.getElementById("inputResult").innerHTML;
  let historyScreen = document.getElementById("history").innerHTML;

  // agar jika hasil perhitungan sebelumnya adalah NaN atau Infinity misalna dari 0/0 atau 2/0, maka jika tombol angka 1 ditekan selanjutnya, hasil NaN/Infinity tersebut akan hilang dan digantikan dengan nilai input (contoh 1), tidak menjadi NaN1/Infinity1
  if (isNaN(number) || number == "Infinity" || number == "-Infinity") {
    historyScreen = "";
    number = inputNumber;
  } else {
    if (number == 0 && number.substring(number.length - 1) != ".") {
      if (number.includes(".")) {
        //  agar ketika menuliskan angka 0 dengan banyak angka di belakang koma (contoh 0.00000500005), angka 0 kedua di belakang koma tetap bisa diinput
        number += inputNumber;
      } else {
        //   agar ketika pertama kali memasukkan angka, angka nol default berubah sesuai angka input dan mencegah dua angka nol di depan koma (00.)
        number = inputNumber;
      }
      // untuk menambah angka puluhan/ratusan/dsb.
    } else {
      number += inputNumber;
    }
  }

  operatorClick = 0;

  document.getElementById("history").innerHTML = historyScreen;
  document.getElementById("inputResult").innerHTML = number;
}

let operatorClick = 0;

function operator(sign) {
  let number = document.getElementById("inputResult").innerHTML;
  let historyScreen = document.getElementById("history").innerHTML;

  operatorClick += 1;

  // agar jika tanda operator ditekan dua kali secara berturut-turut, contoh 2+-, layar akan berubah menjadi 2- saja, bukan 2+0-, juga setelah memperoleh hasil NaN/Infinite lalu menekan tombol operator 2x tidak akan terjadi layar history berisi tanda operator saja tanpa angka yang mendahuluinya
  if (operatorClick > 1 && historyScreen != "") {
    historyScreen = historyScreen.slice(0, number.length - 3) + sign;
    number = number;
  } else {
    // agar setelah menekan tanda sama dengan lalu menekan tanda operator, nilai hasil dan operator berpindah ke layar history, dan kotak input siap untuk dimasukkan angka lagi
    if (equalClick > 0) {
      // agar jika tanda desimal tidak sengaja diletakkan di belakang angka hasil kalkulasi (contoh: 8.), lalu tanda operator ditekan, di layar history akan tertera sebagai 8 saja bukan 8. (tidak berlaku untuk desimal dengan angka di belakang koma, contoh 8.0 akan tetap 8.0)
      if (number.slice(-1) == ".") {
        historyScreen = number.slice(0, number.length - 1) + sign;
        number = 0;
      } else {
        historyScreen = number + sign;
        number = 0;
      }
    } else {
      // agar jika tanda desimal tidak sengaja diletakkan di belakang angka (contoh: 3.), setelah menekan tanda operator, di layar history akan tertera sebagai 3 saja bukan 3. (tidak berlaku untuk desimal dengan angka di belakang koma, contoh 3.0 akan tetap 3.0)
      if (number.slice(-1) == ".") {
        historyScreen = historyScreen + number.slice(0, number.length - 1) + sign;
        number = 0;
      } else {
        historyScreen = historyScreen + number + sign;
        number = 0;
      }
    }
  }

  equalClick = 0;

  document.getElementById("history").innerHTML = historyScreen;
  document.getElementById("inputResult").innerHTML = number;
}

function clearInput() {
  let number = document.getElementById("inputResult").innerHTML;

  number = 0;

  document.getElementById("inputResult").innerHTML = number;
}

function decimal() {
  let number = document.getElementById("inputResult").innerHTML;
  let historyScreen = document.getElementById("history").innerHTML;

  // agar jika hasil perhitungan sebelumnya adalah NaN atau Infinity misalna dari 0/0 atau 2/0, setelah menekan tombol desimal, hasil NaN/Infinity tersebut akan tetap nilainya, tidak menjadi NaN./Infinity.
  if (isNaN(number) || number == "Infinity" || number == "-Infinity") {
    number = number;
  } else {
    // agar tanda desimal hanya boleh berada satu kali dalam angka yang diinput (untuk mencegah input 0...03)
    if (!number.includes(".")) {
      number += ".";
    }
  }

  operatorClick = 0;

  document.getElementById("history").innerHTML = historyScreen;
  document.getElementById("inputResult").innerHTML = number;
}

let equalClick = 0;

function calculate() {
  let number = document.getElementById("inputResult").innerHTML;
  let historyScreen = document.getElementById("history").innerHTML;

  // agar jika hasil perhitungan sebelumnya adalah NaN atau Infinity misalna 0/0 atau 2/0, setelah menekan tanda =, hasil NaN/Infinity tersebut akan hilang dan digantikan dengan nilai 0 di input
  if (isNaN(number) || number == "Infinity" || number == "-Infinity") {
    historyScreen = "";
    number = 0;
  } else {
    if (isNaN(historyScreen.slice(-2))) {
      // agar jika tanda desimal tidak sengaja diletakkan di belakang angka input kedua (contoh: 3 + 5.), setelah menekan tanda =, di layar history akan tertera sebagai 5 saja bukan 5.
      if (number.slice(-1) == ".") {
        historyScreen = historyScreen + number.slice(0, number.length - 1);
        number = eval(historyScreen);
      } else {
        historyScreen = historyScreen + number;
        number = eval(historyScreen);
      }
    } else {
      // agar saat memasukkan input, jika tanda desimal tidak sengaja diletakkan di belakang angka (contoh: 3.), setelah menekan tanda =, di layar input akan tertera sebagai 3 saja bukan 3.
      if (number.slice(-1) == ".") {
        number = number.slice(0, number.length - 1);
      }
    }
  }

  equalClick += 1;
  operatorClick = 0;

  document.getElementById("history").innerHTML = historyScreen;
  document.getElementById("inputResult").innerHTML = number;
}

document.addEventListener("keydown", function (event) {
  if (event.key == 0 || event.key == 1 || event.key == 2 || event.key == 3 || event.key == 4 || event.key == 5 || event.key == 6 || event.key == 7 || event.key == 8 || event.key == 9) {
    input(event.key);
  } else if (event.key == "%") {
    percentage();
  } else if (event.key == "+" || event.key == "-" || event.key == "*" || event.key == "/") {
    operator(" " + event.key + " ");
  } else if (event.key == ".") {
    decimal();
  } else if (event.key == "=") {
    calculate();
  } else if (event.key == "c" || event.key == "C") {
    clearInput();
  } else if (event.key == "a" || event.key == "A") {
    clearAll();
  } else if (event.key == "m" || event.key == "M") {
    plusMinus();
  }
});
