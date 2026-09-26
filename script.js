document.getElementById('btn-calcular').addEventListener('click', procesarSimulacion);

function procesarSimulacion() {
  const montoInput = parseFloat(document.getElementById('monto').value);
  const tasaAnualInput = parseFloat(document.getElementById('tasa').value) / 100;
  const plazoMeses = parseInt(document.getElementById('plazo').value);
  const IVA_VALOR = 0.16;

  if (isNaN(montoInput) || isNaN(tasaAnualInput) || montoInput <= 0) {
    alert("Ingrese parámetros numéricos válidos e intente nuevamente.");
    return;
  }

  const amortizacionCapital = montoInput / plazoMeses;
  const tasaMensualEquivalente = tasaAnualInput / 12;

  let saldoInsoluto = montoInput;
  const tablaBody = document.querySelector('#tabla-amortizacion tbody');
  tablaBody.innerHTML = '';

  let acumuladoPagos = 0;
  let primerPago = 0;

  for (let periodo = 1; periodo <= plazoMeses; periodo++) {
    const interesDelPeriodo = saldoInsoluto * tasaMensualEquivalente;
    const ivaSobreInteres = interesDelPeriodo * IVA_VALOR;
    const pagoMensualTotal = amortizacionCapital + interesDelPeriodo + ivaSobreInteres;
    const saldoFinalPeriodo = Math.max(0, saldoInsoluto - amortizacionCapital);

    if (periodo === 1) {
      primerPago = pagoMensualTotal;
    }

    acumuladoPagos += pagoMensualTotal;

    const fila = document.createElement('tr');

    fila.innerHTML = `
      <td>${periodo}</td>
      <td>$${saldoInsoluto.toFixed(2)}</td>
      <td>$${amortizacionCapital.toFixed(2)}</td>
      <td>$${interesDelPeriodo.toFixed(2)}</td>
      <td>$${ivaSobreInteres.toFixed(2)}</td>
      <td>$${pagoMensualTotal.toFixed(2)}</td>
      <td>$${saldoFinalPeriodo.toFixed(2)}</td>
    `;

    tablaBody.appendChild(fila);

    saldoInsoluto = saldoFinalPeriodo;
  }

  document.getElementById('resultado-monto').textContent = `$${montoInput.toFixed(2)}`;
  document.getElementById('resultado-pago').textContent = `$${primerPago.toFixed(2)}`;
  document.getElementById('resultado-total').textContent = `$${acumuladoPagos.toFixed(2)}`;
}
