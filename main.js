window.addEventListener('load', function() {
    if(localStorage.getItem('darkMode') === 'true') {
        document.body.classList.add('dark-mode');
        document.getElementById('darkModeToggle').classList.add('dark-mode');
    } else {
        document.getElementById('darkModeToggle').classList.remove('dark-mode');
    }
});

document.getElementById('darkModeToggle').addEventListener('click', function() {
    document.body.classList.toggle('dark-mode');
    
    if (document.body.classList.contains('dark-mode')) {
        localStorage.setItem('darkMode', 'true');
    } else {
        localStorage.setItem('darkMode', 'false');
    }
});

function load() {
    if(localStorage.getItem('darkMode') === 'true') {
        document.body.classList.add('dark-mode');
    }
}

function ZuzucieGazu() {
    var G = document.getElementById("G").value;
    var n = 1.1;

    if (G === "" || G === "X") {
        document.getElementById("wynik").innerHTML = "Proszę wpisać wartość zużycia drutu elektrodowego (G).";
    } else {
        G = parseFloat(G);
        if (isNaN(G)) {
            document.getElementById("wynik").innerHTML = "Wpisana wartość nie jest liczbą.";
        } else {
            var Q = G * n;
            Q = Q.toFixed(1);
            document.getElementById("wynik").innerHTML = "Zużycie gazu (Q) wynosi: " + Q + " kg.";
        }
    }
}

function ZuzycieDrutuElektrycznego() {
    var s = document.getElementById("S").value;
    var l = document.getElementById("l").value;
    var gamma = document.getElementById("γ").value;
    var k = document.getElementById("k").value;

    if (s.toUpperCase() === "X") s = null;
    if (l.toUpperCase() === "X") l = null;
    if (gamma.toUpperCase() === "X") gamma = null;
    if (k.toUpperCase() === "X") k = null;

    var G = null;

    if (s && l && gamma && k) {
        G = s * l * gamma * k;
        document.getElementById("G").value = G.toFixed(4);
        document.getElementById("wynik").innerHTML = "Zużycie drutu elektrodowego (G) wynosi: " + G.toFixed(4) + " kg.";
    }
    else if (s === null) {
        if (l && gamma && k) {
            G = parseFloat(l) * parseFloat(gamma) * parseFloat(k);
            s = G / (parseFloat(l) * parseFloat(gamma) * parseFloat(k));
            document.getElementById("S").value = s.toFixed(4);
            document.getElementById("wynik").innerHTML = "Przekrój spoiny (S) wynosi: " + s.toFixed(4) + " mm².";
        } else {
            document.getElementById("wynik").innerHTML = "Wprowadź brakujące dane.";
        }
    } else if (l === null) {
        if (s && gamma && k) {
            G = parseFloat(s) * parseFloat(gamma) * parseFloat(k);
            l = G / (parseFloat(s) * parseFloat(gamma) * parseFloat(k));
            document.getElementById("l").value = l.toFixed(4);
            document.getElementById("wynik").innerHTML = "Długość spoiny (l) wynosi: " + l.toFixed(4) + " mm.";
        } else {
            document.getElementById("wynik").innerHTML = "Wprowadź brakujące dane.";
        }
    } else if (gamma === null) {
        if (s && l && k) {
            G = parseFloat(s) * parseFloat(l) * parseFloat(k);
            gamma = G / (parseFloat(s) * parseFloat(l) * parseFloat(k));
            document.getElementById("γ").value = gamma.toFixed(4);
            document.getElementById("wynik").innerHTML = "Gęstość drutu (γ) wynosi: " + gamma.toFixed(4) + " kg/mm³.";
        } else {
            document.getElementById("wynik").innerHTML = "Wprowadź brakujące dane.";
        }
    } else if (k === null) {
        if (s && l && gamma) {
            G = parseFloat(s) * parseFloat(l) * parseFloat(gamma);
            k = G / (parseFloat(s) * parseFloat(l) * parseFloat(gamma));
            document.getElementById("k").value = k.toFixed(4);
            document.getElementById("wynik").innerHTML = "Współczynnik straty (k) wynosi: " + k.toFixed(4);
        } else {
            document.getElementById("wynik").innerHTML = "Wprowadź brakujące dane.";
        }
    } else {
        document.getElementById("wynik").innerHTML = "Wprowadź 'X' w jednym z pól, aby obliczyć wartość.";
    }
}

function PrzkrujPrzewoduSpawalniczego() {

    var s = document.getElementById("S").value;
    var l = document.getElementById("L").value;
    var deltau = document.getElementById("DeltaU").value;
    var gamma = document.getElementById("Gamma").value;
    var i = document.getElementById("I").value;

    var wzorS = (2 * parseFloat(i) * parseFloat(l)) / (parseFloat(deltau) * parseFloat(gamma));
    var wzorL = (parseFloat(s) * parseFloat(deltau) * parseFloat(gamma)) / (2 * parseFloat(i));
    var wzorDeltaU = (2 * parseFloat(i) * parseFloat(l)) / (parseFloat(s) / parseFloat(gamma));
    var wzorGamma = (2 * parseFloat(i) * parseFloat(l)) / (parseFloat(s) / parseFloat(deltau));
    var wzorI = (parseFloat(s) * parseFloat(deltau) * parseFloat(gamma)) / (2 * parseFloat(l));

    var wynik = document.getElementById("wynik");

    s = (s === "X" || s === "") ? "X" : parseFloat(s);
    l = (l === "X" || l === "") ? "X" : parseFloat(l);
    deltau = (deltau === "X" || deltau === "") ? "X" : parseFloat(deltau);
    gamma = (gamma === "X" || gamma === "") ? "X" : parseFloat(gamma);
    i = (i === "X" || i === "") ? "X" : parseFloat(i);

    if (s === "X" || l === "X" || deltau === "X" || gamma === "X" || i === "X") {
        if (s === "X") {
            var wzorS = (2 * i * l) / (deltau * gamma);
            wynik.innerHTML = "Wynik dla wzoru S: " + wzorS;
        }
        else if (l === "X") {
            var wzorL = (s * deltau * gamma) / (2 * i);
            wynik.innerHTML = "Wynik dla wzoru L: " + wzorL;
        }
        else if (deltau === "X") {
            var wzorDeltaU = (2 * i * l) / (s / gamma);
            wynik.innerHTML = "Wynik dla wzoru DeltaU: " + wzorDeltaU;
        }
        else if (gamma === "X") {
            var wzorGamma = (2 * i * l) / (s / deltau);
            wynik.innerHTML = "Wynik dla wzoru Gamma: " + wzorGamma;
        }
        else if (i === "X") {
            var wzorI = (s * deltau * gamma) / (2 * l);
            wynik.innerHTML = "Wynik dla wzoru I: " + wzorI;
        }
    }
    else {
        wynik.innerHTML = "Aby obliczyć wynik, musisz wpisać 'X' w jednym z pól.";
    }
}

function PrzekrojSpoinyPachwinowej() {
    var a = document.getElementById("a").value;
    var c = 1;

    if (a === "" || a === "X") {
        document.getElementById("wynik").innerHTML = "Proszę wpisać wartość długości boku spoiny (a).";
    } else {
        a = parseFloat(a);
        if (isNaN(a)) {
            document.getElementById("wynik").innerHTML = "Wpisana wartość nie jest liczbą.";
        } else {
            var S = a * a + (4 / 3) * a * c;
            S = S.toFixed(1);
            document.getElementById("wynik").innerHTML = "Przekrój spoiny pachwinowej (S) wynosi: " + S + " mm².";
        }
    }
}