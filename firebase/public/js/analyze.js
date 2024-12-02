//體體體體體體體體體體體體體體體體體體體體體
//體體體體體體體體體體體體體　　　　體體體體
//體體　　　　　　　　　　　　　　　體體體體
//體體體　　　　體體　　　體體體體體體體體體
//體體體體體體體體體　　　體體體體體體體體體
//體　　　　　　　　　　　　　　　　　　　體
//體體體體體體體體體　　　體體體體體體體體體
//體體體　　　　　　　　　　　　　　體體體體
//體體體體　　　　　　　　　　　　　體體體體
//體體體體　　　體體　　　體體　　　體體體體
//體體體體　　　　　　　　　　　　　體體體體
//體體體體　　　體體　　　體體　　　體體體體
//體體體體　　　　　　　　　　　　　體體體體
//體體體體體體體體體　　　體體體體體體體體體
//體體體體體體體體體　　　體體體體體體體體體
//體體體　　　　　　　　　　　　　　　體體體
//體體體體體體體體體　　　體體體體體體體體體
//體　　　　　　　　　　　　　　　　　　　體
//體體體體體體體體體體體體體體體體體體體體體
// 初始化體重圖表
const weightCtx = document.getElementById('weightChart').getContext('2d');
const weightChart = new Chart(weightCtx, {
    type: 'line',
    data: {
        labels: [],
        datasets: [{
            label: '體重 (kg)',
            data: [],
            fill: false,
            borderColor: '#ff9350',
            backgroundColor: '#ff9350',
            tension: 0.1
        }]
    },
    options: {
        responsive: true,
        scales: {
            x: {
                title: {
                    display: true,
                    text: '日期'
                }
            },
            y: {
                title: {
                    display: true,
                    text: '體重 (kg)'
                },
                beginAtZero: true // 確保縱軸從零開始，避免負數
            }
        }
    }
});
// 獲取並顯示體重數據
function fetchWeightData(userId, days, selectedYear, selectedMonth) {
    const labels = [];
    const data = [];
    const promises = [];
    let lastValidData = null; // 用於存儲上一次有效的數據

    if (days === 7) {
        // 一週：逐天查詢，顯示當月的最新一周，若最後一周包含未來的時間，則顯示今天以前的一周
        const today = new Date();
        let weekEndDate = new Date(selectedYear, selectedMonth + 1, 0); // 當周的最後一天
        if (weekEndDate > today) {
            weekEndDate = today;
        }
        const weekStartDate = new Date(weekEndDate);
        weekStartDate.setDate(weekEndDate.getDate() - 6); // 確保有7天的數據範圍
        for (let i = 0; i < 7; i++) {
            const date = new Date(weekStartDate);
            date.setDate(weekStartDate.getDate() + i);
            const dateString = date.toISOString().slice(5, 10); // 僅顯示 MM-DD
            const recordRef = db.collection("users").doc(userId)
                .collection("Records").doc(date.toISOString().split('T')[0])
                .collection("weight");
            promises.push(
                recordRef.get().then((querySnapshot) => {
                    let dailyweight = 0;
                    let dailyCount = 0;
                    querySnapshot.forEach((doc) => {
                        dailyweight += doc.data().weight;
                        dailyCount++;
                    });
                    let avgDailyweight = null;
                    if (dailyCount > 0) {
                        avgDailyweight = dailyweight / dailyCount;
                        lastValidData = avgDailyweight;
                    } else {
                        avgDailyweight = lastValidData !== null ? lastValidData : 0;
                    }
                    data.push(avgDailyweight);
                    labels.push(dateString);
                })
            );
        }
    } else if (days === 30) {
        // 一個月：逐日查詢，若最後包含未來的時間，則顯示今天以前的一月
        const today = new Date();
        let monthEndDate = new Date(selectedYear, selectedMonth + 1, 0); // 當月的最後一天
        if (monthEndDate > today) {
            monthEndDate = today;
        }
        const monthStartDate = new Date(monthEndDate);
        monthStartDate.setDate(monthEndDate.getDate() - 29); // 確保有30天的數據範圍
        for (let day = 0; day < 30; day++) {
            const date = new Date(monthStartDate);
            date.setDate(monthStartDate.getDate() + day);
            const dateString = date.toISOString().slice(5, 10); // 僅顯示 MM-DD
            const recordRef = db.collection("users").doc(userId)
                .collection("Records").doc(date.toISOString().split('T')[0])
                .collection("weight");
            promises.push(
                recordRef.get().then((querySnapshot) => {
                    let dailyweight = 0;
                    let dailyCount = 0;
                    querySnapshot.forEach((doc) => {
                        dailyweight += doc.data().weight;
                        dailyCount++;
                    });
                    let avgDailyweight = null;
                    if (dailyCount > 0) {
                        avgDailyweight = dailyweight / dailyCount;
                        lastValidData = avgDailyweight;
                    } else if (lastValidData !== null) {
                        avgDailyweight = lastValidData;
                    } else {
                        avgDailyweight = 0;
                    }
                    data.push(avgDailyweight);
                    labels.push(dateString);
                })
            );
        }
    }

    return Promise.all(promises).then(() => ({ labels, data }));
}


//動動動動動動動動動動動動動動動動動動動動動動
//動動動　　　動　　　　　　　　　　　　　動動
//動動動　　　動　　　動動動動動動動　　　動動
//動動動動　　　　　　動動　　　動動　　　動動
//動動動動　　　　　　　　　　　　　　　　動動
//動動動動動動動動動動動動　　　動動動動動動動
//動動動動動動動動　　　　　　　　　　　動動動
//動　　　　　　動　　　動　　　動　　　動動動
//動動動動　　動動　　　　　　　　　　　動動動
//動動動動　　動動　　　　　　　　　　　動動動
//動動動動　　動動　　　動　　　動　　　動動動
//動動動動　　動動　　　　　　　　　　　動動動
//動動動動　　動動動動動動　　　動動動動動動動
//動動動動　　動　　　　　　　　　　　　　動動
//動動動動　　動動動動動動　　　動動動動動動動
//動動動　　　　動動動動動　　　動動動動動動動
//動動　　　　　　　動動動動動動動動動動動動動
//動　　　　動　　　　　　　　　　　　　　　動
//動動　　動動動動動動動　　　　　　　　　　動
//動動動動動動動動動動動動動動動動動動動動動動-->

// 初始化跑步時間圖表
const runCtx = document.getElementById('runChart').getContext('2d');
const runChart = new Chart(runCtx, {
    type: 'line',
    data: {
        labels: [],
        datasets: [{
            label: '跑步時間 (分鐘)',
            data: [],
            fill: false,
            borderColor: '#f37221',
            backgroundColor: '#f37221',
            tension: 0.1
        }]
    },
    options: {
        responsive: true,
        scales: {
            x: {
                title: {
                    display: true,
                    text: '日期'
                }
            },
            y: {
                title: {
                    display: true,
                    text: '跑步時間 (分鐘)'
                },
                beginAtZero: true // 確保縱軸從零開始，避免負數
            }
        }
    }
});


// 獲取並顯示跑步時間數據
function fetchRunData(userId, days, selectedYear, selectedMonth) {
    const labels = [];
    const data = [];
    const promises = [];

    if (days === 7) {
        // 一週：進行某天查詢，顯示當月的最新一周，若最後一周包含未來的時間，則顯示今天以前的一週
        const today = new Date();
        let weekEndDate = new Date(selectedYear, selectedMonth + 1, 0); // 當周的最後一天
        if (weekEndDate > today) {
            weekEndDate = today;
        }
        const weekStartDate = new Date(weekEndDate);
        weekStartDate.setDate(weekEndDate.getDate() - 6); // 確保有7天的數據範圍
        for (let i = 0; i < 7; i++) {
            const date = new Date(weekStartDate);
            date.setDate(weekStartDate.getDate() + i);
            const dateString = date.toISOString().slice(5, 10); // 僅顯示 MM-DD
            const recordRef = db.collection("users").doc(userId)
                .collection("Records").doc(date.toISOString().split('T')[0])
                .collection("run");
            promises.push(
                recordRef.get().then((querySnapshot) => {
                    let dailyRun = 0;
                    let dailyCount = 0;
                    querySnapshot.forEach((doc) => {
                        dailyRun += doc.data().run;
                        dailyCount++;
                    });
                    let avgDailyRun = dailyCount > 0 ? dailyRun / dailyCount : 0;
                    data.push(avgDailyRun);
                    labels.push(dateString);
                })
            );
        }
    } else if (days === 30) {
        // 一個月：進行某天查詢，若最後包含未來的時間，則顯示今天以前的一月
        const today = new Date();
        let monthEndDate = new Date(selectedYear, selectedMonth + 1, 0); // 當月的最後一天
        if (monthEndDate > today) {
            monthEndDate = today;
        }
        const monthStartDate = new Date(monthEndDate);
        monthStartDate.setDate(monthEndDate.getDate() - 29); // 確保有30天的數據範圍
        for (let day = 0; day < 30; day++) {
            const date = new Date(monthStartDate);
            date.setDate(monthStartDate.getDate() + day);
            const dateString = date.toISOString().slice(5, 10); // 僅顯示 MM-DD
            const recordRef = db.collection("users").doc(userId)
                .collection("Records").doc(date.toISOString().split('T')[0])
                .collection("run");
            promises.push(
                recordRef.get().then((querySnapshot) => {
                    let dailyRun = 0;
                    let dailyCount = 0;
                    querySnapshot.forEach((doc) => {
                        dailyRun += doc.data().run;
                        dailyCount++;
                    });
                    let avgDailyRun = dailyCount > 0 ? dailyRun / dailyCount : 0;
                    data.push(avgDailyRun);
                    labels.push(dateString);
                })
            );
        }
    }

    return Promise.all(promises).then(() => ({ labels, data }));
}

//喝喝喝喝喝喝喝喝喝喝喝喝喝喝喝喝喝喝喝喝喝喝
//喝喝喝喝喝喝喝喝喝喝　　　喝喝喝喝喝喝喝喝喝
//喝喝喝喝喝喝喝喝喝喝　　　喝喝喝喝喝喝喝喝喝
//喝喝喝喝喝喝喝喝喝喝　　　喝喝喝喝喝喝喝喝喝
//喝喝喝喝喝喝喝喝喝喝　　　喝喝喝喝　喝喝喝喝
//喝喝喝喝喝喝喝喝喝喝　　　喝喝喝　　　喝喝喝
//喝喝　　　　　　　　　　　喝喝　　　　　喝喝
//喝喝喝喝喝喝喝　　　　　　　　　　　喝喝喝喝
//喝喝喝喝喝喝　　　喝　　　　　　　喝喝喝喝喝
//喝喝喝喝喝喝　　　喝　　　　　喝喝喝喝喝喝喝
//喝喝喝喝喝喝　　　喝　　　　　　喝喝喝喝喝喝
//喝喝喝喝喝　　　喝喝　　　　　　喝喝喝喝喝喝
//喝喝喝喝　　　　喝喝　　　喝　　　喝喝喝喝喝
//喝喝喝喝　　　喝喝喝　　　喝　　　　喝喝喝喝
//喝喝喝　　　喝喝喝喝　　　喝喝　　　　　喝喝
//喝　　　　　喝喝喝喝　　　喝喝喝喝　　　　喝
//喝喝喝　　喝喝喝喝喝　　　喝喝喝喝喝　　喝喝
//喝喝喝喝喝喝喝喝　　　　　喝喝喝喝喝喝喝喝喝
//喝喝喝喝喝喝喝喝　　　　喝喝喝喝喝喝喝喝喝喝
//喝喝喝喝喝喝喝喝喝喝喝喝喝喝喝喝喝喝喝喝喝喝

// 初始化喝水圖表
const waterCtx = document.getElementById('waterChart').getContext('2d');
const waterChart = new Chart(waterCtx, {
    type: 'line',
    data: {
        labels: [],
        datasets: [{
            label: '喝水量 (毫升)',
            data: [],
            fill: false,
            borderColor: '#80bef5',
            backgroundColor: '#80bef5',
            tension: 0.1
        }]
    },
    options: {
        responsive: true,
        scales: {
            x: {
                title: {
                    display: true,
                    text: '日期'
                }
            },
            y: {
                title: {
                    display: true,
                    text: '喝水量 (毫升)'
                },
                beginAtZero: true // 確保縱軸從零開始，避免負數
            }
        }
    }
});

// 獲取並顯示喝水數據
function fetchWaterData(userId, days, selectedYear, selectedMonth) {
    const labels = [];
    const data = [];
    const promises = [];

    if (days === 7) {
        // 一週：進行某天查詢，顯示當月的最新一周，若最後一周包含未來的時間，則顯示今天以前的一週
        const today = new Date();
        let weekEndDate = new Date(selectedYear, selectedMonth + 1, 0); // 當周的最後一天
        if (weekEndDate > today) {
            weekEndDate = today;
        }
        const weekStartDate = new Date(weekEndDate);
        weekStartDate.setDate(weekEndDate.getDate() - 6); // 確保有7天的數據範圍
        for (let i = 0; i < 7; i++) {
            const date = new Date(weekStartDate);
            date.setDate(weekStartDate.getDate() + i);
            const dateString = date.toISOString().slice(5, 10); // 僅顯示 MM-DD
            const recordRef = db.collection("users").doc(userId)
                .collection("Records").doc(date.toISOString().split('T')[0])
                .collection("water");
            promises.push(
                recordRef.get().then((querySnapshot) => {
                    let dailyWater = 0;
                    let dailyCount = 0;
                    querySnapshot.forEach((doc) => {
                        dailyWater += doc.data().water;
                        dailyCount++;
                    });
                    let avgDailyWater = dailyCount > 0 ? dailyWater / dailyCount : 0;
                    data.push(avgDailyWater);
                    labels.push(dateString);
                })
            );
        }
    } else if (days === 30) {
        // 一個月：進行某天查詢，若最後包含未來的時間，則顯示今天以前的一月
        const today = new Date();
        let monthEndDate = new Date(selectedYear, selectedMonth + 1, 0); // 當月的最後一天
        if (monthEndDate > today) {
            monthEndDate = today;
        }
        const monthStartDate = new Date(monthEndDate);
        monthStartDate.setDate(monthEndDate.getDate() - 29); // 確保有30天的數據範圍
        for (let day = 0; day < 30; day++) {
            const date = new Date(monthStartDate);
            date.setDate(monthStartDate.getDate() + day);
            const dateString = date.toISOString().slice(5, 10); // 僅顯示 MM-DD
            const recordRef = db.collection("users").doc(userId)
                .collection("Records").doc(date.toISOString().split('T')[0])
                .collection("water");
            promises.push(
                recordRef.get().then((querySnapshot) => {
                    let dailyWater = 0;
                    let dailyCount = 0;
                    querySnapshot.forEach((doc) => {
                        dailyWater += doc.data().water;
                        dailyCount++;
                    });
                    let avgDailyWater = dailyCount > 0 ? dailyWater / dailyCount : 0;
                    data.push(avgDailyWater);
                    labels.push(dateString);
                })
            );
        }
    }

    return Promise.all(promises).then(() => ({ labels, data }));
}

//路路路路路路路路路路路路路路路路路路路路路
//路路路路路路路路　　　　路路路路路路路路路
//路路路路路路路路　　　路路路路路路路路路路
//路路路路路路路路　　　路路路路路路路路路路
//路路路路路路路路　　　　　　　　　　路路路
//路路路路路路路路　　　路路路路路路路路路路
//路路路路路路路路　　　路路路路路路路路路路
//路路路路路路路路　　　路路路路路路路路路路
//路　　　　　　　　　　　　　　　　　　　路
//路路路路路路路路　　　路路路路路路路　　路
//路路路路路路路路　　　路路路路路路路路路路
//路路路路路路路路　　　　　　路路路路路路路
//路路路路路路路路　　　　　　　路路路路路路
//路路路路路路路路　　　路路　　　　路路路路
//路路路路路路路路　　　路路路　　　　路路路
//路路路路路路路路　　　路路路路　　路路路路
//路路路路路路路路　　　　路路路路路路路路路
//路路路路路路路路　　　　路路路路路路路路路
//路路路路路路路路　　　　路路路路路路路路路
//路路路路路路路路路路路路路路路路路路路路路
// 初始化卡路里圖表
const calorieCtx = document.getElementById('calorieChart').getContext('2d');
const calorieChart = new Chart(calorieCtx, {
    type: 'line',
    data: {
        labels: [],
        datasets: [{
            label: '卡路里 (cal)',
            data: [],
            fill: false,
            borderColor: '#6698C4',
            backgroundColor: '#6698C4',
            tension: 0.1
        }]
    },
    options: {
        responsive: true,
        scales: {
            x: {
                title: {
                    display: true,
                    text: '日期'
                }
            },
            y: {
                title: {
                    display: true,
                    text: '卡路里 (cal)'
                },
                beginAtZero: true // 確保縱軸從零開始，避免負數
            }
        }
    }
});

// 獲取並顯示卡路里數據
function fetchCalorieData(userId, days, selectedYear, selectedMonth) {
    const labels = [];
    const data = [];
    const promises = [];

    if (days === 7) {
        // 一週：進行某天查詢，顯示當月的最新一周，若最後一周包含未來的時間，則顯示今天以前的一週
        const today = new Date();
        let weekEndDate = new Date(selectedYear, selectedMonth + 1, 0); // 當周的最後一天
        if (weekEndDate > today) {
            weekEndDate = today;
        }
        const weekStartDate = new Date(weekEndDate);
        weekStartDate.setDate(weekEndDate.getDate() - 6); // 確保有7天的數據範圍
        for (let i = 0; i < 7; i++) {
            const date = new Date(weekStartDate);
            date.setDate(weekStartDate.getDate() + i);
            const dateString = date.toISOString().slice(5, 10); // 僅顯示 MM-DD
            const recordRef = db.collection("users").doc(userId)
                .collection("Records").doc(date.toISOString().split('T')[0])
                .collection("cal");
            promises.push(
                recordRef.get().then((querySnapshot) => {
                    let dailyCal = 0;
                    let dailyCount = 0;
                    querySnapshot.forEach((doc) => {
                        dailyCal += doc.data().cal;
                        dailyCount++;
                    });
                    let avgDailyCal = dailyCount > 0 ? dailyCal / dailyCount : 0;
                    data.push(avgDailyCal);
                    labels.push(dateString);
                })
            );
        }
    } else if (days === 30) {
        // 一個月：進行某天查詢，若最後包含未來的時間，則顯示今天以前的一月
        const today = new Date();
        let monthEndDate = new Date(selectedYear, selectedMonth + 1, 0); // 當月的最後一天
        if (monthEndDate > today) {
            monthEndDate = today;
        }
        const monthStartDate = new Date(monthEndDate);
        monthStartDate.setDate(monthEndDate.getDate() - 29); // 確保有30天的數據範圍
        for (let day = 0; day < 30; day++) {
            const date = new Date(monthStartDate);
            date.setDate(monthStartDate.getDate() + day);
            const dateString = date.toISOString().slice(5, 10); // 僅顯示 MM-DD
            const recordRef = db.collection("users").doc(userId)
                .collection("Records").doc(date.toISOString().split('T')[0])
                .collection("cal");
            promises.push(
                recordRef.get().then((querySnapshot) => {
                    let dailyCal = 0;
                    let dailyCount = 0;
                    querySnapshot.forEach((doc) => {
                        dailyCal += doc.data().cal;
                        dailyCount++;
                    });
                    let avgDailyCal = dailyCount > 0 ? dailyCal / dailyCount : 0;
                    data.push(avgDailyCal);
                    labels.push(dateString);
                })
            );
        }
    }

    return Promise.all(promises).then(() => ({ labels, data }));
}



//圖圖圖圖圖圖圖圖圖圖圖圖圖圖圖圖圖圖圖圖圖
//圖圖圖圖圖圖圖圖圖　　　圖圖圖圖圖圖圖圖圖
//圖圖圖圖圖圖圖圖圖　　　圖圖圖圖圖圖圖圖圖
//圖圖　　　　　　　　　　　　　　　　　圖圖
//圖圖圖圖圖圖圖圖圖　　　圖圖圖圖圖圖圖圖圖
//圖圖圖圖圖圖圖圖圖　　　圖圖圖圖圖圖圖圖圖
//圖圖圖　　　　　　　　　　　　　　　圖圖圖
//圖圖圖圖圖圖圖圖圖　　　圖圖圖圖圖圖圖圖圖
//圖圖圖圖圖圖圖圖圖　　　圖圖圖圖圖圖圖圖圖
//圖　　　　　　　　　　　　　　　　　　　圖
//圖圖圖圖圖圖圖　　　　　圖圖圖圖圖圖圖圖圖
//圖圖圖圖圖圖　　　圖　　　圖圖　　　圖圖圖
//圖圖圖圖圖　　　　圖　　　圖　　　　圖圖圖
//圖圖圖　　　　　　圖圖　　　　　圖圖圖圖圖
//圖　　　　　　　　圖　　　　　圖圖圖圖圖圖
//圖　　　圖圖　　　　　　　　　　圖圖圖圖圖
//圖圖圖圖圖圖　　　　　　圖　　　　　　　圖
//圖圖圖圖圖圖　　　　圖圖圖圖圖　　　　　圖
//圖圖圖圖圖圖　　　圖圖圖圖圖圖圖圖圖圖圖圖
//圖圖圖圖圖圖圖圖圖圖圖圖圖圖圖圖圖圖圖圖圖

// 更新體重圖表
function updateWeightChart(userId, days, selectedYear, selectedMonth) {
    fetchWeightData(userId, days, selectedYear, selectedMonth).then((weightData) => {
        weightChart.data.labels = weightData.labels;
        weightChart.data.datasets[0].data = weightData.data;
        weightChart.update();
    });
}

// 更新跑步圖表
function updateRunChart(userId, days, selectedYear, selectedMonth) {
    fetchRunData(userId, days, selectedYear, selectedMonth).then((runData) => {
        runChart.data.labels = runData.labels;
        runChart.data.datasets[0].data = runData.data;
        runChart.update();
    });
}

// 更新喝水圖表
function updateWaterChart(userId, days, selectedYear, selectedMonth) {
    fetchWaterData(userId, days, selectedYear, selectedMonth).then((waterData) => {
        waterChart.data.labels = waterData.labels;
        waterChart.data.datasets[0].data = waterData.data;
        waterChart.update();
    });
}

// 更新卡路里圖表
function updatecalChart(userId, days, selectedYear, selectedMonth) {
    fetchCalorieData(userId, days, selectedYear, selectedMonth).then((calorieData) => {
        calorieChart.data.labels = calorieData.labels;
        calorieChart.data.datasets[0].data = calorieData.data;
        calorieChart.update();
    });
}

// 更新所有圖表
function updateAllCharts(userId, days, selectedYear, selectedMonth) {
    updateWeightChart(userId, days, selectedYear, selectedMonth);
    updateRunChart(userId, days, selectedYear, selectedMonth);
    updateWaterChart(userId, days, selectedYear, selectedMonth);
    updatecalChart(userId, days, selectedYear, selectedMonth);
}

// 添加事件監聽器來更新圖表
function addEventListeners() {
    document.getElementById('timeRange').addEventListener('change', handleInputChange);
    document.getElementById('yearSelect').addEventListener('change', handleInputChange);
    document.getElementById('monthSelect').addEventListener('change', handleInputChange);
}

// 處理輸入變化的事件函數
function handleInputChange() {
    const days = parseInt(document.getElementById('timeRange').value);
    const selectedYear = parseInt(document.getElementById('yearSelect').value);
    const selectedMonth = parseInt(document.getElementById('monthSelect').value);
    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            updateAllCharts(user.uid, days, selectedYear, selectedMonth);
        }
    });
}


