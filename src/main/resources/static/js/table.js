$(document).ready(function() {
	mdc.textField.MDCTextField.attachTo(document.querySelector('.mdc-text-field'));
	window.rows = 8;
	window.nextstart = parseInt(window.rows);
	window.nextend = parseInt(window.nextstart) + parseInt(window.rows);
	window.prevstart = 0;
	window.prevend = 8;
	window.url = "http://localhost:8080/plants/all";
	searchRows();
});

function setUrl() {
	window.keywordarea = document.getElementById('inputarea').value;
	if (window.keywordarea === '') {
		window.url = "http://localhost:8080/plants/all";
		window.rows = 8;
		window.nextstart = parseInt(window.rows);
		window.nextend = parseInt(window.nextstart) + parseInt(window.rows);
		window.prevstart = 0;
		window.prevend = 8;
		return searchRows();
	}
	else {
		window.url = `http://localhost:8080/plants?area=${window.keywordarea.toLowerCase()}`;
		window.rows = 8;
		window.nextstart = parseInt(window.rows);
		window.nextend = parseInt(window.nextstart) + parseInt(window.rows);
		window.prevstart = 0;
		window.prevend = 8;
		return searchRows();
	}
}

function appendRows(start, end, nextstart, nextend, prevstart, prevend, ch) {
	let promise = new Promise(function(resolve, reject) {	
		$("#planttable > tbody").html("");
		$.getJSON(window.url, function(data) {
		if (data.length == 0) {
			alert("Area not found!");
			return;
		}
		var plant = '';
		$.each(data.slice(start, end), function(key, value) {
						
			plant += '<tr class="mdc-data-table__row">';
			plant += '<td class="mdc-data-table__cell">' + value.scientificname + '</td>';
			plant += '<td class="mdc-data-table__cell">' + value.area + '</td>';
			plant += '<td class="mdc-data-table__cell"><button class="mdc-icon-button material-icons" style="color:#68a33e" onclick=""><div class="mdc-icon-button__ripple"></div>visibility</button></td>'
			plant += '</tr>';
		})
		if (start > -1 && end < data.length+8) {
			$('#planttable').append(plant);
			if (ch === "n") {
				window.nextstart = nextstart;
				window.nextend = nextend;
				window.prevstart = prevstart;
				window.prevend = prevend;
				start = window.nextstart;
				end = window.nextend;
			} else if (ch === "p"){
				window.nextstart = nextstart;
				window.nextend = nextend;
				window.prevstart = prevstart;
				window.prevend = prevend;
				start = window.prevstart;
				end = window.prevend;
			}
		}
		else {
			alert("No more data to show!");
			window.rows = 8;
			window.nextstart = parseInt(window.rows);
			window.nextend = parseInt(window.nextstart) + parseInt(window.rows);
			window.prevstart = 0;
			window.prevend = 8;
			searchRows();
		}
		});
		resolve($('#planttable').prop('outerHTML'));
		reject(new Error("Table not appended properly"));
	});
	return promise.then(
		(result) => {
			console.log($('#planttablebody'));
			console.log('Table appended successfully');
		},
		(error) => {
			console.log(error);
		}
	);
}
	

async function searchRows() {
	await appendRows(0, 8, window.nextstart, window.nextend, window.prevstart, window.prevend, "d");
}

async function nextRows() {
	if (parseInt(window.nextstart) == parseInt(window.nextend)) {
		window.nextstart = window.nextend;
		window.nextend = parseInt(window.nextstart) + parseInt(window.rows);
		window.prevstart = parseInt(window.nextstart) - parseInt(window.rows);
		window.prevend = parseInt(window.nextstart);
	}
	await appendRows(parseInt(window.nextstart), parseInt(window.nextend), parseInt(window.nextend), parseInt(window.nextstart) + parseInt(window.rows), parseInt(window.nextstart) - parseInt(window.rows),  parseInt(window.nextstart), "n");
}

async function prevRows() {
	if (parseInt(window.prevstart) == parseInt(window.prevend)) {
			window.nextstart = parseInt(window.prevend);
			window.nextend = parseInt(window.nextstart) + parseInt(window.rows);
			window.prevstart = parseInt(window.prevstart) - parseInt(window.rows);
			window.prevend = parseInt(window.prevend) - parseInt(window.rows);
		}
	await appendRows(parseInt(window.prevstart), parseInt(window.prevend), 	parseInt(window.prevend), parseInt(window.nextstart) + parseInt(window.rows), parseInt(window.prevstart) - parseInt(window.rows), parseInt(window.prevend) - parseInt(window.rows),  "p");
}