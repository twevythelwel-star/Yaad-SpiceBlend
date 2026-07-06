import HeatMeter from './HeatMeter.js';
import { heatLabel, blendPersonality } from '../data/spices.js';

const NAME_PATTERN = /^[A-Za-z' -]{2,60}$/;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function checkName(name) {
  const trimmed = name.trim();
  if (trimmed === '') return 'Name is required.';
  if (!NAME_PATTERN.test(trimmed)) return 'Enter a valid name (letters only).';
  return '';
}

function checkPhone(phone) {
  const trimmed = phone.trim();
  if (trimmed === '') return 'Phone number is required.';
  const digitsOnly = phone.replace(/\D/g, '');
  if (digitsOnly.length < 7 || digitsOnly.length > 15) return 'Enter a valid phone number.';
  return '';
}

function checkEmail(email) {
  const trimmed = email.trim();
  if (trimmed === '') return 'Email is required.';
  if (!EMAIL_PATTERN.test(trimmed)) return 'Enter a valid email address.';
  return '';
}

function confirmationMessage(method) {
  if (method === 'delivery') {
    return 'Your order is complete — you’ll get a link to confirm payment once the verified item is shipped';
  }
  return 'Your order is complete — you’ll get a link to confirm payment once the verified location for pickup will be sent';
}

export default {
  name: 'BlendSummary',
  components: {
    HeatMeter
  },
  props: {
    items: {
      type: Array,
      required: true
    },
    ordered: {
      type: Boolean,
      required: true
    }
  },
  emits: ['order'],
  template: `
    <aside class="summary" aria-live="polite">
      <h3>Your blend</h3>
      <p class="personality">{{ personality ? '“' + personality + '”' : 'Unnamed so far' }}</p>

      <HeatMeter :score="heat" :label="heatLabel" />

      <p v-if="empty" class="empty">Pick at least one spice to start your blend.</p>
      <ul v-else class="lines">
        <li v-for="i in items" :key="i.id">
          <span>
            <b>{{ i.name }}</b> ×{{ i.qty }}
          </span>
          <span class="ln-price">JMD {{ i.price * i.qty }}</span>
        </li>
      </ul>

      <div class="total">
        <span>Total</span>
        <b>JMD {{ total }}</b>
      </div>

      <form v-if="formOpen && !empty" class="order-form" @submit.prevent="submitOrder" novalidate>
        <label>
          Name
          <input
            type="text"
            v-model="name"
            @input="nameError = ''"
            :aria-invalid="!!nameError"
            :aria-describedby="nameError ? 'name-error' : undefined"
          />
          <span v-if="nameError" class="field-error" id="name-error">
            {{ nameError }}
          </span>
        </label>

        <label>
          Phone
          <input
            type="tel"
            v-model="phone"
            @input="phoneError = ''"
            :aria-invalid="!!phoneError"
            :aria-describedby="phoneError ? 'phone-error' : undefined"
          />
          <span v-if="phoneError" class="field-error" id="phone-error">
            {{ phoneError }}
          </span>
        </label>

        <label>
          Email
          <input
            type="email"
            v-model="email"
            @input="emailError = ''"
            :aria-invalid="!!emailError"
            :aria-describedby="emailError ? 'email-error' : undefined"
          />
          <span v-if="emailError" class="field-error" id="email-error">
            {{ emailError }}
          </span>
        </label>

        <fieldset class="method">
          <legend>Delivery or pickup?</legend>
          <label>
            <input
              type="radio"
              value="pickup"
              v-model="method"
            />
            Pickup
          </label>
          <label>
            <input
              type="radio"
              value="delivery"
              v-model="method"
            />
            Delivery
          </label>
        </fieldset>

        <div class="form-actions">
          <button type="button" class="btn-cancel" @click="formOpen = false">
            Cancel
          </button>
          <button type="submit" class="order-btn">
            Place order
          </button>
        </div>
      </form>
      
      <p v-else-if="ordered" class="toast">{{ confirmation }}</p>
      
      <button v-else class="order-btn" @click="formOpen = true" :disabled="empty">
        {{ empty ? 'Add a spice first' : 'Add blend to order' }}
      </button>
    </aside>
  `,
  data() {
    return {
      formOpen: false,
      name: '',
      phone: '',
      email: '',
      method: 'pickup',
      nameError: '',
      phoneError: '',
      emailError: '',
      orderedMethod: 'pickup'
    };
  },
  watch: {
    empty(val) {
      if (val) this.formOpen = false;
    }
  },
  computed: {
    empty() {
      return this.items.length === 0;
    },
    total() {
      return this.items.reduce((acc, i) => acc + (i.price * i.qty), 0);
    },
    heat() {
      return this.items.reduce((acc, i) => acc + (i.heat * i.qty), 0);
    },
    personality() {
      return blendPersonality(this.items);
    },
    heatLabel() {
      return heatLabel(this.heat);
    },
    confirmation() {
      return confirmationMessage(this.orderedMethod);
    }
  },
  methods: {
    submitOrder() {
      const nameProblem = checkName(this.name);
      const phoneProblem = checkPhone(this.phone);
      const emailProblem = checkEmail(this.email);

      this.nameError = nameProblem;
      this.phoneError = phoneProblem;
      this.emailError = emailProblem;

      if (nameProblem || phoneProblem || emailProblem) return;

      this.orderedMethod = this.method;
      this.$emit('order');

      // Reset
      this.formOpen = false;
      this.name = '';
      this.phone = '';
      this.email = '';
      this.method = 'pickup';
    }
  }
};
