(function(){
  const form = document.getElementById('reservaForm');
  const tablaBody = document.querySelector('#reservasTable tbody');
  const clearAll = document.getElementById('clearAll');
  const STORAGE_KEY = 'demo_reservas_gym';

  function cargarReservas(){
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  }

  function guardarReservas(arr){
    localStorage.setItem(STORAGE_KEY, JSON.stringify(arr));
  }

  function render(){
    const reservas = cargarReservas();
    tablaBody.innerHTML = '';
    reservas.forEach((r, i) => {
      const tr = document.createElement('tr');
      tr.innerHTML = `<td>${escapeHtml(r.clase)}</td>
                      <td>${escapeHtml(r.instructor)}</td>
                      <td>${escapeHtml(r.fecha)}</td>
                      <td>${escapeHtml(r.hora)}</td>
                      <td>${escapeHtml(String(r.plazas))}</td>
                      <td><button data-index="${i}" class="del">Eliminar</button></td>`;
      tablaBody.appendChild(tr);
    });
  }

  function escapeHtml(s){
    return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
  }

  form.addEventListener('submit', function(e){
    e.preventDefault();
    const nueva = {
      clase: document.getElementById('clase').value.trim(),
      instructor: document.getElementById('instructor').value.trim(),
      fecha: document.getElementById('fecha').value,
      hora: document.getElementById('hora').value,
      plazas: parseInt(document.getElementById('plazas').value, 10) || 1
    };

    if(!nueva.clase || !nueva.instructor || !nueva.fecha || !nueva.hora){
      alert('Por favor completa todos los campos.');
      return;
    }

    const reservas = cargarReservas();
    reservas.push(nueva);
    guardarReservas(reservas);
    render();
    form.reset();
  });

  tablaBody.addEventListener('click', function(e){
    if(e.target && e.target.classList.contains('del')){
      const idx = Number(e.target.dataset.index);
      const reservas = cargarReservas();
      reservas.splice(idx,1);
      guardarReservas(reservas);
      render();
    }
  });

  clearAll.addEventListener('click', function(){
    if(confirm('Borrar todas las reservas de ejemplo?')){
      localStorage.removeItem(STORAGE_KEY);
      render();
    }
  });

  render();
})();