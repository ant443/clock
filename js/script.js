(function clock(){
  "use strict";
  const convert24hTo12h = hours24 => 
    !hours24 ? 12 : hours24 < 12 ? hours24 : hours24 - 12; 

  const timeNow = new Date();
  const adjustToTwelve = 90;
  const secondsNow = timeNow.getSeconds();
  const minutesNow = timeNow.getMinutes();
  const hoursNow24 = timeNow.getHours();
  const hoursNow = convert24hTo12h(hoursNow24);
  const convertTicksToDegrees = time => 6 * time; 

  const secondsHandAngle = adjustToTwelve + convertTicksToDegrees(secondsNow);
  const minutesHandAngle = adjustToTwelve + convertTicksToDegrees(minutesNow);
  const convertCurrentTimeToDegrees = (hoursNow, minutesNow, secondsNow) => { 
    const degreesPerSecond = 360 / (12 * 60 * 60);
    const currentTimeInSeconds = (hoursNow * 60 * 60) + (minutesNow * 60) + 
      secondsNow;
    return degreesPerSecond * currentTimeInSeconds;
  }

  const hoursHandAngle = adjustToTwelve + convertCurrentTimeToDegrees(hoursNow, 
                                                       minutesNow, secondsNow);
  const createKeyFrameText = (hand, startDegrees) => { 
    return "@keyframes " + hand + "HandRotate {\n" +
      "0% { transform: rotate(" + startDegrees + "deg); }\n" +
      "100% { transform: rotate(" + (startDegrees + 360) + "deg); }\n}";
  }

  const lastStyleSheet = document.styleSheets[document.styleSheets.length - 1];
  lastStyleSheet.insertRule(createKeyFrameText("seconds", secondsHandAngle));
  lastStyleSheet.insertRule(createKeyFrameText("minutes", minutesHandAngle+6));
  lastStyleSheet.insertRule(createKeyFrameText("hours", hoursHandAngle));
  const minutesHand = document.querySelector("#clock-face .hands:nth-child(2)");
  const secondsLeft = 60 - secondsNow;
  const syncMinutesHandWithSecondsHand = (minutesHand, 
                                          secondsLeft, 
                                          minutesHandAngle) => {
    minutesHand.style.transform = "rotate(" + minutesHandAngle + "deg)";
    minutesHand.style.animationDelay = secondsLeft + "s";
  } 

  syncMinutesHandWithSecondsHand(minutesHand, secondsLeft, minutesHandAngle);
})();


// TODO:
// console errors intermittent bug:
// Unexpected value NaN parsing x2 attribute. markup.js:330:6
// Unexpected value NaN parsing y1 attribute. markup.js:330:6
// Unexpected value NaN parsing y2 attribute. markup.js:330:6