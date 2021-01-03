// import './styles/index.less'
// import name from './main/main'

const lzModal = require('../dist/lz-modal')

// console.log("abc");

// const a: number = 1312113;
// console.log(a, name)


const btnModal = document.querySelector('#btnModal');

btnModal?.addEventListener('click', () => {
  lzModal.modal({
    title: 'this is modal...', width: 400, height: '300px', mask: false, content: (ele: any) => {
      const temp = document.createElement('div')
      temp.innerHTML = `
        <div class="test-modal-content">
          this is content....
        </div>
      `
      ele.appendChild(temp)
    }
  })
})

const btnModal2 = document.querySelector('#btnModal2');

btnModal2?.addEventListener('click', () => {
  const temp = document.createElement('div')
  temp.innerHTML = `
        <div class="test-modal-content">
          this is content 2....
        </div>
      `
  lzModal.modal({
    title: 'this is modal...', width: 400, height: '300px', mask: true, content: temp
  })
})