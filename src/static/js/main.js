import Alpine from 'alpinejs'
import { createIcons, icons } from 'lucide';
import 'htmx.org';



//!!!!!!
// Caution, this will import all the icons and bundle them.
createIcons({ icons });


window.Alpine = Alpine
window.htmx = require('htmx.org');


Alpine.start()