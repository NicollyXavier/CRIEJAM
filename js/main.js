import { initCitizenView } from './components/citizen-view.js';
import { initDemoBar } from './components/demo-bar.js';
import { renderCourtDashboard } from './components/court-dashboard.js';
import { renderGlossaryTable } from './components/governance.js';

// Com <script type="module"> o código só roda depois que o HTML foi lido.
initCitizenView();
initDemoBar();
renderCourtDashboard();
renderGlossaryTable();
