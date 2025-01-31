// (임시) 2025년 공휴일 리스트
let cal = new Array(373);
cal[28] = 1;
cal[29] = 1;
cal[30] = 1;
cal[2 * 31 + 3] = 1;
cal[4 * 31 + 5] = 1;
cal[4 * 31 + 6] = 1;
cal[5 * 31 + 6] = 1;
cal[7 * 31 + 15] = 1;
cal[9 * 31 + 3] = 1;
cal[9 * 31 + 6] = 1;
cal[9 * 31 + 7] = 1;
cal[9 * 31 + 8] = 1;
cal[9 * 31 + 9] = 1;
cal[11 * 31 + 25] = 1;

const CHECKIN_HOUR = 8;
const CHECKIN_MINUTES = 29;
const CHECKOUT_HOUR = 17;
const CHECKOUT_MINUTES = 59;

// 시간확인
function checkTime() {
  const now = new Date();
  const hh = now.getHours();
  const mm = now.getMinutes();
  const ss = now.getSeconds();

  if (
    (hh === CHECKIN_HOUR && CHECKIN_MINUTES === mm && 59 === ss) ||
    (hh === CHECKIN_HOUR && CHECKIN_MINUTES < mm) ||
    (hh === CHECKOUT_HOUR && CHECKOUT_MINUTES === mm && 59 === ss) ||
    (hh === CHECKOUT_HOUR + 1 && mm <= 30)
  ) {
    return 0;
  } else if (
    (hh === CHECKIN_HOUR && mm === CHECKIN_MINUTES) ||
    (hh === CHECKOUT_HOUR && CHECKOUT_MINUTES === mm)
  ) {
    return 59 - ss;
  }

  return -1;
}

// 창 생성
function createWindow() {
  const now = new Date();
  if (now.getDay() % 6 === 0) {
    return;
  }
  // (임시) 2025년 공휴일 예외 처리
  if (cal[now.getMonth() * 31 + now.getDate()] === 1) {
    return;
  }
  const url = "https://edu.ssafy.com/edu/main/index.do";

  chrome.storage.sync.get(["checked"], (result) => {
    let checked = result.checked || false;
    if (checkTime() === 0) {
      if (checked === false) {
        chrome.windows.create({
          url: url,
          state: "maximized",
          focused: true,
        });
        checked = true;
      }
    } else {
      checked = false;
    }
    chrome.storage.sync.set({ checked: checked });
    console.log(checked);
  });
}

// 알람 감지시
chrome.alarms.onAlarm.addListener(() => {
  createWindow();
});

// 30초마다 알람
function alarm() {
  chrome.alarms.create({ periodInMinutes: 0.5 });
}

// 서비스워커 실행시, 알람 발생 전, 시간 확인 후 페이지 띄우기
const initTIme = checkTime();
if (initTIme > -1) {
  setTimeout(createWindow, initTIme * 1000);
}

// 알람 시작 지점 설정
setTimeout(alarm, (59 - new Date().getSeconds()) * 1000);
