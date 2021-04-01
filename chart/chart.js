import { LitElement, html, css } from 'https://cdn.pika.dev/lit-element';
import 'https://cdn.jsdelivr.net/npm/chart.js@2.9.4/dist/Chart.min.js';

customElements.define('lit-chart', class LitChart extends LitElement {
    static get properties() {
        return {
            type: { type: String },
            data: { type: Object },
            options: { type: Object },
            width: { type: String },
            height: { type: String }
        }
    }

    constructor() {
        super();
        this.type = 'line'; // ['line', 'bar', 'pie', 'radar', 'doughnut', 'polarArea']
        this.width = '100%';
        this.height = '100%';
    }

    static get styles() {
        return css`
            :host {
                display: block;
                position: relative;
                width: 100%;
            }
        `;
    }

    render() {
        return html`
            <canvas id="canvas" width="${this.width}" height="${this.height}"></canvas>
        `;
    }

    updated(changedProperties) {
        if (this.isFirstInit) {
            let update = false;
            changedProperties.forEach((oldValue, propName) => {
                update = ['type', 'data', 'options'].includes(propName);
            });
            if (update) this.init();
        } else if (this.type && this.data && this.options) {
            this.canvas = this.renderRoot.getElementById('canvas');
            this.ctx = this.canvas.getContext('2d');
            this.init();
            this.isFirstInit = true;
        }
    }

    init() {
        if (this.chart?.destroy) this.chart.destroy();
        this.chart = new Chart(this.ctx, {
            type: this.type,
            data: this.data,
            options: this.options
        });
    }
});
