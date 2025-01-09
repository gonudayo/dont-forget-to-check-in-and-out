let checked = false

// 창 생성성
function createWindow() {
    const url = 'https://edu.ssafy.com/edu/main/index.do';
    const now = new Date();
    const hh = now.getHours();
    const mm = now.getMinutes();

    if (hh == 8 && 30 <= mm && mm <= 59) { // 8시 30분 부터 8시 59분
        if (checked == false) {
            chrome.windows.create({
                url: url,
                state: 'maximized',
                focused: true
            });
            checked = true;
        }
    } else if (hh == 18 && 0 <= mm && mm <= 30) { // 18시 0분 부터 18시 30분
        if (checked == false) {
            chrome.windows.create({
                url: url,
                state: 'maximized',
                focused: true
            });
            checked = true;
        }
    } else {
        checked = false;
    }
}

// 알람 감지시
chrome.alarms.onAlarm.addListener(() => {
    createWindow();
});

// 30초마다 알람람
chrome.alarms.create({periodInMinutes: 0.5});

createWindow();
