
String.prototype.shuffle = function(){
    var a = this.split(""), n = a.length;
    for(var i = n-1; i > 0; i--){
        var j = Math.floor(Math.random()*(i+1));
        var tmp = a[i];
        a[i] = a[j];
        a[j] = tmp;
    }
    return a.join("");
}


function shuffleArray(array) {
    for(var i = array.length-1; i > 0; i--){
        var j = Math.floor(Math.random()*(i+1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}

function ran(range){
	return Math.floor(Math.random()*range);
}



function substr_count(string, subString, allowOverlapping){
    string += ""; subString += "";
    if(subString.length <= 0) return (string.length+1);
    var n = 0, pos = 0, step = allowOverlapping ? 1 : subString.length;
    while(true){
        pos = string.indexOf(subString, pos);
        if(pos >= 0){
            ++n;
            pos += step;
        }else break;
    }
    return n;
}

function sort_by_length_desc(a, b){
	return b.length - a.length;
}

function totals_sort(a, b){
	return b[0] - a[0];
}


function getTimeMillis(){
	var d = new Date();
	return d.getTime();
}



var encoder = new TextEncoder("ascii");
var decoder = new TextDecoder("ascii");
var base64Table = encoder.encode('ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=');

function toBase64(dataArr){
    var padding = dataArr.byteLength % 3;
    var len = dataArr.byteLength - padding;
    padding = padding > 0 ? (3 - padding) : 0;
    var outputLen = ((len/3) * 4) + (padding > 0 ? 4 : 0);
    var output = new Uint8Array(outputLen);
    var outputCtr = 0;
    for(var i=0; i<len; i+=3){              
        var buffer = ((dataArr[i] & 0xFF) << 16) | ((dataArr[i+1] & 0xFF) << 8) | (dataArr[i+2] & 0xFF);
        output[outputCtr++] = base64Table[buffer >> 18];
        output[outputCtr++] = base64Table[(buffer >> 12) & 0x3F];
        output[outputCtr++] = base64Table[(buffer >> 6) & 0x3F];
        output[outputCtr++] = base64Table[buffer & 0x3F];
    }
    if (padding == 1) {
        var buffer = ((dataArr[len] & 0xFF) << 8) | (dataArr[len+1] & 0xFF);
        output[outputCtr++] = base64Table[buffer >> 10];
        output[outputCtr++] = base64Table[(buffer >> 4) & 0x3F];
        output[outputCtr++] = base64Table[(buffer << 2) & 0x3F];
        output[outputCtr++] = base64Table[64];
    } else if (padding == 2) {
        var buffer = dataArr[len] & 0xFF;
        output[outputCtr++] = base64Table[buffer >> 2];
        output[outputCtr++] = base64Table[(buffer << 4) & 0x3F];
        output[outputCtr++] = base64Table[64];
        output[outputCtr++] = base64Table[64];
    }
    
    var ret = decoder.decode(output);
    output = null;
    dataArr = null;
    return ret;
}


var output = "";

function generate_images(){

	output = "";
	
	let imgs = [];	
	imgs.push(["backside", "back"]);
	imgs.push(["joker1", "joker"]);
	imgs.push(["joker2", "joker_king"]);
	imgs.push(["joker3", "rulecard"]);
	for(let s = 1; s <= 4; s++){
		for(let i = 1; i <= 13; i++){
			let card_id = s+"_"+i;
			imgs.push(["c"+card_id, card_id]);
		}
	}

	var request = new XMLHttpRequest();
	(function loop(i, length) {
		if (i>= length) {
			return;
		}
		var file_name = imgs[i][1];
		var css_name = imgs[i][0];
		var url = "cards/"+file_name+".png";

		request.open("GET", url, true);
		request.responseType = "arraybuffer";
		request.onreadystatechange = function() {
			if(request.readyState === XMLHttpRequest.DONE && request.status === 200) {
				var arrayBuffer = request.response;
				var byteArray = new Uint8Array(arrayBuffer);
				let b64 = toBase64(byteArray);

				output += "."+css_name+" { background-image:url('data:image/png;base64,"+b64+"'); }\r\n";

				// update only at end:
				if(i == imgs.length-1){
					$("#output").show();
					$("#output").text(output);
				}
				
				loop(i + 1, length);
			}
		}
		request.send();
	})(0, imgs.length);
}

