(function(){
  var difficultyOrder = ['Easy', 'Medium', 'Hard', 'Extreme'];

  function getSortValue(cell, key){
    var text = cell.textContent.trim();
    if(key === 'difficulty'){
      var idx = difficultyOrder.indexOf(text);
      return idx === -1 ? difficultyOrder.length : idx;
    }
    return text.toLowerCase();
  }

  function sortTable(table, columnIndex, key, ascending){
    var tbody = table.tBodies[0];
    var rows = Array.prototype.slice.call(tbody.rows);
    rows.sort(function(a, b){
      var av = getSortValue(a.cells[columnIndex], key);
      var bv = getSortValue(b.cells[columnIndex], key);
      if(av < bv) return ascending ? -1 : 1;
      if(av > bv) return ascending ? 1 : -1;
      return 0;
    });
    rows.forEach(function(row){ tbody.appendChild(row); });
  }

  function init(){
    var tables = document.querySelectorAll('table[data-sortable]');
    tables.forEach(function(table){
      var headers = table.querySelectorAll('th[data-sort]');
      headers.forEach(function(th, index){
        th.addEventListener('click', function(){
          var ascending = th.getAttribute('data-sort-dir') !== 'asc';
          headers.forEach(function(h){
            h.removeAttribute('data-sort-dir');
            var indicator = h.querySelector('.sort-indicator');
            if(indicator) indicator.textContent = '';
          });
          th.setAttribute('data-sort-dir', ascending ? 'asc' : 'desc');
          var indicator = th.querySelector('.sort-indicator');
          if(indicator) indicator.textContent = ascending ? ' ▲' : ' ▼';
          sortTable(table, index, th.getAttribute('data-sort'), ascending);
        });
      });
    });
  }

  if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
