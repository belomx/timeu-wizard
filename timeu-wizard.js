import '@webcomponents/shadycss/apply-shim.min.js';
import '@polymer/polymer/lib/utils/render-status.js'
import '@polymer/polymer/lib/elements/dom-repeat.js';
import { microTask } from '@polymer/polymer/lib/utils/async.js';
import { GestureEventListeners } from '@polymer/polymer/lib/mixins/gesture-event-listeners.js';
import { html } from '@polymer/polymer/lib/utils/html-tag.js';
import { PolymerElement } from '@polymer/polymer/polymer-element.js';
import { beforeNextRender } from '@polymer/polymer/lib/utils/render-status.js';

class TimeuWizard extends GestureEventListeners(PolymerElement) {
  static get template() {
    return html`
    <style include="timeu-wizard-shared-styles">
       :host {
         display: block;
         box-sizing: border-box;
         width:100%;
         height:100%;
         @apply --timeu-wizard ;
       }

       :host([clickablestep]) .checkicon {
         cursor: pointer;
       }
       
       :host([horizotnal]) ul {
         flex-direction: row;
       }
       
       :host([vertical]) ul {
         flex-direction: column;
       }
       
       :host([vertical]) .line {
         width: 1px;
         top:0;
         left: 50%;
         height: calc(100% - var(--timeu-wizard-circle-size,40px));
	 @apply --timeu-wizard-list-item-label;
       }
      
       :host([vertical][right]) .label {
	 position: absolute;
         top: 0.3em;
	 transform: translateX(var(--timeu-wizard-circle-size,40px));
	 @apply --timeu-wizard-list-item-right-label;
       }

       :host([vertical][left]) .label {
	 position: absolute;
         top: 0.3em;
         transform: translateX(calc(-2 * var(--timeu-wizard-circle-size,40px)));
	 @apply --timeu-wizard-list-item-left-label;
       }

       ul {
         display: flex;
         justify-content: space-between;
         padding:0;
         margin:0;
       
         @apply --timeu-wizard-list;
       }
       
       #line{
         background-color:var(--timeu-wizard-line-color,#dfdfdf);
       }
       
       .line {
         height: var(--timeu-wizard-line-size,1px);
         position: absolute;
         top: calc(var(--timeu-wizard-circle-size,40px)/2);
         left: 0;
         right: 0;
       }
       
       #filling {
         background-color: var(--timeu-wizard-line-filling-color, var(--timeu-wizard-filling-color ,#2db36f));
         -webkit-transition: -webkit-transform var(--timeu-wizard-anim-speed,0.5s);
         -moz-transition: -moz-transform var(--timeu-wizard-anim-speed,0.5s);
         transition: transform var(--timeu-wizard-anim-speed,0.5s);
       }
       
       #filling {
         -webkit-transform: scaleX(0);
         -moz-transform: scaleX(0);
         -ms-transform: scaleX(0);
         -o-transform: scaleX(0);
         transform: scaleX(0);
         -webkit-transform-origin: left center;
         -moz-transform-origin: left center;
         -ms-transform-origin: left center;
         -o-transform-origin: left center;
         transform-origin: left center;
       }
       
       :host([vertical]) #filling {
         -webkit-transform: scaleY(0);
         -moz-transform: scaleY(0);
         -ms-transform: scaleY(0);
         -o-transform: scaleY(0);
         transform: scaleY(0);
         -webkit-transform-origin: top center;
         -moz-transform-origin: top center;
         -ms-transform-origin: top center;
         -o-transform-origin: top center;
         transform-origin: top center;
       }
       
       #container {
         width: 100%;
         height:100%;
         position:relative;
       
         @apply --timeu-wizard-container;
       }
       
       #wizard {
         counter-reset: step;
         height:100%;
         width:100%;
       }
       
       #wizard li {
         list-style-type:none;
         position: relative;
         text-align: center;
         color: var(--timeu-wizard-filling-color,#dfdfdf);
       
         @apply --timeu-wizard-list-item;
       }
       
       #wizard li[data-content]:before {
         content: attr(data-content);
       }
       
       #wizard li:before {
         content: counter(step);
         counter-increment: step;
         width:  var(--timeu-wizard-circle-size,40px);
         height:  var(--timeu-wizard-circle-size,40px);
         line-height:  var(--timeu-wizard-circle-size,40px);
         border: var(--timeu-wizard-circle-border-size,1px) solid var(--timeu-wizard-filling-color,#dfdfdf);
         display: block;
         text-align: center;
         font-family:var(--timeu-wizard-step-font-family, FontAwesome);
         margin: 0 auto 5px auto;
         border-radius: 50%;
         background-color: white;
         -webkit-transition: background-color var(--timeu-wizard-anim-speed,0.5s), border-color var(--timeu-wizard-anim-speed,0.5s);;
         -moz-transition: background-color var(--timeu-wizard-anim-speed,0.5s), border-color var(--timeu-wizard-anim-speed,0.5s);
         transition: background-colorvar(--timeu-wizard-anim-speed,0.5s), border-color var(--timeu-wizard-anim-speed,0.5s);
         font-size:var(--timeu-wizard-step-font-size,25px);
       
         @apply --timeu-wizard-list-item-icon;
       }

       #wizard li.active, #wizard li.done  {
         color: var(--timeu-wizard-active-color,#2db36f);
         @apply --timeu-wizard-list-item-active;
       }
       
       #wizard li.done {
         @apply --timeu-wizard-list-item-done;
       }
       
       #wizard li.done:before {
         content:'';
       }
       
       #wizard li.active:before, #wizard li.done:before{
         border-color: var(--timeu-wizard-active-color,#2db36f) !important;
       }
       
       #wizard li.active:before {
         background-color: var(--timeu-wizard-active-color, #2db36f);
         color: white;
       }
       
       .checkicon {
         opacity:0;
         height: var(--timeu-wizard-circle-size,40px);
         width:  var(--timeu-wizard-circle-size,40px);
         position: absolute;
         fill: var(--timeu-wizard-active-color,#2db36f);
         top: 0px;
         left: calc(50% - var(--timeu-wizard-circle-size,40px)/2);
         transition: all var(--timeu-wizard-anim-speed,0.5s);
         -webkit-transition: all var(--timeu-wizard-anim-speed,0.5s);
       
         @apply --timeu-wizard-list-item-checkicon;
       }
       
       #wizard li.done .checkicon {
         opacity:1;
       }
       
       .label {
         font-size: var(--timeu-wizard-label-font-size,13px);
       }
    </style>
    <div id="container">
      <span id="line" class="line"></span>
      <span id="filling" class="line" style$="transform: scale({{_calculateFilling(steps,step,vertical)}});"></span>
      <ul id="wizard">
        <template is="dom-repeat" items="{{steps}}" >
          <li class$="{{_computeClass(index,item,step)}}" data-content$="{{item.content}}" on-tap="_handleItemTap">
            <div class="checkicon">
              <svg viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet" style="pointer-events: none; display: block; width: 100%; height: 100%;">
                <g>
                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"></path>
                </g>
              </svg>
            </div>
            <span class="label">{{_getLabel(item)}}</span>
          </li>
        </template>
      </ul>
    </div>
    `;
  }
  static get is() { return 'timeu-wizard'; }
  static get properties() {
    return {
      /**
      * Fired when a step item is tapped.
      *
      * @event timeu-wizard-item-tap
      */

      /**
      * `step` indicates the current step in the wizard
      */
      step: {
        type: Number,
	reflectToAttribute: true,
        notify: true,
        value: 1,
        observer: '_validateStep'
      },

      /**
      * Specifiies the available steps.
      *
      * @type [string]
      */
      steps: {
        type: Array,
	reflectToAttribute: true,
        value: function() {
          return [];
        }
      },

      /**
      * If set to true, a vertical progress wizard will be displayed.
      *
      * @type [string]
      */
      vertical: {
        type: Boolean,
        value: false,
        reflectToAttribute: true
      },
      left: {
        type: Boolean,
        reflectToAttribute: true,
        value: false
      },
      right: {
        type: Boolean,
        reflectToAttribute: true,
        value: false
      },
      clickablestep: {
        type: Boolean,
        reflectToAttribute: true,
        value: false
      }
    }
  }

  constructor() {
    super();
    this.iclass="";
    const fontEl = document.createElement('link');
    fontEl.rel = 'stylesheet';
    fontEl.href = 'https://maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css';
    document.head.appendChild(fontEl);
  }

  // Element Lifecycle

  connectedCallback() {
    super.connectedCallback();

    beforeNextRender(this, function() {
      this._width = this.getBoundingClientRect().width;
    });
  }

  // Element Behavior

  /**
   * Increment the current step
   *
   * Use this function for moving to the next step in the wizard
   */
  increment() {
    if (this.step < this.steps.length) {
      this.step++;
    }
  }

  /**
   * Decrement the current step
   *
   * Use this function for moving to the previous step in the wizard
   */
  decrement() {
    if (this.step > 1) {
      this.step--;
    }
  }

  _validateStep(newValue,oldValue) {
    if (this.steps === undefined) {
      return;
    }
    if (newValue < 1 || newValue === undefined ||  newValue > this.steps.length) {
      microTask.run(() => {
        this.step = oldValue
      });
    }
  }

  _getLabel(item) {
    if (item !== null && typeof item === 'object' && item.label !== undefined) {
      return item.label;
    }
    return item;
  }

  _computeClass(index, item, step) {
    if ((index+1) < step) {
      return "done";
    }
    else if (index+1 == step) {
      return "active";
    }
    return "";
  }

  _caclulateRatio(steps, step) {
    if (steps === undefined || step === 1) {
      return 0;
    }
    else if (step === steps.length) {
      return 1;
    }
    return (step-1)/(steps.length-1);
  }

  _calculateFilling(steps, step, vertical) {
      var ratio = this._caclulateRatio(steps,step);
      var scaleX = (vertical ? 1 : ratio);
      var scaleY = (vertical ? ratio : 1);
      return scaleX+","+scaleY;
  }

  _handleItemTap(e) {
    this.dispatchEvent(new CustomEvent('timeu-wizard-item-tap', { bubbles: true, composed: true, detail: {model: e.model, target:e.target} }));
  }
}
customElements.define(TimeuWizard.is, TimeuWizard);
export {TimeuWizard};
