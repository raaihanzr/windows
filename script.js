var customMenu = document.querySelector(".context-menu");
var inputAddress = document.querySelector(".addressbar input");

window.addEventListener("contextmenu", function (e) {
  var desktopElement = e.target.closest(".desktop");
  if (desktopElement && !e.target.closest(".taskbar") && !e.target.closest(".float-app") && !e.target.closest(".boot")) {
    e.preventDefault();
    setTimeout(()=> {
      customMenu.style.left = e.pageX + "px";
      customMenu.style.top = e.pageY + "px";
      customMenu.style.display = "block";
    }, 10);
  }
});


var nyenye = ["gak ada", 'tidak ada', 'enggak ada', 'kagak ada', 'ora ada'];
var capek = 0;

window.addEventListener("click", function (e) {
  if (e.target.getAttribute("action-data") == "refresh")  {
    refresh();
  } else if (e.target.getAttribute("action-data") == "feedback") {
    setTimeout(()=> {
    var msg = prompt("Apa yang dapat diperbaiki/dikembangkan lagi?");
    if (nyenye.includes(msg.toLowerCase())) {
      jwbn(capek);
      capek++;
    } else if (msg) {
      alert("Terima kasih atas tanggapannya!");
    }
    },100);
  }
  customMenu.style.display = "none";
});

function jwbn(count) {
  if (capek == 0) {
    alert("Kalo gak ada buat apa bilang? 🗿");
  } else if (capek == 1) {
    alert("Kalo gak ada gak usah ngomong !");
  } else if (capek == 2) {
    alert("Kalo gak ada diem aja napa");
  } else if (capek == 3) {
    alert("Bodo amat dah");
  }
}

function refresh() {
  var ctcy = document.querySelector(".apps").innerHTML;
  document.querySelector(".apps").innerHTML = "";
  setTimeout(()=> {
    document.querySelector(".apps").innerHTML = ctcy;
  },100);
}

var startIcon = document.querySelector(".icon.start");
var startMenu = document.querySelector(".startmenu-box");
var notifMenu = document.querySelector(".notification.akhr");
var notifIcon = document.querySelector(".icon.notif");
var snipTimes = document.querySelectorAll(".right-content .times .snippet");

document.addEventListener('click', function(event) {
  var elm = event.target;
  if (!elm.classList.contains("icon.start") && !elm.closest(".startmenu-box")) {
   startMenu.classList.remove("active");
  }
  if (!elm.classList.contains("icon.notif") && !elm.closest(".notification")) {
    notifMenu.classList.remove("active");
  }
});

notifIcon.addEventListener('click', function(event) {
  event.stopPropagation();
  notifMenu.classList.toggle("active");
  startMenu.classList.remove("active");
});

startIcon.addEventListener('click', function(event) {
  event.stopPropagation();
  startMenu.classList.toggle("active");
  notifMenu.classList.remove("active");
});

setInterval(function() {
  var currentTime = new Date();
  var hours = currentTime.getHours();
  var minutes = currentTime.getMinutes();
  var ampm = hours >= 12 ? 'PM' : 'AM';

  // Mengkonversi jam menjadi format 12 jam
  hours = hours % 12;
  hours = hours ? hours : 12;

  // Menambahkan nol di depan angka jika angka < 10
  hours = hours < 10 ? '0' + hours : hours;
  minutes = minutes < 10 ? '0' + minutes : minutes;

  var formattedTime = hours + ':' + minutes + ' ' + ampm;

  var currentDate = new Date();
  var month = currentDate.getMonth() + 1; // Mengembalikan bulan dari 0 hingga 11, sehingga perlu ditambah 1
  var day = currentDate.getDate();
  var year = currentDate.getFullYear();

  var formattedDate = month + '/' + day + '/' + year;

  snipTimes[0].innerHTML = formattedTime;
  snipTimes[1].innerHTML = formattedDate;
}, 1000); // Mengatur interval pembaruan ke setiap detik (1000 milidetik)

window.addEventListener('load', () => {
  if (document.body.getAttribute("win-loader") == "true") {
    setTimeout(() => {
      document.querySelector(".boot").style.animation = "hide-out 0.2s ease-in-out";
      setTimeout(()=> {
        document.querySelector(".boot").remove()
      }, 200);
    }, 8000);
  } else {
    document.querySelector(".boot").remove()
  }
});


var okbtn = document.querySelectorAll('[data-value="true"]');

okbtn.forEach(function(elm) {
  elm.addEventListener('click', ()=> {
    elm.parentNode.parentNode.remove();
  });
});

// app script //

var draggableElement = document.querySelectorAll('.float-app');

var apps = document.querySelectorAll(".desktop .apps .app");
var zIndexCounter = 1;

apps.forEach(elm => {
  elm.addEventListener('dblclick', () => {
    draggableElement.forEach(so => {
      if (elm.getAttribute("display") == "Chrome") {
        if (so.classList.contains("chrome")) {
          so.style.display = "flex";
          so.classList.remove("full");
        }
      } else if (elm.getAttribute("display") == "Notepad") {
        if (so.classList.contains("notepad")) {
          so.style.display = "flex";
          so.classList.remove("full");
        }
      }

    });
  });
});


var draggableElement = document.querySelectorAll('.float-app');

draggableElement.forEach(flp => {
  var toolbarBtn = flp.querySelectorAll(".toolbar .btn .x-icon");

  toolbarBtn[0].addEventListener('click', () => {
    var flpElement = toolbarBtn[0].closest('.float-app');
    flpElement.style.display = "none";
    toolbarBtn[1].querySelector("img").src = "images/gui/maxmin.png";
  });

  toolbarBtn[1].addEventListener('click', () => {
    appRequestFullScreen(flp, toolbarBtn);
  });

  toolbarBtn[2].addEventListener('click', () => {
    var flpElement = toolbarBtn[2].closest('.float-app');
    toolbarBtn[1].querySelector("img").src = "images/gui/maxmin.png";
    flpElement.classList.remove("full");
    flpElement.style = "display:none;left:25%;top:10%;";
    appReset(flpElement);
  });
});

function appRequestFullScreen(elm, toolbarBtn) {
  var htmlElm = document.documentElement;
  if (window.self === window.top) {
    if (htmlElm.requestFullscreen) {
      htmlElm.requestFullscreen();
    } else if (htmlElm.mozRequestFullScreen) { // Mozilla Firefox
      htmlElm.mozRequestFullScreen();
    } else if (htmlElm.webkitRequestFullscreen) { // Google Chrome, Safari, dan Opera
      htmlElm.webkitRequestFullscreen();
    } else if (htmlElm.msRequestFullscreen) { // Microsoft Edge dan Internet Explorer
      htmlElm.msRequestFullscreen();
    }
  }
  zIndexCounter += 1;
  elm.style.zIndex = zIndexCounter;
  if (elm && !elm.classList.contains("full")) {
    elm.style = "display:block";
    elm.classList.add("full");
    toolbarBtn[1].querySelector("img").src = "images/gui/maximize.png";
  } else {
    elm.classList.remove("full");
    elm.style = "display:flex;left:25%;top:10%;";
    toolbarBtn[1].querySelector("img").src = "images/gui/maxmin.png";
  }
}

// chrome //

inputAddress.addEventListener("focus", ()=> {
  inputAddress.setSelectionRange(0, inputAddress.value.length);
});

var btnpgnt = document.querySelectorAll(".addressbar .btn .x-icon");
var favIcon = document.querySelector(".toolbar .tab .x-icon.fav img");
var chromeFrame = document.querySelector(".float-app.chrome iframe");
var prevUrl = [];

chromeFrame.src = "https://google.com/?igu=1";

function getPrevUrl() {
  var c = 0;
  for (var i = 0; i < prevUrl.length; i++) {
    c = i;
  }
  return prevUrl[c - 1];
}

btnpgnt[0].addEventListener('click', ()=> {
  if (prevUrl.length == 1) {
    chromeFrame.src = "https://google.com/?igu=1";
    inputAddress.value = "";
    favIcon.src = "images/gui/favicon.png";
  } else {
    chromeFrame.src = getPrevUrl();
    inputAddress.value = getPrevUrl();
  }
  prevUrl.pop();
  updateBtnPgnt();
  updateFavicon();
});

btnpgnt[2].addEventListener('click', ()=> {
  var lss = chromeFrame.src;
  chromeFrame.src = "about:blank#blocked";
  setTimeout(()=> {
    chromeFrame.src = lss;
    inputAddress.value = (chromeFrame.src == "https://google.com/?igu=1") ? "" : inputAddress.value = chromeFrame.src;
  }, 100);
  inputAddress.blur();
});

inputAddress.addEventListener("keypress", function(event) {
  if (event.keyCode === 13) {
    if (inputAddress.value.includes("https://www.youtube.com/watch?v=")) {
      chromeFrame.src = inputAddress.value.replace("watch?v=", "embed/");
    } else if (inputAddress.value.includes("about:blank")) {
      chromeFrame.src = inputAddress.value;
    } else if (isURL(inputAddress.value)) {
      chromeFrame.src = convertToUrl(inputAddress.value);
    } else {
      chromeFrame.src = "https://google.com/search?q=" + inputAddress.value + "&igu=1";
    }
    inputAddress.blur();
    inputAddress.value = chromeFrame.src;
    prevUrl.push(inputAddress.value);
    updateBtnPgnt();
    updateFavicon();
  }
});

function updateFavicon() {
  favIcon.src = `https://t0.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://${new URL(inputAddress.value).hostname}&size=64`;
}

function updateBtnPgnt() {
  if (prevUrl.length == 0) {
    btnpgnt[0].setAttribute("aktif", false);
  } else {
    btnpgnt[0].setAttribute("aktif", true);
  }
}


function convertToUrl(text) {
  // Periksa apakah teks sudah memiliki protokol HTTP atau HTTPS
  if (text.startsWith('http://') || text.startsWith('file://') || text.startsWith('https://')) {
    return text;
  } else {
    return 'https://' + text;
  }
}

function isURL(string) {
  var urlPattern = /^(ftp|about|file|http|https):\/\/[^ "]+$|^[^ :]+\.([^ :]{2,}|[^ :]+\.[^ :]{2,}\.[^ :]{2,})$/;

  return urlPattern.test(string);
}

function appReset(appElm) {
  if (appElm.classList.contains("chrome")) {
    chromeFrame.src = "https://google.com/?igu=1";
    inputAddress.value = "";
    favIcon.src = "images/gui/favicon.png";
  } else if (appElm.classList.contains("notepad")) {
    document.querySelector(".float-app.notepad textarea").value = "";
  }
}

// drag function //

  var activeElement = null;
  

  function makeDraggable(element) {
    var toolbar = element.querySelector('.toolbar');
    var offsetX = 0;
    var offsetY = 0;
    var isDragging = false;

    toolbar.addEventListener('mousedown', function(event) {
      if (event.button === 0) { // Check if left mouse button is clicked
        activeElement = element;
        zIndexCounter += 1;
        element.style.zIndex = zIndexCounter;

        var rect = element.getBoundingClientRect();
        offsetX = event.clientX - rect.left;
        offsetY = event.clientY - rect.top;

        isDragging = true;
      }
    });

    document.addEventListener('mousemove', function(event) {
      if (isDragging && activeElement === element && event.buttons === 1) {
        requestAnimationFrame(function() {
          var x = event.clientX - offsetX;
          var y = event.clientY - offsetY;
          element.style.left = x + 'px';
          element.style.top = y + 'px';
        });
      }
    });

    document.addEventListener('mouseup', function(event) {
      if (isDragging && activeElement === element && event.button === 0) {
        activeElement.style.zIndex = zIndexCounter;
        activeElement = null;
        isDragging = false;
      }
    });
  }

  var draggableElements = document.getElementsByClassName('float-app');
  for (var i = 0; i < draggableElements.length; i++) {
    makeDraggable(draggableElements[i]);
  }

// drag end here //



