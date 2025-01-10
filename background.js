// 창 생성
function createWindow() {
    const now = new Date();
    if (now.getDay() % 6 === 0) {
        return;
    }
    const hh = now.getHours();
    const mm = now.getMinutes();
    const url = 'https://edu.ssafy.com/edu/main/index.do';
    let checked = false;

    chrome.storage.sync.get(['checked'], function(result) {
        checked = result.value;
    });

    if ((hh === 8 && 30 <= mm) || (hh === 18 && mm <= 30)) {
        if (checked === false) {
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
    chrome.storage.sync.set({'checked': checked});
}

// 알람 감지시
chrome.alarms.onAlarm.addListener(() => {
    createWindow();
});

// 30초마다 알람
chrome.alarms.create({periodInMinutes: 0.5});

// 최초 실행시
createWindow();
