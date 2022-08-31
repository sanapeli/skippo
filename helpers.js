
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
