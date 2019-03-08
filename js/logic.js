function newRound(){
  console.log("call newRound()")
  $(".card-body *").text('-')
  $(".card-body *").removeClass("spoiler").text('-')
  $(".card-body *").removeClass("nospoiler")
  $(".play-btn").prop("disabled", false)
  var coin = (Math.random()>0.5)? 1 : 0;
  if(coin == 1){
    $("#word-en .card-body *").addClass("nospoiler")
    $("#word-it .card-body *").addClass("spoiler")
    $("#word-it .play-btn").prop("disabled", true)
  } else {
    $("#word-it .card-body *").addClass("nospoiler")
    $("#word-en .card-body *").addClass("spoiler")
    $("#word-en .play-btn").prop("disabled", true)
  }
  // Load words and spin it
  d3.csv("/res/words.csv").then(function(data) {
    i = Math.floor(Math.random()*(data.length))
    wordsIT = data[i]['IT'].split(';')
    wordsEN = data[i]['EN'].split(';')
    $("#word-it .card-title").text(wordsIT[0])
    $("#word-en .card-title").text(wordsEN[0])
    if(wordsIT.length > 1){
      $("#word-it .card-text").text(wordsIT.slice(1).join(', '))
    }
    if(wordsEN.length > 1){
      $("#word-en .card-text").text(wordsEN.slice(1).join(', '))
    }

  });
}

function reveal(e){
  if($(e).hasClass("spoiler")){
    $(e).closest(".card-body").find("*").removeClass("spoiler").addClass("nospoiler")
    $(e).closest(".card").find("button").prop("disabled", false)
  }
}

function speak(e, lang = null){
  var txt = $(e).closest(".card").find(".card-title").text()
  if(txt != "..."){
    if(lang == "IT"){
      responsiveVoice.speak(txt, "Italian Female");
    } else {
      responsiveVoice.speak(txt);
    }
  }
}

function updateScore(e){
  var currentPoint = $("#score").text();
  if($(e).hasClass("up")){
    currentPoint++
  } else {
    currentPoint--
  }
  if(currentPoint >= 10){
    currentPoint = 0
    //send alert of victory
    $.notify({
	     // options
	      message: 'You did it!',
        title: 'Congrats!'
      },{
	       // settings
	        type: 'success'
        });
  }
  if(currentPoint <= -10){
    currentPoint = 0
    //send alert loss
    $.notify({
	     // options
	      message: 'It seems you\'re not in tip-top form right now!',
        title: 'Try again!'
      },{
	       // settings
	        type: 'danger'
        });
  }
  $("#score").text(currentPoint);
  newRound()
}
