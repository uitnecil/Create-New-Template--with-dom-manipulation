import {AfterViewInit, Component, OnInit} from '@angular/core';
import Typed from 'typed.js';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, AfterViewInit {
  myStyle: object = {};
  myParams: object = {};
  width = 100;
  height= 100;

  ngOnInit() {
    this.myStyle = {
      // 'position': 'block',
      'width': '100%',
      'height': '200px',
      'z-index': 1,
      'top': 0,
      'left': 0,
      'right': 0,
      'bottom': 0,
      'margin': 0,
      'padding': 0
    };

    this.myParams = {
      'particles': {
        'number': {
          'value': 80,
          'density': {
            'enable': false,
            'value_area': 800
          }
        },
        'color': {
          'value': '#ffffff'
        },
        'shape': {
          'type': 'circle',
          'stroke': {
            'width': 0,
            'color': '#000046'
          },
          'polygon': {
            'nb_sides': 5
          },
          'image': {
            'src': 'img/github.svg',
            'width': 100,
            'height': 100
          }
        },
        'opacity': {
          'value': 2,
          'random': true,
          'anim': {
            'enable': false,
            'speed': 1.5,
            'opacity_min': 0.1,
            'sync': false
          }
        },
        'size': {
          'value': 3,
          'random': true,
          'anim': {
            'enable': true,
            'speed': 3,
            'size_min': 0.1,
            'sync': false
          }
        },
        'line_linked': {
          'enable': true,
          'distance': 150,
          'color': '#ffffff',
          'opacity': 0.4,
          'width': 1
        },
        'move': {
          'enable': true,
          'speed': 4,
          'direction': 'none',
          'random': false,
          'straight': false,
          'out_mode': 'out',
          'bounce': false,
          'attract': {
            'enable': false,
            'rotateX': 600,
            'rotateY': 1200
          }
        }
      },
      'interactivity': {
        'detect_on': 'canvas',
        'events': {
          'onhover': {
            'enable': true,
            'mode': 'grab'
          },
          'onclick': {
            'enable': true,
            'mode': 'push'
          },
          'resize': false
        },
        'modes': {
          'grab': {
            'distance': 145,
            'line_linked': {
              'opacity': 1
            }
          },
          'bubble': {
            'distance': 400,
            'size': 40,
            'duration': 2,
            'opacity': 8,
            'speed': 3
          },
          'repulse': {
            'distance': 200,
            'duration': 0.4
          },
          'push': {
            'particles_nb': 2
          },
          'remove': {
            'particles_nb': 2
          }
        }
      },
      'retina_detect': true
    }
    ;

  }

  constructor() {


  }

  ngAfterViewInit() {
    // const options = {
    //   strings: ['Use drag&drop on middle container', 'Select dropped elements and format them using the right side menu'],
    //   typeSpeed: 30
    // };
    // const typed = new Typed('.element', options);

  }
}
