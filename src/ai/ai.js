import * as tf from "@tensorflow/tfjs"
const ALPHA_LEN = 26;
var max_len = 10;
let model;
// const tf = require('@tensorflow/tfjs');



function setup() {
  model = loadModelFromFile();
  document.getElementById('pred_features').addEventListener('keyup', () => {
    let pred_features = document.getElementById('pred_features').value;
    if (pred_features.length < max_len && /^[a-z]{1,10}$/.test(pred_features)) {
      let pred_labels = predictCompletion(pred_features);
      document.getElementById('pred_labels').value = pred_labels.join("");
    } else {
      document.getElementById('pred_labels').value = "";
    }
  });
}

function predictCompletion(inputText) {
  let pred_features = preprocessing_stage_2([inputText], max_len);
  pred_features = preprocessing_stage_5(pred_features, max_len, ALPHA_LEN);
  let pred_labels = model.predict(pred_features);
  pred_labels = postprocessing_stage_1(pred_labels);
  pred_labels = postprocessing_stage_2(pred_labels, max_len)[0];
  return pred_labels;
}

// function preprocessing_stage_1(words, max_len) {
//   let filtered_words = [];
//   var pattern = new RegExp("^[a-z]{1," + max_len + "}$");
//   for (let i in words) {
//     var is_valid = pattern.test(words[i]);
//     if (is_valid) filtered_words.push(words[i]);
//   }
//   return filtered_words;
// }

function preprocessing_stage_2(words, max_len) {
  let int_words = [];
  for (let i in words) {
    int_words.push(word_to_int(words[i], max_len))
  }
  return int_words;
}

function preprocessing_stage_5(words, max_len, alpha_len) {
  return tf.oneHot(tf.tensor2d(words, [words.length, max_len]), alpha_len);
}

function postprocessing_stage_1(words) {
  return words.argMax(-1).arraySync();
}

function postprocessing_stage_2(words, max_len) {
  let results = [];
  for (let i in words) {
    results.push(int_to_word(words[i], max_len));
  }
  return results;
}

function word_to_int(word, max_len) {
  let encode = [];
  for (let i = 0; i < max_len; i++) {
    if (i < word.length) {
      let letter = word.slice(i, i + 1);
      encode.push(letter.charCodeAt(0) - 96);
    } else {
      encode.push(0)
    }
  }
  return encode;
}

function int_to_word(word, max_len) {
  let decode = []
  for (let i = 0; i < max_len; i++) {
    if (word[i] == 0) {
      decode.push("");
    } else {
      decode.push(String.fromCharCode(word[i] + 96))
    }
  }
  return decode;
}

function loadModelFromFile() {
  try {
    const modelUrl = 'http://localhost:5500/src/ai/autocorrect_model.json'
    return tf.loadLayersModel(tf.io.browserHTTPRequest(modelUrl));
  } catch (error) {
    console.error('Error loading model:', error);
    throw error;
  }
}

setup();
