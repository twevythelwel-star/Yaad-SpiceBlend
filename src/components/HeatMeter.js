// Pure presentational component: renders the ember bar from a heat score + label.
export default {
  name: 'HeatMeter',
  props: {
    score: {
      type: Number,
      required: true
    },
    label: {
      type: String,
      required: true
    }
  },
  template: `
    <div class="heat-block">
      <div class="meter-label">
        <span>Heat</span>
        <b>{{ label }}</b>
      </div>
      <div
        class="meter"
        role="progressbar"
        :aria-valuenow="pct"
        :aria-valuemin="0"
        :aria-valuemax="100"
        aria-label="Blend heat level"
      >
        <div class="meter-fill" :style="{ width: pct + '%' }"></div>
      </div>
      <p class="scoville">≈ {{ scoville.toLocaleString() }} SHU on the tongue</p>
    </div>
  `,
  computed: {
    pct() {
      return Math.min(100, Math.round((this.score / 30) * 100));
    },
    scoville() {
      return this.score * 1800;
    }
  }
};
