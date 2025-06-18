import 'maplibre-gl/dist/maplibre-gl.css';
import maplibregl from 'maplibre-gl';
import './style.css';

let userEmail = ""; // se definirá tras login

function showLoginModal() {
  const loginModal = document.createElement('div');
  loginModal.id = "loginModal";
  loginModal.className = "modal";
  loginModal.innerHTML = `
    <div class="modal-content" style="max-width: 400px; text-align: center;">
      <h2>Iniciar Sesión</h2>
      <p>Por favor, introduzca su correo electrónico</p>
      <input type="email" id="loginEmail" placeholder="Correo electrónico" style="width: 100%; margin: 1em 0;" />
      <button id="loginBtn" class="toolbar-btn">Iniciar sesión</button>
    </div>
  `;
  document.body.appendChild(loginModal);

  document.getElementById('loginBtn').addEventListener('click', () => {
    const emailInput = document.getElementById('loginEmail').value.trim();
    // Validar si el correo tiene un '@' en él
    if (emailInput !== "" && emailInput.includes('@')) {
      userEmail = emailInput;
      document.body.removeChild(loginModal);
      renderApp();
    } else {
      alert("Por favor, ingrese un correo válido con '@'.");
    }
  });
}

// Mostrar modal al cargar
document.addEventListener("DOMContentLoaded", () => {
  showLoginModal();
});


// Traducciones
const translations = {
  es: {
    appTitle: "Hidraulia",
    reload: "Recargar",
    configuration: "Configuración",
    devices: "Dispositivos",
    alarms: "Alarmas",
    selectDevice: "Seleccione un dispositivo",
    clickDevice: "Haga clic en un dispositivo del mapa para ver sus detalles",
    deviceConfig: "Configuración del dispositivo",
    alarmManagement: "Gestión de Alarmas",
    validate: "Validar seleccionadas",
    export: "Exportar a CSV",
    all: "Todas",
    notValidated: "No validadas",
    activeValidated: "Activas y validadas",
    notCategorized: "No categorizadas",
    save: "Guardar",
    clear: "Limpiar",
    add: "+ Añadir",
    notification: "Notificación",
    noDevices: "No hay dispositivos en esta área",
    foundDevices: "Dispositivos encontrados",
    metrics: "Métricas",
    alarmsTitle: "Alarmas"
  },
  en: {
    appTitle: "Hydraulics",
    reload: "Reload",
    configuration: "Configuration",
    devices: "Devices",
    alarms: "Alarms",
    selectDevice: "Select a device",
    clickDevice: "Click on a device on the map to view details",
    deviceConfig: "Device Configuration",
    alarmManagement: "Alarm Management",
    validate: "Validate selected",
    export: "Export to CSV",
    all: "All",
    notValidated: "Not validated",
    activeValidated: "Active and validated",
    notCategorized: "Not categorized",
    save: "Save",
    clear: "Clear",
    add: "+ Add",
    notification: "Notification",
    noDevices: "No devices in this area",
    foundDevices: "Devices found",
    metrics: "Metrics",
    alarmsTitle: "Alarms"
  }
};


let currentLanguage = 'es';

// Datos de la aplicación
const devices = {
  "26.4": {
    name: "Dispositivo 26.4",
    location: [-3.70379, 40.41678],
    status: "ON",
    details: {
      motivo: "Encendido",
      valores: [
        { nombre: "Consumo total", valor: 3, unidad: "N/m" },
        { nombre: "Consumo ayer", valor: 3, unidad: "N/m" },
        { nombre: "Consumo hoy", valor: 9, unidad: "N/m" },
        { nombre: "Potencia activa", valor: 3, unidad: "W" }
      ],
      alarmas: ["Configuración", "Histórico Medidas", "Histórico Alarmas"],
      metricas: {
        temperatura: "30",
        potencia: "20",
        presion: "19",
        detalles: [
          "90dver: 41/1/5",
          "91dver: 33/3am",
          "91dver: 10/3bar",
          "1013am",
          "1116m"
        ]
      }
    }
  },
  

  "42.7": {
    name: "Sensor Ambiental 42.7",
    location: [-0.3763, 39.4699], // Valencia, España
    status: "OFF",
    details: {
      motivo: "Sin conexión desde las 03:00",
      valores: [
        { nombre: "Consumo total", valor: 0, unidad: "kWh" },
        { nombre: "Consumo ayer", valor: 1.2, unidad: "kWh" },
        { nombre: "Consumo hoy", valor: 0, unidad: "kWh" },
        { nombre: "Potencia activa", valor: 0, unidad: "W" }
      ],
      alarmas: ["Batería baja", "Sin datos", "Histórico Alarmas"],
      metricas: {
        temperatura: "N/A",
        potencia: "0",
        presion: "1015",
        detalles: [
          "Última señal: 03:00",
          "Frecuencia: 868MHz",
          "Firmware: 1.2.4",
          "Modo ahorro: ACTIVADO"
        ]
      }
    }
  },

  "51.2": {
    name: "Medidor Eléctrico 51.2",
    location: [-4.4214, 36.7213], // Málaga
    status: "ON",
    details: {
      motivo: "Operativo",
      valores: [
        { nombre: "Consumo total", valor: 145.6, unidad: "kWh" },
        { nombre: "Consumo ayer", valor: 12.8, unidad: "kWh" },
        { nombre: "Consumo hoy", valor: 8.3, unidad: "kWh" },
        { nombre: "Potencia activa", valor: 220, unidad: "W" }
      ],
      alarmas: ["Histórico Medidas"],
      metricas: {
        temperatura: "27",
        potencia: "220",
        presion: "1012",
        detalles: [
          "Voltaje: 230V",
          "Corriente: 0.95A",
          "Factor Potencia: 0.98",
          "Frecuencia: 50Hz"
        ]
      }
    }
  },

  "88.9": {
    name: "Detector de Presión 88.9",
    location: [-1.8671, 37.6086], // Almería
    status: "ON",
    details: {
      motivo: "Supervisión activa",
      valores: [
        { nombre: "Presión máxima", valor: 3.4, unidad: "bar" },
        { nombre: "Presión media", valor: 2.8, unidad: "bar" },
        { nombre: "Presión mínima", valor: 2.1, unidad: "bar" },
        { nombre: "Fluctuación", valor: 0.5, unidad: "bar" }
      ],
      alarmas: ["Sobrepresión detectada", "Revisión requerida"],
      metricas: {
        temperatura: "32",
        potencia: "10",
        presion: "3.4",
        detalles: [
          "Umbral crítico: 3.5 bar",
          "Última revisión: 2025-04-15",
          "Tiempo funcionamiento: 1420h",
          "Estado válvula: CERRADA"
        ]
      }
    }
  }
};



const alarmasData = [
  {
    idDispositivo: "DVCS_149559",
    fecha: "Z005-G5-3110520S8JZD+DE0034",
    nombreDispositivo: "Hidraulic",
    alarma: "APAGADO",
    activa: true,
    validada: true,
    descripcion: "APAGADO"
  },
  {
    idDispositivo: "DVCS_149560",
    fecha: "Z005-G5-3110520S8JZD+DE0035",
    nombreDispositivo: "Hidraulic 2",
    alarma: "SOBRECARGA",
    activa: true,
    validada: false,
    descripcion: "Potencia excedida"
  }
];

// Renderizar la aplicación
function renderApp() {
  const lang = translations[currentLanguage];
  
  document.querySelector('#app').innerHTML = `
    <div class="main-container">
      <div class="header">
        <div class="toolbar-left">
          <button id="menuToggleBtn" class="toolbar-btn">☰</button>
        </div>
        <div class="logo-title">${lang.appTitle}</div>
        <div class="toolbar-right">
          <button class="toolbar-btn" id="languageBtn">
            <span id="currentLanguage">${currentLanguage.toUpperCase()}</span> / <span>${currentLanguage === 'es' ? 'EN' : 'ES'}</span>
          </button>
          <button class="toolbar-btn" id="refreshBtn">
            <span id="refreshText">${lang.reload}</span> <span id="loadingIcon" class="hidden">⏳</span>
          </button>
          <button class="toolbar-btn" id="configuracionBtn">
            ⚙️ <span id="configText">${lang.configuration}</span>
          </button>
          <span class="toolbar-btn">${userEmail}</span>
          <button class="toolbar-btn" id="carIcon">🚗</button>
          

        </div>
      </div>

      <div class="content-area">
        <div class="map-container">
          <div id="map"></div>
        </div>

        <div id="sidebar" class="sidebar hidden">
          <div class="menu-section">
            <button class="toolbar-btn" id="dispositivosBtn">📍 ${lang.devices}</button>
            <button class="toolbar-btn" id="alarmasBtn">🔔 ${lang.alarms}</button>
          </div>
          <div class="device-details" id="device-details">
            <div class="device-header">
              <h2 class="device-title">${lang.selectDevice}</h2>
            </div>
            <p>${lang.clickDevice}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal de Configuración -->
    <div id="configModal" class="modal hidden">
      <div class="modal-content">
        <span class="close-btn" id="closeModalBtn">&times;</span>
        <div class="device-header">
          <h2 class="device-title">${lang.deviceConfig}</h2>
        </div>
        <div class="modal-body">
          <label><strong>Medidas Top</strong></label>
          <select multiple style="width: 100%; margin-bottom: 1em;">
            <option selected>Temperatura</option>
            <option selected>Potencia</option>
            <option>Tensión</option>
          </select>

          <label><strong>Coordenadas</strong></label>
          <input type="text" value="-3.6730059, 40.4820309" style="width: 100%; margin-bottom: 1em;" />

          <label><strong>Colores de alarmas</strong></label>
          <div><span>Activa, no-validada:</span> <input type="color" value="#ff0000" /></div>
          <div><span>Activa, validad
📊
potencia
0
📊
presion
1015
undefined

    🔹 Última señal: 03:00
    🔹 Frecuencia: 868MHz
    🔹 Firmware: 1.2.4
    🔹 Modo ahorro: ACTIVADO
a:</span> <input type="color" value="#f0ad4e" /></div>
          <div><span>No activa, no-validada:</span> <input type="color" value="#ff00ff" /></div>

          <label style="margin-top:1em;"><strong>Alarmas</strong></label>
          <button id="addAlarmBtn" class="toolbar-btn" style="margin:0.5em 0;">${lang.add}</button>
          <table class="alarm-table">
            <thead>
              <tr>
                <th>Alarma</th><th>Descripción</th><th>Notificar a</th><th>Habilitado</th>
              </tr>
            </thead>
            <tbody id="alarmTableBody">
              <tr>
                <td><input type="text" value="APAGADO" /></td>
                <td><input type="text" value="APAGADO" /></td>
                <td><input type="email" value="esg@hidraulia.eu" /></td>
                <td><input type="checkbox" checked /></td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="bottom-actions" style="margin-top:1em;">
          <button class="toolbar-btn">${lang.save}</button>
          <button class="toolbar-btn">${lang.clear}</button>
        </div>
      </div>
    </div>

    <!-- Modal de Alarmas -->
    <div id="alarmModal" class="modal hidden">
      <div class="modal-content alarm-modal-content">
        <span class="close-btn" id="closeAlarmModalBtn">&times;</span>
        <div class="device-header">
          <h2 class="device-title">${lang.alarmManagement}</h2>
        </div>
        <div id="alarmModalContent"></div>
      </div>
    </div>

    <!-- Modal de Dispositivo -->
    <div id="deviceModal" class="modal hidden">
      <div class="modal-content device-modal-content">
        <span class="close-btn" id="closeDeviceModalBtn">&times;</span>
        <div id="deviceModalContent"></div>
      </div>
    </div>
    
  `;

  document.getElementById('carIcon').addEventListener('click', () =>{
    window.open('/usuarios.html', '_blank');
});

  // Inicializar el mapa
  const map = new maplibregl.Map({
    container: 'map',
    style: 'https://demotiles.maplibre.org/style.json',
    center: [-3.7, 40.4],
    zoom: 5
  });

  map.addControl(new maplibregl.NavigationControl(), 'top-right');
  createDeviceMarkers(map);

  // Configurar eventos
  setupEventListeners();
}

// Funciones de la aplicación
function createDeviceMarkers(map) {
  Object.keys(devices).forEach(id => {
    const dev = devices[id];
    const marker = new maplibregl.Marker({ color: dev.status === "ON" ? '#2ecc71' : '#e74c3c' })
      .setLngLat(dev.location)
      .addTo(map);
    marker.getElement().addEventListener('click', e => {
      e.stopPropagation();
      showDeviceDetails(id);
    });
  });
}

function showDeviceDetails(deviceId) {
  const device = devices[deviceId];
  if (!device) return;

  const lang = translations[currentLanguage];

  const metricasHTML = Object.entries(device.details.metricas)
    .filter(([k]) => k !== "detalles")
    .map(([k, v]) => `
      <div class="card-info">
        <div class="card-icon">📊</div>
        <div class="card-data">
          <div class="data-label">${k}</div>
          <div class="data-value">${v}</div>
        </div>
      </div>
    `).join('');

  const detallesHTML = device.details.metricas.detalles.map(d => `
    <li>🔹 ${d}</li>
  `).join('');

  const alarmasHTML = device.details.alarmas.map(a => `
    <li>⚠️ ${a}</li>
  `).join('');

  const html = `
    <div class="device-card">
      <div class="card-header">
        <h2>${device.name}</h2>
        <span class="status-badge ${device.status === 'ON' ? 'on' : 'off'}">${device.status}</span>
      </div>

      <p class="device-reason">${device.details.motivo}</p>

      <h3>${lang.metrics}</h3>
      <div class="metrics-container">
        ${metricasHTML}
      </div>

      <h4>${lang.details}</h4>
      <ul class="detail-list">${detallesHTML}</ul>

      <h4>${lang.alarmsTitle}</h4>
      <ul class="alarm-list">${alarmasHTML}</ul>
    </div>
  `;

  document.getElementById('device-details').innerHTML = html;
  document.getElementById('sidebar').classList.remove('hidden');
}




function showNotification(msg) {
  const lang = translations[currentLanguage];
  
  document.getElementById('device-details').innerHTML = `
    <div class="notification-section">
      <h3>${lang.notification}:</h3>
      <p>${msg}</p>
    </div>
  `;
  document.getElementById('sidebar').classList.remove('hidden');
}

function getDevicesAtCoordinates(lngLat) {
  const result = [];
  Object.keys(devices).forEach(id => {
    const dev = devices[id];
    const d = maplibregl.MercatorCoordinate.fromLngLat(dev.location)
      .distanceTo(maplibregl.MercatorCoordinate.fromLngLat([lngLat.lng, lngLat.lat]));
    if (d < 1000) result.push(id);
  });
  return result;
}

function showDeviceList(deviceIds) {
  const lang = translations[currentLanguage];
  
  const html = `
    <div class="device-header">
      <h2 class="device-title">${lang.foundDevices}</h2>
    </div>
    <ul class="device-list">
      ${deviceIds.map(id => `
        <li>
          <button class="device-select-btn" data-device-id="${id}">
            ${devices[id].name} (${devices[id].status})
          </button>
        </li>
      `).join('')}
    </ul>
  `;
  document.getElementById('device-details').innerHTML = html;
  document.getElementById('sidebar').classList.remove('hidden');

  document.querySelectorAll('.device-select-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      showDeviceDetails(btn.dataset.deviceId);
    });
  });
}


function renderAlarmas(filter = 'todas') {
  const lang = translations[currentLanguage];
  let filteredAlarmas = alarmasData;
  
  if (filter === 'no-categorizadas') {
    filteredAlarmas = alarmasData.filter(a => !a.categoria);
  } else if (filter === 'no-validadas') {
    filteredAlarmas = alarmasData.filter(a => a.activa && !a.validada);
  } else if (filter === 'activas-validadas') {
    filteredAlarmas = alarmasData.filter(a => a.activa && a.validada);
  }

  const alarmasHTML = filteredAlarmas.map(alarma => `
    <tr>
      <td>${alarma.idDispositivo}</td>
      <td>${alarma.fecha}</td>
      <td>${alarma.nombreDispositivo}</td>
      <td>${alarma.alarma}</td>
      <td><span class="alarm-active">${alarma.activa ? 'X' : ''}</span></td>
      <td><span class="alarm-validated">${alarma.validada ? '✔' : ''}</span></td>
      <td>${alarma.descripcion}</td>
    </tr>
  `).join('');

  document.getElementById('alarmModalContent').innerHTML = `
    <div class="alarm-section">
      <div class="alarm-filters">
        <button class="filter-btn" data-filter="no-categorizadas">${lang.notCategorized}</button>
        <button class="filter-btn" data-filter="no-validadas">${lang.notValidated}</button>
        <button class="filter-btn" data-filter="activas-validadas">${lang.activeValidated}</button>
        <button class="filter-btn active" data-filter="todas">${lang.all}</button>
      </div>
      
      <div class="alarm-table-container">
        <table class="alarm-table">
          <thead>
            <tr>
              <th>Id dispositivo</th>
              <th>Fecha</th>
              <th>Nombre dispositivo</th>
              <th>Alarma</th>
              <th>Activa</th>
              <th>Validada</th>
              <th>Descripción</th>
            </tr>
          </thead>
          <tbody>
            ${alarmasHTML}
          </tbody>
        </table>
      </div>
      
      <div class="bottom-actions">
        <button class="toolbar-btn" id="validateAlarmsBtn">${lang.validate}</button>
        <button class="toolbar-btn" id="exportAlarmsBtn">${lang.export}</button>
      </div>
    </div>
  `;

  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', function() {
      document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      this.classList.add('active');
      const filter = this.dataset.filter;
      renderAlarmas(filter);
    });
  });
  
  document.getElementById('alarmModal').classList.remove('hidden');
}

function showDeviceModal(deviceId) {
  const device = devices[deviceId] || devices["26.4"];
  const lang = translations[currentLanguage];
  
  const html = `
    <div class="device-modal-header">
      <h2>${lang.appTitle}</h2>
      <div class="device-date">DATE: 45/2018</div>
    </div>
    
    <div class="device-section">
      <h3 class="device-id">${deviceId || "26.4"}</h3>
      <div class="device-proven">proven: 0</div>
      
      <table class="device-metrics-table">
        <thead>
          <tr>
            <th>Medición</th>
            <th>Valor</th>
            <th>Unidad</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Encendido</td>
            <td>SM</td>
            <td></td>
          </tr>
          ${device.details.valores.map(item => `
            <tr>
              <td>${item.nombre}</td>
              <td>${item.valor}</td>
              <td>${item.unidad}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    </div>
    
    <div class="device-section">
      <h3>${lang.alarmsTitle}</h3>
      <ul class="device-alarms-list">
        ${device.details.alarmas.map(alarma => `<li>${alarma}</li>`).join('')}
      </ul>
    </div>
    
    <div class="device-values-grid">
      <div class="device-value">${device.details.metricas.temperatura}</div>
      <div class="device-value">${device.details.metricas.potencia}</div>
      <div class="device-value">${device.details.metricas.presion}</div>
    </div>
    
    <div class="device-footer">
      ${device.details.metricas.detalles.map(item => `
        <div class="device-footer-item">${item}</div>
      `).join('')}
      <div class="device-footer-item">Isemperatura:</div>
      <div class="device-footer-item">power:</div>
    </div>
  `;

  document.getElementById('deviceModalContent').innerHTML = html;
  document.getElementById('deviceModal').classList.remove('hidden');
}

function changeLanguage() {
  currentLanguage = currentLanguage === 'es' ? 'en' : 'es';
  renderApp();
}

function setupEventListeners() {
  document.getElementById('menuToggleBtn').addEventListener('click', () => {
    document.getElementById('sidebar').classList.toggle('hidden');
  });

  document.getElementById('refreshBtn').addEventListener('click', () => {
    const icon = document.getElementById('loadingIcon');
    icon.classList.remove('hidden');
    setTimeout(() => {
      icon.classList.add('hidden');
    }, 1500);
  });

  document.getElementById('dispositivosBtn').addEventListener('click', () => {
    showDeviceModal("26.4");
  });

  document.getElementById('alarmasBtn').addEventListener('click', () => {
    renderAlarmas();
  });

  document.getElementById('configuracionBtn').addEventListener('click', () => {
    document.getElementById('configModal').classList.remove('hidden');
  });

  document.getElementById('closeModalBtn').addEventListener('click', () => {
    document.getElementById('configModal').classList.add('hidden');
  });

  document.getElementById('closeAlarmModalBtn').addEventListener('click', () => {
    document.getElementById('alarmModal').classList.add('hidden');
  });

  document.getElementById('closeDeviceModalBtn').addEventListener('click', () => {
    document.getElementById('deviceModal').classList.add('hidden');
  });

  document.getElementById('languageBtn').addEventListener('click', changeLanguage);

  // Evento de clic en el mapa
  const map = document.getElementById('map')?._maplibreMap;
  if (map) {
    map.on('click', (e) => {
      const ids = getDevicesAtCoordinates(e.lngLat);
      const lang = translations[currentLanguage];
      ids.length > 0 ? showDeviceList(ids) : showNotification(lang.noDevices);
    });
  }
}

// Inicializar la aplicación
renderApp();
