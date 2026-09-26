document
    .getElementById("btn-calcular")
    .addEventListener("click", procesarSimulacion);


function procesarSimulacion() {

    const montoInput =
        parseFloat(document.getElementById("monto").value);

    const tasaAnualInput =
        parseFloat(document.getElementById("tasa").value) / 100;

    const plazoMeses =
        parseInt(document.getElementById("plazo").value);


    const IVA_VALOR = 0.16;


    if (
        isNaN(montoInput) ||
        isNaN(tasaAnualInput) ||
        montoInput <= 0 ||
        tasaAnualInput < 0
    ) {

        alert(
            "Ingrese parámetros numéricos válidos e intente nuevamente."
        );

        return;
    }


    /*
        AMORTIZACIÓN CONSTANTE

        El capital se divide entre el número total
        de mensualidades.
    */

    const amortizacionCapital =
        montoInput / plazoMeses;


    /*
        Convertimos la tasa anual
        en tasa mensual.
    */

    const tasaMensualEquivalente =
        tasaAnualInput / 12;


    let saldoInsoluto = montoInput;

    let acumuladoPagos = 0;

    let primerPago = 0;


    const tablaBody =
        document.querySelector(
            "#tabla-amortizacion tbody"
        );


    tablaBody.innerHTML = "";


    for (
        let periodo = 1;
        periodo <= plazoMeses;
        periodo++
    ) {

        /*
            Interés calculado sobre
            saldo insoluto.
        */

        const interesDelPeriodo =
            saldoInsoluto *
            tasaMensualEquivalente;


        /*
            IVA del 16% solamente
            sobre los intereses.
        */

        const ivaSobreInteres =
            interesDelPeriodo *
            IVA_VALOR;


        /*
            Pago mensual total.
        */

        const pagoMensualTotal =
            amortizacionCapital +
            interesDelPeriodo +
            ivaSobreInteres;


        if (periodo === 1) {
            primerPago =
                pagoMensualTotal;
        }


        acumuladoPagos +=
            pagoMensualTotal;


        const saldoInicial =
            saldoInsoluto;


        saldoInsoluto -=
            amortizacionCapital;


        /*
            Evitamos valores negativos
            por decimales.
        */

        if (saldoInsoluto < 0) {
            saldoInsoluto = 0;
        }


        const fila =
            document.createElement("tr");


        fila.innerHTML = `

            <td>
                ${periodo}
            </td>

            <td>
                ${formatoMoneda(saldoInicial)}
            </td>

            <td>
                ${formatoMoneda(amortizacionCapital)}
            </td>

            <td>
                ${formatoMoneda(interesDelPeriodo)}
            </td>

            <td>
                ${formatoMoneda(ivaSobreInteres)}
            </td>

            <td>
                ${formatoMoneda(pagoMensualTotal)}
            </td>

            <td>
                ${formatoMoneda(saldoInsoluto)}
            </td>

        `;


        tablaBody.appendChild(fila);

    }


    document.getElementById(
        "resultado-monto"
    ).textContent =
        formatoMoneda(montoInput);


    document.getElementById(
        "resultado-pago"
    ).textContent =
        formatoMoneda(primerPago);


    document.getElementById(
        "resultado-total"
    ).textContent =
        formatoMoneda(acumuladoPagos);

}


/*
    Formatea números como moneda mexicana.
*/

function formatoMoneda(valor) {

    return valor.toLocaleString(
        "es-MX",
        {
            style: "currency",
            currency: "MXN"
        }
    );

}