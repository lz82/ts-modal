// import './styles/index.less'
// import name from './main/main'
var lzModal = require('../dist/lz-modal');
// console.log("abc");
// const a: number = 1312113;
// console.log(a, name)
var btnModal = document.querySelector('#btnModal');
btnModal === null || btnModal === void 0 ? void 0 : btnModal.addEventListener('click', function () {
    lzModal.modal({
        title: 'this is modal...', width: 400, height: '300px', mask: false,
        content: function (ele) {
            var temp = document.createElement('div');
            temp.innerHTML = "\n        <div class=\"test-modal-content\">\n          this is content....\n        </div>\n      ";
            ele.appendChild(temp);
        }
    });
});
var btnModal2 = document.querySelector('#btnModal2');
btnModal2 === null || btnModal2 === void 0 ? void 0 : btnModal2.addEventListener('click', function () {
    var temp = document.createElement('div');
    temp.innerHTML = "\n        <div class=\"test-modal-content\">\n          this is content 2....\n        </div>\n      ";
    lzModal.modal({
        title: 'this is modal...', width: 400, height: '300px', mask: true, content: temp
    });
});
