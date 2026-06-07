(function(){
  function parseICSTime(value){
    // Handles YYYYMMDD and YYYYMMDDTHHMMSSZ and local datetimes
    if(!value) return null;
    if(/^[0-9]{8}$/.test(value)){
      // date only
      var y = +value.slice(0,4), m = +value.slice(4,6)-1, d = +value.slice(6,8);
      return new Date(y,m,d);
    }
    // datetime
    var dt = value.replace(/Z$/, '');
    // If contains T
    if(dt.indexOf('T')>=0){
      var y = +dt.slice(0,4), m = +dt.slice(4,6)-1, d = +dt.slice(6,8);
      var hh = +dt.slice(9,11)||0, mm = +dt.slice(11,13)||0, ss = +dt.slice(13,15)||0;
      if(/Z$/.test(value)){
        return new Date(Date.UTC(y,m,d,hh,mm,ss));
      }
      return new Date(y,m,d,hh,mm,ss);
    }
    return new Date(value);
  }

  function expandRecurringYearly(dt, summary, startDate, endDate){
    var results = [];
    var year = startDate.getFullYear();
    var candidate = new Date(dt);
    candidate.setFullYear(year);
    // If candidate before startDate, move to next year
    if(candidate < startDate){ candidate.setFullYear(year+1); }
    while(candidate <= endDate){
      results.push({date: new Date(candidate), summary: summary});
      candidate.setFullYear(candidate.getFullYear()+1);
    }
    return results;
  }

  function parseICS(text, windowStart, windowEnd){
    var events = [];
    var blocks = text.split(/\r?\nBEGIN:VEVENT\r?\n/);
    for(var i=0;i<blocks.length;i++){
      var block = blocks[i];
      if(!/END:VEVENT/.test(block)) continue;
      // Normalize folded lines (continuation lines starting with space or tab)
      block = block.replace(/\r?\n[ \t]/g, '');
      var dtMatch = block.match(/DTSTART(?:;[^:]*)?:([0-9TZ-]+)/);
      var sumMatch = block.match(/SUMMARY:(.+)/);
      var rruleMatch = block.match(/RRULE:(.+)/);
      if(!dtMatch || !sumMatch) continue;
      var rawDate = dtMatch[1].trim();
      var summary = sumMatch[1].trim();
      var dt = parseICSTime(rawDate);
      if(!dt) continue;
      if(rruleMatch){
        var rule = rruleMatch[1];
        // Very small subset: handle YEARLY
        if(/FREQ=YEARLY/i.test(rule)){
          var occ = expandRecurringYearly(dt, summary, windowStart, windowEnd);
          events = events.concat(occ);
          continue;
        }
      }
      // Non-recurring: include if within window
      if(dt >= windowStart && dt <= windowEnd){
        events.push({date: dt, summary: summary});
      }
    }
    // sort
    events.sort(function(a,b){return a.date - b.date;});
    return events;
  }

  function renderTable(container, events){
    if(!events.length){ container.innerText = 'No events in next 12 months.'; return; }
    var table = document.createElement('table');
    table.className = 'ics-table';
    var thead = document.createElement('thead');
    var hrow = document.createElement('tr');
    var th1 = document.createElement('th'); th1.innerText = 'Date';
    var thDay = document.createElement('th'); thDay.innerText = 'Day';
    var th2 = document.createElement('th'); th2.innerText = 'Event name';
    hrow.appendChild(th1); hrow.appendChild(thDay); hrow.appendChild(th2); thead.appendChild(hrow); table.appendChild(thead);
    var tbody = document.createElement('tbody');
    var _weekdays = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
    events.forEach(function(e){
      var tr = document.createElement('tr');
      var td1 = document.createElement('td');
      // Format date as YYYY-MM-DD
      var d = e.date;
      var y = d.getFullYear();
      var m = ('0'+(d.getMonth()+1)).slice(-2);
      var day = ('0'+d.getDate()).slice(-2);
      td1.innerText = y + '-' + m + '-' + day;
      var tdDay = document.createElement('td'); tdDay.innerText = _weekdays[d.getDay()];
      var td2 = document.createElement('td'); td2.innerText = e.summary;
      tr.appendChild(td1); tr.appendChild(tdDay); tr.appendChild(td2); tbody.appendChild(tr);
    });
    table.appendChild(tbody);
    // Clear and append
    container.innerHTML = '';
    container.appendChild(table);
  }

  function addStyles(){
    if(document.getElementById('ics-calendar-style')) return;
    var css = '\n#ics-calendar { margin-top: 1rem; }\n.ics-table { border-collapse: collapse; width: 100%; }\n.ics-table th, .ics-table td { border: 1px solid #ddd; padding: 0.5rem; text-align: left; }\n.ics-table th { background:#f6f6f6; }\n';
    var s = document.createElement('style'); s.id = 'ics-calendar-style'; s.appendChild(document.createTextNode(css)); document.head.appendChild(s);
  }

  function init(){
    var container = document.getElementById('ics-calendar');
    if(!container) return;
    addStyles();
    var url = container.getAttribute('data-ics-url');
    if(!url){ container.innerText = 'No ICS URL provided.'; return; }
    var now = new Date();
    var end = new Date(now); end.setFullYear(end.getFullYear()+1);
    fetch(url).then(function(r){ if(!r.ok) throw new Error('Network response not ok'); return r.text(); })
    .then(function(text){
      var events = parseICS(text, now, end);
      renderTable(container, events);
    }).catch(function(err){
      container.innerText = 'Error loading calendar: ' + err.message;
    });
  }

  if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
