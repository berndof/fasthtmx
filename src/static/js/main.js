import Alpine from 'alpinejs'
import { createIcons, icons } from 'lucide';
import 'htmx.org';
import persist from '@alpinejs/persist'


//!!!!!!
// Caution, this will import all the icons and bundle them.
createIcons({ icons });

window.Alpine = Alpine
window.htmx = require('htmx.org');

Alpine.plugin(persist)


Alpine.store('theme', {
  darkMode: Alpine.$persist(false).as("darkMode"),
  toggle() {
    this.darkMode = !this.darkMode;
  },
  init(){
    if (window.matchMedia('(prefers-color-scheme: dark)').matches && !localStorage.getItem("darkMode")) {
      this.darkMode = true;
    }
  },

})

Alpine.start()