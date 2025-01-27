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
  const hh = now.getHours();
  const mm = now.getMinutes();
  const url = "https://edu.ssafy.com/edu/main/index.do";

  chrome.storage.sync.get(["checked"], (result) => {
    let checked = result.checked || false;
    if ((hh === 8 && 30 <= mm) || (hh === 18 && mm <= 30)) {
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
  });
}

// 알람 감지시
chrome.alarms.onAlarm.addListener(() => {
  createWindow();
});

// 30초마다 알람
chrome.alarms.create({ periodInMinutes: 0.5 });

// 최초 실행시
createWindow();
