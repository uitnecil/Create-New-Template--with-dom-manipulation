import {AfterViewInit, Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-drag-n-drop',
  templateUrl: './drag-n-drop.component.html',
  styleUrls: ['./drag-n-drop.component.css']
  // encapsulation: ViewEncapsulation.None
})
export class DragNDropComponent implements OnInit, AfterViewInit {
  id = 0;
  source0: HTMLElement;
  target: HTMLElement;
  lastChildOver: HTMLElement = null;

  constructor() {
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    // init draggable target
    this.source0 = document.getElementById('source0');
    this.source0.ondragstart = this.processDrag;


    // init drop target
    this.target = document.getElementById('target');
    this.target.ondragover = this.processDragOver;
    this.target.ondragleave = this.processDropAreaLeft;
    this.target.ondrop = this.processDrop;
  }

  processDrag = (event: DragEvent) => {
    event.dataTransfer.setData('', '');
    event.dataTransfer.dropEffect = 'copy';
    event.dataTransfer.effectAllowed = 'copy';
    event.dataTransfer.setData('text', (<HTMLElement>event.target).id);
    // console.log('dragStart: dropEffect = ' + event.dataTransfer.dropEffect + ' ; effectAllowed = ' + event.dataTransfer.effectAllowed);
  }


  processDrop = (event: DragEvent) => {
    const sourceId = event.dataTransfer.getData('text');
    console.log('sourceId: ', sourceId);
    const origEl: HTMLElement = document.getElementById(sourceId);
    if (!origEl) {
      return false;
    }
    const newEl = origEl.cloneNode(true);

    this.setEvents(<HTMLElement>newEl);
    (<HTMLElement>newEl).addEventListener('blur', function (this: HTMLElement) {
      console.log('onblur');
      (<HTMLElement>newEl).classList.remove('clicked');
    }, false);

    switch (true) {
      case ((<HTMLElement>event.target).parentNode === this.target):
        if (origEl.parentNode !== this.target) {
          // add to main container
          (<HTMLElement>newEl).id += this.id;
          newEl.textContent += this.id;
          this.id += 1;
          this.target.insertBefore(newEl, <HTMLElement>event.target);
        } else {
          // move inside the target container
          // if no actual move is happening, do nothing
          if ((<HTMLElement>event.target).previousSibling !== origEl && (<HTMLElement>event.target !== origEl)) {
            this.target.removeChild(origEl);
            this.target.insertBefore(newEl, <HTMLElement>event.target);
          }
        }
        break;

      case ((<HTMLElement>event.target).parentNode !== this.target):
        if (origEl.parentNode !== this.target) {
          (<HTMLElement>newEl).id += this.id;
          newEl.textContent += this.id;
          this.id += 1;
          (<HTMLElement>event.target).appendChild(newEl);
        } else {
          this.target.removeChild(origEl);
          this.target.insertBefore(newEl, null);
        }
        break;
    }

    // clear the drag-over effect from the target
    (<HTMLElement>event.target).classList.remove('drag-over');


    if (this.lastChildOver) {
      this.lastChildOver.classList.remove('child-over');
    }

    event.preventDefault();
    return false;
  }

  processDragOver = (event: DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'copy';
    if ((<HTMLElement>event.target).parentNode === this.target) {
      if (this.lastChildOver && <HTMLElement>event.target !== this.lastChildOver) {
        (this.lastChildOver).classList.remove('child-over');
        console.log('here');
      }
      (<HTMLElement>event.target).classList.add('child-over');
      this.lastChildOver = <HTMLElement>event.target;
    } else {
      // add brightness effects only on parent
      (<HTMLElement>event.target).classList.add('drag-over');
    }

    if ((((<HTMLElement>event.target).parentNode === this.target) || (event.target === this.target))
      && this.lastChildOver && event.target !== this.lastChildOver) {
      (this.lastChildOver).classList.remove('child-over');
    }
  }

  processDropAreaLeft = (event: DragEvent): void  => {
    (<HTMLElement>event.target).classList.remove('drag-over');
    if (this.lastChildOver && this.lastChildOver !== <HTMLElement>event.target) {
      (this.lastChildOver).classList.remove('child-over');
    }
  }

  setEvents = (el: HTMLElement): void =>  {
    el.ondragstart = function (ev: DragEvent) {
      ev.dataTransfer.setData('', '');
      ev.dataTransfer.dropEffect = 'copy';
      ev.dataTransfer.effectAllowed = 'copy';
      ev.dataTransfer.setData('text', (<HTMLElement>this).id);
      // setDragImage(ev);
      //
      // function setDragImage(ev: DragEvent) {
      //   const img = new Image();
      //   img.src = '../../assets/images/duck-move.gif';
      //   ev.dataTransfer.setDragImage(img, 5, 5);
      // }
    };
    el.onclick = function (ev: MouseEvent) {
      el.classList.toggle('clicked');
    };
  }

  alignSelectedCenter = () => {
    const listToFormat: HTMLCollectionOf<Element> = document.getElementsByClassName('clicked');
    for (let i = 0; i < listToFormat.length; i++) {
      // clear other possible formatting that negate the requested formatting
      listToFormat.item(i).classList.remove('align-text-left');
      listToFormat.item(i).classList.remove('align-text-right');
      // add new formatting
      listToFormat.item(i).classList.toggle('align-text-center');
    }
  }

  alignSelectedRight = () => {
    const listToFormat: HTMLCollectionOf<Element> = document.getElementsByClassName('clicked');
    for (let i = 0; i < listToFormat.length; i++) {
      // clear other possible formatting that negate the requested formatting
      listToFormat.item(i).classList.remove('align-text-left');
      listToFormat.item(i).classList.remove('align-text-center');
      // add new formatting
      listToFormat.item(i).classList.toggle('align-text-right');
    }
  }

  alignSelectedLeft = () => {
    const listToFormat: HTMLCollectionOf<Element> = document.getElementsByClassName('clicked');
    for (let i = 0; i < listToFormat.length; i++) {
      // clear other possible formatting that negate the requested formatting
      listToFormat.item(i).classList.remove('align-text-center');
      listToFormat.item(i).classList.remove('align-text-right');
      // add new formatting
      listToFormat.item(i).classList.toggle('align-text-left');
    }
  }

  uppercase = () => {
    const listToFormat: HTMLCollectionOf<Element> = document.getElementsByClassName('clicked');
    for (let i = 0; i < listToFormat.length; i++) {
      // clear other possible formatting
      listToFormat.item(i).classList.remove('capitalize');
      // add new formatting
      listToFormat.item(i).classList.toggle('uppercase');
    }
  }

  capitalize = () => {
    const listToFormat: HTMLCollectionOf<Element> = document.getElementsByClassName('clicked');
    for (let i = 0; i < listToFormat.length; i++) {
      // clear other possible formatting
      listToFormat.item(i).classList.remove('uppercase');
      // add new formatting
      listToFormat.item(i).classList.toggle('capitalize');
    }
  }

  textShadow = () => {
    const listToFormat: HTMLCollectionOf<Element> = document.getElementsByClassName('clicked');
    for (let i = 0; i < listToFormat.length; i++) {
      listToFormat.item(i).classList.toggle('text-shadow');
    }
  }
}


