document.querySelectorAll('input[name="trip"]').forEach((elem) => {
  elem.addEventListener("change", function (event) {
    const value = event.target.id;
    console.log("🚀 ~ value:", value);
    const formSearchInput = document.getElementById("form-search-input");
    const departureDateInput = document.getElementById("departure-date-input");
    const returnDateInput = document.getElementById("return-date-input");
    if (value === "one_way") {
      formSearchInput.classList.remove("grid-cols-5");
      formSearchInput.classList.add("grid-cols-4");
      departureDateInput.classList.add("max-xl:col-span-2");
      returnDateInput.classList.add("hidden");

    } else {
      formSearchInput.classList.add("grid-cols-5");
      formSearchInput.classList.remove("grid-cols-4");
      departureDateInput.classList.remove("max-xl:col-span-2");
      returnDateInput.classList.remove("hidden");
    }
  });
});
// / CALENDER ÂM DƯƠNG LỊCH VIỆT NAM ====
function INT(d) {
  return Math.floor(d);
}
function jdFromDate(dd, mm, yy) {
  let a = INT((14 - mm) / 12);
  let y = yy + 4800 - a;
  let m = mm + 12 * a - 3;
  let jd = dd + INT((153 * m + 2) / 5) + 365 * y + INT(y / 4) - INT(y / 100) + INT(y / 400) - 32045;
  if (jd < 2299161) jd = dd + INT((153 * m + 2) / 5) + 365 * y + INT(y / 4) - 32083;
  return jd;
}
function jdToDate(jd) {
  let a, b, c;
  if (jd > 2299160) {
    a = jd + 32044;
    b = INT((4 * a + 3) / 146097);
    c = a - INT((b * 146097) / 4);
  } else {
    b = 0;
    c = jd + 32082;
  }
  let d = INT((4 * c + 3) / 1461);
  let e = c - INT((1461 * d) / 4);
  let m = INT((5 * e + 2) / 153);
  let day = e - INT((153 * m + 2) / 5) + 1;
  let month = m + 3 - 12 * INT(m / 10);
  let year = b * 100 + d - 4800 + INT(m / 10);
  return [day, month, year];
}
function getNewMoonDay(k, timeZone) {
  let T = k / 1236.85;
  let T2 = T * T,
    T3 = T2 * T;
  let dr = Math.PI / 180;
  let Jd1 = 2415020.75933 + 29.53058868 * k + 0.0001178 * T2 - 0.000000155 * T3;
  Jd1 += 0.00033 * Math.sin((166.56 + 132.87 * T - 0.009173 * T2) * dr);
  let M = 359.2242 + 29.10535608 * k - 0.0000333 * T2 - 0.00000347 * T3;
  let Mpr = 306.0253 + 385.81691806 * k + 0.0107306 * T2 + 0.00001236 * T3;
  let F = 21.2964 + 390.67050646 * k - 0.0016528 * T2 - 0.00000239 * T3;
  let C1 =
    (0.1734 - 0.000393 * T) * Math.sin(M * dr) +
    0.0021 * Math.sin(2 * M * dr) -
    0.4068 * Math.sin(Mpr * dr) +
    0.0161 * Math.sin(2 * Mpr * dr) +
    0.0104 * Math.sin(2 * F * dr);
  let deltat = T < -11 ? 0.001 + 0.000839 * T + 0.0002261 * T2 : -0.000278 + 0.000265 * T + 0.000262 * T2;
  return INT(Jd1 + C1 - deltat + 0.5 + timeZone / 24);
}
function getSunLongitude(jdn, timeZone) {
  let T = (jdn - 2451545.5 - timeZone / 24) / 36525;
  let T2 = T * T;
  let dr = Math.PI / 180;
  let M = 357.5291 + 35999.0503 * T - 0.0001559 * T2;
  let L0 = 280.46645 + 36000.76983 * T;
  let DL = (1.9146 - 0.004817 * T - 0.000014 * T2) * Math.sin(dr * M);
  let L = (L0 + DL) * dr;
  L = L - 2 * Math.PI * INT(L / (2 * Math.PI));
  return INT((L / Math.PI) * 6);
}
function getLunarMonth11(yy, timeZone) {
  let off = jdFromDate(31, 12, yy) - 2415021;
  let k = INT(off / 29.530588853);
  let nm = getNewMoonDay(k, timeZone);
  let sunLong = getSunLongitude(nm, timeZone);
  if (sunLong >= 9) nm = getNewMoonDay(k - 1, timeZone);
  return nm;
}
function getLunarDate(dd, mm, yy, timeZone = 7) {
  let dayNumber = jdFromDate(dd, mm, yy);
  let k = INT((dayNumber - 2415021.076998695) / 29.530588853);
  let monthStart = getNewMoonDay(k + 1, timeZone);
  if (monthStart > dayNumber) monthStart = getNewMoonDay(k, timeZone);
  let a11 = getLunarMonth11(yy, timeZone);
  let b11 = a11 >= monthStart ? getLunarMonth11(yy - 1, timeZone) : getLunarMonth11(yy + 1, timeZone);
  let diff = INT((monthStart - a11) / 29);
  let month = diff + 11;
  if (month > 12) month -= 12;
  let lunarDay = dayNumber - monthStart + 1;
  let lunarYear = month >= 11 && diff < 4 ? yy : yy + 1;
  return { day: lunarDay, month, year: lunarYear };
}

// ==== DỮ LIỆU ====
const today = new Date();
let currentYear = today.getFullYear();
let currentMonth = today.getMonth();
let startDate = null;
let endDate = null;

// Ngày lễ DƯƠNG lịch
const solarHolidays = [
  "01-01", // Tết Dương lịch
  "14-02", // Valentine
  "08-03", // Quốc tế Phụ nữ
  "30-04", // Giải phóng miền Nam
  "01-05", // Quốc tế Lao động
  "01-06", // Thiếu nhi
  "02-09", // Quốc khánh
  "20-11", // Ngày Nhà giáo Việt Nam
  "24-12", // Giáng sinh
];

// Ngày lễ ÂM lịch
const lunarHolidays = [
  "01-01", // Tết Nguyên Đán
  "02-01",
  "03-01", // Mùng 2,3 Tết
  "15-01", // Rằm tháng Giêng
  "10-03", // Giỗ Tổ Hùng Vương
  "15-07", // Vu Lan
  "15-08", // Trung Thu
];

// ==== HÀM RENDER ====
function renderCalendar(year, month) {
  const monthNames = [
    "Tháng Một",
    "Tháng Hai",
    "Tháng Ba",
    "Tháng Tư",
    "Tháng Năm",
    "Tháng Sáu",
    "Tháng Bảy",
    "Tháng Tám",
    "Tháng Chín",
    "Tháng Mười",
    "Tháng Mười Một",
    "Tháng Mười Hai",
  ];
  const weekdays = ["Thứ Hai", "Thứ Ba", "Thứ Tư", "Thứ Năm", "Thứ Sáu", "Thứ Bảy", "Chủ Nhật"];
  const firstDay = new Date(year, month).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  let start = firstDay === 0 ? 6 : firstDay - 1;

  let html = `
        
        <div class="month">
          <div class="month-header">
            <span>${monthNames[month]}</span><span>${year}</span>
          </div>
          <div class="weekdays">${weekdays.map((d) => `<div>${d}</div>`).join("")}</div>
          <div class="days">`;
  for (let i = 0; i < start; i++) html += `<div class="inactive"></div>`;

  const startOfToday = new Date(today.getFullYear(), today.getMonth(), today.getDate());

  for (let day = 1; day <= daysInMonth; day++) {
    const date = new Date(year, month, day);
    const dateStr = date.toISOString().split("T")[0];
    const lunar = getLunarDate(day, month + 1, year);
    const solarKey = `${String(day).padStart(2, "0")}-${String(month + 1).padStart(2, "0")}`;
    const lunarKey = `${String(lunar.day).padStart(2, "0")}-${String(lunar.month).padStart(2, "0")}`;
    const isHoliday = solarHolidays.includes(solarKey) || lunarHolidays.includes(lunarKey);
    const isToday = date.toDateString() === today.toDateString();
    const isPast = date < startOfToday;

    html += `<div data-date="${dateStr}" class="${[
      isToday ? "today" : "",
      isHoliday ? "holiday" : "",
      isPast ? "disabled" : "",
    ].join(" ")}">
          ${day}<span class="lunar">${lunar.day}/${lunar.month}</span>
        </div>`;
  }
  html += `</div></div>`;
  return html;
}

function renderRangePicker() {
  const nextMonth = (currentMonth + 1) % 12;
  const nextYear = currentMonth === 11 ? currentYear + 1 : currentYear;
  document.getElementById("calendar").innerHTML = `
        <div class="calendar">
          ${renderCalendar(currentYear, currentMonth)}
          ${renderCalendar(nextYear, nextMonth)}
        </div>`;
  document.querySelectorAll(".days div[data-date]").forEach((day) => {
    if (!day.classList.contains("disabled")) day.addEventListener("click", () => handleDateClick(day));
  });
  updateRangeHighlight();
}

function handleDateClick(el) {
  const d = new Date(el.dataset.date);
  if (!startDate || (startDate && endDate)) {
    startDate = d;
    endDate = null;
  } else if (d < startDate) {
    endDate = startDate;
    startDate = d;
  } else endDate = d;
  updateRangeHighlight();
}

function updateRangeHighlight() {
  document.querySelectorAll(".days div").forEach((el) => el.classList.remove("start", "end", "range"));
  if (!startDate) return;
  document.querySelectorAll(".days div[data-date]").forEach((el) => {
    const d = new Date(el.dataset.date);
    if (d.toDateString() === startDate.toDateString()) el.classList.add("start");
    if (endDate && d.toDateString() === endDate.toDateString()) el.classList.add("end");
    if (endDate && d > startDate && d < endDate) el.classList.add("range");
  });
  const info = document.getElementById("range-info");
  if (startDate && endDate)
    info.textContent = `Từ ${startDate.toLocaleDateString("vi-VN")} → ${endDate.toLocaleDateString("vi-VN")}`;
  else if (startDate) info.textContent = `Ngày bắt đầu: ${startDate.toLocaleDateString("vi-VN")}`;
  else info.textContent = "";
}

document.getElementById("prev").onclick = () => {
  currentMonth--;
  if (currentMonth < 0) {
    currentMonth = 11;
    currentYear--;
  }
  renderRangePicker();
};
document.getElementById("next").onclick = () => {
  currentMonth++;
  if (currentMonth > 11) {
    currentMonth = 0;
    currentYear++;
  }
  renderRangePicker();
};

renderRangePicker();
