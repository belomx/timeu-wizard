import '@fortawesome/fontawesome-free/js/all.js';
import '@polymer/iron-demo-helpers/demo-pages-shared-styles.js';
import '@polymer/iron-demo-helpers/demo-snippet.js';
import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import '../timeu-wizard.js';

class DemoElement extends PolymerElement {
   static get template() {
    return html`
    <style is="custom-style" include="demo-pages-shared-styles">
      .controls {
        margin-top: 20px;
        display: flex;
        justify-content: center;
        padding: 10px;
      }

      .controls * {
        margin: 10px;
      }

      .controls input {
        width: 50px;
      }

      #css {
        --timeu-wizard-line-color: yellow;
        --timeu-wizard-line-size: 3px;
        --timeu-wizard-circle-size: 60px;
        --timeu-wizard-filling-color: red;
        --timeu-wizard-anim-speed: 1s;
        --timeu-wizard-active-color: blue;
        --timeu-wizard-label-font-size: 20px;
        --timeu-wizard-step-font-size: 30px;
        --timeu-wizard-circle-border-size: 2px;
      }

      #icon {
        --timeu-wizard-step-font-family: FontAwesome;
      }
    </style>

      <p>Default styling of <code>&lt;timeu-wizard&gt;</code>:</p>
      <timeu-wizard id="default" steps='["Step 1","Step 2","Step3","Step4","Step5"]' step="{{defaultWizardStep}}">
      </timeu-wizard>
      <div class="controls">
        <button data-type="previous" data-wizard="default" on-click="onNext">Previous</button>
        <button data-type="next" data-wizard="default" on-click="onNext">Next</button>
        <input type="number" min="1" value="{{defaultWizardStep::input}}">
      </div>

      <p>Example with icons (FontAwesome) <code>&lt;timeu-wizard&gt;</code>:</p>

      <timeu-wizard id="icon" steps='[{"label":"FIRST STEP","content":"&#xf007;"},{"label":"CHOOSE INTEREST","content":"&#xf132;"},{"label":"ADD FRIENDS","content":"&#xf041;"},{"label":"VIEW MAP","content":"&#xf07a;"}]'
        step="{{iconWizardStep}}">
      </timeu-wizard>
      <div class="controls">
        <button data-type="previous" data-wizard="icon" on-click="onPrevious">Previous</button>
        <button data-type="next" data-wizard="icon" on-click="onNext">Next</button>
        <input type="number" min="1" value="{{iconWizardStep::input}}">
      </div>

      <p>Example with custom CSS variables <code>&lt;timeu-wizard&gt;</code>:</p>
      <p><code>--timeu-wizard-line-color: yellow;<br>
            --timeu-wizard-line-size: 3px;<br>
            --timeu-wizard-circle-size: 60px;<br>
            --timeu-wizard-filling-color: red;<br>
            --timeu-wizard-anim-speed: 1s;<br>
            --timeu-wizard-active-color: blue;<br>
            --timeu-wizard-label-font-size: 20px;<br>
            --timeu-wizard-step-font-size: 30px;<br>
            --timeu-wizard-circle-border-size: 2px;<br></code></p>

      <timeu-wizard id="css" steps='["Step 1","Step 2","Step3","Step4"]' step="{{customcssStep}}">
      </timeu-wizard>
      <div class="controls">
        <button data-type="previous" data-wizard="css" on-click="onPrevious">Previous</button>
        <button data-type="next" data-wizard="css" on-click="onNext">Next</button>
        <input type="number" min="1" value="{{customcssStep::input}}">
      </div>

      <p>Example for vertical <code>&lt;timeu-wizard vertical&gt;</code>:</p>
      <div style="height:500px;width:50px;">
        <timeu-wizard id="vertical" steps='["Step 1","Step 2","Step3","Step4"]' vertical step="{{verticalStep}}">
        </timeu-wizard>
      </div>
      <div class="controls">
        <button data-type="previous" data-wizard="vertical" on-click="onPrevious">Previous</button>
        <button data-type="next" data-wizard="vertical" on-click="onNext">Next</button>
        <input type="number" min="1" value="{{verticalStep::input}}">
      </div>
     `;
   };

   onNext(event) {
     var wzrd = this.$[event.srcElement.dataset.wizard];
     wzrd.increment();
   }
   
   onPrevious(event) {
     var wzrd = this.$[event.srcElement.dataset.wizard];
     wzrd.decrement();   
   };

}
customElements.define('demo-element', DemoElement);
