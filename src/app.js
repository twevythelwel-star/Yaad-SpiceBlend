import { createApp } from 'https://unpkg.com/vue@3.5.13/dist/vue.esm-browser.js';
import SpiceCard from './components/SpiceCard.js';
import BlendSummary from './components/BlendSummary.js';
import { SPICES } from './data/spices.js';

const CONFIRMATION_MS = 5000;

createApp({
  components: {
    SpiceCard,
    BlendSummary
  },
  data() {
    return {
      spices: SPICES,
      selected: {}, // { spiceId: quantity }
      ordered: false,
      orderTimeout: null
    };
  },
  computed: {
    items() {
      const result = [];
      for (const spice of this.spices) {
        const qty = this.selected[spice.id];
        if (qty) {
          result.push({ ...spice, qty });
        }
      }
      return result;
    }
  },
  methods: {
    clearOrder() {
      if (this.orderTimeout) {
        clearTimeout(this.orderTimeout);
        this.orderTimeout = null;
      }
      this.ordered = false;
    },
    placeOrder() {
      this.ordered = true;
      if (this.orderTimeout) clearTimeout(this.orderTimeout);
      this.orderTimeout = setTimeout(() => {
        this.ordered = false;
      }, CONFIRMATION_MS);
    },
    toggle(id) {
      this.clearOrder();
      const next = { ...this.selected };
      if (next[id]) {
        delete next[id];
      } else {
        next[id] = 1;
      }
      this.selected = next;
    },
    changeQty(id, delta) {
      this.clearOrder();
      const current = this.selected[id] || 0;
      const qty = Math.max(1, current + delta);
      this.selected = {
        ...this.selected,
        [id]: qty
      };
    }
  }
}).mount('#app');
