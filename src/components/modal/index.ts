import { Component } from '../../types/index';
import css from './index.module.less';
import './index.less';

const modal = (options: IModalProps) => {
  return new Modal(options)
}

interface IModalProps {
  width?: string | number;
  height?: string | number;
  title?: string;
  position?: 'center' | 'left' | 'right';
  mask?: boolean;
  content?: ((container: HTMLElement) => void) | HTMLElement
}


class Modal implements Component {
  private settings: IModalProps;
  template!: HTMLElement;
  private uuid: number;
  private mask?: Element;

  constructor(public options: IModalProps) {
    // 设置默认值
    this.settings = Object.assign({
      width: '600px',
      height: '400px',
      position: 'center',
      title: '',
      mask: true,
      content: (container: HTMLElement) => {
        console.log(container)
      }
    }, this.options)

    this.uuid = new Date().getTime()

    this.init()
  }

  init() {
    this.createTemplate()
    this.handle()
    this.settings.mask && this.createMask()
    this.contentCallback()
  }

  createTemplate() {
    const { width, height, title, position } = this.settings;
    this.template = document.createElement('div');
    this.template.className = css['modal-container'];
    this.template.id = this.uuid + ''

    if (width) {
      this.template.style.width = (toString.apply(width) === "[object Number]") ? `${width}px` : (width as string)
    }

    if (height) {
      this.template.style.height = (toString.apply(height) === "[object Number]") ? `${height}px` : (height as string)
    }

    this.template.innerHTML = `
      <div class=${css['modal-title-container']}>
        <h1 class=${css['modal-title']}>${title}</h1>
        <span class=${css['modal-close']} id="btn-close-${this.uuid}">
          <i class="iconfont icon-baseline-close-px"></i>
        </span>
      </div>
      <div class=${css['modal-content']}></div>
      <div class=${css['modal-footer']}></div>
    `;
    document.body.appendChild(this.template);

    if (position === 'center') {
      this.template.style.top = (window.innerHeight - this.template.offsetHeight) / 2 + 'px'
      this.template.style.left = (window.innerWidth - this.template.offsetWidth) / 2 + 'px'
    } else if (position === 'left') {
      this.template.style.left = '10px';
      this.template.style.top = (window.innerHeight - this.template.offsetHeight - 10) + 'px'
    } else {
      this.template.style.top = (window.innerHeight - this.template.offsetHeight - 10) + 'px'
      this.template.style.right = '10px';
    }
  }

  handle() {
    const btnClose = document.querySelector(`#btn-close-${this.uuid}`)
    btnClose?.addEventListener('click', () => {
      console.log('click....')
      console.log(this.template)
      document.body.removeChild(this.template)
      this.mask && document.body.removeChild(this.mask)
    })
  }

  createMask() {
    this.mask = document.createElement("div")
    this.mask.className = css['modal-mask']
    document.body.appendChild(this.mask)
  }

  contentCallback() {
    const content = this.template.querySelector(`.${css['modal-content']}`) as HTMLElement
    if (this.settings.content) {
      if (typeof this.settings.content === 'function') {
        this.settings.content(content)
      } else {
        content.appendChild(this.settings.content as HTMLElement)
      }
    }
  }
}

export default modal;