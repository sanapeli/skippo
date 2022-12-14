

var SOUNDS = {
	complete: [1,0,0,0.414,0.092,0.851,0.269,0,0.391888,0,0,0.787,0.027,0.033,0.082,-0.489,0.463,0.002,0.001,1,0,0,0,0,0.204],
	explosion: [1,3,0,0.287594,0.51717,0.855,0.117312,0,0,0,0.652,0.66,0,0,0,0,0,-0.146964,-0.004699,1,0,0,0,0,0.25],
	hint: [1,3,0.2034,0.519972,0.079301,0.420554,0.503805,0,0.019718,-0.113554,0.02742,-0.960806,0.437405,-0.928749,0.31182,0.242098,-0.059401,0.008261,-0.0102,0.205988,0.046432,0.574843,0.114387,0.001109,0.1068],
	already: [1,1,0,0.115,0.431,0.526,0.311,0,0,-0.266,0,0,0.542421,0.624539,0,0,0,0,0,1,0,0,0,0,0.184],
	fail: [1,1,0,0.081582,0.588936,0.495,0.623,0,0,-0.352,0,0,0.542421,0.624539,0,0,0,0,0,1,0,0,0,0,0.1068],
	really: [1,0,0,0.382534,0,0.663,0.318,0,0.115469,-0.138,0,0,0,0,0.31911,0,0,0,0,0.642664,0,0,0,0,0.1068],
	kill: [1,0,0,0.089127,0,0.441,0.494,0,-0.333792,0,0,0,0,0,0.080034,0,0,0,0,1,0,0,0.013473,0,0.1068],
	next: [1,0,0,0.362553,0,0.454,0.501627,0,0.205054,0,0,0,0,0,0.578561,0,0,0,0,0.902463,0,0,0.157574,0,0.1068],
	clear: [1,3,0,0.233,0.316,0.438,0.301,0,-0.294087,0,0,0,0.319083,0.897748,0,0,0.670729,0,0,1,0,0,0,0,0.1068],
	score: [1,0,0,0.353496,0,0.472,0.404228,0,0.391888,0,0,0,0,0,0.174445,0,0.527907,0,0,1,0,0,0,0,0.1068],
	click: [1,3,0.219375,0.070448,0.264728,0.246,0.940782,0,-0.359019,0,0.276075,0.558813,0,0,0,0,0,0,0,1,0,0,0.909348,0,0.252],
	shuffle: [1,3,0.164,0.243,0,0.583,0.291,0,-0.073,-0.027,0.147,0.417,-0.007,0.5,1,-0.05378,1,0.36,-0.044,1.040697,-0.011889,0.015896,0.116385,0.030281,0.239],
	newgame: [1,0,0,0.225611,0,0.643,0.423233,0,0.179745,0,0.305463,0.40808,0,0,0.506519,0,0,0,0,1,0,0,0,0,0.1068],
}


var CACHED_SOUND_EFFECTS = {};


function generate_sounds(){
	if(SOUNDS_ENABLED){
		for(var soundName in SOUNDS) {
			if(SOUNDS.hasOwnProperty(soundName)){
				console.log("Generating sound "+soundName);
				generate_sound_caches(soundName);
			}
		}
	}
}


function generate_sound_caches(soundName){
	if(SOUNDS_ENABLED){
		let newPARAMS = SOUNDS[soundName];
		
		if(newPARAMS[0] != 1){
			console.log("unknown sound version '"+newPARAMS[0]+"'");
			console.log(newPARAMS);
			return;
		}
		
		let order = ['jsfxr_version', 'wave_type', 'p_env_attack','p_env_sustain','p_env_punch','p_env_decay','p_base_freq','p_freq_limit','p_freq_ramp','p_freq_dramp','p_vib_strength','p_vib_speed','p_arp_mod','p_arp_speed','p_duty','p_duty_ramp','p_repeat_speed','p_pha_offset','p_pha_ramp','p_lpf_freq','p_lpf_ramp','p_lpf_resonance','p_hpf_freq','p_hpf_ramp','sound_vol'];
		
		let output = {};
		output['oldParams'] = true;
		output['sample_rate'] = 44100;
		output['sample_size'] = 8;

		for(let i = 1; i < order.length; i++){
			output[order[i]] = newPARAMS[i];
		}

		PARAMS.fromJSON(output);
		
		if(typeof CACHED_SOUND_EFFECTS[soundName] === "undefined"){
			CACHED_SOUND_EFFECTS[soundName] = {};
		}
		
		SOUND = new SoundEffect(PARAMS).generate();
		CACHED_SOUND_EFFECTS[soundName]['sound'] = SOUND;
		CACHED_SOUND_EFFECTS[soundName]['params'] = PARAMS;
	}
}


function play_sound(soundName){
	if(SOUNDS_ENABLED){
		if(typeof CACHED_SOUND_EFFECTS[soundName] === "undefined"){
			return;
		}
		SOUND = CACHED_SOUND_EFFECTS[soundName]['sound'];
		SOUND.getAudio().play();
	}
}




/////////////////////////////////
// JSFXR

var SOUNDS_ENABLED = true;
var PARAMS;
if(typeof Params !== "undefined"){
	PARAMS = new Params();
}else{
	SOUNDS_ENABLED = false;
}
var SOUND;
var SOUND_VOL = 0.1068; // see sfxr.js (var volume) for volume adjusting for browser. this changes the wav file but doesnt work well because it clips the sounds at too loud or low volumes.
var SAMPLE_RATE = 44100;
var SAMPLE_SIZE = 8;

// JSFXR
/////////////////////////////////

