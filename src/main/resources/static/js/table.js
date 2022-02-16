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
		return searchRows();
	}
	else {
		window.url = `http://localhost:8080/plants?area=${window.keywordarea.toLowerCase()}`;
		return searchRows();
	}
}

function searchRows() {
	$("#planttable > tbody").html("");
	$.getJSON(window.url, function(data) {
		if (data.length == 0) {
			alert("Area not found!");
		}
		var plant = '';
		$.each(data.slice(0, 8), function(key, value) {
			plant += '<tr class="mdc-data-table__row">';
			plant += '<td class="mdc-data-table__cell">' + value.scientificname + '</td>';
			plant += '<td class="mdc-data-table__cell">' + value.area + '</td>';
			plant += '<td class="mdc-data-table__cell"><button class="mdc-icon-button material-icons" style="color:#68a33e" onclick=""><div class="mdc-icon-button__ripple"></div>visibility</button></td>'
			plant += '</tr>';
		})
		$('#planttable').append(plant);
	});
}

function nextRows() {
	$("#planttable > tbody").html("");
	$.getJSON(window.url, function(data) {
		var plant = '';
		$.each(data.slice(window.nextstart, window.nextend), function(key, value) {
			plant += '<tr class="mdc-data-table__row">';
			plant += '<td class="mdc-data-table__cell">' + value.scientificname + '</td>';
			plant += '<td class="mdc-data-table__cell">' + value.area + '</td>';
			plant += '<td class="mdc-data-table__cell"><button class="mdc-icon-button material-icons" style="color:#68a33e" onclick=""><div class="mdc-icon-button__ripple"></div>visibility</button></td>'
			plant += '</tr>';
		});
		$('#planttable').append(plant);
		window.nextstart = parseInt(window.nextend);
		window.nextend = parseInt(window.nextstart) + parseInt(window.rows);
		window.prevstart = parseInt(window.nextstart) - parseInt(window.rows)
		window.prevend = parseInt(window.nextstart);
	});
}

function prevRows() {
	$(document).ready(function() {
		if (window.prevstart < 0) {
			alert("No more data to show");
			return;
		}
		$("#planttable > tbody").html("");
		$.getJSON(window.url, function(data) {
			var plant = '';
			$.each(data.slice(window.prevstart, window.prevend), function(key, value) {
				plant += '<tr class="mdc-data-table__row">';
				plant += '<td class="mdc-data-table__cell">' + value.scientificname + '</td>';
				plant += '<td class="mdc-data-table__cell">' + value.area + '</td>';
				plant += '<td class="mdc-data-table__cell"><button class="mdc-icon-button material-icons" style="color:#68a33e" onclick=""><div class="mdc-icon-button__ripple"></div>visibility</button></td>'
				plant += '</tr>';
			});
			$('#planttable').append(plant);
			window.prevstart = parseInt(window.prevstart) - parseInt(window.rows)
			window.prevend = parseInt(window.prevend) - parseInt(window.rows);
			window.nextstart = parseInt(window.prevend);
			window.nextend = parseInt(window.nextstart) + parseInt(window.rows);
		});
	})
}





