var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
  return new bootstrap.Tooltip(tooltipTriggerEl)
})


$(function () {
    // Configurar datetimepicker
    $('#startTimePicker').datetimepicker({
        format: 'DD/MM/YYYY',
        locale: moment.locale('es-es'),
    });
});

$(function () {
    // Configurar datetimepicker
    $('#startTimePicker2').datetimepicker({
        format: 'DD/MM/YYYY',
        locale: moment.locale('es-es'),
    });
});

var toastTrigger = document.getElementById('liveToastBtn');
var toastLiveExample = document.getElementById('liveToast');
if (toastTrigger) {
  toastTrigger.addEventListener('click', function () {
    var toast = new bootstrap.Toast(toastLiveExample);

    toast.show();
  })
}



var vecDatos = [
    {
        "label": "Bitcoin",
        "value": "BTC"
    },
    {
        "label": "Ethereumn",
        "value": "ETH"
    },
    {
        "label": "Litecoin",
        "value": "LIT"
    },
    {
        "label": "Dash",
        "value": "DSH"
    },
    {
        "label": "DogeCoin ",
        "value": "DOGE"
    },
    {
        "label": "Tether",
        "value": "USDT"
    },
    {
        "label": "Polkadot",
        "value": "DOT"
    },
    {
        "label": "Cardano",
        "value": "ADA"
    },
    {
        "label": "Solana",
        "value": "SOL"
    },
    {
        "label": "Binance Coin",
        "value": "BNB"
    },

];
const field = document.getElementById('input');
const ac = new Autocomplete(field, {
    data: vecDatos,
    maximumItems: 5,
    threshold: 1,
    onSelectItem: ({ label, value }) => {
        addDataToTable(label, value);
    }
});

//ac.setData(vecDatos);

var datosTabla = [{
    "label": null,
    "value": null
}];
let pA = vecDatos[random(0, vecDatos.length - 1)];
addDataToTable(pA.label, pA.value);



function addDataToTable(etiqueta, value) {
    let enc = datosTabla.find(element => element.label == etiqueta);
    if (!enc) {
        datosTabla.push({
            "label": etiqueta,
            "value": value
        });
        var table = document.getElementById("tablaTrading").getElementsByTagName('tbody')[0];
        var row = table.insertRow(0);
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        var cell3 = row.insertCell(2);
        var cell4 = row.insertCell(3);
        var cell5 = row.insertCell(4);
        var cell6 = row.insertCell(5);
        row.id = value;

        cell1.innerHTML = `${etiqueta} (${value})`;
        cell2.innerHTML = `${random(100, 10000)},${random(1, 99)}`;
        let dif = random(-1000, 1000);
        let porc = random(0, 100) * (dif < 0 ? -1 : 1);
        cell3.innerHTML = '<span class="me-3 text-' + (dif < 0 ? 'danger' : 'success') + '">' + `${dif}` + '</span><span class="p-1 ps-2 pe-2 bg-' + (dif < 0 ? 'danger' : 'success') + ' rounded-pill text-light">' + '<i class="bi bi-arrow-' + (dif < 0 ? 'down' : 'up') + '"></i>' + `${porc} %` + '</span>';
        cell4.innerHTML = '<button data-bs-opcion="compra" data-bs-moneda="' + `${etiqueta} (${value})` + '" type="button" class="btn btn-success" data-bs-toggle="modal" data-bs-target="#exampleModal">Comprar</button>';
        cell5.innerHTML = '<button data-bs-opcion="venta" data-bs-moneda="' + `${etiqueta} (${value})` + '" type="button" class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#exampleModal">Vender</button>';
        cell6.innerHTML = '<button type="button" aria-label="Cerrar ventana de transacción" class="btn-close" onclick="deleteProduct(\'' + value + '\')"><span aria-hidden="true" hidden>x</span></button>';

        var exampleModal = document.getElementById('exampleModal')
        exampleModal.addEventListener('show.bs.modal', function (event) {
            // Button that triggered the modal
            var button = event.relatedTarget
            // Extract info from data-bs-* attributes
            var opcion = button.getAttribute('data-bs-opcion');
            var moneda = button.getAttribute('data-bs-moneda');
            // If necessary, you could initiate an AJAX request here
            // and then do the updating in a callback.
            //
            // Update the modal's content.
            var modalTitle = exampleModal.querySelector('.modal-title')
            var modalButton = document.getElementById('liveToastBtn');

            modalTitle.textContent = (opcion == 'compra' ? "Comprar " : "Vender ") + moneda;
            modalButton.innerHTML = (opcion == 'compra' ? "Comprar" : "Vender");
            modalButton.classList.add((opcion == 'compra' ? "btn-success" : "btn-danger"));
            modalButton.classList.remove((opcion == 'compra' ? "btn-danger" : "btn-success"));

            document.getElementById('divisa').innerHTML = moneda;
        });

        var click = function (event) {
            deseleccionar();
            row.classList.add('seleccionado');
            document.getElementById('tradingSection').classList.remove('invisible');
            document.getElementById('tradingTittle').innerHTML = 'Histórico ' + `${etiqueta} (${value})`;
            cargarGrafico(parseFloat(cell2.innerHTML.replace(',', '.')));
        }
        cell3.addEventListener('click', click);
        cell1.addEventListener('click', click);
        cell2.addEventListener('click', click);

        cell1.classList.add('align-middle', 'p-2');
        cell3.classList.add('align-middle', 'p-2');
        cell2.classList.add('align-middle', 'p-2');
        cell4.classList.add('align-middle', 'p-2');
        cell5.classList.add('align-middle', 'p-2');
        cell6.classList.add('align-middle', 'p-2');

        
        //reiniciarTabla();  
        

    }


}



function random(min, max) {
    return Math.floor((Math.random() * (max - min + 1)) + min);
}

function deleteProduct(value) {
    var row = document.getElementById(value);
    console.log(row);
    row.parentNode.removeChild(row);
    let i = datosTabla.map(function (e) { return e.value; }).indexOf(value);
    datosTabla.splice(i, 1);
    //reiniciarTabla();
}

function closeTrading() {
    deseleccionar();
    document.getElementById('tradingSection').classList.add('invisible');
}


document.getElementById('plus').addEventListener('click', function (event) {
    document.getElementById('qty').value = (parseFloat(document.getElementById('qty').value) + 0.1).toFixed(1);
});

document.getElementById('minus').addEventListener('click', function (event) {
    document.getElementById('qty').value = (parseFloat(document.getElementById('qty').value) - 0.1).toFixed(1);
});


function deseleccionar(){
    let table = document.getElementById("tablaTrading").getElementsByTagName('tbody')[0];
    for (let k = 0; k < table.rows.length; k++) {
        table.rows[k].classList.remove('seleccionado');
    }
}



