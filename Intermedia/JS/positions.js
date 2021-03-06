var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
  return new bootstrap.Tooltip(tooltipTriggerEl)
})

let idd = 0;
var id_c = 0;
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
        "label": "DogeCoin",
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


var datosTabla = [{
    "label": null,
    "value": null
}];


for (let l = 0; l < random(5, 20); l++) {
    let pA = vecDatos[random(0, vecDatos.length - 1)];
    addDataToTableAbierta(pA.label, pA.value);
}

var toastTrigger = document.getElementById('liveToastBtn');
var toastLiveExample = document.getElementById('liveToast');
if (toastTrigger) {
    toastTrigger.addEventListener('click', function () {
        var toast = new bootstrap.Toast(toastLiveExample);

        toast.show();
        addDataToTableCerrada(datosTabla[id_c]);
    })
}





function addDataToTableAbierta(etiqueta, value) {
    let enc = datosTabla.find(element => element.label == etiqueta);
    if (!enc) {

        var table = document.getElementById("tablaAbierta").getElementsByTagName('tbody')[0];
        var row = table.insertRow(0);
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        var cell3 = row.insertCell(2);
        var cell4 = row.insertCell(3);
        var cell5 = row.insertCell(4);
        row.id = idd;
        cell1.innerHTML = `<img class="cryptoIcon" src="./Icons/${etiqueta.toLowerCase().replaceAll(' ', '_')}.png" alt="${etiqueta}"></img> ${etiqueta} (${value})`;
        let cant = `${random(100, 1000)},${random(1, 99)}`;
        cell2.innerHTML = cant;
        let curr = (random(0, 1) == 1 ? value : 'EUR');
        let pl = random(-1000, 1000) / (curr == 'EUR' ? 1 : 100);
        let fecha = `${random(1, 31)}/${random(1, 12)}/${random(2019, 2022)}`;
        cell3.innerHTML = '<span class="p-1 ps-2 pe-2 bg-' + (pl < 0 ? 'danger' : 'success') + ' rounded-pill text-light">' + `${pl} ${curr}` + '</span>';
        cell4.innerHTML = fecha;
        cell4.setAttribute('data-sort', 'YYYYMMDD');
        cell5.innerHTML = '<button data-bs-opcion="' + (pl > 0 ? 'venta' : 'compra') + '" data-bs-id="' + idd + '" type="button" class="btn btn-warning" data-bs-toggle="modal" data-bs-target="#exampleModal">Cerrar operaci??n</button>';

        var d = {
            "id": idd,
            "producto": etiqueta,
            "abreviatura": value,
            "cantidad": cant,
            "pl": pl,
            "precio": parseFloat(`${random(100, 1000)},${random(1, 99)}`.replace(',', '.')),
            "moneda": curr,
            "fecha": fecha
        };
        datosTabla.push(d);

        var exampleModal = document.getElementById('exampleModal')
        exampleModal.addEventListener('show.bs.modal', function (event) {
            var button = event.relatedTarget
            var opcion = button.getAttribute('data-bs-opcion');
            var id = button.getAttribute('data-bs-id');
            id_c = id;
            console.log(id_c);
            var ob = datosTabla[parseInt(id + '')];
            var modalTitle = exampleModal.querySelector('.modal-title');
            var modalButton = document.getElementById('liveToastBtn');
            var texto = document.getElementById('texto');
            texto.innerText = 'Va a cerrar esta operaci??n con otra de direcci??n inversa. El precio puede ser diferente a la fecha en la que se realiz?? la operaci??n original, pudiendo causar p??rdidas. La transacci??n se realizar?? en la misma moneda que la operaci??n de origen (' + ob.moneda + ') Revise los datos antes de continuar';
            cantidad.value = ob.cantidad;
            addonCantidad.innerHTML = ob.moneda;
            precio.value = (ob.precio + '').replace('.', ',');
            addonPrecio.innerHTML = ob.abreviatura;
            pyl.value = (ob.pl + '').replace('.', ',');
            addonPyl.innerHTML = ob.moneda
            total.value = (((parseFloat(ob.cantidad.replace(',', '.')) * ob.precio) - ob.pl) + '').replace('.', ',');
            addonTotal.innerHTML = ob.moneda;
            modalTitle.textContent = 'Cerrar operaci??n de ' + (opcion == 'compra' ? 'venta' : 'compra');
            modalButton.innerHTML = (opcion == 'compra' ? "Comprar" : "Vender");
            modalButton.classList.add((opcion == 'compra' ? "btn-success" : "btn-danger"));
            modalButton.classList.remove((opcion == 'compra' ? "btn-danger" : "btn-success"));


        });



        cell1.classList.add('align-middle', 'p-2');
        cell3.classList.add('align-middle', 'p-2');
        cell2.classList.add('align-middle', 'p-2');
        cell4.classList.add('align-middle', 'p-2');
        cell5.classList.add('align-middle', 'p-2');



        idd = idd + 1;

    }


}

gridCheck1.addEventListener('change', function (event) {
    if (event.target.checked) {
        cantidad.removeAttribute('readonly');
    } else {
        cantidad.setAttribute('readonly', true);
    }
});

function addDataToTableCerrada(o) {
    var row = document.getElementById(id_c);
    row.parentNode.removeChild(row);

    var table = document.getElementById("tablaCerradas").getElementsByTagName('tbody')[0];
    row = table.insertRow(0);
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    var cell4 = row.insertCell(3);
    var cell5 = row.insertCell(4);
    cell1.innerHTML = o.producto;
    cell2.innerHTML = o.precio;
    cell3.innerHTML = o.cantidad;
    cell4.innerHTML = new Date().toLocaleDateString();
    cell5.innerHTML = '<button data-bs-id="' + id_c + '" type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">Detalles</button>';

    cell1.classList.add('align-middle', 'p-2');
    cell3.classList.add('align-middle', 'p-2');
    cell2.classList.add('align-middle', 'p-2');
    cell4.classList.add('align-middle', 'p-2');
    cell5.classList.add('align-middle', 'p-2');
}

function random(min, max) {
    return Math.floor((Math.random() * (max - min + 1)) + min);
}

datosTabla.splice(0, 1);
console.log(datosTabla);