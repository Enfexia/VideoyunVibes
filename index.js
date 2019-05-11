var renkler = ["#A3323F", "#913B3B", "#8D5867", "#917F3B", "#487452", "#3B4791", "#3B7D91", "#713B91"]
var bulunannota = 0;
var baruzunlugu = 16;
var tempo = 120;
if(window.location.href.includes('gonderi') == true) {
  urldennotarenderla();
} else {
  //console.log("anasayfadasın")
}

function urldennotarenderla() {
  var düzelmisurl = decodeURIComponent(window.location.href)
  düzelmisurl.split("?");
  for(var i = 1; i < düzelmisurl.split('?')[1].split('/')[1].split('&').length; i++) {
    //    console.log(window.location.href.split('?')[1].split('/')[1].split('&')[i])
    var satirinadi = düzelmisurl.split('?')[1].split('/')[1].split('&')[i].split(':')[0];
    for(var a = 0; a < düzelmisurl.split('?')[1].split('/')[1].split('&')[i].split(':')[1].split(',').length - 1; a++) {
      var notakolon = düzelmisurl.split('?')[1].split('/')[1].split('&')[i].split(':')[1].split(',')[a];
      //    console.log(window.location.href.split('?')[1].split('/')[1].split('&')[i].split(':')[1].split(',')[a]);
      var tempo = düzelmisurl.split(",/")[1].split("&")[0]
      notayigercektenrenderla(parseInt(notakolon) + 1, parseInt(satirinadi), tempo)
    }
  }
}

function notayigercektenrenderla(notakolon, satirinadi, tempo) {
  var yeni = 16 + satirinadi * 4;
  //console.log(yeni)
  //console.log(notakolon)
  document.querySelector("body > div > div:nth-of-type(" + yeni + ") > div > div:nth-of-type(" + notakolon + ")").setAttribute('aktif', 'true');
  document.getElementById("bpmsayisi").value = tempo
}
document.addEventListener('click', function(event) {
  // If the clicked element doesn't have the right selector, bail
  if(event.target.matches('.notakutusu')) {
    if(event.target.getAttribute('aktif') == 'true') {
      event.target.removeAttribute('aktif')
    } else {
      event.target.setAttribute('aktif', 'true')
    }
  }
  if(event.target.matches('.sestoplayici')) {
    console.log(event)
  }
  if(document.getElementById("urlkismi").style.display === "block" && event.target.matches('.paylasurl') == false) {
    document.getElementById("urlkismi").style.display = "none";
  }
  if(event.target.matches('.kaydetbuton') || event.target.matches('.kaydetsvg')) {
    var kaydeturlkismi = document.getElementById("urlkismi");
    if(kaydeturlkismi.style.display === "block") {
      kaydeturlkismi.style.display = "none";
    } else {
      url = ""
      yataysira = 0;
      yatayici = 0;
      urlguncelle()
    }
  }
  // Don't follow the link
  event.preventDefault();
  // Log the clicked element in the console
}, false);

function urlguncelle() {
  var kaydeturlkismi = document.getElementById("urlkismi");
  kaydeturlkismi.style.display = "block";
  var kisaomurluurl = "";
  document.querySelectorAll('.notasira').forEach((function(x) {
    yatayici = "";
    var olansatir = document.getElementsByClassName("nota_adi")[yataysira].getAttribute('notasira');
    for(var i = 0; i < x.children.length; i++) {
      if(x.children[i].getAttribute('aktif') == 'true') {
        yatayici += Array.from(x.children[i].parentNode.children).indexOf(x.children[i]) + ","
      }
    }
    if(yatayici == "") {} else {
      kisaomurluurl += "&" + olansatir + yatayici
    }
    yataysira++
  }))
  kaydeturlkismi.value = window.location.host + window.location.pathname + "?gonderi/" + kisaomurluurl + "/" + tempo
}
/*
window.onclick = function(e) {
  console.log(e.target.className); // then e.srcElement.className has the class
}

function notayatiklandi(element, sira) {
  console.log(element.classList)
  if(element.style.backgroundColor == "rgb(46, 46, 46)" || element.style.backgroundColor == "") {
    element.style.backgroundColor = renkler[sira];
    element.classList.add("aktif");
  } else {
    element.classList.remove("aktif");
    element.style.backgroundColor = "#2E2E2E";
  }
}
/*
var el = document.getElementsByClassName('notasira');
for(var i = 0; i < el.length; i++) {
  // Here we have the same onclick
  el.item(i).onclick = clickerFn;
}
*/
var instruments = {
  '0': ['1.mp3'],
  '1': ['2.mp3'],
  '2': ['3.mp3'],
  '3': ['4.mp3'],
  '4': ['5.mp3'],
  '5': ['6.mp3'],
  '6': ['7.mp3'],
  '7': ['8.mp3'],
}

function notacalici() {
  if(tempo != document.getElementById("bpmsayisi").value) {
    tempo = document.getElementById("bpmsayisi").value;
    clearInterval(intervalId);
    intervalId = setInterval(notacalici, 1000 / (tempo / 60));
  }
  var elems = document.querySelectorAll(".notakutusu");
  [].forEach.call(elems, function(el) {
    el.classList.remove("tempocu");
    el.removeAttribute('alevli')
  });
  document.querySelectorAll('.notasira').forEach((function(x) {
    if(x.children[bulunannota].getAttribute('aktif') == 'true') {
      new Audio(instruments[x.children[bulunannota].getAttribute('data-insturment')]).play()
      x.children[bulunannota].setAttribute('alevli', 'true');
    }
    x.children[bulunannota].className += " tempocu";
  }))
  bulunannota = (bulunannota + 1) % baruzunlugu;
}
var intervalId;

function notacal() {}

function baslat() {
  document.getElementsByClassName('baslatbuton')[0].setAttribute("onClick", "durdur()");
  document.querySelector("body > div > div:nth-child(5) > div > div.onbirbosluk > div > span").innerText = "Durdur";
  document.querySelector("body > div > div:nth-child(5) > div > div.onbirbosluk > div > svg > path").setAttribute('d', 'M2 2h20v20h-20z')
  intervalId = setInterval(notacalici, 1000 / (tempo / 60));
}

function durdur() {
  clearInterval(intervalId);
  var elems = document.querySelectorAll(".notakutusu");
  [].forEach.call(elems, function(el) {
    el.classList.remove("tempocu");
    el.removeAttribute('alevli')
  });
  document.getElementsByClassName('baslatbuton')[0].setAttribute("onClick", "baslat()");
  document.querySelector("body > div > div:nth-child(5) > div > div.onbirbosluk > div > span").innerText = "Baslat";
  document.querySelector("body > div > div:nth-child(5) > div > div.onbirbosluk > div > svg > path").setAttribute('d', 'M0 18V0L17 9L0 18Z')
  bulunannota = 0;
}

function hepsinisil() {
  document.querySelectorAll('.notakutusu').forEach((function(x) {
    //    console.log(x)
    //  console.log(bulunannota);
    x.removeAttribute('aktif')
  }))
}
/*






*/