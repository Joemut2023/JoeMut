const { ComponentLoader } =  require('adminjs');
const componentLoader = new ComponentLoader();
const Components = {
    Dashboard: componentLoader.add('Dashboard', './pages-components/dashboard'),
}
exports.componentLoader = componentLoader
exports.Components = Components