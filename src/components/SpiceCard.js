const PIP_COUNT = 5;
const PIP_INDEXES = [0, 1, 2, 3, 4];

export default {
  name: 'SpiceCard',
  props: {
    spice: {
      type: Object,
      required: true
    },
    selected: {
      type: Boolean,
      required: true
    },
    qty: {
      type: Number,
      required: true
    }
  },
  emits: ['toggle', 'qty'],
  template: `
    <article :class="cardClass">
      <div class="card-top">
        <h3 class="card-name">{{ spice.name }}</h3>
        <div class="heat-pips" :aria-label="'Heat level ' + litCount + ' of 5'">
          <span 
            v-for="index in pipIndexes" 
            :key="index" 
            :class="pipClass(index)" 
            aria-hidden="true"
          ></span>
        </div>
      </div>
      <p class="card-note">{{ spice.note }}</p>

      <div class="card-bottom">
        <span class="price">JMD {{ spice.price }}/scoop</span>

        <div v-if="selected" class="qty" :aria-label="'Quantity of ' + spice.name">
          <button @click="$emit('qty', spice.id, -1)" :aria-label="'Less ' + spice.name">
            −
          </button>
          <span>{{ qty }}</span>
          <button @click="$emit('qty', spice.id, 1)" :aria-label="'More ' + spice.name">
            +
          </button>
        </div>

        <button
          :class="toggleClass"
          @click="$emit('toggle', spice.id)"
          :aria-pressed="selected"
        >
          {{ selected ? 'Remove' : 'Add' }}
        </button>
      </div>
    </article>
  `,
  data() {
    return {
      pipIndexes: PIP_INDEXES
    };
  },
  computed: {
    litCount() {
      return Math.min(PIP_COUNT, Math.round(this.spice.heat / 2));
    },
    cardClass() {
      return this.selected ? 'card selected' : 'card';
    },
    toggleClass() {
      return this.selected ? 'toggle added' : 'toggle';
    }
  },
  methods: {
    pipClass(index) {
      if (index >= this.litCount) return 'pip';
      if (this.spice.heat >= 8) return 'pip hot';
      return 'pip on';
    }
  }
};
